// Supabase Edge Function: complete-task
// Path: supabase/functions/complete-task/index.ts

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Get request body
    const { roadmapId, taskId, userId, feedback, timeSpent } = await req.json();

    if (!roadmapId || !taskId || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get current progress
    const { data: progress, error: progressError } = await supabase
      .from('roadmap_progress')
      .select('*')
      .eq('roadmap_id', roadmapId)
      .eq('user_id', userId)
      .single();

    if (progressError) {
      throw progressError;
    }

    // Get roadmap to find the task
    const { data: roadmap, error: roadmapError } = await supabase
      .from('roadmaps')
      .select('*')
      .eq('id', roadmapId)
      .single();

    if (roadmapError) {
      throw roadmapError;
    }

    // Find the task
    let completedTask = null;
    for (const milestone of roadmap.weekly_milestones) {
      const task = milestone.tasks.find(t => t.id === taskId);
      if (task) {
        completedTask = task;
        break;
      }
    }

    if (!completedTask) {
      return new Response(
        JSON.stringify({ error: 'Task not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if already completed
    if (progress.completed_tasks.includes(taskId)) {
      return new Response(
        JSON.stringify({ error: 'Task already completed' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate points
    const pointsMap = { easy: 10, medium: 20, hard: 30 };
    const taskPoints = pointsMap[completedTask.difficulty] || 10;

    // Calculate streak
    const lastActivity = new Date(progress.last_activity_at);
    const now = new Date();
    const daysSinceLastActivity = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    
    let newStreak = progress.current_streak;
    let streakBonus = 0;

    if (daysSinceLastActivity === 0) {
      // Same day - maintain streak
      newStreak = progress.current_streak;
    } else if (daysSinceLastActivity === 1) {
      // Consecutive day - increase streak
      newStreak = progress.current_streak + 1;
      streakBonus = 5; // 5 points per day of streak
    } else {
      // Streak broken
      newStreak = 1;
    }

    const longestStreak = Math.max(progress.longest_streak, newStreak);

    // Calculate total points
    const totalPoints = taskPoints + streakBonus;

    // Check for new badges
    const newBadges = [];
    const completedTasksCount = progress.completed_tasks.length + 1;

    // First task badge
    if (completedTasksCount === 1) {
      newBadges.push({
        id: 'first_step',
        name: 'First Step',
        description: 'Completed your first task',
        icon: '🎯',
        rarity: 'common',
        earnedAt: now.toISOString()
      });
    }

    // Streak badges
    if (newStreak === 7 && progress.current_streak < 7) {
      newBadges.push({
        id: 'streak_master',
        name: 'Streak Master',
        description: 'Maintained a 7-day streak',
        icon: '🔥',
        rarity: 'epic',
        earnedAt: now.toISOString()
      });
    }

    // Check for week completion
    const currentWeek = Math.ceil(completedTask.day / 7);
    const weekMilestone = roadmap.weekly_milestones.find(m => m.week === currentWeek);
    
    if (weekMilestone) {
      const weekTaskIds = weekMilestone.tasks.map(t => t.id);
      const completedWeekTasks = [...progress.completed_tasks, taskId].filter(id => 
        weekTaskIds.includes(id)
      );

      if (completedWeekTasks.length === weekMilestone.tasks.length) {
        newBadges.push({
          id: `week_${currentWeek}_warrior`,
          name: 'Week Warrior',
          description: `Completed all tasks in week ${currentWeek}`,
          icon: '⭐',
          rarity: 'rare',
          earnedAt: now.toISOString()
        });
      }
    }

    // Create reward object
    const reward = {
      id: `reward_${Date.now()}`,
      type: 'points',
      value: totalPoints,
      message: `Great job! You earned ${totalPoints} points${streakBonus > 0 ? ` (including ${streakBonus} streak bonus)` : ''}!`,
      earnedAt: now.toISOString()
    };

    // Update progress
    const updatedProgress = {
      ...progress,
      total_points: progress.total_points + totalPoints,
      current_streak: newStreak,
      longest_streak: longestStreak,
      completed_tasks: [...progress.completed_tasks, taskId],
      earned_badges: [...progress.earned_badges, ...newBadges],
      recent_rewards: [reward, ...progress.recent_rewards.slice(0, 9)], // Keep last 10
      current_day: Math.max(progress.current_day, completedTask.day + 1),
      last_activity_at: now.toISOString()
    };

    const { error: updateError } = await supabase
      .from('roadmap_progress')
      .update(updatedProgress)
      .eq('roadmap_id', roadmapId)
      .eq('user_id', userId);

    if (updateError) {
      throw updateError;
    }

    // Return response with reward and new badge if any
    return new Response(
      JSON.stringify({
        success: true,
        task: { ...completedTask, completed: true, completedAt: now.toISOString() },
        reward,
        newProgress: updatedProgress,
        unlockedBadge: newBadges.length > 0 ? newBadges[0] : null,
        message: 'Task completed successfully!'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error completing task:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';
import {
  Video, LogOut, BookOpen, Trophy, Target, Clock, TrendingUp,
  Calendar, CheckCircle2, PlayCircle, Award, Zap, BarChart3
} from 'lucide-react';

export default function UserDashboard() {
  const user = {
    email: 'demo@example.com',
    user_metadata: {
      full_name: 'test'
    }
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.error('Error signing out:', e);
    }
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('dev_bypass_admin');
    } catch (e) {
      // ignore
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Video className="w-8 h-8 text-sky-600" />
              <span className="text-2xl font-bold text-slate-900">MockIthub</span>
            </Link>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {user?.user_metadata?.full_name || 'User'}
                  </div>
                  <div className="text-xs text-slate-500">{user?.email}</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user?.user_metadata?.full_name?.split(' ')[0] || 'there'}!
          </h1>
          <p className="text-slate-600">Continue your interview preparation journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                +12%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">24</div>
            <div className="text-sm text-slate-600">Lessons Completed</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                +8
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">156</div>
            <div className="text-sm text-slate-600">Points Earned</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-rose-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                75%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">18/24</div>
            <div className="text-sm text-slate-600">Weekly Goal</div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                Today
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">2.5h</div>
            <div className="text-sm text-slate-600">Study Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Learning Progress</h2>
                <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Data Structures & Algorithms</span>
                    <span className="text-sm font-semibold text-sky-600">85%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">System Design</span>
                    <span className="text-sm font-semibold text-purple-600">60%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Behavioral Questions</span>
                    <span className="text-sm font-semibold text-emerald-600">92%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-600 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-900">Full Stack Development</span>
                    <span className="text-sm font-semibold text-orange-600">45%</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-rose-600 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <TrendingUp className="w-5 h-5 text-slate-400" />
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">Completed Mock Interview</h3>
                    <p className="text-sm text-slate-600 mb-2">System Design - E-commerce Platform</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>2 hours ago</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">95%</div>
                    <div className="text-xs text-slate-500">Score</div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PlayCircle className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">Started New Course</h3>
                    <p className="text-sm text-slate-600 mb-2">Advanced Data Structures - Trees & Graphs</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>Yesterday</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900 mb-1">Achievement Unlocked</h3>
                    <p className="text-sm text-slate-600 mb-2">Completed 7-day learning streak</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8" />
                <h3 className="text-lg font-bold">Daily Challenge</h3>
              </div>
              <p className="text-sky-100 mb-6">
                Complete 3 coding problems to maintain your streak!
              </p>
              <div className="bg-white/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-bold">2/3</span>
                </div>
                <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full" style={{ width: '66%' }}></div>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-sky-600 rounded-xl font-semibold hover:bg-sky-50 transition-all">
                Start Challenge
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-bold text-slate-900">Upcoming Sessions</h3>
              </div>

              <div className="space-y-3">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-purple-900">Mock Interview</span>
                    <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      Tomorrow
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">with Sarah Johnson</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>10:00 AM - 11:00 AM</span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl border border-sky-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-sky-900">System Design Review</span>
                    <span className="text-xs font-medium text-sky-600 bg-sky-100 px-2 py-1 rounded-full">
                      Thu, 3 PM
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-2">with Michael Chen</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>3:00 PM - 4:30 PM</span>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 py-2 text-sky-600 hover:bg-sky-50 rounded-lg font-medium transition-all">
                View All Sessions
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-slate-600" />
                <h3 className="text-lg font-bold text-slate-900">Quick Stats</h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Total Practice Time</span>
                  <span className="text-sm font-semibold text-slate-900">45.5 hrs</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Problems Solved</span>
                  <span className="text-sm font-semibold text-slate-900">127</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Current Streak</span>
                  <span className="text-sm font-semibold text-slate-900">7 days 🔥</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm text-slate-600">Mock Interviews</span>
                  <span className="text-sm font-semibold text-slate-900">8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

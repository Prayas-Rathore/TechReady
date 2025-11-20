import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Video, LogOut, BookOpen, Trophy, Target, Clock, TrendingUp,
  Calendar, CheckCircle2, PlayCircle, Award, Zap, BarChart3,Trash2, Edit, Eye
} from 'lucide-react';
import { supabase } from '../services/SupabaseClient';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useInterviewCount } from '../components/hooks/useInterviewCount';
import { useInterviewTime } from "../components/hooks/useInterviewCount";
import { useLastFiveScores } from "../components/hooks/useLastFiveScores";
import { useLastInterviewSessions } from '../components/hooks/useLastInterviewSessions';

export default function UserDashboard() {
  const navigate = useNavigate();
  const { user, role, loading } = useAuth();
  const { data: count } = useInterviewCount();
  const { data: totalMs } = useInterviewTime();
  const { data,isLoading } = useLastFiveScores();
  const { data: lastFiveSessions, isLoading: isSessionsLoading } = useLastInterviewSessions();

  useEffect(() => {
    // log role for debugging
    // console.log('UserDashboard: user_role =', role);
  }, [role]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // clear any local dev bypass and send to public home page
    try {
      if (typeof window !== 'undefined') localStorage.removeItem('dev_bypass_admin');
    } catch (e) {
      // ignore
    }
    navigate('/', { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  function formatTime(ms: number) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  const formattedScores = data?.map((item, index) => {
  const prev = data[index + 1]?.score;

  let status = "same";

  if (prev !== undefined) {
    if (item.score > prev) status = "active";       // improved
    else if (item.score < prev) status = "inactive"; // declined
    else status = "same";
  }

  return {
    id: index,
    name: `CV Score ${item.score}%`,
    email: `Score: ${item.score}%`,
    status,
    joined: new Date(item.date).toLocaleDateString(),
  };
});

if (isLoading || isSessionsLoading) return <div>Loading...</div>;
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
  <Sidebar role={Number(role) === 1 ? 'admin' : 'user'} />
        <div className="flex-1">
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/user-dashboard" className="flex items-center gap-2">
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
                    {/* <span className="ml-2 text-xs font-medium text-red/70 bg-slate-500/10 px-2 py-0.5 rounded">{Number(role) === 1 ? 'Admin' : 'User'}</span> */}
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
              {/* <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                +12%
              </span> */}
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">10/{isLoading ? "..." : count}</div>
            <div className="text-sm text-slate-600">Interview Practice Attempted</div>
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
                Total
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{formatTime(totalMs || 0)}</div>
            <div className="text-sm text-slate-600">Study Time</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">CV Reports and Analysis</h2>
                {/* <button className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                  View All
                </button> */}
              </div>

              {formattedScores?.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium text-slate-900">{user.name}</span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-slate-600">{user.email}</td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-emerald-100 text-emerald-700"
                            : user.status === "inactive"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            user.status === "active"
                              ? "bg-emerald-500"
                              : user.status === "inactive"
                              ? "bg-amber-500"
                              : "bg-slate-500"
                          }`}
                        ></span>
                        {user.status === "active"
                          ? "Improved"
                          : user.status === "inactive"
                          ? "Declined"
                          : "Same"}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-slate-600 text-sm">{user.joined}</td>

                    
                  </tr>
                ))}

            </div>
            <div className="bg-white p-4 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-3">Recent Interview Sessions</h3>

      <ul className="space-y-3">
        {lastFiveSessions?.map((item) => {
          const duration =
            item.started_at && item.completed_at
              ? Math.round(
                  (new Date(item.completed_at).getTime() -
                    new Date(item.started_at).getTime()) /
                    60000
                )
              : null;

          return (
            <li
              key={item.id}
              className="p-3 bg-gray-50 rounded-lg flex justify-between items-center"
            >
              <div className="flex flex-col">
                <p className="font-medium">
                  {item.job_description_text.slice(0, 40)}...
                </p>

                <span className="text-gray-500 text-sm">
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : item.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {item.status}
                </span>

                {duration !== null && (
                  <span className="text-sm text-gray-600">
                    {duration} min
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>

            {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
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
            </div> */}
          </div>

          <div className="space-y-6">
            {/* <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
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
            </div> */}

            {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
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
            </div> */}

            {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
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
            </div> */}
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LogOut, Users, BookOpen, DollarSign, TrendingUp,
  Activity, UserCheck, Calendar, BarChart3,
 ChevronDown,
} from 'lucide-react';
import { supabase } from '../services/SupabaseClient';
import AdminSidebar from '../components/AdminSidebar';
import {
  useTotalUsers,
  useNewUsersThisMonth,
  useGetTotalSession,
  useUserGrowthData,
  useRevenueData,
  useSessionsData,
  useActivityData
} from "..//components/hooks/admin/useAnalytics";
import RevenueChart from '../components/admin/RevenueChart';
import UserGrowthChart from '../components/admin/UserGrowthChart';
import SessionsChart from '../components/admin/SessionsChart';
import ActivityDistributionChart from '../components/admin/ActivityDistributionChart';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('analytics');
   const { data: totalUsers, isLoading: totalLoading } = useTotalUsers();
  const { data: newUsersThisMonth, isLoading: newUsersLoading } = useNewUsersThisMonth();
  const { data: totalSessions, isLoading:totalSessionsLoading } = useGetTotalSession();
  const { data: userGrowthData, isLoading: userGrowthLoading } = useUserGrowthData();
  const { data: revenueData, isLoading: revenueLoading } = useRevenueData();
  const { data: sessionsData, isLoading: sessionsLoading } = useSessionsData();
  const { data: activityData, isLoading: activityLoading } = useActivityData();
  const [recentUsers, setRecentUsers] = useState<any[]>([]);

  

 const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

useEffect(() => {
  let mounted = true;

  const fetchAuthUsers = async () => {
    try {
      // Fetch admin user
      const { data: userData } = await supabase.auth.getUser();
      if (mounted) setAdmin(userData?.user);

      // Fetch recent users from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) console.warn("profiles error:", error);

      if (mounted) setRecentUsers(data || []);
    } catch (err) {
      console.error("Failed to fetch:", err);
    } finally {
      if (mounted) setLoading(false);
    }
  };

  fetchAuthUsers();

  return () => {
    mounted = false;
  };
}, []);


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />

      <div className="flex-1 w-full lg:w-auto">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 ml-16 lg:ml-0">Admin Dashboard</h2>

              <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {admin?.user_metadata?.full_name?.charAt(0) || admin?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {admin?.user_metadata?.full_name || 'Admin'}
                    </div>
                    <div className="text-xs text-slate-500">{admin?.email}</div>
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

        <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Hello , Bert</h1>
          <p className="text-slate-600">Manage your platform and monitor performance</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              {/* <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                +12.5%
              </span> */}
            </div>
            <div className="text-3xl font-bold mb-1">{totalLoading ? "..." : totalUsers}</div>
            <div className="text-purple-100">Total Users</div>
          </div>

          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              {/* <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                +8.2%
              </span> */}
            </div>
            <div className="text-3xl font-bold mb-1">{newUsersLoading ? "..." : newUsersThisMonth}</div>
            <div className="text-sky-100">Active Users</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                +18.7%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">$54.2K</div>
            <div className="text-emerald-100">Monthly Revenue</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                +5.3%
              </span>
            </div>
            <div className="text-3xl font-bold mb-1">{totalSessionsLoading ? "..." : totalSessions}</div>
            <div className="text-orange-100">Sessions Completed</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-8">
          <div className="border-b border-slate-200 px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'overview'
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Overview
                </button> */}
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'users'
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Users
                </button>
                {/* <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'content'
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Content
                </button> */}
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === 'analytics'
                      ? 'bg-purple-100 text-purple-600'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Analytics
                </button>
              </div>

              {/* <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button> */}
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
                      <button className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                        <Calendar className="w-4 h-4" />
                        Last 30 days
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="h-64 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200">
                      <div className="text-center">
                        <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                        <p className="text-slate-500">Chart visualization would go here</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Completion Rate</span>
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">87.5%</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Avg Session Time</span>
                          <Activity className="w-4 h-4 text-sky-500" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">42 min</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">User Satisfaction</span>
                          <Activity className="w-4 h-4 text-purple-500" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">4.8/5.0</div>
                      </div>
                      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-600">Retention Rate</span>
                          <TrendingUp className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="text-2xl font-bold text-slate-900">92.3%</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all font-medium text-left">
                        Add New User
                      </button>
                      <button className="w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-purple-300 transition-all font-medium text-left">
                        Create Content
                      </button>
                      <button className="w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-purple-300 transition-all font-medium text-left">
                        Send Notification
                      </button>
                      <button className="w-full px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-purple-300 transition-all font-medium text-left">
                        Export Report
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4">System Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <span className="text-sm font-medium text-slate-900">API Status</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                        <span className="text-sm font-medium text-slate-900">Database</span>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          Healthy
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                        <span className="text-sm font-medium text-slate-900">Storage</span>
                        <span className="text-xs font-semibold text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                          78% Used
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-6">Recent Users</h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">User</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Email</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-900">Joined</th>
                      </tr>
                    </thead>

                    <tbody>
                      {recentUsers.map((user) => (
                        <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-all">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-semibold text-sm">
                                  {user.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0)?.toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-slate-900">{user.full_name || 'N/A'}</span>
                            </div>
                          </td>

                          <td className="py-4 px-4 text-slate-600">
                            {user.email}
                          </td>

                          <td className="py-4 px-4 text-slate-600 text-sm">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}


            {activeTab === 'content' && (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Content Management</h3>
                <p className="text-slate-600">Content management features would be displayed here</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">User Growth Trend</h3>
                    {userGrowthLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <UserGrowthChart data={userGrowthData} />
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Weekly Sessions</h3>
                    {sessionsLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <SessionsChart data={sessionsData} />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Revenue Overview (Last 30 Days)</h3>
                    {revenueLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <RevenueChart data={revenueData} />
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Activity Distribution</h3>
                    {activityLoading ? (
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <ActivityDistributionChart data={activityData} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Alerts</h3>
              <AlertCircle className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">High server load detected</p>
                  <p className="text-xs text-slate-600">API response time increased by 25%</p>
                  <p className="text-xs text-slate-500 mt-1">15 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <UserCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">50 new user signups today</p>
                  <p className="text-xs text-slate-600">20% increase from yesterday</p>
                  <p className="text-xs text-slate-500 mt-1">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-200">
                <Activity className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900 mb-1">System backup completed</p>
                  <p className="text-xs text-slate-600">All data successfully backed up</p>
                  <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Top Performing Content</h3>
              <TrendingUp className="w-5 h-5 text-slate-400" />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 text-sm">System Design Masterclass</p>
                  <p className="text-xs text-slate-600 mt-1">1,245 enrollments</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">4.9</div>
                  <div className="text-xs text-slate-500">rating</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 text-sm">Data Structures Deep Dive</p>
                  <p className="text-xs text-slate-600 mt-1">987 enrollments</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">4.8</div>
                  <div className="text-xs text-slate-500">rating</div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-900 text-sm">Behavioral Interview Prep</p>
                  <p className="text-xs text-slate-600 mt-1">856 enrollments</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">4.9</div>
                  <div className="text-xs text-slate-500">rating</div>
                </div>
              </div>
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

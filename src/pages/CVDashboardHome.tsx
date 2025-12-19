import { useEffect, useState } from 'react';
import { FileText, Briefcase, Activity, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/SupabaseClient';

interface Statistics {
  cvAnalyses: number;
  jdDescriptions: number;
  totalAttempts: number;
  recentActivity: {
    date: string;
    type: string;
    score?: number;
  }[];
}

export default function CVDashboardHome() {
  const [stats, setStats] = useState<Statistics>({
    cvAnalyses: 0,
    jdDescriptions: 0,
    totalAttempts: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [cvAnalysesResult, jdDescriptionsResult] = await Promise.all([
        supabase
          .from('cv_analyses')
          .select('id, created_at, score')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('jd_descriptions')
          .select('id, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
      ]);

      const cvCount = cvAnalysesResult.data?.length || 0;
      const jdCount = jdDescriptionsResult.data?.length || 0;

      const recentCV = cvAnalysesResult.data?.slice(0, 3).map(item => ({
        date: new Date(item.created_at).toLocaleDateString(),
        type: 'CV Analysis',
        score: item.score
      })) || [];

      const recentJD = jdDescriptionsResult.data?.slice(0, 3).map(item => ({
        date: new Date(item.created_at).toLocaleDateString(),
        type: 'JD Generated'
      })) || [];

      const recentActivity = [...recentCV, ...recentJD]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setStats({
        cvAnalyses: cvCount,
        jdDescriptions: jdCount,
        totalAttempts: cvCount + jdCount,
        recentActivity
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">CV Optimizer Dashboard</h1>
          <p className="text-slate-600">Track your CV optimization and job description generation</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-sky-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">CV Analyses</h3>
                <p className="text-3xl font-bold text-slate-900">{stats.cvAnalyses}</p>
                <p className="text-xs text-slate-500 mt-2">Total CV analyses completed</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-purple-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">JD Descriptions</h3>
                <p className="text-3xl font-bold text-slate-900">{stats.jdDescriptions}</p>
                <p className="text-xs text-slate-500 mt-2">Job descriptions generated</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6 text-orange-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="text-sm font-medium text-slate-600 mb-1">Total Attempts</h3>
                <p className="text-3xl font-bold text-slate-900">{stats.totalAttempts}</p>
                <p className="text-xs text-slate-500 mt-2">Combined interactions</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                {stats.recentActivity.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'CV Analysis' ? 'bg-sky-500' : 'bg-purple-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{activity.type}</p>
                            <p className="text-xs text-slate-500">{activity.date}</p>
                          </div>
                        </div>
                        {activity.score && (
                          <span className="text-sm font-semibold text-sky-600">{activity.score}%</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm text-slate-600">No activity yet</p>
                    <p className="text-xs text-slate-500">Start by analyzing your CV</p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-3">Quick Actions</h2>
                <p className="text-white/90 text-sm mb-6">
                  Get started with our AI-powered tools to optimize your job search
                </p>
                <div className="space-y-3">
                  <Link
                    to="/cv-dashboard/analysis"
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Analyze CV</p>
                        <p className="text-xs text-white/80">Get AI insights</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/cv-dashboard/jd-generator"
                    className="flex items-center justify-between bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg p-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5" />
                      <div>
                        <p className="font-semibold">Generate JD</p>
                        <p className="text-xs text-white/80">Create job description</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Getting Started</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <div className="w-8 h-8 bg-sky-600 text-white rounded-lg flex items-center justify-center mb-3 font-bold">1</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Upload Your CV</h3>
                  <p className="text-sm text-slate-600">Start by uploading your CV or pasting the content</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center mb-3 font-bold">2</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Add Job Description</h3>
                  <p className="text-sm text-slate-600">Paste the job description you're targeting</p>
                </div>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center mb-3 font-bold">3</div>
                  <h3 className="font-semibold text-slate-900 mb-2">Get Insights</h3>
                  <p className="text-sm text-slate-600">Receive AI-powered suggestions and improvements</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

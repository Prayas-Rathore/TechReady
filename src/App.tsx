import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import UserDashboard from './pages/UserDashboardwithprotection';
import AdminDashboard from './pages/AdminDashboardwithprotection';
import RoadmapGeneratorPage from './pages/RoadmapGeneratorPage';
import SuccessScreen from './components/assessment/SuccessScreen';
import PricingPage from './pages/PricingPage';
// import VoiceRecorderPage from './pages/VoiceRecorderPage';
// import CameraWithVoice from './pages/CameraWithVoice';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import JobDescriptionSelector from './pages/JobDescriptionSelector';
import JobDescriptionSelectorfree from './pages/JobDescriptionSelector_free';
import InterviewSession from './pages/InterviewSession'
import InterviewSuggestionsPage from './pages/InterviewSuggestionsPage';
import CVAnalyzerPage from './pages/CVAnalyzerPage';
import CVDashboardHome from './pages/CVDashboardHome';
import CVAnalysisPage from './pages/CVAnalysisPage';
import JDGeneratorPage from './pages/JDGeneratorPage';
import CVDashboardLayout from './components/CVDashboardLayout';
import PostRoadMap from './pages/PostRoadMap';
import JobDetailsFormPage from './pages/JobDetailsFormPage';
// import RoadmapDisplay from './components/roadmap/RoadmapDisplay';
import UserFormPage from './pages/UserFormPage';
import UserListPage from './pages/UserListPage';
import { SubscriptionProvider } from './context/SubscriptionContext';
import PremiumPage from './components/protection/PremiumPage';

function App() {


  return (
    
    <Router>
      {/* Protected routes wrapped in AuthProvider */}
        <AuthProvider>
                    <SubscriptionProvider>
            <Routes>
                  {/* Public routes */}
                    <Route path="/" element={<InterviewProPage />} />
                    <Route path="/talentvue" element={<HireVuePage />} />
                    <Route path="/test" element={<TestConnectionPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/update-password" element={<UpdatePasswordPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pricing" element={<PricingPage />} />
                    <Route path="/SuccessScreen" element={<SuccessScreen />} />
                    {/* <Route path="/roadmaptest" element={<RoadmapDisplay />} /> */}
                  {/* Public routes */}


                        <Route element={<ProtectedRoute />}>
                          {/* Start Admin Part */}
                          <Route path="/admin-dashboard" element={<AdminDashboard />} />
                          <Route path="/admin/users" element={<UserListPage />} />
                          <Route path="/admin/users/edit/:id" element={<UserFormPage />} /> 
                          {/* End Admin Part */}

                        
                          {/* Start User Part */}
                          <Route path="/assessment" element={<AssessmentPage />} />
                          {/* <Route path="/roadmap" element={<RoadmapGeneratorPage />} /> */}
                          <Route 
                            path="/roadmap" 
                              element={
                                    <PremiumPage>
                                        <RoadmapGeneratorPage />
                                    </PremiumPage>
                              } 
                          />

                          <Route path="/user-dashboard" element={<UserDashboard />} />
                          <Route path="/jobdescription" element={<JobDescriptionSelector />} />
                          <Route path="/ai_jobdescription" element={<JobDescriptionSelectorfree />} />
                          <Route path="/interview/:sessionId" element={<InterviewSession />} />
                          {/* <Route path="/interview/:sessionId/suggestions" element={<InterviewSuggestionsPage />} /> */}
                          <Route path="/interview/:sessionId/suggestions" element={<InterviewSuggestionsPage />} />
                          <Route path="/postroadmap" element={<PostRoadMap />} />
                          <Route path="/job-details" element={<JobDetailsFormPage />} />
                          <Route path="/cv-analyzer" element={<CVAnalyzerPage />} />
                          <Route path="/cv-dashboard" element={<CVDashboardLayout />}>
                          <Route index element={<CVDashboardHome />} />
                          <Route path="analysis" element={<CVAnalysisPage />} />
                          <Route path="jd-generator" element={<JDGeneratorPage />} />
                          {/* End User Part */}
                        </Route>
                      </Route>
            </Routes>
              </SubscriptionProvider>
        </AuthProvider>
    </Router>
  );
}

export default App;

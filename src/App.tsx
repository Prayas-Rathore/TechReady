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
import { CoverLetterGenerator } from './pages/CoverLetterGenerator';
import PostRoadMap from './pages/PostRoadMap';
import JobDetailsFormPage from './pages/JobDetailsFormPage';
// import RoadmapDisplay from './components/roadmap/RoadmapDisplay';
import UserFormPage from './pages/UserFormPage';
import UserListPage from './pages/UserListPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.tsx';
import CookiesPolicyPage from './pages/CookiesPolicyPage.tsx';
import TermsOfServicePage from './pages/TermsOfServicePage.tsx';
import ConsentPolicyPage from './pages/ConsentPolicyPage.tsx';
import { SubscriptionProvider } from './context/SubscriptionContext';
import PremiumPage from './components/protection/PremiumPage';
import FreeOnlyPage from './components/protection/FreeOnlyPage';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
// import { BuddyConnectorPage } from './pages/BuddyConnector/index';
import BuddyConnectorPage from './components/buddy-connector/index';
import LandingPage3 from './pages/LandingPage3.tsx';
import InterviewPro from './pages/InterviewProPage.tsx';


function App() {


  return (
    
    <Router>
      <AuthProvider>
        <SubscriptionProvider>
          <Routes>
            {/* ========================================
                PUBLIC ROUTES (No authentication needed)
            ======================================== */}
            <Route path="/" element={<LandingPage3 />} />
            <Route path="/old-landing" element={<InterviewPro />} />
            <Route path="/test" element={<TestConnectionPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/SuccessScreen" element={<SuccessScreen />} />
            <Route path="/cookies-policy" element={<CookiesPolicyPage />} />
            <Route path="/consent-policy" element={<ConsentPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

            {/* ========================================
                PROTECTED ROUTES (Authentication required)
            ======================================== */}
            <Route element={<ProtectedRoute />}>
              {/* ADMIN ROUTES */}
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserListPage />} />
              <Route path="/admin/users/edit/:id" element={<UserFormPage />} />

              {/* ========================================
                  USER ROUTES WITH PLAN RESTRICTIONS
              ======================================== */}
              
              {/* FREE PLAN ONLY */}
               {/* ✅ FREE PLAN ONLY - Paid users redirected to dashboard */}
              <Route 
                path="/ai_jobdescription" 
                element={
                  <FreeOnlyPage redirectTo="/jobdescription">
                    <JobDescriptionSelectorfree />
                  </FreeOnlyPage>
                } 
              />

              {/* ANY PAID PLAN (Basic, Starter, Pro) */}
              <Route 
                path="/assessment" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <AssessmentPage />
                  </PremiumPage>
                } 
              />
              
              <Route 
                path="/roadmap" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <RoadmapGeneratorPage />
                  </PremiumPage>
                } 
              />

              <Route 
                path="/interview/:sessionId" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <InterviewSession />
                  </PremiumPage>
                } 
              />

              <Route 
                path="/interview/:sessionId/suggestions" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <InterviewSuggestionsPage />
                  </PremiumPage>
                } 
              />

              <Route 
                path="/cv-analyzer" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <CVAnalyzerPage />
                  </PremiumPage>
                } 
              />

              <Route 
                path="/cv-dashboard" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <CVDashboardLayout />
                  </PremiumPage>
                }
              >
                <Route index element={<CVDashboardHome />} />
                <Route path="analysis" element={<CVAnalysisPage />} />
                <Route path="jd-generator" element={<JDGeneratorPage />} />
                <Route path="cover-letter" element={<CoverLetterGenerator />} />
              </Route>

              {/* PRO PLAN ONLY */}
              <Route 
                path="/postroadmap" 
                element={
                  <PremiumPage requiredTier="pro">
                    <PostRoadMap />
                  </PremiumPage>
                } 
              />

              <Route 
                path="/buddy-connector" 
                element={
                  <PremiumPage allowedPlans={["basic", "starter", "pro"]}>
                    <BuddyConnectorPage />
                  </PremiumPage>
                } 
              />
              

              {/* NO PLAN RESTRICTION (All authenticated users) */}
              <Route path="/subscription/success" element={<SubscriptionSuccess />} />
              <Route path="/user-dashboard" element={<UserDashboard />} />
              <Route path="/jobdescription" element={<JobDescriptionSelector />} />
              <Route path="/job-details" element={<JobDetailsFormPage />} />
            </Route>
          </Routes>
        </SubscriptionProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;

// basic,starter,pro
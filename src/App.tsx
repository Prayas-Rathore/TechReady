import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
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
import InterviewSession from './pages/InterviewSession'
import CVAnalyzerPage from './pages/CVAnalyzerPage';
import CVDashboardHome from './pages/CVDashboardHome';
import CVAnalysisPage from './pages/CVAnalysisPage';
import JDGeneratorPage from './pages/JDGeneratorPage';
import CVDashboardLayout from './components/CVDashboardLayout';
import PostRoadMap from './pages/PostRoadMap';
import JobDetailsFormPage from './pages/JobDetailsFormPage';
// import RoadmapDisplay from './components/roadmap/RoadmapDisplay';

function App() {


  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Public routes */}
          <Route path="/" element={<InterviewProPage />} />
          <Route path="/talentvue" element={<HireVuePage />} />
          <Route path="/test" element={<TestConnectionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/SuccessScreen" element={<SuccessScreen />} />
          {/* <Route path="/roadmaptest" element={<RoadmapDisplay />} /> */}
        {/* Public routes */}

      {/* Protected routes wrapped in AuthProvider */}
        <Route element={<ProtectedRoute />}>
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/roadmap" element={<RoadmapGeneratorPage />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/jobdescription" element={<JobDescriptionSelector />} />
          <Route path="/interview/:sessionId" element={<InterviewSession />} />
          <Route path="/postroadmap" element={<PostRoadMap />} />
          <Route path="/job-details" element={<JobDetailsFormPage />} />
          
          <Route path="/cv-analyzer" element={<CVAnalyzerPage />} />
          <Route path="/cv-dashboard" element={<CVDashboardLayout />}>
          <Route index element={<CVDashboardHome />} />
          <Route path="analysis" element={<CVAnalysisPage />} />
          <Route path="jd-generator" element={<JDGeneratorPage />} />
        </Route>
        </Route>
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

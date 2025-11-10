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

function App() {


  return (
    <Router>
      <AuthProvider>
      <Routes>
        {/* Public routes */}
          <Route path="/" element={<InterviewProPage />} />
          <Route path="/talentvue" element={<HireVuePage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/test" element={<TestConnectionPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/roadmap" element={<RoadmapGeneratorPage />} />
          <Route path="/SuccessScreen" element={<SuccessScreen />} />
          {/* <Route path="/voice" element={<VoiceRecorderPage />} />
          <Route path="/CameraWithVoice" element={<CameraWithVoice />} /> */}
        {/* Public routes */}

      {/* Protected routes wrapped in AuthProvider */}
        <Route element={<ProtectedRoute />}>
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/jobdescription" element={<JobDescriptionSelector />} />
          <Route path="/interview/:sessionId" element={<InterviewSession />} />
          <Route path="/cv-analyzer" element={<CVAnalyzerPage />} />
        </Route>
      {/* Protected routes wrapped in AuthProvider */}
      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;

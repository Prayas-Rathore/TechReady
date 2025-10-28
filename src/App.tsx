import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import RoadmapGeneratorPage from './pages/RoadmapGeneratorPage';
import SuccessScreen from './components/assessment/SuccessScreen';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InterviewProPage />} />
        <Route path="/talentvue" element={<HireVuePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/test" element={<TestConnectionPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-dashboard"element={<UserDashboard />}/>
        <Route path="/admin-dasbboard"element={<AdminDashboard />}/>
        <Route path="/roadmap" element={<RoadmapGeneratorPage />} />
        <Route path="/SuccessScreen" element={<SuccessScreen />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </Router>
  );
}

export default App;

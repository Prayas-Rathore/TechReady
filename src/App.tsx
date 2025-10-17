import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

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
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />
        <Route
          path="/admin-dasbboard"
          element={<AdminDashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;

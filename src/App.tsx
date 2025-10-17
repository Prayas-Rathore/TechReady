import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';

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
      </Routes>
    </Router>
  );
}

export default App;

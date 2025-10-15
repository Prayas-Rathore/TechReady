import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
import TestConnectionPage from './pages/TestConnectionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InterviewProPage />} />
        <Route path="/talentvue" element={<HireVuePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/test" element={<TestConnectionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InterviewProPage from './pages/InterviewProPage';
import HireVuePage from './pages/HireVuePage';
import AssessmentPage from './pages/AssessmentPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InterviewProPage />} />
        <Route path="/talentvue" element={<HireVuePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
      </Routes>
    </Router>
  );
}

export default App;

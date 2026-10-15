import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DisclaimerBanner from './components/DisclaimerBanner';
import AuthModal from './components/AuthModal';

import HomePage from './pages/HomePage';
import SymptomAssessmentPage from './pages/SymptomAssessmentPage';
import PcosGuidePage from './pages/PcosGuidePage';
import HealthJournalPage from './pages/HealthJournalPage';
import FindCarePage from './pages/FindCarePage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FCFAF8] dark:bg-[#161118] text-[#2E132A] dark:text-slate-100 transition-colors">
      {/* Top Non-Diagnostic Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Top Navigation */}
      <Navbar />

      {/* Route Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/assess" element={<SymptomAssessmentPage />} />
          <Route path="/pcos-guide" element={<PcosGuidePage />} />
          <Route path="/journal" element={<HealthJournalPage />} />
          <Route path="/find-care" element={<FindCarePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Optional Auth Modal */}
      <AuthModal />

      {/* Footer */}
      <Footer />
    </div>
  );
}

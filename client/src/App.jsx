import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ClubProvider } from './context/ClubContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Glossary from './pages/Glossary';
import Team from './pages/Team';
import Events from './pages/Events';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen bg-cyber-bg text-gray-100 selection:bg-cyber-glow selection:text-black">
      <Routes>
        {}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {}
        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/glossary" element={<Glossary />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/events" element={<Events />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ClubProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ClubProvider>
  );
}

export default App;

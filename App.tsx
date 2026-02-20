
import React, { useState, useEffect } from 'react';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BuyHomesPage from './pages/BuyHomesPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import ConstructionPortfolioPage from './pages/ConstructionPortfolioPage';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage'; // Fix: Changed import back to default import
import AdminPanelPage from './pages/AdminPanelPage';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { WebsiteContentProvider } from './WebsiteContentContext';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'property' | 'buy' | 'rent' | 'contact' | 'construction' | 'about'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const handleNavigateHome = () => {
    setCurrentPage('home');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateConstruction = () => {
    setCurrentPage('construction');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateBuy = () => {
    setCurrentPage('buy');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateRent = () => {
    setCurrentPage('rent');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAboutUs = () => {
    setCurrentPage('about');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    setCurrentPage('contact');
    setSelectedPropertyId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePropertyClick = (propertyId: number) => {
    setCurrentPage('property');
    setSelectedPropertyId(propertyId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getActiveNav = () => {
    if (currentPage === 'construction') return 'construction';
    if (currentPage === 'buy' || currentPage === 'property') return 'buy';
    if (currentPage === 'rent') return 'rent';
    if (currentPage === 'contact') return 'contact';
    if (currentPage === 'about') return 'about';
    return 'home';
  }

  return (
    <>
      <Header
        onNavigateHome={handleNavigateHome}
        onNavigateConstruction={handleNavigateConstruction}
        onNavigateBuy={handleNavigateBuy}
        onNavigateRent={handleNavigateRent}
        onNavigateAboutUs={handleNavigateAboutUs}
        onNavigateContact={handleNavigateContact}
        activeNav={getActiveNav()}
      />
      {currentPage === 'home' && <HomePage onPropertyClick={handlePropertyClick} onNavigateBuy={handleNavigateBuy} onNavigateRent={handleNavigateRent} />}
      {currentPage === 'construction' && <ConstructionPortfolioPage />}
      {currentPage === 'buy' && <BuyHomesPage onPropertyClick={handlePropertyClick} />}
      {currentPage === 'rent' && <RentPropertiesPage onPropertyClick={handlePropertyClick} />}
      {currentPage === 'property' && selectedPropertyId !== null && (
        <PropertyDetailPage onNavigateHome={handleNavigateHome} propertyId={selectedPropertyId} />
      )}
      {currentPage === 'contact' && (
        <ContactPage />
      )}
      {currentPage === 'about' && (
        <AboutUsPage />
      )}
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('isAdminAuth') === 'true';
    } catch {
      return false;
    }
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const toggleAdminPanel = () => {
    const opening = !showAdminPanel;
    // If opening and not authenticated, show password modal
    if (opening && !adminAuthenticated) {
      setShowPasswordModal(true);
      return;
    }
    setShowAdminPanel(opening);
    try {
      if (opening) {
        // push a hash so the admin panel can be linked/shared
        history.pushState(null, '', '#admin');
      } else {
        // remove hash without reloading
        history.pushState(null, '', window.location.pathname + window.location.search);
      }
    } catch (e) {
      // ignore if history API not available
    }
  };

  // Open/close admin panel based on URL hash so there's a stable link
  useEffect(() => {
    const syncWithHash = () => {
      if (window.location.hash === '#admin') {
        if (adminAuthenticated) {
          setShowAdminPanel(true);
        } else {
          setShowPasswordModal(true);
          // clear hash to avoid reopening before auth
          try { history.pushState(null, '', window.location.pathname + window.location.search); } catch {}
        }
      } else {
        setShowAdminPanel(false);
      }
    };
    // initial sync
    syncWithHash();
    window.addEventListener('hashchange', syncWithHash);
    return () => window.removeEventListener('hashchange', syncWithHash);
  }, [adminAuthenticated]);

  const handlePasswordSubmit = () => {
    const CORRECT = 'BrBad@2026';
    if (passwordInput === CORRECT) {
      try { sessionStorage.setItem('isAdminAuth', 'true'); } catch {}
      setAdminAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordInput('');
      setShowAdminPanel(true);
      try { history.pushState(null, '', '#admin'); } catch {}
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <WebsiteContentProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {showAdminPanel ? (
          <AdminPanelPage onNavigateWebsite={toggleAdminPanel} />
        ) : (
          <>
            <AppContent />
            {/* Floating WhatsApp button */}
            <FloatingWhatsApp />
            {/* Password modal for admin access */}
            {showPasswordModal && (
              <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
                  <input
                    type="password"
                    className="form-input w-full mb-4"
                    placeholder="Enter admin password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setShowPasswordModal(false); setPasswordInput(''); }} className="px-4 py-2 rounded border">Cancel</button>
                    <button onClick={handlePasswordSubmit} className="px-4 py-2 rounded bg-black text-white">Enter</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </WebsiteContentProvider>
  );
};

export default App;
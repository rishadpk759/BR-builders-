
import React, { useState } from 'react';
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
      {currentPage === 'home' && <HomePage onPropertyClick={handlePropertyClick} />}
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

  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
  };

  return (
    <WebsiteContentProvider>
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        {showAdminPanel ? (
          <AdminPanelPage onNavigateWebsite={toggleAdminPanel} />
        ) : (
          <>
            <AppContent />
            {/* Admin Panel Toggle Button */}
            <button
              className="fixed bottom-6 left-6 z-[100] bg-blue-600 text-white size-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              onClick={toggleAdminPanel}
              title="Toggle Admin Panel"
            >
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </button>
          </>
        )}
      </div>
    </WebsiteContentProvider>
  );
};

export default App;
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import BuyHomesPage from './pages/BuyHomesPage';
import RentPropertiesPage from './pages/RentPropertiesPage';
import ConstructionPortfolioPage from './pages/ConstructionPortfolioPage';
import ContactPage from './pages/ContactPage'; // New import
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'property' | 'buy' | 'rent' | 'contact' | 'construction'>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  const handleNavigateHome = () => {
    setCurrentPage('home'); // This will now typically lead to the Construction Portfolio
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
    // For now, just scroll to top, or navigate to a dedicated About Us page if it existed
    setCurrentPage('home'); // or create a specific 'about' page
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

  // Refined active navigation logic
  const getActiveNav = () => {
    if (currentPage === 'construction') return 'construction';
    if (currentPage === 'buy' || currentPage === 'property') return 'buy';
    if (currentPage === 'rent') return 'rent';
    if (currentPage === 'contact') return 'contact';
    return 'home'; // Default to home (Construction) if no other is active
  }

  return (
    <>
      <Header
        onNavigateHome={handleNavigateHome} // For the actual homepage
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
      <Footer />
    </>
  );
};

export default App;
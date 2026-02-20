import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedProperties from '../components/FeaturedProperties';
import CommitmentSection from '../components/CommitmentSection';
import ContactDirectInfo from '../components/ContactDirectInfo';
import ContactEnquiryForm from '../components/ContactEnquiryForm';
import { useWebsiteContent } from '../WebsiteContentContext';

interface HomePageProps {
  onPropertyClick: (id: number) => void;
  onNavigateBuy: () => void;
  onNavigateRent: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPropertyClick, onNavigateBuy, onNavigateRent }) => {
  const { content, isLoading, error, properties } = useWebsiteContent();
  const contactSectionContent = content.homePage.contactSection;

  if (isLoading) {
    return <main className="max-w-[1200px] mx-auto py-16 text-center text-xl dark:text-white">Loading website content...</main>;
  }
 
  // When there's an error fetching remote content, show a non-blocking banner
  // and continue rendering with default/local content to keep the site usable.
  const errorBanner = error ? (
    <div className="max-w-[1200px] mx-auto my-6 p-4 rounded-md bg-red-50 text-red-700 text-center">
      Error loading website content — showing fallback content.
    </div>
  ) : null;

  return (
    <main className="max-w-[1200px] mx-auto">
      {errorBanner}
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedProperties onPropertyClick={onPropertyClick} />

      {/* Buy Properties Section */}
      <section className="px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold">{content.buyHomesPage.hero.title}</h2>
            <p className="text-muted-text mt-1">{content.buyHomesPage.hero.description}</p>
          </div>
          <button onClick={onNavigateBuy} className="text-sm font-semibold text-primary">
            View all {content.buyHomesPage.loadMoreButtonText || 'Buy Properties'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.filter(p => p.type === 'buy').slice(0,4).map(p => (
            <div key={p.id}>
              <div onClick={() => onPropertyClick(p.id)}>
                <img src={p.images[0] || ''} alt={p.title} className="w-full h-44 object-cover rounded-lg" />
                <h3 className="mt-2 font-bold">{p.title}</h3>
                <p className="text-sm text-muted-text">{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rent Properties Section */}
      <section className="px-4 py-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-extrabold">{content.rentPropertiesPage.hero.title}</h2>
            <p className="text-muted-text mt-1">{content.rentPropertiesPage.hero.description}</p>
          </div>
          <button onClick={onNavigateRent} className="text-sm font-semibold text-primary">
            View all {content.rentPropertiesPage.loadMoreButtonText || 'Rent Properties'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.filter(p => p.type === 'rent').slice(0,4).map(p => (
            <div key={p.id}>
              <div onClick={() => onPropertyClick(p.id)}>
                <img src={p.images[0] || ''} alt={p.title} className="w-full h-44 object-cover rounded-lg" />
                <h3 className="mt-2 font-bold">{p.title}</h3>
                <p className="text-sm text-muted-text">{p.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CommitmentSection />

      {/* Contact Section on Home Page */}
      <section className="px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-charcoal dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">{contactSectionContent.heading}</h2>
          <p className="text-muted-text dark:text-[#a3b391] text-lg font-normal max-w-2xl mx-auto">{contactSectionContent.subheading}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact & Office Info */}
          <div className="lg:col-span-5 space-y-6">
            <ContactDirectInfo />
          </div>
          {/* Right Column: Enquiry Form */}
          <div className="lg:col-span-7">
            <ContactEnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
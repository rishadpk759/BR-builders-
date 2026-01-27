import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedProperties from '../components/FeaturedProperties';
import CommitmentSection from '../components/CommitmentSection';
import ContactDirectInfo from '../components/ContactDirectInfo'; // New import
import ContactEnquiryForm from '../components/ContactEnquiryForm'; // New import

interface HomePageProps {
  onPropertyClick: (id: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPropertyClick }) => {
  return (
    <main className="max-w-[1200px] mx-auto">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedProperties onPropertyClick={onPropertyClick} />
      <CommitmentSection />

      {/* Contact Section on Home Page */}
      <section className="px-6 py-12">
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
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
}

const HomePage: React.FC<HomePageProps> = ({ onPropertyClick }) => {
  const { content, isLoading, error } = useWebsiteContent();
  const contactSectionContent = content.homePage.contactSection;

  if (isLoading) {
    return <main className="max-w-[1200px] mx-auto py-16 text-center text-xl dark:text-white">Loading website content...</main>;
  }

  if (error) {
    return <main className="max-w-[1200px] mx-auto py-16 text-center text-red-500 text-xl">Error: {error}</main>;
  }

  return (
    <main className="max-w-[1200px] mx-auto">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedProperties onPropertyClick={onPropertyClick} />
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
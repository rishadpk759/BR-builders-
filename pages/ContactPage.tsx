import React from 'react';
import ContactDirectInfo from '../components/ContactDirectInfo';
import ContactEnquiryForm from '../components/ContactEnquiryForm';
import { useWebsiteContent, CommitmentItemData } from '../WebsiteContentContext';

const ContactPage: React.FC = () => {
  const { content } = useWebsiteContent();
  const pageContent = content.contactPage;

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-12">
      {/* Page Heading */}
      <div className="mb-12">
        <h1 className="text-charcoal dark:text-white text-5xl font-black leading-tight tracking-[-0.033em] mb-4">{pageContent.hero.heading}</h1>
        <p className="text-muted-text dark:text-[#a3b391] text-lg font-normal max-w-2xl">{pageContent.hero.subheading}</p>
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
      {/* Map Section */}
      <div className="mt-16 rounded-2xl overflow-hidden shadow-sm border border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="w-full h-[400px] bg-cover bg-center relative" data-alt={pageContent.mapSection.alt} data-location={pageContent.mapSection.locationDisplay} style={{ backgroundImage: pageContent.mapSection.backgroundImage }}>
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <div className="bg-white dark:bg-background-dark p-4 rounded-xl shadow-xl flex items-center gap-3 border border-primary">
              <span className="material-symbols-outlined text-primary text-3xl">{pageContent.mapSection.pinIcon}</span>
              <div>
                <p className="font-bold text-sm">{pageContent.mapSection.pinTitle}</p>
                <p className="text-xs text-muted-text">{pageContent.mapSection.pinSubtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trust & Transparency Section */}
      <div className="mt-20 py-12 border-t border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">{pageContent.trustTransparency.sectionTitle}</h2>
          <p className="text-muted-text dark:text-[#a3b391]">{pageContent.trustTransparency.sectionDescription}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pageContent.trustTransparency.items.map((item: CommitmentItemData) => (
            <div key={item.id} className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#252d1c] rounded-xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-text dark:text-[#a3b391]">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
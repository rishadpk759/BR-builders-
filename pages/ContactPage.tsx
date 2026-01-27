import React from 'react';
import ContactDirectInfo from '../components/ContactDirectInfo'; // New import
import ContactEnquiryForm from '../components/ContactEnquiryForm'; // New import

const ContactPage: React.FC = () => {
  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-6 py-12">
      {/* Page Heading */}
      <div className="mb-12">
        <h1 className="text-charcoal dark:text-white text-5xl font-black leading-tight tracking-[-0.033em] mb-4">Get in Touch</h1>
        <p className="text-muted-text dark:text-[#a3b391] text-lg font-normal max-w-2xl">We're here to help you find your home or build your future. Reach out to our team of experts for personalized guidance.</p>
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
        <div className="w-full h-[400px] bg-cover bg-center relative" data-alt="Map showing Bangalore city area for service location" data-location="Bangalore, India" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfwn0UAuOPAJGwD0OAcHFabPL4Yw7OHduvpJLxMVKBD38HWoDFOBsAqm7NDaXu2thxpb1J-7sjee7Zmz3gRl1m3jyUm4HPUZV6Rolc1I4XzrG5bd5dNwH8stVryYWKW5x9mdS6S_MU2ztA6jKLWfHT8vrgNYBc2gY1CVDD6P4Nzrfp76BIztd5HfHjMlumf5W5dk7xhQwP7DrU4N4bVWlBNpXKLRpjLZ5RUqiITkZqqLbE4JSGMn5RVxjMRipuKqYrZNw5oIegH3c')` }}>
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
            <div className="bg-white dark:bg-background-dark p-4 rounded-xl shadow-xl flex items-center gap-3 border border-primary">
              <span className="material-symbols-outlined text-primary text-3xl">home_pin</span>
              <div>
                <p className="font-bold text-sm">BR Builders HQ</p>
                <p className="text-xs text-muted-text">Bangalore, Central District</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Trust & Transparency Section */}
      <div className="mt-20 py-12 border-t border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Trust &amp; Transparency</h2>
          <p className="text-muted-text dark:text-[#a3b391]">Built on a foundation of integrity and local expertise</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#252d1c] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <h4 className="font-bold mb-2">Direct Communication</h4>
            <p className="text-sm text-muted-text dark:text-[#a3b391]">Deal directly with our developers and sales team. No middlemen, no hidden fees.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#252d1c] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">verified</span>
            </div>
            <h4 className="font-bold mb-2">15+ Years Expertise</h4>
            <p className="text-sm text-muted-text dark:text-[#a3b391]">Proven track record in building high-quality residential and commercial spaces.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-[#252d1c] rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
              <span className="material-symbols-outlined">receipt_long</span>
            </div>
            <h4 className="font-bold mb-2">Clear Documentation</h4>
            <p className="text-sm text-muted-text dark:text-[#a3b391]">Hassle-free paperwork and fully transparent legal processes for every project.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
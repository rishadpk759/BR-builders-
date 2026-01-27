import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="p-4">
      <div className="relative min-h-[580px] rounded-xl overflow-hidden flex flex-col justify-end p-8 md:p-20 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDDNo9HHvrZqYtoLkX9vpXWsnR1L6zFGxDlmZ94uzCGV5wI7itOrWcUXhA90-6DGMrGz_H7VQy8LewAI2vsg6SLN7Hm6iK5Cyg-NcopMhSI_SfT0S_BtBgPidykAB9l1dLh26atXgOjXXIf2ALNCVmUhfCZn8lFZb869CNN-pxPWPMvjTYsQm6kl_YVg8QzaBKjookfmqeHzmhvE-rHOtYseY4TTsb0_JrOvtNkIJcaGMsnb677ZIGuXpTJ0dITXL7vl7QQEMHunqQ')" }}>
        <div className="max-w-3xl space-y-8">
          <h1 className="text-white text-4xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Premium Homes<br />Built &amp; Managed Locally
          </h1>
          <p className="text-white/80 text-lg md:text-xl font-light max-w-xl leading-relaxed">
            Elevating the standard of local living through architectural excellence and meticulous property management.
          </p>
          <div className="flex flex-wrap gap-5 pt-4">
            <button className="bg-primary hover:opacity-90 text-[#141811] text-sm font-bold tracking-widest uppercase h-14 px-10 rounded-lg transition-all">
              Browse Properties
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 text-sm font-bold tracking-widest uppercase h-14 px-10 rounded-lg transition-all flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">chat</span>
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
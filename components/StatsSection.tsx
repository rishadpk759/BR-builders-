import React from 'react';

const StatsSection: React.FC = () => {
  return (
    <section className="px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Experience</p>
          <p className="text-4xl font-black">15+ Years</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">Serving the local community with integrity since 2008.</p>
        </div>
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Portfolio</p>
          <p className="text-4xl font-black">200+ Properties</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">Managed with precision and an owner's mindset.</p>
        </div>
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Craftsmanship</p>
          <p className="text-4xl font-black">50+ Projects</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">High-end builds defined by superior quality and design.</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
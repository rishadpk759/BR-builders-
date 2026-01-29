import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const StatsSection: React.FC = () => {
  const { content } = useWebsiteContent();
  const statsContent = content.homePage.stats;

  return (
    <section className="px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{statsContent.experience.tag}</p>
          <p className="text-4xl font-black">{statsContent.experience.value}</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">{statsContent.experience.description}</p>
        </div>
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{statsContent.portfolio.tag}</p>
          <p className="text-4xl font-black">{statsContent.portfolio.value}</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">{statsContent.portfolio.description}</p>
        </div>
        <div className="flex flex-col gap-3 p-10 bg-white dark:bg-[#1f2916] border border-[#f2f4f0] dark:border-[#2d3a1f] rounded-xl shadow-sm hover:shadow-md transition-all">
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">{statsContent.craftsmanship.tag}</p>
          <p className="text-4xl font-black">{statsContent.craftsmanship.value}</p>
          <p className="text-sm text-[#758961] font-medium leading-relaxed">{statsContent.craftsmanship.description}</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
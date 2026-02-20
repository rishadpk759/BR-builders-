import React from 'react';
import { useWebsiteContent, CommitmentItemData } from '../WebsiteContentContext';

interface CommitmentItemProps {
  item: CommitmentItemData;
}

const CommitmentItem: React.FC<CommitmentItemProps> = ({ item }) => {
  return (
    <div className="text-center space-y-6 group">
      <div className="bg-white dark:bg-[#1f2916] w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-primary transition-colors border border-[#f2f4f0] dark:border-[#2d3a1f]">
        <span className="material-symbols-outlined text-3xl text-primary group-hover:text-[#141811]">{item.icon}</span>
      </div>
      <h4 className="text-lg font-bold uppercase tracking-tight">{item.title}</h4>
      <p className="text-[#758961] font-medium leading-relaxed">{item.description}</p>
    </div>
  );
};

const CommitmentSection: React.FC = () => {
  const { content } = useWebsiteContent();
  const commitmentContent = content.homePage.commitment;

  return (
    <section className="px-4 py-24 bg-primary/10 dark:bg-primary/5 rounded-xl my-12 border border-primary/20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">{commitmentContent.tagline}</p>
        <h2 className="text-4xl font-extrabold tracking-tight mb-6">{commitmentContent.sectionTitle}</h2>
        <p className="text-[#758961] font-medium max-w-xl mx-auto leading-relaxed">{commitmentContent.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
        {commitmentContent.items.map((item) => (
          <div key={item.id} className="transform transition duration-500 hover:scale-105">
            <CommitmentItem item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommitmentSection;
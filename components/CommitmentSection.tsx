import React from 'react';

interface CommitmentItemProps {
  icon: string;
  title: string;
  description: string;
}

const CommitmentItem: React.FC<CommitmentItemProps> = ({ icon, title, description }) => {
  return (
    <div className="text-center space-y-6 group">
      <div className="bg-white dark:bg-[#1f2916] w-20 h-20 rounded-xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-primary transition-colors border border-[#f2f4f0] dark:border-[#2d3a1f]">
        <span className="material-symbols-outlined text-3xl text-primary group-hover:text-[#141811]">{icon}</span>
      </div>
      <h4 className="text-lg font-bold uppercase tracking-tight">{title}</h4>
      <p className="text-[#758961] font-medium leading-relaxed">{description}</p>
    </div>
  );
};

const CommitmentSection: React.FC = () => {
  const commitments = [
    {
      icon: 'home_work',
      title: 'Local Management',
      description: 'Proactive management focused on community value.',
    },
    {
      icon: 'payments',
      title: 'Transparent',
      description: 'Complete financial clarity across every transaction.',
    },
    {
      icon: 'architecture',
      title: 'Quality Builds',
      description: 'Premium materials meet master-level craftsmanship.',
    },
    {
      icon: 'support_agent',
      title: 'Dedicated Support',
      description: 'Personalized attention for every single client.',
    },
  ];

  return (
    <section className="px-4 py-24 bg-primary/10 dark:bg-primary/5 rounded-xl my-12 border border-primary/20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4">Our Commitment</p>
        <h2 className="text-4xl font-extrabold tracking-tight mb-6">Redefining Excellence</h2>
        <p className="text-[#758961] font-medium max-w-xl mx-auto leading-relaxed">We provide a seamless transition between building your dream home and managing it for years to come with unparalleled expertise.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8">
        {commitments.map((item, index) => (
          <CommitmentItem key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default CommitmentSection;
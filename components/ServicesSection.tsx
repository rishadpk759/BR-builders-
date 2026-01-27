import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  tag: string;
  backgroundImage: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, tag, backgroundImage }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-cover bg-center cursor-pointer" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), url('${backgroundImage}')` }}>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-8 left-8">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {tag}
        </p>
        <p className="text-white text-3xl font-bold">{title}</p>
        <p className="text-white/60 text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const services = [
    {
      title: 'Rent',
      description: 'Curated luxury listings',
      tag: 'Available Now',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDWpaB60uZ45GzcSQt0xzgoSpd3I6lsDke3Vqam8AtM1lg7GkadvH6cCIyyvibrBM31wtsojnQlo-GvC5cdtHvfMfdHzszPYD9CS8f2qDmE0rO1IqxJvr7wyw3kZvK2DJss3htO-tyNanTORdglnN4xpftOHmwo61a7-1NMDYdEFqsHR9hN2xTd--MM8k2OeB5GFCwpGAephVeu7XWUxo9Ow-tc8e1SHqGdJt8-J655afImaq-kLObsQhWetepXI2yMc5gU313XJc',
    },
    {
      title: 'Buy',
      description: 'Secure your future home',
      tag: 'Investment',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1DuNF19_WwxWoNyO0Il24_Ou3-DT2uCVveDXuALfoi3q4cCAtdlIpP_K4Qp42zpVeVG1-naZtVKTLAZxPK2yF-CRPS2eNWFlHQXDtJbgaXrDiYcA0lR4Bd2BpBdprpsc2y8ZAvRWh5U85wdrHzJZp3OrWftLcbIpmo5K1glnyIg4UPtbFjvpAfIy8QbVBRhPShAt1zBZU7MUdC4gC9GHwOwMIBd_H46uQwUlkP6TjJ_gOdyMgtt5w4ZYmpt3ZEAAis9ETbnuj2w',
    },
    {
      title: 'Construction',
      description: 'Architectural excellence',
      tag: 'Design & Build',
      backgroundImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkK497LtN7S-bAndkBDpaf-aV0RWPLWFH2BSDLKcGFQqClvDmc4LEJLdWzO2n7dOXwkWVtexGzDsqCwwRIGUYAr_QDGvoxPIdgPIq-upwY0MM_Wci1_C1Djwyu63fkSOWq8jlTqqhVqTMCfX5Ldjr47yL5gCTvv9qBrmV0lNQECZJy_j3JK_uYTl7OZx0gSxjqkd84Suj1A52ca8l6Oavwvy_WWsCyNoh5jTz75LolCOH-oMTQOMmS8KDesoLALB3X2xMVq-jjoTM',
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight">Our Services</h2>
        <div className="h-px flex-grow mx-10 bg-[#f2f4f0] dark:bg-[#2d3a1f]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
import React from 'react';
import { useWebsiteContent, ServiceCardData } from '../WebsiteContentContext';

interface ServiceCardProps {
  service: ServiceCardData; // Use ServiceCardData interface
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group relative overflow-hidden rounded-xl aspect-[4/5] bg-cover bg-center cursor-pointer" style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 50%), url('${service.backgroundImage}')` }}>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute bottom-8 left-8">
        <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          {service.tag}
        </p>
        <p className="text-white text-3xl font-bold">{service.title}</p>
        <p className="text-white/60 text-sm mt-1">{service.description}</p>
      </div>
    </div>
  );
};

const ServicesSection: React.FC = () => {
  const { content } = useWebsiteContent();
  const servicesContent = content.homePage.services;

  return (
    <section className="px-4 py-16">
      <div className="flex items-baseline justify-between mb-12">
        <h2 className="text-4xl font-extrabold tracking-tight">{servicesContent.sectionTitle}</h2>
        <div className="h-px flex-grow mx-10 bg-[#f2f4f0] dark:bg-[#2d3a1f]"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {servicesContent.servicesList.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
import React from 'react';
import { useWebsiteContent, PropertyData } from '../WebsiteContentContext';

interface PropertyCardProps {
  property: PropertyData;
  onClick: (id: number) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onClick,
}) => {
  const imageUrl = property.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'; // Use first image as thumbnail

  return (
    <div
      className="bg-white dark:bg-[#1f2916] rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] group shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
      onClick={() => onClick(property.id)}
    >
      <div className="relative h-72 overflow-hidden rounded-t-xl">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imageUrl} alt={property.title} />
        <span className={`absolute top-6 left-6 ${property.statusBgClass} ${property.statusTextColorClass} text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
          {property.status}
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">{property.title}</h3>
        <p className="text-[#758961] text-xs flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary text-base">location_on</span> {property.location}
        </p>
        <div className="flex items-center justify-between border-t border-[#f2f4f0] dark:border-[#2d3a1f] pt-6">
          <p className="text-[#141811] dark:text-white text-2xl font-black tracking-tight">{property.price}</p>
          <div className="flex gap-4 text-[10px] font-bold text-[#758961] uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">bed</span> {property.beds}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">bathtub</span> {property.baths}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeaturedPropertiesProps {
  onPropertyClick: (id: number) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ onPropertyClick }) => {
  const { content, properties } = useWebsiteContent(); // Use properties from context
  const featuredContent = content.homePage.featuredProperties;
  const featuredPropertiesList = properties.filter(p => p.isFeatured); // Filter from fetched properties

  return (
    <section className="px-4 py-16">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">{featuredContent.tagline}</p>
          <h2 className="text-4xl font-extrabold tracking-tight">{featuredContent.sectionTitle}</h2>
        </div>
        <a href={featuredContent.viewAllButtonLink} className="text-[#141811] dark:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-primary transition-colors group">
          {featuredContent.viewAllButtonText} <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">{featuredContent.viewAllButtonIcon}</span>
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {featuredPropertiesList.map((property) => (
          <div key={property.id} className="transform transition duration-500 hover:scale-105">
            <PropertyCard property={property} onClick={onPropertyClick} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
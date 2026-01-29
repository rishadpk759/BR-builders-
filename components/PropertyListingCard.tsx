import React from 'react';
import { PropertyData } from '../WebsiteContentContext';

interface PropertyListingCardProps {
  property: PropertyData; // Accepts a full PropertyData object
  onPropertyClick: (id: number) => void;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  property,
  onPropertyClick,
}) => {
  const imageUrl = property.images[0] || 'https://via.placeholder.com/400x300?text=No+Image'; // Use first image as thumbnail

  return (
    <div
      className="group flex flex-col gap-3 bg-white dark:bg-background-dark/50 rounded-xl overflow-hidden border border-[#e0e6db] dark:border-[#2a3620] transition-all hover:shadow-xl hover:border-primary/30 cursor-pointer"
      onClick={() => onPropertyClick(property.id)}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <div className="absolute top-3 left-3 z-10">
          <span className={`${property.statusBgClass} ${property.statusTextColorClass} text-[11px] font-black uppercase tracking-wider px-2 py-1 rounded`}>
            {property.status}
          </span>
        </div>
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${imageUrl}")` }}
          data-alt={property.title}
        ></div>
      </div>
      <div className="p-5 pt-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-[#141811] dark:text-white text-xl font-bold leading-tight font-display">{property.title}</h3>
          <div className="text-primary">
            <span className="material-symbols-outlined fill-1">bookmark</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#758961] dark:text-[#a5b694] text-sm mb-4">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          <span>{property.location}</span>
        </div>
        <div className="flex items-center justify-between py-3 border-y border-[#f2f4f0] dark:border-[#2a3620] mb-4">
          <div className="flex flex-col">
            <span className="text-[#758961] dark:text-[#a5b694] text-xs uppercase font-bold tracking-tighter">
              Area Size
            </span>
            <span className="text-[#141811] dark:text-white font-bold">{property.area}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#758961] dark:text-[#a5b694] text-xs uppercase font-bold tracking-tighter">
              Total Price
            </span>
            <span className="text-2xl font-black text-primary">{property.price}</span>
          </div>
        </div>
        {property.beds && ( // Use property.beds instead of bhk
          <div className="flex items-center gap-2 text-[#758961] dark:text-[#a5b694] text-sm mt-2">
            <span className="material-symbols-outlined text-[16px]">bed</span>
            <span>{property.beds} BHK</span>
          </div>
        )}
        <div className="flex flex-col gap-2 mt-4">
          <button className="w-full flex items-center justify-center h-11 rounded-lg bg-primary text-[#141811] font-bold text-sm tracking-wide hover:brightness-105 transition-all">
            Enquire for Details
          </button>
          <button className="w-full flex items-center justify-center h-11 rounded-lg border border-[#e0e6db] dark:border-[#3a4830] text-[#141811] dark:text-white font-bold text-sm tracking-wide hover:bg-[#f2f4f0] dark:hover:bg-[#2a3620] transition-all">
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;
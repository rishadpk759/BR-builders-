import React from 'react';
import PropertyListingCard from '../components/PropertyListingCard';
import FilterButton from '../components/FilterButton';
import { useWebsiteContent } from '../WebsiteContentContext';

interface RentPropertiesPageProps {
  onPropertyClick: (id: number) => void;
}

const RentPropertiesPage: React.FC<RentPropertiesPageProps> = ({ onPropertyClick }) => {
  const { content, properties, isLoading, error } = useWebsiteContent();
  const rentPageContent = content.rentPropertiesPage;
  // Filter properties to show only 'rent' type
  const rentalPropertiesToDisplay = properties.filter(p => p.type === 'rent');

  if (isLoading) {
    return <main className="flex-1 flex flex-col items-center py-16 text-xl dark:text-white">Loading rental properties...</main>;
  }

  if (error) {
    return <main className="flex-1 flex flex-col items-center py-16 text-red-500 text-xl">Error: {error}</main>;
  }

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-[1280px] w-full px-4 md:px-10 lg:px-40 py-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-[#141811] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">
            {rentPageContent.hero.title}
          </p>
          <p className="text-[#758961] dark:text-[#a5b694] text-lg font-normal leading-normal max-w-2xl">
            {rentPageContent.hero.description}
          </p>
        </div>
        {/* Filters Strip */}
        <div className="flex gap-3 pb-6 flex-wrap sticky top-[68px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2">
          {rentPageContent.filters.map(filter => (
            <FilterButton key={filter.id} filter={filter} />
          ))}
        </div>
        {/* Trust Strip */}
        <div className="mb-8">
          <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary text-[#141811]">
                <span className="material-symbols-outlined">{rentPageContent.trustStrip.icon}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[#141811] dark:text-white text-base font-bold leading-tight">
                  {rentPageContent.trustStrip.heading}
                </p>
                <p className="text-[#758961] dark:text-[#a5b694] text-sm font-normal leading-normal">
                  {rentPageContent.trustStrip.description}
                </p>
              </div>
            </div>
            <a className="text-sm font-bold leading-normal tracking-[0.015em] flex items-center gap-2 text-[#141811] dark:text-primary hover:underline" href={rentPageContent.trustStrip.linkUrl}>
              {rentPageContent.trustStrip.linkText}
              <span className="material-symbols-outlined text-[20px]">{rentPageContent.trustStrip.linkIcon}</span>
            </a>
          </div>
        </div>
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalPropertiesToDisplay.map((property) => (
            <PropertyListingCard key={property.id} property={property} onPropertyClick={onPropertyClick} />
          ))}
        </div>
        {/* Load More / Pagination */}
        <div className="flex justify-center mt-12 mb-20">
          <button className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[#e0e6db] dark:border-[#3a4830] font-bold hover:bg-[#f2f4f0] dark:hover:bg-[#2a3620] transition-all">
            <span>{rentPageContent.loadMoreButtonText}</span>
            <span className="material-symbols-outlined">{rentPageContent.loadMoreButtonIcon}</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default RentPropertiesPage;
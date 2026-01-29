import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

interface FilterButtonProps {
  // text: string; // The text is now part of the filter object from context
  // icon?: string; // Icon is also part of the filter object
  // isMoreFilters?: boolean; // This logic is now handled by the 'id' in the filter
  filter: {
    id: string;
    text: string;
    icon?: string;
    isMoreFilters?: boolean; // Optional, only for 'More Filters' button
  };
  onClick?: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, onClick }) => {
  // Use filter.isMoreFilters for conditional rendering, fallback to false if undefined
  if (filter.isMoreFilters) {
    return (
      <button
        className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all ml-auto"
        onClick={onClick}
      >
        {filter.icon && <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>}
        <span className="text-sm font-bold">{filter.text}</span>
      </button>
    );
  }

  return (
    <button
      className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#2a3620] px-4 border border-[#e0e6db] dark:border-[#3a4830] hover:border-primary transition-colors"
      onClick={onClick}
    >
      <span className="text-[#141811] dark:text-white text-sm font-medium">{filter.text}</span>
      {filter.icon && <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>}
    </button>
  );
};

export default FilterButton;
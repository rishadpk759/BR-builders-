import React from 'react';

interface FilterButtonProps {
  text: string;
  icon?: string;
  onClick?: () => void;
  isMoreFilters?: boolean;
}

const FilterButton: React.FC<FilterButtonProps> = ({ text, icon, onClick, isMoreFilters = false }) => {
  if (isMoreFilters) {
    return (
      <button
        className="flex h-10 px-4 items-center justify-center gap-2 rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all ml-auto"
        onClick={onClick}
      >
        {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
        <span className="text-sm font-bold">{text}</span>
      </button>
    );
  }

  return (
    <button
      className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#2a3620] px-4 border border-[#e0e6db] dark:border-[#3a4830] hover:border-primary transition-colors"
      onClick={onClick}
    >
      <span className="text-[#141811] dark:text-white text-sm font-medium">{text}</span>
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
    </button>
  );
};

export default FilterButton;
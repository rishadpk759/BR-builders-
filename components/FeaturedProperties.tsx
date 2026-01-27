import React from 'react';

interface PropertyCardProps {
  id: number;
  imageUrl: string;
  status: string;
  statusBgClass: string;
  statusTextColorClass: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  onClick: (id: number) => void; // Added onClick prop to pass ID
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  imageUrl,
  status,
  statusBgClass,
  statusTextColorClass,
  title,
  location,
  price,
  beds,
  baths,
  onClick,
}) => {
  return (
    <div
      className="bg-white dark:bg-[#1f2916] rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] group shadow-sm hover:shadow-md transition-all duration-500 cursor-pointer"
      onClick={() => onClick(id)}
    >
      <div className="relative h-72 overflow-hidden rounded-t-xl">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={imageUrl} alt={title} />
        <span className={`absolute top-6 left-6 ${statusBgClass} ${statusTextColorClass} text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full`}>
          {status}
        </span>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-[#758961] text-xs flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary text-base">location_on</span> {location}
        </p>
        <div className="flex items-center justify-between border-t border-[#f2f4f0] dark:border-[#2d3a1f] pt-6">
          <p className="text-[#141811] dark:text-white text-2xl font-black tracking-tight">{price}</p>
          <div className="flex gap-4 text-[10px] font-bold text-[#758961] uppercase tracking-widest">
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">bed</span> {beds}</span>
            <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm text-primary">bathtub</span> {baths}</span>
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
  const properties = [
    {
      id: 1, // Added ID
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO4n5Wxp-t81kyH55w-0gnxC9CEDZdsI_mzGFxuRjuQAQl6EfCXJEFFbszPc0Thj6evP9kNl_dREsdtoDY8ZL6wQYmA58uUZckN6WlMEaRUpK3au3_OfulJ5iSKvEIeMTAwkKhLXXxzWeONNQKBmNjkw13HwISIGX2X_uiHubHsYSevRjhYXp1NKd1vQsFzrZ6dUlN6CXQhzNfdhnSqORWnWVQdfc_HiqTqydy5arfDJF-hlSysgjrYCdp2CJTpmch0EH9eWcW2Zg',
      status: 'Available',
      statusBgClass: 'bg-primary',
      statusTextColorClass: 'text-[#141811]',
      title: 'Maplewood Heights',
      location: 'Seattle, WA',
      price: '$450,000',
      beds: 4,
      baths: 3,
    },
    {
      id: 2,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_tX2ph8zKLF66HWDq1Nwjj3n--Pi9MTDDYzGulFXsRtaARAK7EP6Rf_27RvlmU4GktdPow-GGEAmMkR-moDgAy-F_jGJ3oMOrEl7qKLrbECEXbRqxChz9l8IDcD6wncLTmNAGDLPFIwDbL5-p1FVJkq9mvqzsFi3Aryj8HuT1Sas_Sitr0qJEdT5e4YtrWQIExI5F5pzFMD6UUuQDJg-y7HbFTMMWp7JWtupOcZ6euqL2rBKEGPMulsP_wxLUyuLk0pV8lKx3XnY',
      status: 'For Rent',
      statusBgClass: 'bg-[#141811]',
      statusTextColorClass: 'text-white',
      title: 'Downtown Glass Loft',
      location: 'Portland, OR',
      price: '$2,200/mo',
      beds: 2,
      baths: 2,
    },
    {
      id: 3,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_qwf-1I_jvxae63LEOnN0_UceeGgWyfVxeAV1zt0I2eQeXPAFUVonwfAR7ZPmRHDf4OXjLY9lozyV3Juvge4kmfECYaaFyQznQ1H888udv-q2VBfs8y7o3p4GGn4jDnKQTGT1vCW1j1jBjRmeIBOE45rOMb9hxSoLoTFFUQgSo0w_iQdyz1IINeSvgxH-4Y1h9ycNXgAG-geO6EMjK1F8SqsfSz8r5kdBfnRcKKuH47XpLlkdbNV-Pg0tE1FUiSOnnKszcHqdTRk',
      status: 'Under Offer',
      statusBgClass: 'bg-[#f2f4f0]',
      statusTextColorClass: 'text-[#141811]',
      title: 'Oakwood Manor',
      location: 'Bellevue, WA',
      price: '$685,000',
      beds: 5,
      baths: 4,
    },
  ];

  return (
    <section className="px-4 py-16">
      <div className="flex items-end justify-between mb-12">
        <div>
          <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">Portfolio Highlight</p>
          <h2 className="text-4xl font-extrabold tracking-tight">Featured Properties</h2>
        </div>
        <button className="text-[#141811] dark:text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:text-primary transition-colors group">
          View All <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} onClick={onPropertyClick} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
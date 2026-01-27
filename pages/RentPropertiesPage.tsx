import React from 'react';
import PropertyListingCard from '../components/PropertyListingCard';
import FilterButton from '../components/FilterButton';

interface RentPropertiesPageProps {
  onPropertyClick: (id: number) => void;
}

const RentPropertiesPage: React.FC<RentPropertiesPageProps> = ({ onPropertyClick }) => {
  const rentalProperties = [
    {
      id: 201,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO4n5Wxp-t81kyH55w-0gnxC9CEDZdsI_mzGFxuRjuQAQl6EfCXJEFFbszPc0Thj6evP9kNl_dREsdtoDY8ZL6wQYmA58uUZckN6WlMEaRUpK3au3_OfulJ5iSKvEIeMTAwkKhLXXxzWeONNQKBmNjkw13HwISIGX2X_uiHubHsYSevRjhYXp1NKd1vQsFzrZ6dUlN6CXQhzNfdhnSqORWnWVQdfc_HiqTqydy5arfDJF-hlSysgjrYCdp2CJTpmch0EH9eWcW2Zg', // Reusing for consistency, would be unique for rentals
      status: 'Available Now',
      title: 'Luxury 2BHK Apartment',
      location: 'Koramangala, Bangalore',
      areaSize: '1200 sqft',
      totalPrice: '₹35,000/mo',
      bhk: 2,
    },
    {
      id: 202,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_tX2ph8zKLF66HWDq1Nwjj3n--Pi9MTDDYzGulFXsRtaARAK7EP6Rf_27RvlmU4GktdPow-GGEAmMkR-moDgAy-F_jGJ3oMOrEl7qKLrbECEXbRqxChz9l8IDcD6wncLTmNAGDLPFIwDbL5-p1FVJkq9mvqzsFi3Aryj8HuT1Sas_Sitr0qJEdT5e4YtrWQIExI5F5pzFMD6UUuQDJg-y7HbFTMMWp7JWtupOcZ6euqL2rBKEGPMulsP_wxLUyuLk0pV8lKx3XnY', // Reusing for consistency
      status: 'Immediate Occupancy',
      title: 'Spacious 3BHK Villa',
      location: 'Whitefield, Bangalore',
      areaSize: '2500 sqft',
      totalPrice: '₹60,000/mo',
      bhk: 3,
    },
    {
      id: 203,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_qwf-1I_jvxae63LEOnN0_UceeGgWyfVxeAV1zt0I2eQeXPAFUVonwfAR7ZPmRHDf4OXjLY9lozyV3Juvge4kmfECYaaFyQznQ1H888udv-q2VBfs8y7o3p4GGn4jDnKQTGT1vCW1j1jBjRmeIBOE45rOMb9hxSoLoTFFUQgSo0w_iQdyz1IINeSvgxH-4Y1h9ycNXgAG-geO6EMjK1F8SqsfSz8r5kdBfnRcKKuH47XpLlkdbNV-Pg0tE1FUiSOnnKszcHqdTRk', // Reusing for consistency
      status: 'New Listing',
      title: '1BHK Studio Apartment',
      location: 'HSR Layout, Bangalore',
      areaSize: '600 sqft',
      totalPrice: '₹20,000/mo',
      bhk: 1,
    },
    {
      id: 204,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcr6DyKU2ZrsL-0QyvuK8fEoXALgowOJCAwS_xNmFKCOowUcQCnnmZIVaGmEUu-h-azzWwlWYHfChMsz7-T95jS4rhdd0eBHPSzuVdnPrs91CIMZHEVyx7DDr6EuYeZIOT20iN2clAxNvgJ96ZRqSyfGvXtdD_yOoY3NnyiF5WoefZpdEOQMekTiOkDSrXb8ihkRi8qQ3u0WMgr5ByRwWkjIOQSJv6Gr57Q_F2gySncnyiwj70U_I7naKXUtXuULoA82YDJiwzO4', // Reusing for consistency
      status: 'Prime Location',
      title: '4BHK Independent House',
      location: 'Jayanagar, Bangalore',
      areaSize: '3000 sqft',
      totalPrice: '₹80,000/mo',
      bhk: 4,
    },
    {
      id: 205,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3zd0iQdWnBYx53DR3iWchQYdBcdkV9Tz2pdLG2MZDdN_wL1V_YQEDfxoNzuEFKErfIMOnB4b-anUDopyUCoiXNWlNELa5-EdBmctkftJXrxgdX-hyyd7-LMfbBt-KgNb0ZrJukyVKzlsSLjPwFBOf9H0WAyMqkDVH6zfoRXRHoHS9vMl-7HNi0a1bntGy8WPR1Io9SHA2ZeDI2xAhDxZJWdkN7aUexRPprdYZBhzbsnK_I0V1HJ_-tCBuAIkIyKCnReswHv8jb2w', // Reusing for consistency
      status: 'Furnished',
      title: '2BHK Executive Flat',
      location: 'Indiranagar, Bangalore',
      areaSize: '1000 sqft',
      totalPrice: '₹45,000/mo',
      bhk: 2,
    },
    {
      id: 206,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhLSXaJeM1un5tA3PKlo4BgjHjdYqVvubasvROCyVIRsf2YtZ_pMKOPpzMnfvy1dJoYn6Y2UG6bgzpwHmt_IRHn64qMm5Y34SVZuYQj2YJR3Xa7IX3DBvtBfP6RDDsrzbkRJNRa-u3Q-JuxHPXsIQi9sCoxDkuz4YwPfaFC1aU22c2NSprvuwDf229rYrAgCt3-yk1Falu0abpawAq8BYxygOLGp4X1_rR1BX9XARYAlLoqA9JP5-e7xjXUSsfYTseA8bCSh-Ga9o', // Reusing for consistency
      status: 'Pet-Friendly',
      title: '3BHK Duplex Home',
      location: 'Bannerghatta Road, Bangalore',
      areaSize: '1800 sqft',
      totalPrice: '₹55,000/mo',
      bhk: 3,
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-[1280px] w-full px-4 md:px-10 lg:px-40 py-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-[#141811] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">
            Premium Rental Properties
          </p>
          <p className="text-[#758961] dark:text-[#a5b694] text-lg font-normal leading-normal max-w-2xl">
            Explore a diverse selection of homes available for rent, from cozy apartments to spacious villas.
          </p>
        </div>
        {/* Filters Strip */}
        <div className="flex gap-3 pb-6 flex-wrap sticky top-[68px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2">
          <FilterButton text="Location" icon="expand_more" />
          <FilterButton text="Property Type" icon="expand_more" />
          <FilterButton text="Rent Range" icon="expand_more" />
          <FilterButton text="Area Size (sqft)" icon="expand_more" />
          <FilterButton text="Bedrooms" icon="expand_more" />
          <FilterButton text="Furnishing" icon="expand_more" />
          <FilterButton text="More Filters" icon="filter_list" isMoreFilters={true} />
        </div>
        {/* Trust Strip */}
        <div className="mb-8">
          <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-primary text-[#141811]">
                <span className="material-symbols-outlined">verified_user</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-[#141811] dark:text-white text-base font-bold leading-tight">
                  Transparent Listings. Fair Agreements.
                </p>
                <p className="text-[#758961] dark:text-[#a5b694] text-sm font-normal leading-normal">
                  Verified properties with clear rental agreements and tenant support.
                </p>
              </div>
            </div>
            <a className="text-sm font-bold leading-normal tracking-[0.015em] flex items-center gap-2 text-[#141811] dark:text-primary hover:underline" href="#">
              View Rental Policies
              <span className="material-symbols-outlined text-[20px]">arrow_right_alt</span>
            </a>
          </div>
        </div>
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentalProperties.map((property) => (
            <PropertyListingCard key={property.id} {...property} onPropertyClick={onPropertyClick} />
          ))}
        </div>
        {/* Load More / Pagination */}
        <div className="flex justify-center mt-12 mb-20">
          <button className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[#e0e6db] dark:border-[#3a4830] font-bold hover:bg-[#f2f4f0] dark:hover:bg-[#2a3620] transition-all">
            <span>Load More Rentals</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default RentPropertiesPage;
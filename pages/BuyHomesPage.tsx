import React from 'react';
import PropertyListingCard from '../components/PropertyListingCard';
import FilterButton from '../components/FilterButton';

interface BuyHomesPageProps {
  onPropertyClick: (id: number) => void;
}

const BuyHomesPage: React.FC<BuyHomesPageProps> = ({ onPropertyClick }) => {
  const properties = [
    {
      id: 101,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6S4ujbUVhDdEQCzGvrxHPX0QsAh2TRM2rPc90KyHU8o9pzoSBwi2MPuPEuS95aFfW9RaOa_YEZmlrWjx-iZr8uvYZfnI4Rjx9SZFvDXCiLuufCP_q4lB_4jYzt3CllIFTKFUdEdBqX_TaI9lHPC0YlrHlrAGXAZNif18C6sNhIc6MHoy-E08CK7oSgiXl4AHRGaygIezb-5hcKQvFaRc4WzU4A4NaVHzPeS1w8Gbau6KUPyRdKBhwvMN-SPU86GGmBPumcMMldV8',
      status: 'Ready to Sell',
      title: '3 BHK Luxury Apartment',
      location: 'Whitefield, Bangalore',
      areaSize: '1800 sqft',
      totalPrice: '₹85 Lakhs',
    },
    {
      id: 102,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCoRYCX-SQEhXEu1PA5_dvLlC0ZQkRF-djUP9_UvpAu0YihhcHMyELJtETm4sYPyM6rKyyp9hKnOKvpHvCQXHPxuMTCGO8ZB-3xuFgaOa8PWio02wl7A-YBr4gfNRday0G5NY5gIRX5sJM_dMfKw60729AGrZSzspOMQcPBSjRPpchDZPDoIEnx76U4Z_MRLhzuT2qu-Qu8-hWI8zmPlWeZVzgDcMh-6s9_TyXUB0c4ucLzhcIRDViKKTvzZqAjkuc6unzRII-RoFg',
      status: 'Ready to Sell',
      title: '2 BHK Modern Villa',
      location: 'Sarjapur, Bangalore',
      areaSize: '2200 sqft',
      totalPrice: '₹1.2 Crores',
    },
    {
      id: 103,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAfI48Rn34hxHe89GoZ1pAn5rUK6o1t7NDXjNzBkMAex9JZqVZjNaXolLJseGhm-OPToqTEIia6ZLmt07lIHk9eMm_OvcN5ljVruxUUw2rzElTVPEs8hx1fIWY2AKsuq6aEt2R7UsEHxEWOH74M7Zz97u2UZRhO_7Yz-Qk_fpCJIKLdWx06JQd7P0xJEn3jlk-t4mfa5TlaFLU5EoJYjHSp3_XZAgkPN6QMQOSVg7EuSqZSl_GEAZBjtvVs0YJjYu9PFdxNxRRQq4',
      status: 'Ready to Sell',
      title: '4 BHK Penthouse',
      location: 'Indiranagar, Bangalore',
      areaSize: '3500 sqft',
      totalPrice: '₹2.5 Crores',
    },
    {
      id: 104,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbcr6DyKU2ZrsL-0QyvuK8fEoXALgowOJCAwS_xNmFKCOowUcQCnnmZIVaGmEUu-h-azzWwlWYHfChMsz7-T95jS4rhdd0eBHPSzuVdnPrs91CIMZHEVyx7DDr6EuYeZIOT20iN2clAxNvgJ96ZRqSyfGvXtdD_yOoY3NnyiF5WoefZpdEOQMekTiOkDSrXb8ihkRi8qQ3u0WMgr5ByRwWkjIOQSJv6Gr57Q_F2gySncnyiwj70U_I7naKXUtXuULoA82YDJiwzO4',
      status: 'Ready to Sell',
      title: '3 BHK Garden House',
      location: 'Hebbal, Bangalore',
      areaSize: '2000 sqft',
      totalPrice: '₹95 Lakhs',
    },
    {
      id: 105,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3zd0iQdWnBYx53DR3iWchQYdBcdkV9Tz2pdLG2MZDdN_wL1V_YQEDfxoNzuEFKErfIMOnB4b-anUDopyUCoiXNWlNELa5-EdBmctkftJXrxgdX-hyyd7-LMfbBt-KgNb0ZrJukyVKzlsSLjPwFBOf9H0WAyMqkDVH6zfoRXRHoHS9vMl-7HNi0a1bntGy8WPR1Io9SHA2ZeDI2xAhDxZJWdkN7aUexRPprdYZBhzbsnK_I0V1HJ_-tCBuAIkIyKCnReswHv8jb2w',
      status: 'Ready to Sell',
      title: '2 BHK Executive Suite',
      location: 'Electronic City, Bangalore',
      areaSize: '1200 sqft',
      totalPrice: '₹65 Lakhs',
    },
    {
      id: 106,
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhLSXaJeM1un5tA3PKlo4BgjHjdYqVvubasvROCyVIRsf2YtZ_pMKOPpzMnfvy1dJoYn6Y2UG6bgzpwHmt_IRHn64qMm5Y34SVZuYQj2YJR3Xa7IX3DBvtBfP6RDDsrzbkRJNRa-u3Q-JuxHPXsIQi9sCoxDkuz4YwPfaFC1aU22c2NSprvuwDf229rYrAgCt3-yk1Falu0abpawAq8BYxygOLGp4X1_rR1BX9XARYAlLoqA9JP5-e7xjXUSsfYTseA8bCSh-Ga9o',
      status: 'Ready to Sell',
      title: '5 BHK Royal Estate',
      location: 'Koramangala, Bangalore',
      areaSize: '5500 sqft',
      totalPrice: '₹4.8 Crores',
    },
  ];

  return (
    <main className="flex-1 flex flex-col items-center">
      <div className="max-w-[1280px] w-full px-4 md:px-10 lg:px-40 py-8">
        {/* Page Heading */}
        <div className="flex flex-col gap-3 mb-8">
          <p className="text-[#141811] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">
            Ready-to-Occupy Homes for Sale
          </p>
          <p className="text-[#758961] dark:text-[#a5b694] text-lg font-normal leading-normal max-w-2xl">
            Premium properties with direct ownership and verified documentation. Move into your dream home today.
          </p>
        </div>
        {/* Filters Strip */}
        <div className="flex gap-3 pb-6 flex-wrap sticky top-[68px] z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm py-2">
          <FilterButton text="Location" icon="expand_more" />
          <FilterButton text="Property Type" icon="expand_more" />
          <FilterButton text="Budget" icon="expand_more" />
          <FilterButton text="Area Size (sqft)" icon="expand_more" />
          <FilterButton text="Bedrooms" icon="expand_more" />
          <FilterButton text="Parking" icon="expand_more" />
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
                  Direct Ownership. Verified Documentation.
                </p>
                <p className="text-[#758961] dark:text-[#a5b694] text-sm font-normal leading-normal">
                  Trust-backed properties with clear titles and government approvals.
                </p>
              </div>
            </div>
            <a className="text-sm font-bold leading-normal tracking-[0.015em] flex items-center gap-2 text-[#141811] dark:text-primary hover:underline" href="#">
              View Legal Certifications
              <span className="material-symbols-outlined text-[20px]">arrow_right_alt</span>
            </a>
          </div>
        </div>
        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyListingCard key={property.id} {...property} onPropertyClick={onPropertyClick} />
          ))}
        </div>
        {/* Load More / Pagination */}
        <div className="flex justify-center mt-12 mb-20">
          <button className="flex items-center gap-2 px-8 py-3 rounded-lg border border-[#e0e6db] dark:border-[#3a4830] font-bold hover:bg-[#f2f4f0] dark:hover:bg-[#2a3620] transition-all">
            <span>Load More Properties</span>
            <span className="material-symbols-outlined">keyboard_arrow_down</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default BuyHomesPage;
import React, { useEffect, useState } from 'react';

interface PropertyCardProps {
  imageUrl: string;
  location: string;
  title: string;
  price: string;
  bhk: number;
}

const SimilarPropertyCard: React.FC<PropertyCardProps> = ({
  imageUrl,
  location,
  title,
  price,
  bhk,
}) => {
  return (
    <div className="bg-white dark:bg-[#1f2916] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      <div
        className="h-56 bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
        data-alt={title}
      ></div>
      <div className="p-5">
        <p className="text-xs font-bold text-[#758961] mb-1">{location}</p>
        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h4>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f2f4f0] dark:border-[#2d3a1f]">
          <p className="font-bold">
            {price}<span className="text-xs font-normal text-[#758961]">/mo</span>
          </p>
          <span className="text-xs flex items-center gap-1 text-[#758961]">
            <span className="material-symbols-outlined text-sm">bed</span> {bhk} BHK
          </span>
        </div>
      </div>
    </div>
  );
};

interface PropertyDetailPageProps {
  onNavigateHome: () => void;
  propertyId: number; // Added propertyId prop
}

// Dummy data for properties, replace with actual fetch in a real app
const allProperties = [
  {
    id: 1,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBho5dHwHrm51U3tkl0-NRlphOC6F1SLCOyi4ThPmsPBqjdKAn7IDKsLq-g1qGZbgKOKTfuODKGFPcskZG1HRHLRgd-WcpfLRnNYQJQMmzIgENGQnHxIIin2x-sfZbp2hEARCC7hkP0FOBOj2-EPI992m4a0v0hzDXCXyvuVzywzSCRxupa0d8g99V-AsavVhtiShdhE13kKdqhzSsmhmsg1-nUIy5GJF_xFvYIkOZLh3R2JOHAVHl0l48mdqFmSsNAvzJI24xFDno0',
    location: 'Jubilee Hills',
    title: 'Luxury Villa with Pool',
    price: '₹2,50,000',
    bhk: 5,
    area: '3200 sqft',
    furnishing: 'Semi-furnished',
    suitableFor: 'Families',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEDpNBF7B3UO7sTSj3BoTnCU9uhFt7c4gruiH7esNYwe_xdOej-BnAWmHu4y2XcAwl1jvqV5MO93PI89JwnK4p5R32Q_-x6T-67VZki0p7BPMf8sy1VkJ-45pd_9bP-vlCC-e9OEPQUeVFr6MUsQn1qFNG9YdcJ0E-Q0FIvix5qjpId8pOETCh03UGB4cNV5im2X_gjwqKaVhGHLV3NMwmLxq8DsG4YFdIXDJh4EtaiOjw5PedGOxcQdmGp_lO9vvD7yk1K1AoG4',
    galleryImage1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxZ30ATH1or8I_KX_eEFY5LvTni9ENBcwuo_GHkgGft_4lv_eJdY3La14UenLA671FKfP8KXLWYRMeUZ5vt-EliBftCkWrsHHi55wy6WW3vPqd5qGRw0Cvq5fUF1PXIn-9AC0Ui02ow4eOc0gV1iduy1Dp8GXrYmtNrBj1UznUiGNsOo-6bRhYGQyQyDDDRaWUvACADxA70_NP9cOWpBdUP0q5opfY-7kFBp4TLGHENvBof-7F_htmt8kfy9U31ll8kvto-ZV9A0',
    galleryImage2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUQQqPy2L_1n0ta8vCTeWf6VyQD0wRWtJbVWvg4QGzQZuSpBfBW8Rpy_sDFCeJLHL2SdDT59UhoxMJGD4tWCiJcmEcFPIOOdhFowifDn97ta-0A1s3ATGMsD_eUotONNPoDAMSfqmlz_nJa6YKFPo8_sQR-l-HP29PJvu0scVWCwe7Z7xcHMuuKqDZzSRbB8_4PPMtUuxKm_Y9LB2Nv-J4IX-whnOsfFuQEfJ9vVv8A0ApOeXtL6ueZTcuhClQOkiMrXUbcziUXw',
    galleryImage3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSiKWjnobAnRHk5bMGvhKVlRekXPjGQKu-E1WLRWw4XWqdA7CObuBI-uBb8bWEHi1LKWj1pRZwgMxSNVYzNkU5RnI_Ds-F1W7R-uEM5yu07Mjdr7bP04xkSs8bwVbwQg1Mzc5-GzRrF8hXRyGPBPimoCwaQiEcNIyqIPYKxeGHUf0IKMs_dfv2NVIULcVFlQe-bR0MCQjGQrthhMZZTNJ1kO1bMUOE_LqRHxpmAZtcYUoSTZjQttJyWDKLmS28yUU4eA3era0j9cU',
    description: `Experience ultra-modern living in the heart of Jubilee Hills. This architecturally stunning 3BHK villa
                  features an open-concept layout designed to maximize natural light and cross-ventilation. High ceilings,
                  premium Italian marble flooring, and floor-to-ceiling glass panels create a sense of boundless space.
                  The property includes a private landscaped garden, a dedicated home office space, and a state-of-the-art
                  modular kitchen. Situated in a quiet cul-de-sac, you'll enjoy complete privacy while being just minutes away
                  from the city's best cafes and retail hubs.`,
    features: [
      'Private Garden & Deck',
      '2 Dedicated Parking Spots',
      'EV Charging Station Installed',
      'Modular Kitchen with Island',
      '24/7 Gated Security & CCTV',
      'Solar-powered Backup',
    ],
    landmarks: {
      metro: 'Jubilee Hills Metro - 1.2 km (5 min drive)',
      hospital: 'Apollo Hospital - 0.8 km (3 min drive)',
      school: 'International School - 2.1 km (8 min drive)',
    },
    deposit: '3 Months Rent',
    maintenance: '₹5,000 / mo',
    brokerage: 'Zero Fees',
    agentImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFarI0mJFQogP01BuV28wJRdNEqKIu0vufLh5BtjuMQuIUu8Cn5ShQ8M7BIHOkY-Z819Ce1nzVQHvlZZgqRcDxoray_BZeC3loArpCJ1f1sq1zlg32a0O0ZDNQvH3TX9SnHev99m913J1H_a5cq_m79SUxEfwzlvHCioXQnXlFVeUg-IRJmTQuxYzdulGwDEhEvgX3SlHFJhWjJPPgVIMTix23ZWvhlD_Xm5tA3tc88r1JpVyKuBZ8bd6VbBR3xHQHzpWnEVW5Iy0',
    agentName: 'Raghav Sharma',
    agentTitle: 'Senior Relationship Manager',
  },
  {
    id: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBho5dHwHrm51U3tkl0-NRlphOC6F1SLCOyi4ThPmsPBqjdKAn7IDKsLq-g1qGZbgKOKTfuODKGFPcskZG1HRHLRgd-WcpfLRnNYQJQMmzIgENGQnHxIIin2x-sfZbp2hEARCC7hkP0FOBOj2-EPI992m4a0v0hzDXCXyvuVzywzSCRxupa0d8g99V-AsavVhtiShdhE13kKdqhzSsmhmsg1-nUIy5GJF_xFvYIkOZLh3R2JOHAVHl0l48mdqFmSsNAvzJI24xFDno0',
    location: 'Banjara Hills',
    title: 'Modern Apartment',
    price: '₹80,000',
    bhk: 3,
    area: '1500 sqft',
    furnishing: 'Furnished',
    suitableFor: 'Singles/Couples',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEDpNBF7B3UO7sTSj3BoTnCU9uhFt7c4gruiH7esNYwe_xdOej-BnAWmHu4y2XcAwl1jvqV5MO93PI89JwnK4p5R32Q_-x6T-67VZki0p7BPMf8sy1VkJ-45pd_9bP-vlCC-e9OEPQUeVFr6MUsQn1qFNG9YdcJ0E-Q0FIvix5qjpId8pOETCh03UGB4cNV5im2X_gjwqKaVhGHLV3NMwmLxq8DsG4YFdIXDJh4EtaiOjw5PedGOxcQdmGp_lO9vvD7yk1K1AoG4', // Placeholder
    galleryImage1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxZ30ATH1or8I_KX_eEFY5LvTni9ENBcwuo_GHkgGft_4lv_eJdY3La14UenLA671FKfP8KXLWYRMeUZ5vt-EliBftCkWrsHHi55wy6WW3vPqd5qGRw0Cvq5fUF1PXIn-9AC0Ui02ow4eOc0gV1iduy1Dp8GXrYmtNrBj1UznUiGNsOo-6bRhYGQyQyDDDRaWUvACADxA70_NPcOWpBdUP0q5opfY-7kFBp4TLGHENvBof-7F_htmt8kfy9U31ll8kvto-ZV9A0', // Placeholder
    galleryImage2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUQQqPy2L_1n0ta8vCTeWf6VyQD0wRWtJbVWvg4QGzQZuSpBfBW8Rpy_sDFCeJLHL2SdDT59UhoxMJGD4tWCiJcmEcFPIOOdhFowifDn97ta-0A1s3ATGMsD_eUotONNPoDAMSfqmlz_nJa6YKFPo8_sQR-l-HP29PJvu0scVWCwe7Z7xcHMuuKqDZzSRbB8_4PPMtUuxKm_Y9LB2Nv-J4IX-whnOsfFuQEfJ9vVv8A0ApOeXtL6ueZTcuhClQOkiMrXUbcziUXw', // Placeholder
    galleryImage3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSiKWjnobAnRHk5bMGvhKVlRekXPjGQKu-E1WLRWw4XWqdA7CObuBI-uBb8bWEHi1LKWj1pRZwgMxSNVYzNkU5RnI_Ds-F1W7R-uEM5yu07Mjdr7bP04xkSs8bwVbwQg1Mzc5-GzRrF8hXRyGPBPimoCwaQiEcNIyqIPYKxeGHUf0IKMs_dfv2NVIULcVFlQe-bR0MCQjGQrthhMZZTNJ1kO1bMUOE_LqRHxpmAZtcYUoSTZjQttJyWDKLmS28yUU4eA3era0j9cU', // Placeholder
    description: `A modern and elegant apartment in Banjara Hills, perfect for a contemporary lifestyle.
                  It features spacious rooms, a modular kitchen, and access to community amenities.
                  Located in a vibrant neighborhood with easy access to shops, restaurants, and public transport.`,
    features: [
      '24/7 Security',
      'Gym Access',
      'Covered Parking',
      'Balcony',
      'Air Conditioning',
      'Power Backup',
    ],
    landmarks: {
      metro: 'Banjara Hills Metro - 0.5 km (2 min drive)',
      hospital: 'Care Hospital - 1.0 km (4 min drive)',
      school: 'Oakridge International - 3.0 km (10 min drive)',
    },
    deposit: '2 Months Rent',
    maintenance: '₹3,000 / mo',
    brokerage: 'One Month Rent',
    agentImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFarI0mJFQogP01BuV28wJRdNEqKIu0vufLh5BtjuMQuIUu8Cn5ShQ8M7BIHOkY-Z819Ce1nzVQHvlZZgqRcDxoray_BZeC3loArpCJ1f1sq1zlg32a0O0ZDNQvH3TX9SnHev99m913J1H_a5cq_m79SUxEfwzlvHCioXQnXlFVeUg-IRJmTQuxYzdulGwDEhEvgX3SlHFJhWjJPPgVIMTix23ZWvhlD_Xm5tA3tc88r1JpVyKuBZ8bd6VbBR3xHQHzpWnEVW5Iy0',
    agentName: 'Jane Doe',
    agentTitle: 'Property Consultant',
  },
  {
    id: 3,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFKliWwY8kRZjA8uvnZBx10p4lgkrnUHWSfQNHMUIJh8LGz8apWV7ZVuQkFyIbaPi8h3FxiUmlke-ec44NIbYScuu-KAjUYk45s-XizTEmk4QbiB7sfn95inm9n_6LE9kEcKfZUbwNmC4iluhYqgW4Xdl6WU6doE_DqNN9Cjnqw3XnwbBpxcupUXzsLT243_Xtli_PkwetWtKXsPMAbJHdiXYS2GvvVEYiTOqCmHPjqyOSF12-Aq5vRWuQIrBitlW-MsD4V3QvGQs',
    location: 'Gachibowli',
    title: 'Spacious Family Home',
    price: '₹1,20,000',
    bhk: 4,
    area: '2800 sqft',
    furnishing: 'Unfurnished',
    suitableFor: 'Large Families',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEDpNBF7B3UO7sTSj3BoTnCU9uhFt7c4gruiH7esNYwe_xdOej-BnAWmHu4y2XcAwl1jvqV5MO93PI89JwnK4p5R32Q_-x6T-67VZki0p7BPMf8sy1VkJ-45pd_9bP-vlCC-e9OEPQUeVFr6MUsQn1qFNG9YdcJ0E-Q0FIvix5qjpId8pOETCh03UGB4cNV5im2X_gjwqKaVhGHLV3NMwmLxq8DsG4YFdIXDJh4EtaiOjw5PedGOxcQdmGp_lO9vvD7yk1K1AoG4', // Placeholder
    galleryImage1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxZ30ATH1or8I_KX_eEFY5LvTni9ENBcwuo_GHkgGft_4lv_eJdY3La14UenLA671FKfP8KXLWYRMeUZ5vt-EliBftCkWrsHHi55wy6WW3vPqd5qGRw0Cvq5fUF1PXIn-9AC0Ui02ow4eOc0gV1iduy1Dp8GXrYmtNrBj1UznUiGNsOo-6bRhYGQyQyDDDRaWUvACADxA70_NPcOWpBdUP0q5opfY-7kFBp4TLGHENvBof-7F_htmt8kfy9U31ll8kvto-ZV9A0', // Placeholder
    galleryImage2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUQQqPy2L_1n0ta8vCTeWf6VyQD0wRWtJbVWvg4QGzQZuSpBfBW8Rpy_sDFCeJLHL2SdDT59UhoxMJGD4tWCiJcmEcFPIOOdhFowifDn97ta-0A1s3ATGMsD_eUotONNPoDAMSfqmlz_nJa6YKFPo8_sQR-l-HP29PJvu0scVWCwe7Z7xcHMuuKqDZzSRbB8_4PPMtUuxKm_Y9LB2Nv-J4IX-whnOsfFuQEfJ9vVv8A0ApOeXtL6ueZTcuhClQOkiMrXUbcziUXw', // Placeholder
    galleryImage3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSiKWjnobAnRHk5bMGvhKVlRekXPjGQKu-E1WLRWw4XWqdA7CObuBI-uBb8bWEHi1LKWj1pRZwgMxSNVYzNkU5RnI_Ds-F1W7R-uEM5yu07Mjdr7bP04xkSs8bwVbwQg1Mzc5-GzRrF8hXRyGPBPimoCwaQiEcNIyqIPYKxeGHUf0IKMs_dfv2NVIULcVFlQe-bR0MCQjGQrthhMZZTNJ1kO1bMUOE_LqRHxpmAZtcYUoSTZjQttJyWDKLmS28yUU4eA3era0j9cU', // Placeholder
    description: `A large family home in Gachibowli offering ample space and a comfortable living environment.
                  Features multiple bedrooms, a spacious living area, and a private backyard.
                  Close to IT hubs, international schools, and shopping centers.`,
    features: [
      'Large Backyard',
      'Kids Play Area',
      'Community Hall',
      'Guest Parking',
      '24/7 Water Supply',
      'Security Patrols',
    ],
    landmarks: {
      metro: 'Raidurg Metro - 2.5 km (8 min drive)',
      hospital: 'Continental Hospital - 1.5 km (5 min drive)',
      school: 'Chirec International - 4.0 km (12 min drive)',
    },
    deposit: '4 Months Rent',
    maintenance: '₹4,000 / mo',
    brokerage: 'Zero Fees',
    agentImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFarI0mJFQogP01BuV28wJRdNEqKIu0vufLh5BtjuMQuIUu8Cn5ShQ8M7BIHOkY-Z819Ce1nzVQHvlZZgqRcDxoray_BZeC3loArpCJ1f1sq1zlg32a0O0ZDNQvH3TX9SnHev99m913J1H_a5cq_m79SUxEfwzlvHCioXQnXlFVeUg-IRJmTQuxYzdulGwDEhEvgX3SlHFJhWjJPPgVIMTix23ZWvhlD_Xm5tA3tc88r1JpVyKuBZ8bd6VbBR3xHQHzpWnEVW5Iy0',
    agentName: 'David Lee',
    agentTitle: 'Senior Property Advisor',
  },
    {
    id: 101, // From BuyHomesPage
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6S4ujbUVhDdEQCzGvrxHPX0QsAh2TRM2rPc90KyHU8o9pzoSBwi2MPuPEuS95aFfW9RaOa_YEZmlrWjx-iZr8uvYZfnI4Rjx9SZFvDXCiLuufCP_q4lB_4jYzt3CllIFTKFUdEdBqX_TaI9lHPC0YlrHlrAGXAZNif18C6sNhIc6MHoy-E08CK7oSgiXl4AHRGaygIezb-5hcKQvFaRc4WzU4A4NaVHzPeS1w8Gbau6KUPyRdKBhwvMN-SPU86GGmBPumcMMldV8',
    location: 'Whitefield',
    title: '3 BHK Luxury Apartment',
    price: '₹85 Lakhs',
    bhk: 3,
    area: '1800 sqft',
    furnishing: 'Semi-furnished',
    suitableFor: 'Families',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6S4ujbUVhDdEQCzGvrxHPX0QsAh2TRM2rPc90KyHU8o9pzoSBwi2MPuPEuS95aFfW9RaOa_YEZmlrWjx-iZr8uvYZfnI4Rjx9SZFvDXCiLuufCP_q4lB_4jYzt3CllIFTKFUdEdBqX_TaI9lHPC0YlrHlrAGXAZNif18C6sNhIc6MHoy-E08CK7oSgiXl4AHRGaygIezb-5hcKQvFaRc4WzU4A4NaVHzPeS1w8Gbau6KUPyRdKBhwvMN-SPU86GGmBPumcMMldV8',
    galleryImage1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASxZ30ATH1or8I_KX_eEFY5LvTni9ENBcwuo_GHkgGft_4lv_eJdY3La14UenLA671FKfP8KXLWYRMeUZ5vt-EliBftCkWrsHHi55wy6WW3vPqd5qGRw0Cvq5fUF1PXIn-9AC0Ui02ow4eOc0gV1iduy1Dp8GXrYmtNrBj1UznUiGNsOo-6bRhYGQyQyDDDRaWUvACADxA70_NPcOWpBdUP0q5opfY-7kFBp4TLGHENvBof-7F_htmt8kfy9U31ll8kvto-ZV9A0',
    galleryImage2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbUQQqPy2L_1n0ta8vCTeWf6VyQD0wRWtJbVWvg4QGzQZuSpBfBW8Rpy_sDFCeJLHL2SdDT59UhoxMJGD4tWCiJcmEcFPIOOdhFowifDn97ta-0A1s3ATGMsD_eUotONNPoDAMSfqmlz_nJa6YKFPo8_sQR-l-HP29PJvu0scVWCwe7Z7xcHMuuKqDZzSRbB8_4PPMtUuxKm_Y9LB2Nv-J4IX-whnOsfFuQEfJ9vVv8A0ApOeXtL6ueZTcuhClQOkiMrXUbcziUXw',
    galleryImage3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSiKWjnobAnRHk5bMGvhKVlRekXPjGQKu-E1WLRWw4XWqdA7CObuBI-uBb8bWEHi1LKWj1pRZwgMxSNVYzNkU5RnI_Ds-F1W7R-uEM5yu07Mjdr7bP04xkSs8bwVbwQg1Mzc5-GzRrF8hXRyGPBPimoCwaQiEcNIyqIPYKxeGHUf0IKMs_dfv2NVIULcVFlQe-bR0MCQjGQrthhMZZTNJ1kO1bMUOE_LqRHxpmAZtcYUoSTZjQttJyWDKLmS28yUU4eA3era0j9cU',
    description: `Modern 3 BHK luxury apartment with excellent amenities in Whitefield.
                  Perfect for families seeking comfort and convenience near IT parks and international schools.`,
    features: [
      'Gated Community',
      'Swimming Pool',
      'Clubhouse Access',
      'Power Backup',
      '24/7 Security',
      'Modular Kitchen',
    ],
    landmarks: {
      metro: 'Whitefield Metro - 1.0 km (4 min drive)',
      hospital: 'Manipal Hospital - 2.0 km (7 min drive)',
      school: 'DPS Whitefield - 3.5 km (10 min drive)',
    },
    deposit: 'Not Applicable',
    maintenance: '₹4,500 / mo',
    brokerage: 'Zero Fees',
    agentImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFarI0mJFQogP01BuV28wJRdNEqKIu0vufLh5BtjuMQuIUu8Cn5ShQ8M7BIHOkY-Z819Ce1nzVQHvlZZgqRcDxoray_BZeC3loArpCJ1f1sq1zlg32a0O0ZDNQvH3TX9SnHev99m913J1H_a5cq_m79SUxEfwzlvHCioXQnXlFVeUg-IRJmTQuxYzdulGwDEhEvgX3SlHFJhWjJPPgVIMTix23ZWvhlD_Xm5tA3tc88r1JpVyKuBZ8bd6VbBR3xHQHzpWnEVW5Iy0',
    agentName: 'Priya Singh',
    agentTitle: 'Sales Manager',
  },
];


const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ onNavigateHome, propertyId }) => {
  const [property, setProperty] = useState<any | null>(null); // Use a more specific type if available

  useEffect(() => {
    // In a real app, you would fetch property data based on propertyId
    const foundProperty = allProperties.find(p => p.id === propertyId);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      // Handle case where property is not found, e.g., redirect to home or show error
      console.error(`Property with ID ${propertyId} not found.`);
      onNavigateHome(); // Navigate home if property not found
    }
  }, [propertyId, onNavigateHome]);

  if (!property) {
    return (
        <main className="max-w-[1280px] mx-auto px-6 py-4 min-h-[500px] flex items-center justify-center">
            <p className="text-xl font-medium">Loading property details...</p>
        </main>
    );
  }

  const similarProperties = [
    {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAH2hJhH38IF09y6R9lIcxfjZJdMV1pGxvfweIpEufVaoDZUU24AqqESQBQ48CtYFo2W4ijGf4MswN72wx5JT4t-HrYJ9hP81g5EogBhxajkRSOgMLKlOK2KXdOeREZUHZtaKTRA4UbL0VznDbdO0oqg2mY6K0gyX84Mg4gMAZED-X4rOAuG-LrsK1wiAkFX_kmlcdAKfh0YVYcNy8xjh-N-rGt8R3JGSOqtrMjwaIUFLLhUUXzzeP5wSEA-qSSnAFZy0g7vVFSXvY',
      location: 'Banjara Hills',
      title: 'Contemporary Duplex Villa',
      price: '₹1,20,000',
      bhk: 4,
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHPKGthrNeISuZwDwYkrr6iJMY1X1cI1E4xpr-qYzjAU3PQFJwk3_7XZ5IsigmNFMdVI_Vvss_fJ3NQXj64qV5XJg_obvIfaTdrgeDUWQ2ar9qYt8XOjNlZ7sXOeZnfzxJEfrZVgWl8h7wz3cOQY-RjxIjYG-ohiEIz5UZHW_MjWDK2mjsFNvt5AC9GGUi9Cd-8iYBnq04dsxTHhPEP562wV_W34Bhxvq5jPpX8jDgHA_08QjYYWIhhATVNRG2x5UzOPO3ZvPf_AI',
      location: 'Film Nagar',
      title: 'Minimalist Glass House',
      price: '₹95,000',
      bhk: 3,
    },
    {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCFKliWwY8kRZjA8uvnZBx10p4lgkrnUHWSfQNHMUIJh8LGz8apWV7ZVuQkFyIbaPi8h3FxiUmlke-ec44NIbYScuu-KAjUYk45s-XizTEmk4QbiB7sfn95inm9n_6LE9kEcKfZUbwNmC4iluhYqgW4Xdl6WU6doE_DqNN9Cjnqw3XnwbBpxcupUXzsLT243_Xtli_PkwetWtKXsPMAbJHdiXYS2GvvVEYiTOqCmHPjqyOSF12-Aq5vRWuQIrBitlW-MsD4V3QvGQs',
      location: 'Jubilee Hills',
      title: 'Grand Estate Villa',
      price: '₹1,50,000',
      bhk: 5,
    },
  ];


  return (
    <main className="max-w-[1280px] mx-auto px-6 py-4">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 py-4 text-sm font-medium text-[#758961] dark:text-[#a1b38c]">
        <a className="hover:text-primary cursor-pointer" onClick={onNavigateHome}>
          Home
        </a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <a className="hover:text-primary" href="#">
          Villas
        </a>
        <span className="material-symbols-outlined text-xs">chevron_right</span>
        <span className="text-[#141811] dark:text-white">Jubilee Hills</span>
      </div>

      {/* Gallery Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[500px] mb-8">
        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                `url("${property.mainImage}")`,
            }}
            data-alt="Main exterior view of modern villa with glass windows"
          ></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                `url("${property.galleryImage1}")`,
            }}
            data-alt="Interior living room with contemporary furniture"
          ></div>
        </div>
        <div className="md:col-span-1 relative group overflow-hidden rounded-xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                `url("${property.galleryImage2}")`,
            }}
            data-alt="Modern modular kitchen with granite countertops"
          ></div>
        </div>
        <div className="md:col-span-2 relative group overflow-hidden rounded-xl">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage:
                `url("${property.galleryImage3}")`,
            }}
            data-alt="Master bedroom with private balcony access"
          ></div>
          <button className="absolute bottom-6 right-6 flex items-center gap-2 bg-white text-[#141811] px-4 py-2 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined">grid_view</span>
            View All Photos
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Content */}
        <div className="flex-1 space-y-10">
          {/* Quick Summary */}
          <section>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-6 bg-primary rounded-full"></span>
              Quick Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#1f2916] p-4 rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-2">home_work</span>
                <span className="text-xs text-[#758961] dark:text-[#a1b38c] uppercase tracking-wider">Type</span>
                <span className="font-bold">Luxury Villa</span>
              </div>
              <div className="bg-white dark:bg-[#1f2916] p-4 rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-2">square_foot</span>
                <span className="text-xs text-[#758961] dark:text-[#a1b38c] uppercase tracking-wider">Area</span>
                <span className="font-bold">{property.area}</span>
              </div>
              <div className="bg-white dark:bg-[#1f2916] p-4 rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-2">family_restroom</span>
                <span className="text-xs text-[#758961] dark:text-[#a1b38c] uppercase tracking-wider">Suitable For</span>
                <span className="font-bold">{property.suitableFor}</span>
              </div>
              <div className="bg-white dark:bg-[#1f2916] p-4 rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-2">chair</span>
                <span className="text-xs text-[#758961] dark:text-[#a1b38c] uppercase tracking-wider">Furnishing</span>
                <span className="font-bold">{property.furnishing}</span>
              </div>
            </div>
          </section>

          {/* Livable Description */}
          <section>
            <h3 className="text-xl font-bold mb-4">Livable Description</h3>
            <div className="prose dark:prose-invert max-w-none text-[#758961] dark:text-[#a1b38c] leading-relaxed">
              <p>{property.description}</p>
            </div>
          </section>

          {/* Key Features */}
          <section>
            <h3 className="text-xl font-bold mb-6">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {property.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Location Section */}
          <section>
            <h3 className="text-xl font-bold mb-6">Location &amp; Landmarks</h3>
            <div className="rounded-xl overflow-hidden mb-6 h-64 shadow-inner">
              <div
                className="w-full h-full bg-[#e5e7eb] flex items-center justify-center relative"
                data-location={`${property.location}, Hyderabad`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXcw-k8Uz4COQyCSL0mAwm01sraMNyk-Bgon0Me3rrx7TWQOM-dcSwTJUNNLVDLO1UWtgRZNu6wKaYFJkwBz_a-PhzH19HscbIQqG4vREpcDZVG0Mox7Smew54aKsUNSehyy2FrTGi616xQZqggd6Q95KIg5mnhsWX-wq6VeX1hbeYOgaLfDQx-8YDFuFS7l_DAOexYD9_Zl-7WN-cNHk96pE4nnIFqCHS4vkmxPrhofmWZvtZJgdhvu5qeIe-vHzDMMxVFp43rDI')",
                  }}
                  data-alt="Map showing property location in Jubilee Hills"
                ></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary p-2 rounded-full shadow-lg animate-pulse">
                  <span className="material-symbols-outlined text-[#141811]">location_on</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#758961]">directions_subway</span>
                <div>
                  <p className="font-bold text-sm">Jubilee Hills Metro</p>
                  <p className="text-xs text-[#758961]">1.2 km (5 min drive)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#758961]">local_hospital</span>
                <div>
                  <p className="font-bold text-sm">Apollo Hospital</p>
                  <p className="text-xs text-[#758961]">0.8 km (3 min drive)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-[#758961]">school</span>
                <div>
                  <p className="font-bold text-sm">International School</p>
                  <p className="text-xs text-[#758961]">2.1 km (8 min drive)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Transparency Section */}
          <section className="bg-primary/10 dark:bg-primary/5 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Transparency Guarantee
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs uppercase text-[#758961] dark:text-[#a1b38c] font-bold tracking-widest mb-1">
                  Security Deposit
                </p>
                <p className="text-xl font-bold">{property.deposit}</p>
                <p className="text-sm text-[#758961]">Fully refundable</p>
              </div>
              <div>
                <p className="text-xs uppercase text-[#758961] dark:text-[#a1b38c] font-bold tracking-widest mb-1">
                  Maintenance
                </p>
                <p className="text-xl font-bold">{property.maintenance}</p>
                <p className="text-sm text-[#758961]">Society &amp; Utilities</p>
              </div>
              <div>
                <p className="text-xs uppercase text-[#758961] dark:text-[#a1b38c] font-bold tracking-widest mb-1">
                  Brokerage
                </p>
                <p className="text-xl font-bold text-primary">{property.brokerage}</p>
                <p className="text-sm text-[#758961]">Direct listing</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-primary/20 flex items-center gap-2 text-sm text-[#758961] dark:text-[#a1b38c]">
              <span className="material-symbols-outlined text-sm">info</span>
              No hidden charges or unexpected documentation fees.
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Sidebar Card */}
        <aside className="w-full lg:w-[380px]">
          <div className="sticky top-24 space-y-4">
            <div className="bg-white dark:bg-[#1f2916] rounded-xl shadow-xl border border-[#f2f4f0] dark:border-[#2d3a1f] p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-[#141811] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/30">
                      Available
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-[#758961] font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-xs">verified</span> Verified
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold leading-tight">{property.title} - {property.location}</h1>
                  <p className="text-[#758961] dark:text-[#a1b38c] flex items-center gap-1 mt-1">
                    <span className="material-symbols-outlined text-sm">location_on</span> Road No. 36, Jubilee Hills
                  </p>
                </div>
              </div>
              <div className="py-4 border-y border-[#f2f4f0] dark:border-[#2d3a1f] mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{property.price}</span>
                  <span className="text-[#758961] font-medium">/ month</span>
                </div>
                <p className="text-xs text-[#758961] mt-1 italic">+ ₹5,000 monthly maintenance</p>
              </div>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white h-12 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <svg
                    className="size-5 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.025 3.107l-.696 2.54 2.597-.681c.812.479 1.742.735 2.841.735 3.181 0 5.767-2.586 5.767-5.767 0-3.18-2.587-5.766-5.766-5.766zm3.446 8.353c-.145.405-.851.758-1.169.806-.319.048-.727.088-2.314-.528-2.028-.785-3.337-2.852-3.437-2.986-.101-.133-.824-1.096-.824-2.091 0-.995.52-1.484.704-1.685.186-.201.405-.252.54-.252.135 0 .27.001.389.006.121.005.286-.046.448.344.166.4.568 1.385.617 1.485.049.1.081.216.014.35-.067.133-.101.216-.202.333-.101.116-.211.26-.301.348-.101.101-.206.21-.089.41.117.2.52 1.05.748 1.259.297.272.546.211.859.133.313-.078 1.144-.467 1.305-.911.162-.444.162-.826.113-.906-.05-.08-.182-.128-.383-.228z"></path>
                  </svg>
                  WhatsApp Inquiry
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-[#141811] h-12 rounded-lg font-bold hover:opacity-90 transition-opacity">
                  <span className="material-symbols-outlined">call</span>
                  Call Builder Now
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-[#f2f4f0] dark:bg-[#2d3a1f] text-[#141811] dark:text-white h-12 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-[#3d4d2b] transition-colors">
                  <span className="material-symbols-outlined">calendar_today</span>
                  Schedule Tour
                </button>
              </div>
              <div className="mt-6 flex items-center gap-4 p-4 rounded-lg bg-[#f7f8f6] dark:bg-[#141811]/50 border border-[#f2f4f0] dark:border-[#2d3a1f]">
                <div
                  className="size-12 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `url("${property.agentImage}")`,
                  }}
                  data-alt="Real estate agent headshot"
                ></div>
                <div>
                  <p className="text-sm font-bold">{property.agentName}</p>
                  <p className="text-xs text-[#758961]">{property.agentTitle}</p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-[#1f2916] rounded-xl border border-[#f2f4f0] dark:border-[#2d3a1f] p-4 text-center">
              <p className="text-sm font-medium">Interested in this property?</p>
              <p className="text-xs text-[#758961] mt-1">45 people viewed this in the last 24 hours</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Similar Properties Section */}
      <section className="py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h3 className="text-2xl font-bold">Similar Properties</h3>
            <p className="text-[#758961]">Handpicked villas in Jubilee Hills &amp; Banjara Hills</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full border border-[#f2f4f0] dark:border-[#2d3a1f] hover:bg-primary transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="p-2 rounded-full border border-[#f2f4f0] dark:border-[#2d3a1f] hover:bg-primary transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProperties.map((prop, index) => (
            <SimilarPropertyCard key={index} {...prop} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PropertyDetailPage;
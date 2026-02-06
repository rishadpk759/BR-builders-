import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Supabase Client Initialization
// Prefer Vite env (import.meta.env) for client-side builds, fallback to process.env for server-side environments.
const supabaseUrl = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_SUPABASE_URL)
  || process.env.SUPABASE_URL
  || process.env.VITE_SUPABASE_URL
  || '';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env.VITE_SUPABASE_ANON_KEY)
  || process.env.SUPABASE_ANON_KEY
  || process.env.VITE_SUPABASE_ANON_KEY
  || '';

let supabase: SupabaseClient | null = null;
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  console.info('Supabase initialized from env.');
} else {
  console.error(
    'Supabase Error: VITE_SUPABASE_URL and/or VITE_SUPABASE_ANON_KEY are not set. ' +
    'Add them to a .env file at the project root (see project.env/example) and restart the dev server.'
  );
}

// Utility to upload file to Supabase Storage
const uploadFile = async (file: File, bucketName: string, path: string): Promise<string | null> => {
  if (!supabase) {
    console.error('Supabase client not initialized. Cannot upload file.');
    return null;
  }
  const { data, error } = await supabase.storage.from(bucketName).upload(path, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    console.error('Error uploading file:', error);
    return null;
  }

  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(path);
  return publicUrlData.publicUrl;
};

export interface NearbyArea {
  name: string;
  distance: string;
}

// Define the PropertyData interface for individual properties
export interface PropertyData {
  id: number;
  images: string[]; // Array of image URLs. images[0] is thumbnail, images[1] is main, rest are gallery.
  location: string;
  title: string;
  price: string; // e.g., "$450,000" or "₹2,50,000/mo"
  beds: number;
  baths: number;
  area: string; // e.g., "1800 sqft", "3200 sqft"
  furnishing: string; // e.g., "Semi-furnished", "Unfurnished"
  suitableFor: string; // e.g., "Families", "Bachelors"
  status: string; // e.g., "Available", "For Rent", "Ready to Sell", "Under Offer"
  statusBgClass: string; // Tailwind class
  statusTextColorClass: string; // Tailwind class
  type: 'buy' | 'rent'; // To categorize properties for BuyHomesPage/RentPropertiesPage
  isFeatured: boolean; // For HomePage.FeaturedProperties

  // New fields for extended property content
  parking: string; // e.g., "1 car garage", "Street parking available"
  tags: string[]; // e.g., ["New Construction", "Pet Friendly", "Balcony"]
  nearbyAreas: NearbyArea[]; // e.g., [{ name: "Metro Station", distance: "2 km" }]
  amenities: string[]; // e.g., ["Swimming Pool", "Gym", "Power Backup"]

  description: string;
  features: string[]; // List of features
  landmarks: {
    metro: { title: string; description: string; icon: string; };
    hospital: { title: string; description: string; icon: string; };
    school: { title: string; description: string; icon: string; };
  };
  deposit: string; // e.g., "3 Months Rent"
  maintenance: string; // e.g., "₹5,000 / mo"
  brokerage: string; // e.g., "Zero Fees"
  agentImage: string;
  agentName: string;
  agentTitle: string;
  detailLocationAddress: string; // Specific location for detail page sidebar
  detailPriceSuffix: string; // e.g., "/ month"
  detailMaintenanceNote: string; // e.g., "+ ₹5,000 monthly maintenance"
  detailViewsText: string; // e.g., "45 people viewed this..."
}

export interface ConstructionProjectData {
  id: number;
  status: string; // e.g., "Completed"
  title: string;
  location: string;
  imageUrl: string;
  alt: string;
}

export interface FAQItemData {
  id: number;
  question: string;
  answer: string;
}

export interface ServiceCardData {
  id: string; // Unique ID for each service card
  title: string;
  description: string;
  tag: string;
  backgroundImage: string;
}

export interface CommitmentItemData {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NavLinkData {
  id: string;
  label: string;
  page?: 'home' | 'construction' | 'buy' | 'rent' | 'contact' | 'about';
  url?: string; // Optional: external or internal URL. If present, navigation will use this URL instead of page routing.
}

export interface FooterLinkData {
  id: string;
  label: string;
  url: string;
}

export interface SocialLinkData {
  id: string;
  icon: string;
  url: string;
}

// Define a generic interface for array items that have an 'id'
interface ArrayItemWithId {
  id: string | number;
  [key: string]: any; // Allow other properties
}

// Define the comprehensive structure for all configurable website content
// Note: 'properties' and 'constructionPortfolioPage.gallery.projects' are now fetched separately from Supabase tables.
export interface WebsiteContent {
  meta: {
    title: string;
    description: string;
  };
  header: {
    logoText: string;
    logoSvg: string; // New: for custom logo SVG
    logoImageUrl?: string; // Optional uploaded logo image (png/jpg/svg)
    navLinks: NavLinkData[];
    contactWhatsAppButtonText: string;
    contactWhatsAppButtonLink?: string;
    searchPlaceholder: string;
    whatsappChatIcon: string;
  };
  footer: {
    logoText: string;
    logoSvg: string; // New: for custom logo SVG
    logoImageUrl?: string;
    description: string;
    servicesTitle: string;
    servicesLinks: FooterLinkData[];
    companyTitle: string;
    companyLinks: FooterLinkData[];
    newsletterTitle: string;
    newsletterDescription: string;
    newsletterPlaceholder: string;
    newsletterButtonIcon: string;
    copyrightText: string;
    socialLinks: SocialLinkData[];
    whatsappFloatingIconSvg: string;
    whatsappFloatingLink: string;
  };
  homePage: {
    hero: {
      tagline: string;
      title: string;
      description: string;
      primaryButtonText: string;
      primaryButtonLink: string;
      secondaryButtonText: string;
      secondaryButtonIcon: string;
      secondaryButtonLink: string;
      backgroundImage: string;
    };
    stats: {
      experience: { tag: string; value: string; description: string; };
      portfolio: { tag: string; value: string; description: string; };
      craftsmanship: { tag: string; value: string; description: string; };
    };
    services: {
      sectionTitle: string;
      servicesList: ServiceCardData[];
    };
    featuredProperties: {
      tagline: string;
      sectionTitle: string;
      viewAllButtonText: string;
      viewAllButtonIcon: string;
      viewAllButtonLink: string;
    };
    commitment: {
      tagline: string;
      sectionTitle: string;
      description: string;
      items: CommitmentItemData[];
    };
    contactSection: {
      heading: string;
      subheading: string;
      whatsappCard: {
        title: string;
        description: string;
        icon: string;
        buttonText: string;
        buttonIcon: string;
        buttonLink: string;
      };
      callCard: {
        title: string;
        phoneNumber: string;
        description: string;
        icon: string;
        buttonText: string;
        buttonIcon: string;
        buttonLink: string;
      };
      officeInfoCard: {
        title: string;
        icon: string;
        addressLine1: string;
        addressLine2: string;
        addressLine3: string;
        scheduleMonSat: string;
        scheduleHoursMonSat: string;
        scheduleSunday: string;
        scheduleHoursSunday: string;
      };
      enquiryForm: {
        title: string;
        fullNameLabel: string;
        fullNamePlaceholder: string;
        phoneNumberLabel: string;
        phoneNumberPlaceholder: string;
        enquiryTypeLabel: string;
        enquiryTypeOptions: { value: string; label: string }[];
        messageLabel: string;
        messagePlaceholder: string;
        submitButtonText: string;
        submitButtonIcon: string;
      };
    };
  };
  aboutUsPage: {
    hero: {
      tagline: string;
      title: string;
      description: string;
      primaryButtonText: string;
      primaryButtonLink: string;
      secondaryButtonText: string;
      secondaryButtonLink: string;
      backgroundImage: string;
    };
    ourStory: {
      sectionTitle: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
    whatWeDo: {
      sectionTitle: string;
      sectionDescription: string;
      exploreAllServicesButtonText: string;
      exploreAllServicesButtonIcon: string;
      exploreAllServicesButtonLink: string;
      rentCard: { id: string; icon: string; title: string; description: string; };
      buyCard: { id: string; icon: string; title: string; description: string; };
      constructionCard: { id: string; icon: string; title: string; description: string; };
    };
    ourValues: {
      sectionTitle: string;
      items: { id: string; icon: string; title: string; description: string; }[];
      image: string;
      imageAlt: string;
    };
    localCommitment: {
      sectionTitle: string;
      sectionDescription: string;
      mainOfficeIcon: string;
      mainOfficeInfo: string;
      phoneIcon: string;
      phoneInfo: string;
      mapImage: string;
      mapImageAlt: string;
      mapPinTitle: string;
      mapPinSubtitle: string;
      mapPinIcon: string;
    };
    ctaSection: {
      title: string;
      description: string;
      whatsappButtonText: string;
      whatsappButtonIconSvg: string;
      whatsappButtonLink: string;
      bookMeetingButtonText: string;
      bookMeetingButtonLink: string;
    };
  };
  contactPage: {
    hero: {
      heading: string;
      subheading: string;
    };
    mapSection: {
      alt: string;
      locationDisplay: string;
      backgroundImage: string;
      pinTitle: string;
      pinSubtitle: string;
      pinIcon: string;
    };
    trustTransparency: {
      sectionTitle: string;
      sectionDescription: string;
      items: { id: string; icon: string; title: string; description: string; }[];
    };
  };
  buyHomesPage: {
    hero: {
      title: string;
      description: string;
    };
    filters: { id: string; text: string; icon?: string; isMoreFilters?: boolean }[];
    trustStrip: {
      icon: string;
      heading: string;
      description: string;
      linkText: string;
      linkUrl: string;
      linkIcon: string;
    };
    loadMoreButtonText: string;
    loadMoreButtonIcon: string;
  };
  rentPropertiesPage: {
    hero: {
      title: string;
      description: string;
    };
    filters: { id: string; text: string; icon?: string; isMoreFilters?: boolean }[];
    trustStrip: {
      icon: string;
      heading: string;
      description: string;
      linkText: string;
      linkUrl: string;
      linkIcon: string;
    };
    loadMoreButtonText: string;
    loadMoreButtonIcon: string;
  };
  constructionPortfolioPage: {
    hero: {
      backgroundImage: string;
      backgroundImageAlt: string;
      title: string;
      craftsmanshipHighlight: string;
      description: string;
      primaryButtonText: string;
      primaryButtonLink: string;
      secondaryButtonText: string;
      secondaryButtonIcon: string;
      secondaryButtonLink: string;
    };
    whoThisServiceIsFor: {
      sectionTitle: string;
      items: { id: string; icon: string; title: string; description: string; }[];
    };
    constructionApproach: {
      sectionTitle: string;
      sectionDescription: string;
      steps: { id: string; icon: string; title: string; description: string; }[];
    };
    gallery: {
      sectionTitle: string;
      sectionDescription: string;
      viewAllProjectsButtonText: string;
      viewAllProjectsButtonIcon: string;
      viewAllProjectsButtonLink: string;
    };
    faqSection: {
      sectionTitle: string;
      sectionDescription: string;
      faqs: FAQItemData[];
    };
    finalCtaSection: {
      avatar1Image: string;
      avatar1Alt: string;
      avatar2Image: string;
      avatar2Alt: string;
      avatar3Image: string;
      avatar3Alt: string;
      title: string;
      description: string;
      consultationButtonText: string;
      consultationButtonIcon: string;
      consultationButtonLink: string;
      whatsappButtonText: string;
      whatsappButtonIconSvg: string;
      whatsappButtonLink: string;
    };
  };
}

interface WebsiteContentContextType {
  content: WebsiteContent;
  properties: PropertyData[];
  constructionProjects: ConstructionProjectData[];
  isLoading: boolean;
  error: string | null;
  updateGlobalContent: (updatedData: Partial<WebsiteContent>) => Promise<void>; // New: for top-level content
  updateSection: (section: keyof WebsiteContent, key: string, value: any) => Promise<void>;
  updateNestedSection: (section: keyof WebsiteContent, nestedSection: string, key: string, value: any) => Promise<void>;
  updateDeepNestedSection: (section: keyof WebsiteContent, nestedSection1: string, nestedSection2: string, key: string, value: any) => Promise<void>;
  updateArrayItem: (section: keyof WebsiteContent, arrayKey: string, itemId: string | number, itemKey: string, value: any, nestedKey1?: string, nestedKey2?: string) => Promise<void>;
  addProperty: (newProperty: Omit<PropertyData, 'id'>) => Promise<void>;
  updateProperty: (id: number, updatedData: Partial<PropertyData>) => Promise<void>;
  deleteProperty: (id: number) => Promise<void>;
  addConstructionProject: (newProject: Omit<ConstructionProjectData, 'id'>) => Promise<void>;
  updateConstructionProject: (id: number, updatedData: Partial<ConstructionProjectData>) => Promise<void>;
  deleteConstructionProject: (id: number) => Promise<void>;
  uploadImage: (file: File, bucketName: string, filePath: string) => Promise<string | null>;
}

const WebsiteContentContext = createContext<WebsiteContentContextType | undefined>(undefined);

// Default content structure (used for initial insert if DB is empty)
const defaultWebsiteContent: WebsiteContent = {
  meta: {
    title: "BR Builders & Developers - Modern Real Estate",
    description: "A modern real estate platform for premium homes, construction, and property management."
  },
  header: {
    logoText: "BR Builders & Developers",
    logoSvg: `<svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path></svg>`,
    navLinks: [
      { id: 'home', label: "Home", page: "home" },
      { id: 'buy', label: "Buy", page: "buy" },
      { id: 'rent', label: "Rent", page: "rent" },
      { id: 'construction', label: "Construction", page: "construction" },
      { id: 'about', label: "About Us", page: "about" },
      { id: 'contact', label: "Contact", page: "contact" },
    ],
    searchPlaceholder: "Search for properties...",
    contactWhatsAppButtonText: "Contact WhatsApp",
    contactWhatsAppButtonLink: "https://wa.me/919876543210",
    whatsappChatIcon: "chat",
  },
  footer: {
    logoText: "BR Builders & Developers",
    logoSvg: `<svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path></svg>`,
    logoImageUrl: "",
    description: "BR Builders & Developers is a premier real estate firm dedicated to crafting exceptional living and working spaces. With a focus on quality, transparency, and client satisfaction, we build legacies.",
    servicesTitle: "Services",
    servicesLinks: [
      { id: 'buy', label: "Buy Home", url: "#" },
      { id: 'rent', label: "Rent Property", url: "#" },
      { id: 'construction', label: "Custom Construction", url: "#" },
      { id: 'advisory', label: "Property Advisory", url: "#" },
    ],
    companyTitle: "Company",
    companyLinks: [
      { id: 'about', label: "About Us", url: "#" },
      { id: 'careers', label: "Careers", url: "#" },
      { id: 'press', label: "Press", url: "#" },
      { id: 'team', label: "Our Team", url: "#" },
    ],
    newsletterTitle: "Newsletter",
    newsletterDescription: "Stay updated with our latest listings and construction insights.",
    newsletterPlaceholder: "Your email address",
    newsletterButtonIcon: "arrow_forward",
    copyrightText: "© 2024 BR Builders & Developers. All rights reserved.",
    socialLinks: [
      { id: 'facebook', icon: "Facebook", url: "#" },
      { id: 'twitter', icon: "Twitter", url: "#" },
      { id: 'instagram', icon: "Instagram", url: "#" },
      { id: 'linkedin', icon: "LinkedIn", url: "#" },
    ],
    whatsappFloatingIconSvg: `<svg class="size-8 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.503-2.961-2.617-.087-.114-.708-.941-.708-1.792s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.238-.046.373.275.138.332.472 1.154.513 1.241.041.087.068.188.01.303-.058.114-.087.188-.173.289l-.26.3c-.087.101-.18.211-.077.39.103.179.458.753.985 1.223.677.602 1.248.789 1.422.875.173.085.275.071.376-.046.101-.117.433-.505.548-.678.114-.173.231-.144.39-.087s1.011.477 1.184.563c.173.085.289.13.332.202.045.072.045.419-.1.824zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></svg>`,
    whatsappFloatingLink: "https://wa.me/919876543210",
  },
  homePage: {
    hero: {
      tagline: "Your Vision, Our Foundation",
      title: "Your Dream <br /> Home Awaits",
      description: "Discover luxury properties, custom-built residences, and unparalleled real estate services tailored to your aspirations.",
      primaryButtonText: "Explore Listings",
      primaryButtonLink: "#",
      secondaryButtonText: "Chat with an Agent",
      secondaryButtonIcon: "chat",
      secondaryButtonLink: "https://wa.me/919876543210",
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBmTEBq6BuLICusG9hVcaKyrW-_4t1LhifPziZe3AVgQ9JcfkQfBlV0ybpinXl0RAfFxEc7ShtVCATuUKNETAroREfh8Ue1I0wTrER7ep8MTZS5ViE3gj_lxRXpA1kFayA0sp-cBxKCC1IOOpjFUPxkyHMefPllVPyJEoJuqssazIqkvWW8Tbt6cPCZrPZIf2nafp0i5Wo59S3dYVANb6D6Dy1PqK_2Piskh7NhjARjCcUQbEgxX_oTQvCb6zr39iOp5C3XDZ145T8')`,
    },
    stats: {
      experience: { tag: "Years of Experience", value: "15+", description: "Crafting homes and building trust since 2009." },
      portfolio: { tag: "Projects Completed", value: "200+", description: "Residential & commercial spaces delivered on time." },
      craftsmanship: { tag: "Quality Assurance", value: "100%", description: "Commitment to premium materials and superior finish." },
    },
    services: {
      sectionTitle: "Our Core Services",
      servicesList: [
        {
          id: 'rental-management',
          title: "Rental Management",
          description: "Effortless property management and tenant placement.",
          tag: "Rentals",
          backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ4n5Wxp-t81kyH55w-0gnxC9CEDZdsI_mzGFxuRjuQAQl6EfCXJEFFbszPc0Thj6evP9kNl_dREsdtoDY8ZL6wQYmA58uUZckN6WlMEaRUpK3au3_OfulJ5iSKvEIeMTAwkKhLXXxzWeONNQKBmNjkw13HwISIGX2X_uiHubHsYSevRjhYXp1NKd1vQsFzrZ6dUlN6CXQhzNfdhnSqORWnWVQdfc_HiqTqydy5arfDJF-hlSysgjrYCdp2CJTpmch0EH9eWcW2Zg",
        },
        {
          id: 'buy-properties',
          title: "Buy Properties",
          description: "Exclusive listings, simplified buying experience.",
          tag: "Sales",
          backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAfI48Rn34hxHe89GoZ1pAn5rUK6o1t7NDXjNzBkMAex9JZqVZjNaXolLJseGhm-OPToTTEIia6ZLmt07lIHk9eMm_OvcN5ljVruwUUw2rzElTVPEs8hx1fIWY2AKsuq6aEt2R7UsEHxEWOH74M7Zz97u2UZRhO_7Yz-Qk_fpCJIKLdWx06JQd7P0xJEn3jlk-t4mfa5TlaFLU5EoJYjHSp3_XZAgkPN6QMQOSVg7EuSqZSl_GEAZBjtvVs0YJjYu9PFdxNxRRQq4",
        },
        {
          id: 'custom-construction',
          title: "Custom Construction",
          description: "Build your dream home with our expert craftsmanship.",
          tag: "Build",
          backgroundImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAWI0t4Du691d4twU3y_HN6y2Tm1SbwjiXwrf_4PLnDPTxjeKeCX6AUj2n-tn0VHhxtXFMzVXp9k5706TwxcjtMyvHw11tdeZLQLGK9aa68A2gswm_rEQ4xZUVg_dFRTa7JgufPmn1wo-fMzA82qVfERvU9GUbaGWYPzPVRR20glECw0tDO2TLRlzocMmLiL9M3LGZ0q62mBnbD9htg-ycqUuBSo7BEDPke0Uwo3tySg",
        },
      ],
    },
    featuredProperties: {
      tagline: "Featured Listings",
      sectionTitle: "Exclusive Properties",
      viewAllButtonText: "View All Properties",
      viewAllButtonIcon: "arrow_forward",
      viewAllButtonLink: "#",
    },
    commitment: {
      tagline: "Our Promise",
      sectionTitle: "Built on Trust & Transparency",
      description: "At BR Builders & Developers, we are committed to delivering excellence, fostering trust, and maintaining complete transparency in all our dealings.",
      items: [
        { id: 'expert-guidance', icon: "groups", title: "Expert Guidance", description: "Personalized advice from industry veterans." },
        { id: 'premium-materials', icon: "layers", title: "Premium Materials", description: "Only the best for enduring quality." },
        { id: 'on-time-delivery', icon: "schedule", title: "On-Time Delivery", description: "Your project, delivered when promised." },
        { id: 'after-sales-support', icon: "support_agent", title: "After-Sales Support", description: "Dedicated assistance long after handover." },
      ],
    },
    contactSection: {
      heading: "Have Questions? Let's Talk.",
      subheading: "Our team is here to provide clarity and guidance on your real estate and construction needs. Reach out today!",
      whatsappCard: {
        title: "Chat on WhatsApp",
        description: "Our team is available for instant queries. Response time: < 5 mins",
        icon: "chat",
        buttonText: "Message Now",
        buttonIcon: "send",
        buttonLink: "https://wa.me/919876543210",
      },
      callCard: {
        title: "Call Us Direct",
        phoneNumber: "+91 98765 43210",
        description: "Available Mon-Sat, 9:00 AM - 7:00 PM",
        icon: "call",
        buttonText: "Call Now",
        buttonIcon: "phone_in_talk",
        buttonLink: "tel:+919876543210",
      },
      officeInfoCard: {
        title: "Main Office",
        icon: "location_on",
        addressLine1: "123 Skyline Towers, MG Road Area,",
        addressLine2: "Bangalore, Karnataka 560001",
        addressLine3: "India",
        scheduleMonSat: "Monday - Saturday",
        scheduleHoursMonSat: "9 AM - 7 PM",
        scheduleSunday: "Sunday",
        scheduleHoursSunday: "Closed",
      },
      enquiryForm: {
        title: "Send an Enquiry",
        fullNameLabel: "Full Name",
        fullNamePlaceholder: "Your Name",
        phoneNumberLabel: "Phone Number",
        phoneNumberPlaceholder: "+91 00000 00000",
        enquiryTypeLabel: "Enquiry Type",
        enquiryTypeOptions: [
          { value: "buy", label: "I want to Buy" },
          { value: "rent", label: "I want to Rent" },
          { value: "construction", label: "Construction Services" },
          { value: "other", label: "Other Inquiry" },
        ],
        messageLabel: "Message",
        messagePlaceholder: "How can we help you?",
        submitButtonText: "Submit Enquiry",
        submitButtonIcon: "arrow_forward",
      },
    },
  },
  aboutUsPage: {
    hero: {
      tagline: "Established Excellence",
      title: "Building Homes, Earning Trust",
      description: "Local roots, transparent management, and a commitment to your dream space. We don't just build structures; we build relationships.",
      primaryButtonText: "View Our Projects",
      primaryButtonLink: "#",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "#",
      backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBmTEBq6BuLICusG9hVcaKyrW-_4t1LhifPziZe3AVgQ9JcfkQfBlV0ybpinXl0RAfFxEc7ShtVCATuUKNETAroREfh8Ue1I0wTrER7ep8MTZS5ViE3gj_lxRXpA1kFayA0sp-cBxKCC1IOOpjFUPxkyHMefPllVPyJEoJuqssazIqkvWW8Tbt6cPCZrPZIf2nafp0i5Wo59S3dYVANb6D6Dy1PqK_2Piskh7NhjARjCcUQbEgxX_oTQvCb6zr39iOp5C3XDZ145T8")`,
    },
    ourStory: {
      sectionTitle: "Our Story",
      paragraph1: "Founded on the principles of integrity and local expertise, BR Builders & Developers has been a cornerstone of the community for over a decade. What started as a small family project has grown into a premier development firm known for quality and reliability.",
      paragraph2: "We believe in direct communication and a 'no-hidden-fees' policy, ensuring that every client feels confident and informed throughout their journey. Whether they are renting their first apartment, buying their forever home, or building a commercial space from the ground up, we treat every project with the same meticulous attention to detail.",
      paragraph3: "Our management style is rooted in transparency. We provide real-time updates and clear documentation, so you're never in the dark about your investment. It's this commitment to honesty that has earned us the trust of hundreds of local families.",
    },
    whatWeDo: {
      sectionTitle: "What We Do",
      sectionDescription: "Comprehensive real estate and construction solutions tailored to local needs.",
      exploreAllServicesButtonText: "Explore all services",
      exploreAllServicesButtonIcon: "arrow_forward",
      exploreAllServicesButtonLink: "#",
      rentCard: { id: 'rent-card', icon: "key", title: "Rent", description: "Discover quality listings that fit your budget. We manage a diverse portfolio of residential and commercial properties with 24/7 maintenance support." },
      buyCard: { id: 'buy-card', icon: "home", title: "Buy", description: "Your dream home simplified. From property selection to legal documentation, our expert consultants guide you through every step of ownership." },
      constructionCard: { id: 'construction-card', icon: "engineering", title: "Construction", description: "Professional management and craftsmanship. We handle end-to-end construction projects with a focus on sustainable materials and timely delivery." },
    },
    ourValues: {
      sectionTitle: "Our Values & Commitments",
      items: [
        { id: 'direct-comm', icon: "chat", title: "Direct Communication", description: "Speak directly with our site managers and owners. No middlemen, no confusion." },
        { id: 'quality-work', icon: "verified", title: "Quality Workmanship", description: "We use premium materials and certified labor to ensure your home stands the test of time." },
        { id: 'radical-transparency', icon: "visibility", title: "Radical Transparency", description: "Itemized billing and weekly progress reports are standard on all our construction projects." },
      ],
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDVeTke69207QH0VW6QbMwq4cJogQWIfmRax6yKRaI6Tn4RaIqQdsYLS7GOojHWnv57EnhbK76_07ZqMkRllr_SHcib_eYN4Cq6PI0oFCy784_opqeMNku6271mxmsARW1OKUxOE4i9yMBQ1uxjg_AiqaBgyNXzPVRR20glECw0tDO2TLRlzocMmLiL9M3LGZ0q62mBnbD9htg-ycqUuBSo7BEDPke0Uwo3tySg",
      imageAlt: "Team collaborating on architectural plans",
    },
    localCommitment: {
      sectionTitle: "Local Commitment",
      sectionDescription: "We are deeply rooted in our community, serving the greater metropolitan area with dedicated local teams who know every neighborhood's pulse.",
      mainOfficeIcon: "location_on",
      mainOfficeInfo: "Main Office: Downtown District",
      phoneIcon: "phone",
      phoneInfo: "+1 (555) 000-BUILD",
      mapImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6NhOvf0zyuyz_ICjvk8RrrzWFBuDrM8hTwxhPsgBunmbpgumV-5ItWqjDp2sUseUTsxNRT1mSFLl_sCfC36R14NL3gaCVi8ytjefWHGj3hZ6BeN7hz3MSvtYQDqRSjzOcNzyVc768OwTkiUPMYzo95KIg5mnhsWX-wq6VeX1hbeYOgaLfDQx-8YDFuFS7l_DAOexYD9_Zl-7WN-cNHk96pE4nnIFqCHS4vkmxPrhofmWZvtZJgdhvu5qeIe-vHzDMMxVFp43rDI",
      mapImageAlt: "City map graphic",
      mapPinTitle: "BR Builders HQ",
      mapPinSubtitle: "Bangalore, Central District",
      mapPinIcon: "home_pin",
    },
    ctaSection: {
      title: "Let's Build Something Together",
      description: "Whether you're looking for a consultation or have a specific project in mind, our team is ready to help you take the next step.",
      whatsappButtonText: "Chat on WhatsApp",
      whatsappButtonIconSvg: `<svg class="size-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`,
      whatsappButtonLink: "https://wa.me/919876543210",
      bookMeetingButtonText: "Book a Meeting",
      bookMeetingButtonLink: "#",
    },
  },
  contactPage: {
    hero: {
      heading: "Get in Touch",
      subheading: "We're here to help you find your home or build your future. Reach out to our team of experts for personalized guidance.",
    },
    mapSection: {
      alt: "Map showing Bangalore city area for service location",
      locationDisplay: "Bangalore, India",
      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfwn0UAuOPAJGwD0OAcHFabPL4Yw7OHduvpJLxMVKBD38HWoDFOBsAqm7NDaXu2thxpb1J-7sjee7Zmz3gRl1m3jyUm4HPUZV6Rolc1I4XzrG5bd5dNwH8stVryYWKW5x9mdS6S_MU2ztA6jKLWfHT8vrgNYBc2gY1CVDD6P4Nzrfp76BIztd5HfHjMlumf5W5dk3tySg')`,
      pinTitle: "BR Builders HQ",
      pinSubtitle: "Bangalore, Central District",
      pinIcon: "home_pin",
    },
    trustTransparency: {
      sectionTitle: "Trust & Transparency",
      sectionDescription: "Built on a foundation of integrity and local expertise",
      items: [
        { id: 'direct-comm', icon: "groups", title: "Direct Communication", description: "Deal directly with our developers and sales team. No middlemen, no hidden fees." },
        { id: 'expertise', icon: "verified", title: "15+ Years Expertise", description: "Proven track record in building high-quality residential and commercial spaces." },
        { id: 'documentation', icon: "receipt_long", title: "Clear Documentation", description: "Hassle-free paperwork and fully transparent legal processes for every project." },
      ],
    },
  },
  buyHomesPage: {
    hero: {
      title: "Ready-to-Occupy Homes for Sale",
      description: "Premium properties with direct ownership and verified documentation. Move into your dream home today.",
    },
    filters: [
      { id: 'location', text: "Location", icon: "expand_more" },
      { id: 'property-type', text: "Property Type", icon: "expand_more" },
      { id: 'budget', text: "Budget", icon: "expand_more" },
      { id: 'area-size', text: "Area Size (sqft)", icon: "expand_more" },
      { id: 'bedrooms', text: "Bedrooms", icon: "expand_more" },
      { id: 'parking', text: "Parking", icon: "expand_more" },
      { id: 'more-filters', text: "More Filters", icon: "filter_list", isMoreFilters: true },
    ],
    trustStrip: {
      icon: "verified_user",
      heading: "Direct Ownership. Verified Documentation.",
      description: "Trust-backed properties with clear titles and government approvals.",
      linkText: "View Legal Certifications",
      linkUrl: "#",
      linkIcon: "arrow_right_alt",
    },
    loadMoreButtonText: "Load More Properties",
    loadMoreButtonIcon: "keyboard_arrow_down",
  },
  rentPropertiesPage: {
    hero: {
      title: "Premium Rental Properties",
      description: "Explore a diverse selection of homes available for rent, from cozy apartments to spacious villas.",
    },
    filters: [
      { id: 'location', text: "Location", icon: "expand_more" },
      { id: 'property-type', text: "Property Type", icon: "expand_more" },
      { id: 'rent-range', text: "Rent Range", icon: "expand_more" },
      { id: 'area-size', text: "Area Size (sqft)", icon: "expand_more" },
      { id: 'bedrooms', text: "Bedrooms", icon: "expand_more" },
      { id: 'furnishing', text: "Furnishing", icon: "expand_more" },
      { id: 'more-filters', text: "More Filters", icon: "filter_list", isMoreFilters: true },
    ],
    trustStrip: {
      icon: "verified_user",
      heading: "Transparent Listings. Fair Agreements.",
      description: "Verified properties with clear rental agreements and tenant support.",
      linkText: "View Rental Policies",
      linkUrl: "#",
      linkIcon: "arrow_right_alt",
    },
    loadMoreButtonText: "Load More Rentals",
    loadMoreButtonIcon: "keyboard_arrow_down",
  },
  constructionPortfolioPage: {
    hero: {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWI0t4Du691d4twU3y_HN6y2Tm1SbwjiXwrf_4PLnDPTxjeKeCX6AUj2n-tn0VHhxtXFMzVXp9k5706TwxcjtMyvHw11tdeZLQLGK9aa68A2gswm_rEQ4xZUVg_dFRTa7JgufPmn1wo-fMzA82qVfERvU9GUbaGWYPzPVRR20glECw0tDO2TLRlzocMmLiL9M3LGZ0q62mBnbD9htg-ycqUuBSo7BEDPke0Uwo3tySg')`,
      backgroundImageAlt: "Modern luxury villa under construction with scaffolding",
      title: "Your Vision, Our",
      craftsmanshipHighlight: "Craftsmanship",
      description: "Premium custom home building services on your plots. We bring architectural excellence to your doorstep with unmatched transparency.",
      primaryButtonText: "Discuss Your Home Plan",
      primaryButtonLink: "#",
      secondaryButtonText: "Chat on WhatsApp",
      secondaryButtonIcon: "forum",
      secondaryButtonLink: "https://wa.me/919876543210",
    },
    whoThisServiceIsFor: {
      sectionTitle: "Who This Service Is For",
      items: [
        { id: 'plot-owners', icon: "landscape", title: "Plot Owners", description: "Individuals who already own land and want a reliable partner to transform their property into a dream home." },
        { id: 'custom-home-seekers', icon: "architecture", title: "Custom Home Seekers", description: "Those looking for a bespoke architectural design tailored specifically to their lifestyle and family needs." },
        { id: 'luxury-villa-investors', icon: "apartment", title: "Luxury Villa Investors", description: "Investors seeking high-quality construction and premium finishes for maximum appreciation and rental yield." },
      ],
    },
    constructionApproach: {
      sectionTitle: "Our Construction Approach",
      sectionDescription: "A systematic, 5-step journey from your first call to the day you move in.",
      steps: [
        { id: 'discussion', icon: "groups", title: "Discussion", description: "Initial consultation to understand your vision and budget." },
        { id: 'planning', icon: "draw", title: "Planning", description: "Architectural blueprints and regulatory approvals." },
        { id: 'materials', icon: "layers", title: "Materials", description: "Selection of premium raw materials and high-end finishes." },
        { id: 'supervision', icon: "engineering", title: "Supervision", description: "Rigorous on-site quality control and daily reporting." },
        { id: 'handover', icon: "vpn_key", title: "Handover", description: "Final inspection and key ceremony for your new home." },
      ],
    },
    gallery: {
      sectionTitle: "Gallery of Past Work",
      sectionDescription: "Explore our recently completed residential projects across the city.",
      viewAllProjectsButtonText: "View All Projects",
      viewAllProjectsButtonIcon: "arrow_forward",
      viewAllProjectsButtonLink: "#",
    },
    faqSection: {
      sectionTitle: "Frequently Asked Questions",
      sectionDescription: "Clear answers to your most pressing construction concerns.",
      faqs: [
        { id: 1, question: "Do I need to own land before starting?", answer: "Yes, our primary service focuses on building high-quality custom homes on client-owned plots. However, we can assist with plot selection and soil testing during the pre-construction phase." },
        { id: 2, question: "How is pricing transparency maintained?", answer: "We provide a detailed bill of quantities (BOQ) with fixed prices for materials and labor. Any deviations or upgrades are documented and approved by you beforehand, ensuring no hidden costs at handover." },
        { id: 3, question: "Do you handle building permits and local approvals?", answer: "Absolutely. Our team takes care of all regulatory documentation, from initial plan approvals to occupancy certificates (OC) and utility connections." },
      ],
    },
    finalCtaSection: {
      avatar1Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ZWe7-7x4IaROTG3cfNMMw_hzjOgCu9y9X7cBhhqQlYxp0dNjhiSTyrp0jkIB7YBduCoXUEqljhHQjK8PINlzWwbqqjPC-14mZmxHG2w39AfSzomqQGYSayMCMRXsZ0uB8fdeC_6YMtC8ZXGgymurHDGkiJ9p-cB21yHjNVuAZK96QyrOGm4_5QkJLnIK4NKRKmGaKT6d9hJbYbNnPIj4R1TSxzLQ2l6HjZtwesnCPWoT30flKFOWbHsgLX_YCMVKvNXDKOjIUX0",
      avatar1Alt: "Project manager profile photo",
      avatar2Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBU6kXsWIc14lRsUhnd-vZClRx_xTtLLWaAO1JTDI66NZwnXVh2RwYAXV6ZD7r7Y6lQXNFmKDNbs-lNAhGvncdRfombBWeYVww1_BQ8FfFrUnLihAzGv-KwT1ADpMPao7bxyr6JF2G0uE7hMJGxwnSusjT6AwLigErdlAiAQ8o27qB3DGm6jByVvRsRSBSyHZ4y7qVsFjptDm2AyfJFtIwf7iN-xoazGZM5pkevYMFSzr6dKcGVpp76yrG4tXKlyYHzMq1jWIsYqnpI",
      avatar2Alt: "Client service representative",
      avatar3Image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjH56yvwEOw-ISgs6THm_dcewpvIhm_AGcb1MKGpo1abzyRKvebIQ0if_TvuXERPAAgOUXweX0-QOFhvfwyQ1YZT_IxN_btkqEtofT2Ns5rfI8yfJC92TWrOdtAeAiweDvizssqtU0Wx5YBkXgBz6UkJqKJhQLg0_K4sI32_0SYkVn1Ks_do7iWuQAVjuuFFdwILw-oFCy784_opqeMNku6271mxmsARW1OKUxOE4i9yMBQ1uxjg_AiqaBgyNXzPVRR20glECw0tDO2TLRlzocMmLiL9M3LGZ0q62mBnbD9htg-ycqUuBSo7BEDPke0Uwo3tySg",
      avatar3Alt: "Architect profile photo",
      title: "Ready to Build Your Dream Home?",
      description: "Our experts are ready to guide you through every brick and tile. Join 200+ happy families who built their legacy with us.",
      consultationButtonText: "Book Free Consultation",
      consultationButtonIcon: "calendar_today",
      consultationButtonLink: "#",
      whatsappButtonText: "Chat on WhatsApp",
      whatsappButtonIconSvg: `<svg class="size-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>`,
      whatsappButtonLink: "https://wa.me/919876543210",
    },
  },
};

export const WebsiteContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<WebsiteContent>(defaultWebsiteContent);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [constructionProjects, setConstructionProjects] = useState<ConstructionProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial content from Supabase
  const fetchContent = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    if (!supabase) {
      // Supabase not configured — keep using local default content and avoid showing raw errors to users
      console.warn('Supabase client not initialized. Using local fallback content.');
      setError('Remote content unavailable — using local fallback content.');
      setContent(defaultWebsiteContent);
      setProperties([]);
      setConstructionProjects([]);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch global content (single row)
      const { data: globalContentData, error: globalContentError } = await supabase
        .from('website_content_single')
        .select('content')
        .single();

      if (globalContentError && globalContentError.code !== 'PGRST116') { // PGRST116 means no rows found
        throw globalContentError;
      }

      if (globalContentData) {
        setContent(globalContentData.content);
      } else {
        // If no content exists, insert default content
        const { data: insertedData, error: insertError } = await supabase
          .from('website_content_single')
          .insert({ content: defaultWebsiteContent })
          .select('content')
          .single();

        if (insertError) throw insertError;
        if (insertedData) setContent(insertedData.content);
      }

      // Fetch properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('id, data');

      if (propertiesError) throw propertiesError;

      // --- Migration Logic for PropertyData ---
      const mappedProperties: PropertyData[] = propertiesData ? propertiesData.map(row => {
        const rawData = row.data as any;
        let images: string[] = [];

        // Check for old image structure and convert to new 'images' array
        if (rawData.images && Array.isArray(rawData.images)) {
            images = rawData.images;
        } else {
            // Fallback to old fields if new 'images' array is not present
            if (rawData.imageUrl) images.push(rawData.imageUrl);
            if (rawData.mainImage) images.push(rawData.mainImage);
            if (rawData.galleryImage1) images.push(rawData.galleryImage1);
            if (rawData.galleryImage2) images.push(rawData.galleryImage2);
            if (rawData.galleryImage3) images.push(rawData.galleryImage3);
        }

        // Default empty arrays for new fields if not present
        const tags = rawData.tags || [];
        const nearbyAreas = rawData.nearbyAreas || [];
        const amenities = rawData.amenities || [];
        const parking = rawData.parking || '';

        return {
          ...rawData,
          id: row.id,
          images,
          tags,
          nearbyAreas,
          amenities,
          parking,
          // Ensure old fields are explicitly excluded if they exist but images array is preferred
          // This is primarily for type safety, the DB will just store the new 'data' JSONB.
          imageUrl: undefined,
          mainImage: undefined,
          galleryImage1: undefined,
          galleryImage2: undefined,
          galleryImage3: undefined,
        } as PropertyData; // Cast to PropertyData to satisfy interface
      }) : [];
      setProperties(mappedProperties);

      // Fetch construction projects
      const { data: projectsData, error: projectsError } = await supabase
        .from('construction_projects')
        .select('id, data');

      if (projectsError) throw projectsError;
      setConstructionProjects(projectsData ? projectsData.map(row => ({ ...row.data, id: row.id })) : []);
      // Clear any previous error now that fetching succeeded
      setError(null);

    } catch (err: any) {
      // Log full error for debugging, but expose a friendly message to the UI.
      console.error('Error fetching content from Supabase:', err);
      setError('Unable to load remote content — showing fallback content.');
      // Ensure the app remains usable with local defaults
      setContent(defaultWebsiteContent);
      setProperties([]);
      setConstructionProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  // For `metadata.json` updates
  useEffect(() => {
    document.title = content.meta.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', content.meta.description);
    }
  }, [content.meta.title, content.meta.description]);

  // Generic function to update the single global content row in Supabase
  const updateGlobalContentInDB = useCallback(async (updatedContent: WebsiteContent) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot update global content.');
      setContent(updatedContent); // Update local state anyway for dev experience
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }

    const { data: currentIdData, error: fetchIdError } = await supabase
      .from('website_content_single')
      .select('id')
      .single();

    if (fetchIdError || !currentIdData) { // Added !currentIdData check
        console.error('Error fetching global content ID for update:', fetchIdError?.message || 'Global content ID not found for update.');
        setError(fetchIdError?.message || 'Global content ID not found.');
        return;
    }

    // Use a stored procedure to update the single-row content to avoid REST field-mapping issues.
    try {
      const { error: rpcError } = await supabase.rpc('update_website_content', { new_content: updatedContent });
      if (rpcError) {
        console.error('Error updating global content via RPC:', rpcError.message);
        setError(rpcError.message);
        return;
      }
      setContent(updatedContent);
      setError(null);
    } catch (e: any) {
      console.error('Unexpected error updating global content via RPC:', e);
      setError(String(e));
    }
  }, [content]); // Added content to dependencies to ensure latest state is used.

  // Update for top-level sections (e.g., meta, header, footer)
  const updateSection = useCallback(async (section: keyof WebsiteContent, key: string, value: any) => {
    const updatedContent = {
      ...content,
      [section]: {
        ...content[section],
        [key]: value,
      },
    };
    await updateGlobalContentInDB(updatedContent);
  }, [content, updateGlobalContentInDB]);

  // Update for two-level nested sections (e.g., homePage.hero.title)
  const updateNestedSection = useCallback(async (section: keyof WebsiteContent, nestedSection: string, key: string, value: any) => {
    const updatedContent = {
      ...content,
      [section]: {
        ...content[section as keyof WebsiteContent],
        [nestedSection]: {
          ...(content[section as keyof WebsiteContent] ? (content[section as keyof WebsiteContent] as any)[nestedSection] : {}),
          [key]: value,
        },
      },
    };
    await updateGlobalContentInDB(updatedContent);
  }, [content, updateGlobalContentInDB]);

  // Update for three-level nested sections (e.g., homePage.stats.experience.value)
  const updateDeepNestedSection = useCallback(async (
    section: keyof WebsiteContent,
    nestedSection1: string,
    nestedSection2: string,
    key: string,
    value: any,
  ) => {
    const updatedContent = {
      ...content,
      [section]: {
        ...content[section as keyof WebsiteContent],
        [nestedSection1]: {
          ...(content[section as keyof WebsiteContent]?.[nestedSection1 as keyof WebsiteContent[typeof section]] || {}),
          [nestedSection2]: {
            ...((content[section as keyof WebsiteContent]?.[nestedSection1 as keyof WebsiteContent[typeof section]] as any)?.[nestedSection2] || {}),
            [key]: value,
          },
        },
      },
    };
    await updateGlobalContentInDB(updatedContent);
  }, [content, updateGlobalContentInDB]);


  // Update for an item within an array in a section (used for navLinks, serviceList, commitment.items etc.)
  const updateArrayItem = useCallback(async (
    section: keyof WebsiteContent,
    arrayKey: string, // The key of the array in the section (e.g., 'navLinks', 'servicesList')
    itemId: string | number, // The 'id' property of the item to update
    itemKey: string, // The direct property of the item to update (e.g., 'label', 'title')
    value: any,
    nestedKey1?: string, // Optional: for nested properties within array item (e.g., 'landmarks')
    nestedKey2?: string, // Optional: for deeply nested properties (e.g., 'metro')
  ) => {
    const sectionContent = content[section as keyof WebsiteContent];
    if (!sectionContent) return;

    // The rawArrayToUpdate might be primitive if arrayKey leads to one, so cast to any first
    const rawArrayToUpdate = (sectionContent as any)[arrayKey];
    if (!Array.isArray(rawArrayToUpdate)) {
      console.warn(`Attempted to update a non-array at path: ${String(section)}.${arrayKey}`);
      return;
    }

    // Now that rawArrayToUpdate is confirmed an array, its elements should be objects.
    // Cast item to ArrayItemWithId to ensure it's treated as an object for spread operations.
    const arrayToUpdate: ArrayItemWithId[] = rawArrayToUpdate;

    const updatedArray = arrayToUpdate.map((item: ArrayItemWithId) => {
      if (item.id === itemId) {
        if (nestedKey1 && nestedKey2) {
          // Safeguard against item[itemKey] being non-object
          const currentItemKeyContainer = (item[itemKey] && typeof item[itemKey] === 'object') ? item[itemKey] : {};
          // Safeguard against item[itemKey][nestedKey1] being non-object
          const currentNested1Container = (currentItemKeyContainer[nestedKey1] && typeof currentItemKeyContainer[nestedKey1] === 'object') ? currentItemKeyContainer[nestedKey1] : {};

          return {
            ...item,
            [itemKey]: {
              ...currentItemKeyContainer,
              [nestedKey1]: {
                ...currentNested1Container,
                [nestedKey2]: value,
              },
            },
          };
        } else if (nestedKey1) {
          // Safeguard against item[itemKey] being non-object
          const currentItemKeyContainer = (item[itemKey] && typeof item[itemKey] === 'object') ? item[itemKey] : {};
          return {
            ...item,
            [itemKey]: {
              ...currentItemKeyContainer,
              [nestedKey1]: value,
            },
          };
        }
        return { ...item, [itemKey]: value };
      }
      return item;
    });

    const updatedContent = {
      ...content,
      [section]: {
        ...sectionContent,
        [arrayKey]: updatedArray,
      },
    };
    await updateGlobalContentInDB(updatedContent);
  }, [content, updateGlobalContentInDB]);

  // Update an object entirely within an array (like the whatWeDo cards)
  // This function is currently not used and has complex type inference challenges.
  // The functionality for updating nested objects within arrays/sections is covered by
  // updateDeepNestedSection and renderArrayEditor's internal update logic.
  /*
  const updateObjectInArray = useCallback(async <T extends { id: string | number }>(
    section: keyof WebsiteContent,
    arrayPath: string, // e.g., 'homePage.servicesList' or 'aboutUsPage.whatWeDo.rentCard'
    itemId: string | number,
    updatedObject: Partial<T>,
  ) => {
    let currentContent: any = { ...content };
    let target: any = currentContent;
    const pathParts = arrayPath.split('.');

    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i];
      if (Array.isArray(target[part])) {
        if (i === pathParts.length - 1) { // This part is the array itself
          target[part] = target[part].map((item: T) =>
            item.id === itemId ? { ...item, ...updatedObject } : item
          );
        } else { // It's an array somewhere in the middle, should not happen for our schema
          console.error("Attempted to navigate array mid-path, not supported directly.");
          return;
        }
      } else {
        if (!target[part]) {
          console.error(`Path part '${part}' not found in content for updateObjectInArray`);
          return;
        }
        target = target[part];
      }
    }

    if (!Array.isArray(target)) { // Handles single object updates (like whatWeDo.rentCard)
      const parentPath = pathParts.slice(0, pathParts.length -1).join('.');
      const lastPart = pathParts[pathParts.length - 1];
      const parentTarget = pathParts.slice(0, pathParts.length - 1).reduce((acc, p) => acc[p], currentContent);
      if (parentTarget && parentTarget[lastPart] && parentTarget[lastPart].id === itemId) {
        parentTarget[lastPart] = { ...parentTarget[lastPart], ...updatedObject };
      } else {
         console.error(`Attempted to update a non-array item with updateObjectInArray. Check path: ${arrayPath}`);
         return;
      }
    }

    await updateGlobalContentInDB(currentContent);
  }, [content, updateGlobalContentInDB]);
  */

  // Supabase CRUD for Properties
  const addProperty = useCallback(async (newProperty: Omit<PropertyData, 'id'>) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot add property.');
      setProperties(prev => [...prev, { ...newProperty, id: Date.now() }]); // Add with temp ID
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    const { data, error } = await supabase.from('properties').insert({ data: newProperty }).select('id, data').single();
    if (error) {
      console.error('Error adding property:', error.message);
      setError(error.message);
    } else if (data) {
      setProperties(prev => [...prev, { ...data.data, id: data.id }]);
      setError(null);
    }
  }, []);

  const updateProperty = useCallback(async (id: number, updatedData: Partial<PropertyData>) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot update property.');
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    // Fetch current data to merge
    const { data: fetchedPropertyRecord, error: fetchError } = await supabase
      .from('properties')
      .select('data')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching property for update:', fetchError.message);
      setError(fetchError.message);
      return;
    }

    if (!fetchedPropertyRecord || !fetchedPropertyRecord.data) {
        console.error('Error: Property not found for update with ID:', id);
        setError('Property not found.');
        return;
    }

    // Explicitly merge the existing data with updatedData to ensure new fields are included and old ones are removed
    // This is part of the migration strategy to consolidate old image fields into the new 'images' array
    const existingPropertyData = fetchedPropertyRecord.data as any; // Cast to any to access old fields
    let mergedImages: string[] = updatedData.images || existingPropertyData.images || [];

    // If existing images array is empty, and old fields exist, populate it
    if (mergedImages.length === 0) {
      if (existingPropertyData.imageUrl) mergedImages.push(existingPropertyData.imageUrl);
      if (existingPropertyData.mainImage && !mergedImages.includes(existingPropertyData.mainImage)) mergedImages.push(existingPropertyData.mainImage);
      if (existingPropertyData.galleryImage1 && !mergedImages.includes(existingPropertyData.galleryImage1)) mergedImages.push(existingPropertyData.galleryImage1);
      if (existingPropertyData.galleryImage2 && !mergedImages.includes(existingPropertyData.galleryImage2)) mergedImages.push(existingPropertyData.galleryImage2);
      if (existingPropertyData.galleryImage3 && !mergedImages.includes(existingPropertyData.galleryImage3)) mergedImages.push(existingPropertyData.galleryImage3);
    }


    const mergedData: PropertyData = {
      ...existingPropertyData,
      ...updatedData,
      images: mergedImages.filter(Boolean), // Ensure no null/undefined in images array
      tags: updatedData.tags || existingPropertyData.tags || [],
      nearbyAreas: updatedData.nearbyAreas || existingPropertyData.nearbyAreas || [],
      amenities: updatedData.amenities || existingPropertyData.amenities || [],
      parking: updatedData.parking || existingPropertyData.parking || '',
      // Explicitly remove old image fields from the saved data to clean up the DB schema
      imageUrl: undefined,
      mainImage: undefined,
      galleryImage1: undefined,
      galleryImage2: undefined,
      galleryImage3: undefined,
    } as PropertyData; // Cast to PropertyData

    const { error } = await supabase
      .from('properties')
      .update({ data: mergedData })
      .eq('id', id);

    if (error) {
      console.error('Error updating property:', error.message);
      setError(error.message);
    } else {
      setProperties(prev => prev.map(p => p.id === id ? { ...p, ...updatedData, images: mergedData.images } : p));
      setError(null);
    }
  }, []);

  const deleteProperty = useCallback(async (id: number) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot delete property.');
      setProperties(prev => prev.filter(p => p.id !== id));
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      console.error('Error deleting property:', error.message);
      setError(error.message);
    } else {
      setProperties(prev => prev.filter(p => p.id !== id));
      setError(null);
    }
  }, []);

  // Supabase CRUD for Construction Projects
  const addConstructionProject = useCallback(async (newProject: Omit<ConstructionProjectData, 'id'>) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot add construction project.');
      setConstructionProjects(prev => [...prev, { ...newProject, id: Date.now() }]); // Add with temp ID
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    const { data, error } = await supabase.from('construction_projects').insert({ data: newProject }).select('id, data').single();
    if (error) {
      console.error('Error adding construction project:', error.message);
      setError(error.message);
    } else if (data) {
      setConstructionProjects(prev => [...prev, { ...data.data, id: data.id }]);
      setError(null);
    }
  }, []);

  const updateConstructionProject = useCallback(async (id: number, updatedData: Partial<ConstructionProjectData>) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot update construction project.');
      setConstructionProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    // Fetch current data to merge
    // Explicitly destructure data and error for clarity
    const { data: fetchedProjectRecord, error: fetchError } = await supabase
      .from('construction_projects')
      .select('data')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching project for update:', fetchError.message);
      setError(fetchError.message);
      return;
    }

    // Check if a record was actually found and its data property is not null
    if (!fetchedProjectRecord || !fetchedProjectRecord.data) {
        console.error('Error: Construction project not found for update with ID:', id);
        setError('Construction project not found.');
        return;
    }

    // Now fetchedProjectRecord.data is guaranteed to be ConstructionProjectData
    const mergedData = { ...fetchedProjectRecord.data, ...updatedData };

    const { error } = await supabase
      .from('construction_projects')
      .update({ data: mergedData })
      .eq('id', id);

    if (error) {
      console.error('Error updating construction project:', error.message);
      setError(error.message);
    } else {
      setConstructionProjects(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
      setError(null);
    }
  }, []);

  const deleteConstructionProject = useCallback(async (id: number) => {
    if (!supabase) {
      console.error('Supabase client not initialized. Cannot delete construction project.');
      setConstructionProjects(prev => prev.filter(p => p.id !== id));
      setError('Supabase is not configured. Changes will not be persisted.');
      return;
    }
    const { error } = await supabase.from('construction_projects').delete().eq('id', id);
    if (error) {
      console.error('Error deleting construction project:', error.message);
      setError(error.message);
    } else {
      setConstructionProjects(prev => prev.filter(p => p.id !== id));
      setError(null);
    }
  }, []);

  const value = {
    content,
    properties,
    constructionProjects,
    isLoading,
    error,
    updateGlobalContent: updateGlobalContentInDB, // Expose top-level update
    updateSection,
    updateNestedSection,
    updateDeepNestedSection,
    updateArrayItem,
    addProperty,
    updateProperty,
    deleteProperty,
    addConstructionProject,
    updateConstructionProject,
    deleteConstructionProject,
    uploadImage: uploadFile, // Expose uploadFile utility
  };

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
};

export const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);
  if (context === undefined) {
    throw new Error('useWebsiteContent must be used within a WebsiteContentProvider');
  }
  return context;
};
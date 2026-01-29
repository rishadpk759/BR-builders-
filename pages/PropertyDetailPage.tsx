import React, { useEffect, useState } from 'react';
import { useWebsiteContent, PropertyData } from '../WebsiteContentContext'; // Import PropertyData

interface SimilarPropertyCardProps {
  property: PropertyData;
  onClick: (id: number) => void; // Added onClick for navigation
}

const SimilarPropertyCard: React.FC<SimilarPropertyCardProps> = ({
  property,
  onClick,
}) => {
  return (
    <div
      className="bg-white dark:bg-[#1f2916] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
      onClick={() => onClick(property.id)} // Added onClick handler
    >
      <div
        className="h-56 bg-cover bg-center"
        style={{ backgroundImage: `url('${property.images[0] || 'https://via.placeholder.com/400x300?text=No+Image' }')` }}
        data-alt={property.title}
      ></div>
      <div className="p-5">
        <p className="text-xs font-bold text-[#758961] mb-1">{property.location}</p>
        <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{property.title}</h4>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#f2f4f0] dark:border-[#2d3a1f]">
          <p className="font-bold">
            {property.price}<span className="text-xs font-normal text-[#758961]">{property.detailPriceSuffix}</span>
          </p>
          <span className="text-xs flex items-center gap-1 text-[#758961]">
            <span className="material-symbols-outlined text-sm">bed</span> {property.beds} BHK
          </span>
        </div>
      </div>
    </div>
  );
};

interface PropertyDetailPageProps {
  onNavigateHome: () => void;
  propertyId: number;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ onNavigateHome, propertyId }) => {
  const { content, properties, isLoading, error } = useWebsiteContent(); // Use properties from context
  const [currentMainImage, setCurrentMainImage] = useState<string>('');

  // Find the selected property from the global content
  const selectedProperty = properties.find(p => p.id === propertyId);

  useEffect(() => {
    if (selectedProperty) {
      setCurrentMainImage(selectedProperty.images[1] || selectedProperty.images[0] || 'https://via.placeholder.com/1200x800?text=Main+Image+Not+Set');
      // Update metadata when property details are loaded
      document.title = `${selectedProperty.title} - ${selectedProperty.location} | ${content.meta.title}`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', selectedProperty.description.substring(0, 150) + '...');
      }
    } else {
      // Revert to default metadata if property not found or unselected
      document.title = content.meta.title;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', content.meta.description);
      }
    }
  }, [selectedProperty, content.meta.title, content.meta.description]);

  if (isLoading) {
    return (
      <main className="max-w-[1200px] mx-auto py-16 text-center text-xl dark:text-white">Loading property details...</main>
    );
  }

  if (error) {
    return (
      <main className="max-w-[1200px] mx-auto py-16 text-center text-red-500 text-xl">Error: {error}</main>
    );
  }

  if (!selectedProperty) {
    return (
      <main className="max-w-[1200px] mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <p className="text-muted-text mb-8">The property you are looking for does not exist or has been removed.</p>
        <button
          onClick={onNavigateHome}
          className="bg-primary text-charcoal px-6 py-3 rounded-lg font-bold hover:brightness-105 transition-all"
        >
          Go Back Home
        </button>
      </main>
    );
  }

  // Filter similar properties, excluding the current one
  // Pass onNavigateHome as onClick handler to similar properties
  const similarProperties = properties.filter(p => p.id !== propertyId && p.type === selectedProperty.type).slice(0, 3); // Get up to 3 similar properties

  const galleryImages = [
    selectedProperty.images[1], // Main image
    selectedProperty.images[2],
    selectedProperty.images[3],
    selectedProperty.images[4]
  ].filter(Boolean); // Filter out undefined/null entries


  return (
    <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm text-[#758961] dark:text-[#a3b391]">
        <span className="cursor-pointer hover:underline" onClick={onNavigateHome}>Home</span> /
        <span className="cursor-pointer hover:underline ml-1">Properties</span> /
        <span className="ml-1 font-semibold text-charcoal dark:text-white">{selectedProperty.title}</span>
      </div>

      {/* Property Main Info & Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-md">
            <img src={currentMainImage} alt={selectedProperty.title} className="w-full h-full object-cover" />
            <span className="absolute bottom-4 left-4 bg-primary text-[#141811] text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
              {selectedProperty.status}
            </span>
            <span className="absolute bottom-4 right-4 bg-[#141811]/70 text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full backdrop-blur-sm">
              Verified
            </span>
          </div>
          {/* Gallery Thumbnails */}
          <div className="flex gap-4 overflow-x-auto pb-2">
            {galleryImages.map((img, index) => (
              img ? (
                <div
                  key={index}
                  className={`flex-shrink-0 size-24 rounded-lg overflow-hidden cursor-pointer border-2 ${currentMainImage === img ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setCurrentMainImage(img)}
                >
                  <img src={img} alt={`${selectedProperty.title} gallery ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ) : null
            ))}
          </div>
        </div>

        {/* Property Title & Price */}
        <div className="lg:col-span-1">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">{selectedProperty.title}</h1>
          <p className="text-primary text-3xl font-bold mb-4">{selectedProperty.price}<span className="text-base text-muted-text">{selectedProperty.detailPriceSuffix}</span></p>
          <p className="text-muted-text flex items-center gap-2 mb-6">
            <span className="material-symbols-outlined text-base">location_on</span>
            {selectedProperty.detailLocationAddress}
          </p>

          {/* Quick Summary */}
          <div className="bg-white dark:bg-[#1f2916] rounded-xl p-6 border border-[#f2f4f0] dark:border-[#2d3a1f]">
            <h3 className="text-lg font-bold mb-4">Quick Summary</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">home_work</span>
                <span className="text-sm">Type: <strong>Luxury Villa</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">square_foot</span>
                <span className="text-sm">Area: <strong>{selectedProperty.area}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">bed</span>
                <span className="text-sm">Bedrooms: <strong>{selectedProperty.beds} BHK</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">bathtub</span>
                <span className="text-sm">Bathrooms: <strong>{selectedProperty.baths}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">family_restroom</span>
                <span className="text-sm">Suitable For: <strong>{selectedProperty.suitableFor}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">chair</span>
                <span className="text-sm">Furnishing: <strong>{selectedProperty.furnishing}</strong></span>
              </div>
              {selectedProperty.parking && (
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-xl">directions_car</span>
                  <span className="text-sm">Parking: <strong>{selectedProperty.parking}</strong></span>
                </div>
              )}
              {selectedProperty.tags && selectedProperty.tags.length > 0 && (
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="material-symbols-outlined text-primary text-xl">sell</span>
                  <span className="text-sm">Tags: {selectedProperty.tags.map(tag => <strong key={tag} className="mr-1">{tag}</strong>)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Property Details - Left Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-12">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Livable Description</h2>
            <p className="text-muted-text dark:text-[#a3b391] leading-relaxed">
              {selectedProperty.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-text dark:text-[#a3b391]">
              {selectedProperty.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-text dark:text-[#a3b391]">
                {selectedProperty.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">hotel_class</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location & Landmarks */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Location & Landmarks</h2>
            <div className="relative h-64 rounded-xl overflow-hidden mb-6">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXcw-k8Uz4COQyCSL0mAwm01sraMNyk-Bgon0Me3rrx7TWQOM-dcSwTJUNNLVDLO1UWtgRZNu6wKaYFJkwBz_a-PhzH19HscbIQqG4vREpcDZVG0Mox3Smew54aKsUNSehyy2FrTGi616xQZqggd6Q95KIg5mnhsWX-wq6VeX1hbeYOgaLfDQx-8YDFuFS7l_DAOexYD9_Zl-7WN-cNHk96pE4nnIFqCHS4vkmxPrhofmWZvtZJgdhvu5qeIe-vHzDMMxVFp43rDI"
                alt="Map of Jubilee Hills"
                className="w-full h-full object-cover grayscale opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white dark:bg-background-dark p-3 rounded-xl shadow-xl flex items-center gap-3 border border-primary">
                  <span className="material-symbols-outlined text-primary text-2xl">{selectedProperty.landmarks.metro.icon}</span>
                  <div>
                    <p className="font-bold text-sm">{selectedProperty.title}</p>
                    <p className="text-xs text-muted-text">{selectedProperty.location}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white dark:bg-[#1f2916] p-4 rounded-lg shadow-sm border border-[#f2f4f0] dark:border-[#2d3a1f]">
                <span className="material-symbols-outlined text-primary text-2xl">{selectedProperty.landmarks.metro.icon}</span>
                <div>
                  <p className="font-semibold">{selectedProperty.landmarks.metro.title}</p>
                  <p className="text-xs text-muted-text">{selectedProperty.landmarks.metro.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#1f2916] p-4 rounded-lg shadow-sm border border-[#f2f4f0] dark:border-[#2d3a1f]">
                <span className="material-symbols-outlined text-primary text-2xl">{selectedProperty.landmarks.hospital.icon}</span>
                <div>
                  <p className="font-semibold">{selectedProperty.landmarks.hospital.title}</p>
                  <p className="text-xs text-muted-text">{selectedProperty.landmarks.hospital.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white dark:bg-[#1f2916] p-4 rounded-lg shadow-sm border border-[#f2f4f0] dark:border-[#2d3a1f]">
                <span className="material-symbols-outlined text-primary text-2xl">{selectedProperty.landmarks.school.icon}</span>
                <div>
                  <p className="font-semibold">{selectedProperty.landmarks.school.title}</p>
                  <p className="text-xs text-muted-text">{selectedProperty.landmarks.school.description}</p>
                </div>
              </div>
            </div>

            {selectedProperty.nearbyAreas && selectedProperty.nearbyAreas.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Nearby Areas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProperty.nearbyAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white dark:bg-[#1f2916] p-4 rounded-lg shadow-sm border border-[#f2f4f0] dark:border-[#2d3a1f]">
                      <span className="material-symbols-outlined text-primary text-2xl">near_me</span>
                      <div>
                        <p className="font-semibold">{area.name}</p>
                        <p className="text-xs text-muted-text">{area.distance}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Transparency Guarantee */}
          <div className="bg-primary/5 dark:bg-primary/10 p-8 rounded-xl border border-primary/20">
            <h2 className="text-2xl font-bold mb-6">Transparency Guarantee</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-muted-text text-sm mb-1">Security Deposit</p>
                <p className="font-bold text-lg">{selectedProperty.deposit}</p>
                <p className="text-xs text-primary">Fully refundable</p>
              </div>
              <div className="text-center">
                <p className="text-muted-text text-sm mb-1">Maintenance</p>
                <p className="font-bold text-lg">{selectedProperty.maintenance}</p>
                <p className="text-xs text-primary">{selectedProperty.detailMaintenanceNote}</p>
              </div>
              <div className="text-center">
                <p className="text-muted-text text-sm mb-1">Brokerage</p>
                <p className="font-bold text-lg">{selectedProperty.brokerage}</p>
                <p className="text-xs text-primary">Direct listing</p>
              </div>
            </div>
            <p className="text-center text-sm text-muted-text dark:text-[#a3b391] border-t border-primary/20 pt-4">
              No hidden charges or unexpected documentation fees.
            </p>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Agent Card */}
          <div className="bg-white dark:bg-[#1f2916] rounded-xl p-6 shadow-sm border border-[#f2f4f0] dark:border-[#2d3a1f] sticky top-28">
            <h3 className="text-xl font-bold mb-4 text-center">Interested in this property?</h3>
            <div className="flex items-center gap-4 border-b border-[#f2f4f0] dark:border-[#2d3a1f] pb-4 mb-4">
              <img src={selectedProperty.agentImage || 'https://via.placeholder.com/64?text=Agent'} alt={selectedProperty.agentName} className="size-16 rounded-full object-cover" />
              <div>
                <p className="font-bold text-lg">{selectedProperty.agentName}</p>
                <p className="text-sm text-muted-text">{selectedProperty.agentTitle}</p>
              </div>
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-[#25D366] text-white font-bold hover:brightness-105 transition-all">
                <svg className="size-5 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.503-2.961-2.617-.087-.114-.708-.941-.708-1.792s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.238-.046.373.275.138.332.472 1.154.513 1.241.041.087.068.188.01.303-.058.114-.087.188-.173.289l-.26.3c-.087.101-.18.211-.077.39.103.179.458.753.985 1.223.677.602 1.248.789 1.422.875.173.085.275.071.376-.046.101-.117.433-.505.548-.678.114-.173.231-.144.39-.087s1.011.477 1.184.563c.173.085.289.13.332.202.045.072.045.419-.1.824zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></svg>
                WhatsApp Inquiry
              </button>
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-lg bg-primary text-[#141811] font-bold hover:brightness-105 transition-all">
                <span className="material-symbols-outlined">call</span>
                Call Builder Now
              </button>
              <button className="w-full flex items-center justify-center gap-2 h-12 rounded-lg border border-[#f2f4f0] dark:border-[#2d3a1f] text-charcoal dark:text-white font-bold hover:bg-[#f2f4f0] dark:hover:bg-[#2a3620] transition-all">
                <span className="material-symbols-outlined">calendar_today</span>
                Schedule Tour
              </button>
            </div>
            <p className="text-center text-xs text-muted-text mt-4">{selectedProperty.detailViewsText}</p>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <section className="py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Similar Properties</h2>
            <p className="text-muted-text">Handpicked villas in Jubilee Hills &amp; Banjara Hills</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline">
            View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {similarProperties.map((property) => (
            <SimilarPropertyCard key={property.id} property={property} onClick={() => onNavigateHome()} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default PropertyDetailPage;
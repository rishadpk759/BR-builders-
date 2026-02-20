import React, { useState, useRef, ChangeEvent, FormEvent, useCallback, useEffect } from 'react';
import { useWebsiteContent, PropertyData, ConstructionProjectData, FAQItemData, NavLinkData, ServiceCardData, CommitmentItemData, WebsiteContent, NearbyArea } from '../WebsiteContentContext';

interface AdminPanelPageProps {
  onNavigateWebsite: () => void;
}

// Helper to safely get a deeply nested property
const getNestedProperty = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Helper to safely set a deeply nested property in an immutable way
const setNestedProperty = (obj: any, path: string, value: any): any => {
  const pathParts = path.split('.');
  const lastPartIndex = pathParts.length - 1;

  if (lastPartIndex < 0) return value; // If path is empty, return the value

  const newObj = { ...obj };
  let current = newObj;

  for (let i = 0; i < lastPartIndex; i++) {
    const part = pathParts[i];
    if (!current[part] || typeof current[part] !== 'object') {
      current[part] = {}; // Initialize as object if missing or not an object
    }
    current[part] = { ...current[part] }; // Ensure immutability on the path
    current = current[part];
  }

  current[pathParts[lastPartIndex]] = value;
  return newObj;
};

// Helper to extract plain URL from CSS url(...) or return the raw value
const extractUrl = (raw?: string) => {
  if (!raw) return '';
  try {
    const trimmed = raw.trim();
    const m = trimmed.match(/^url\((['"]?)(.*)\1\)$/i);
    return m ? m[2] : trimmed;
  } catch {
    return String(raw);
  }
};

// Reusable Input Field Component (Styled for Shopify-like admin)
const AdminInputField: React.FC<{
  label: string;
  value: string | number | string[] | boolean; // Allow boolean for checkbox type
  onChange: (newValue: any) => void; // Allow any type for flexibility with different input types
  type?: 'text' | 'textarea' | 'number' | 'url' | 'checkbox' | 'select' | 'tags';
  rows?: number;
  description?: string;
  isRequired?: boolean;
  options?: { value: string; label: string }[]; // For select type
}> = ({ label, value, onChange, type = 'text', rows = 3, description, isRequired = false, options }) => {
  const id = useRef(`admin-input-${Math.random().toString(36).substring(7)}`).current;

  const renderControl = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={id}
            className="form-textarea block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            required={isRequired}
          />
        );
      case 'number':
        return (
          <input
            id={id}
            type="number"
            className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={value as number}
            onChange={(e) => onChange(Number(e.target.value))}
            required={isRequired}
          />
        );
      case 'url':
        return (
          <input
            id={id}
            type="url"
            className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
          />
        );
      case 'checkbox':
        return (
          <input
            id={id}
            type="checkbox"
            className="form-checkbox rounded text-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
          />
        );
      case 'select':
        return (
          <select
            id={id}
            className="form-select block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
          >
            {options?.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case 'tags':
        return (
          <textarea
            id={id}
            className="form-textarea block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={Array.isArray(value) ? value.join(', ') : ''}
            onChange={(e) => onChange(e.target.value.split(',').map(s => s.trim()).filter(s => s))}
            rows={rows}
            placeholder="Comma-separated values"
          />
        );
      default:
        return (
          <input
            id={id}
            type="text"
            className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            required={isRequired}
          />
        );
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}{isRequired && <span className="text-red-500">*</span>}
      </label>
      {renderControl()}
      {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );
};

// Reusable Image Uploader Component (Styled for Shopify-like admin)
interface ImageUploaderProps {
  label: string;
  currentImageUrl: string;
  bucketName: string;
  onImageChange: (newUrl: string) => void;
  onFileSelect: (file: File) => Promise<string | null>; // Returns public URL
  description?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ label, currentImageUrl, bucketName, onImageChange, onFileSelect, description }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = await onFileSelect(file);
      if (url) {
        onImageChange(url);
      }
    }
  };

  return (
    <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{label}</label>
      {currentImageUrl && (
        <img src={currentImageUrl} alt="Preview" className="w-full max-w-48 h-auto object-cover rounded-md mb-2 border border-gray-200 dark:border-gray-700" />
      )}
      <input
        type="file"
        accept="image/*"
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 dark:file:bg-gray-700 dark:file:text-white dark:file:hover:bg-gray-600 mb-2"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <AdminInputField
        label="Or enter image URL directly"
        value={currentImageUrl}
        onChange={onImageChange}
        type="url"
        description={description}
      />
    </div>
  );
};

// Main Admin Panel Component
const AdminPanelPage: React.FC<AdminPanelPageProps> = ({ onNavigateWebsite }) => {
  const {
    content,
    properties,
    constructionProjects,
    isLoading,
    error,
    updateGlobalContent,
    updateSection,
    updateNestedSection,
    updateDeepNestedSection,
    addProperty,
    updateProperty,
    deleteProperty,
    addConstructionProject,
    updateConstructionProject,
    deleteConstructionProject,
    uploadImage,
  } = useWebsiteContent();

  // Preserve sidebar scroll position across renders/navigation
  const asideRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('adminSidebarScroll');
      if (asideRef.current && saved) asideRef.current.scrollTop = Number(saved);
    } catch {}
    const el = asideRef.current;
    const onScroll = () => {
      try {
        if (asideRef.current) sessionStorage.setItem('adminSidebarScroll', String(asideRef.current.scrollTop));
      } catch {}
    };
    el?.addEventListener('scroll', onScroll);
    return () => el?.removeEventListener('scroll', onScroll);
  }, []);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [activeContentTab, setActiveContentTab] = useState<string>('meta'); // New state for content sub-tabs
  const [expandedPropertyId, setExpandedPropertyId] = useState<number | 'new' | null>(null); // Allow 'new' for new property form
  const [expandedProjectId, setExpandedProjectId] = useState<number | 'new' | null>(null); // Allow 'new' for new project form

  const [newProperty, setNewProperty] = useState<Omit<PropertyData, 'id'>>({
    images: [], location: '', title: '', price: '', beds: 0, baths: 0, area: '',
    furnishing: '', suitableFor: '', status: 'Available', statusBgClass: 'bg-primary/10 text-primary', // Updated default status classes
    statusTextColorClass: 'text-primary', type: 'buy', isFeatured: false,
    parking: '', tags: [], nearbyAreas: [], amenities: [],
    description: '', features: [], deposit: '', maintenance: '', brokerage: '', agentImage: '',
    agentName: '', agentTitle: '', detailLocationAddress: '', detailPriceSuffix: '',
    detailMaintenanceNote: '', detailViewsText: '',
    landmarks: { metro: { title: '', description: '', icon: 'subway' }, hospital: { title: '', description: '', icon: 'local_hospital' }, school: { title: '', description: '', icon: 'school' } }
  });
  const [newConstructionProject, setNewConstructionProject] = useState<Omit<ConstructionProjectData, 'id'>>({
    status: 'Completed', title: '', location: '', imageUrl: '', alt: ''
  });

  const uploadPropertyImage = useCallback(async (file: File, itemId: number | 'new', imageIndex: number) => {
    // For new properties, use a temporary ID to create a unique path
    const actualItemId = itemId === 'new' ? `temp-${Date.now()}` : itemId;
    const fileName = `property-${actualItemId}-${imageIndex}-${Date.now()}-${file.name}`;
    const filePath = `${actualItemId}/${fileName}`;
    return await uploadImage(file, 'property-images', filePath);
  }, [uploadImage]);

  const uploadAvatarImage = useCallback(async (file: File, itemId: number | 'new') => {
    const actualItemId = itemId === 'new' ? `temp-${Date.now()}` : itemId;
    const fileName = `agent-${actualItemId}-${Date.now()}-${file.name}`;
    const filePath = `${actualItemId}/${fileName}`;
    return await uploadImage(file, 'avatars', filePath);
  }, [uploadImage]);

  const uploadProjectImage = useCallback(async (file: File, itemId: number | 'new') => {
    const actualItemId = itemId === 'new' ? `temp-${Date.now()}` : itemId;
    const fileName = `project-${actualItemId}-${Date.now()}-${file.name}`;
    const filePath = `${actualItemId}/${fileName}`;
    return await uploadImage(file, 'project-images', filePath);
  }, [uploadImage]);

  const uploadPageImage = useCallback(async (file: File, sectionPath: string) => {
    const fileName = `page-${sectionPath.replace(/\./g, '-')}-${Date.now()}-${file.name}`;
    const filePath = `${fileName}`; // Store directly in bucket root for generic page images
    return await uploadImage(file, 'page-backgrounds', filePath);
  }, [uploadImage]);

  const uploadLogoImage = useCallback(async (file: File, sectionPath: string) => {
    const fileName = `logo-${sectionPath.replace(/\./g, '-')}-${Date.now()}-${file.name}`;
    const filePath = `${fileName}`;
    return await uploadImage(file, 'assets', filePath);
  }, [uploadImage]);


  const renderColorClassInput = (label: string, value: string, onChange: (newValue: string) => void, description?: string) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="flex items-center gap-2 mt-1">
        <input
          type="text"
          className="form-input block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {/* Simple color preview for known Tailwind colors - this is illustrative */}
        {value.startsWith('bg-') && (
          <span className={`w-8 h-8 rounded-md ${value} border border-gray-300 dark:border-gray-600 flex-shrink-0`}></span>
        )}
        {value.startsWith('text-') && (
          <span className={`w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-600 flex-shrink-0`}>
            <span className={`material-symbols-outlined text-lg ${value}`}>palette</span>
          </span>
        )}
      </div>
      {description && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{description}</p>}
    </div>
  );

  const renderSectionHeader = (title: string, description?: string) => (
    <div className="mb-6 border-b border-gray-100 pb-4">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
    </div>
  );

  const renderArrayEditor = <T extends { id: string | number; [key: string]: any }>(
    title: string,
    array: T[],
    fullPropertyPathToArray: string,
    renderItemFields: (item: T, itemIndex: number, updateItem: (updatedProps: Partial<T>) => void) => React.ReactNode,
    itemLabelField: keyof T,
  ) => {
    const updateItemInArray = (itemId: string | number, updatedProps: Partial<T>) => {
      const currentFullContent = content;
      const currentArray = getNestedProperty(currentFullContent, fullPropertyPathToArray);

      if (!Array.isArray(currentArray)) {
        console.error(`Expected an array at path: ${fullPropertyPathToArray}, but got:`, currentArray);
        return;
      }

      const updatedArray = currentArray.map((arrItem: T) =>
        arrItem.id === itemId ? { ...arrItem, ...updatedProps } : arrItem
      );

      const newGlobalContent = setNestedProperty(currentFullContent, fullPropertyPathToArray, updatedArray);
      updateGlobalContent(newGlobalContent);
    };

    return (
      <div className="mb-8 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
        <h3 className="text-lg font-bold mb-4 text-charcoal dark:text-white">{title}</h3>
        {array.length === 0 && <p className="text-muted-text dark:text-gray-400 mb-4">No items configured.</p>}
        <div className="space-y-4">
          {array.map((item, index) => {
            const updateItem = (updatedProps: Partial<T>) => updateItemInArray(item.id, updatedProps);
            return (
              <div key={String(item.id)} className="p-3 border border-gray-300 rounded-md bg-white">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-900">{String(item[itemLabelField])} <span className="text-xs text-gray-400">ID: {item.id}</span></h4>
                  <button
                    className="text-sm text-red-600 hover:text-red-800 ml-2"
                    type="button"
                    onClick={() => {
                      const currentFullContent = content;
                      const currentArray = getNestedProperty(currentFullContent, fullPropertyPathToArray) as T[];
                      const updatedArray = currentArray.filter(a => a.id !== item.id);
                      const newGlobalContent = setNestedProperty(currentFullContent, fullPropertyPathToArray, updatedArray);
                      updateGlobalContent(newGlobalContent);
                    }}
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>
                {renderItemFields(item, index, updateItem)}
              </div>
            );
          })}
          <div className="mt-3">
            <button
              className="px-3 py-2 rounded border border-gray-300 text-sm bg-white"
              type="button"
              onClick={() => {
                const currentFullContent = content;
                const currentArray = getNestedProperty(currentFullContent, fullPropertyPathToArray) as T[] || [];
                const newItem: any = { id: `new-${Date.now()}` };
                // Try to populate label field if possible
                newItem[itemLabelField as string] = `New ${title.replace(/s$/,'')}`;
                const updatedArray = [...currentArray, newItem];
                const newGlobalContent = setNestedProperty(currentFullContent, fullPropertyPathToArray, updatedArray);
                updateGlobalContent(newGlobalContent);
              }}
            >
              + Add {title.replace(/s$/,'')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  type EditablePropertyData = PropertyData | Omit<PropertyData, 'id'>;

  const renderPropertyForm = (
    property: EditablePropertyData, // Updated type to accept Omit<PropertyData, 'id'> for new properties
    isNew: boolean,
    onChange: (key: keyof (PropertyData | Omit<PropertyData, 'id'>), value: any) => void, // Key can be from either type
    onSave: () => Promise<void>, // Fix: Changed signature from `() => void` to `() => Promise<void>`
    onDelete?: () => Promise<void> // Fix: Changed signature from `() => void` to `() => Promise<void>`
  ) => {
    // Safely access id for comparison or display
    const currentPropertyId = isNew ? 'new' : (property as PropertyData).id;
    const isExpanded = isNew ? expandedPropertyId === 'new' : expandedPropertyId === currentPropertyId;
    const toggleExpand = () => setExpandedPropertyId(isExpanded ? null : currentPropertyId);

    return (
      <div key={isNew ? 'new-property-form' : `property-form-${currentPropertyId}`} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
          <h4 className="font-semibold text-lg text-primary">
            {property.title || (isNew ? 'New Property' : `Property ID: ${currentPropertyId}`)}
          </h4>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 transition-transform" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <h5 className="font-bold text-lg border-b pb-2 mb-4">Basic Information</h5>
            <AdminInputField label="Title" value={property.title} onChange={(val) => onChange('title', val)} isRequired />
            <AdminInputField label="Location" value={property.location} onChange={(val) => onChange('location', val)} isRequired />
            <AdminInputField label="Price" value={property.price} onChange={(val) => onChange('price', val)} isRequired />
            <AdminInputField label="Property Type" value={property.type} onChange={(val) => onChange('type', val as 'buy' | 'rent')} type="select" isRequired options={[{ value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }]} />
            <AdminInputField label="Is Featured?" value={property.isFeatured} onChange={(val) => onChange('isFeatured', val)} type="checkbox" />

            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Images</h5>
            {/* Thumbnail Image (images[0]) */}
            <ImageUploader
              label="Thumbnail Image (for listings)"
              currentImageUrl={property.images[0] || ''}
              bucketName="property-images"
              onImageChange={(url) => {
                const newImages = [...property.images];
                newImages[0] = url;
                onChange('images', newImages);
              }}
              onFileSelect={(file) => uploadPropertyImage(file, currentPropertyId, 0)}
              description="This will be the main image shown on property listing cards."
            />
            {/* Main Detail Image (images[1]) */}
            <ImageUploader
              label="Main Property Detail Image"
              currentImageUrl={property.images[1] || ''}
              bucketName="property-images"
              onImageChange={(url) => {
                const newImages = [...property.images];
                newImages[1] = url;
                onChange('images', newImages);
              }}
              onFileSelect={(file) => uploadPropertyImage(file, currentPropertyId, 1)}
              description="This will be the large image on the property detail page."
            />
            {/* Gallery Images (images[2], images[3], images[4]) */}
            {[2, 3, 4].map(i => (
              <ImageUploader
                key={i}
                label={`Gallery Image ${i - 1}`}
                currentImageUrl={property.images[i] || ''}
                bucketName="property-images"
                onImageChange={(url) => {
                  const newImages = [...property.images];
                  newImages[i] = url;
                  onChange('images', newImages);
                }}
                onFileSelect={(file) => uploadPropertyImage(file, currentPropertyId, i)}
                description={`Additional image for the property gallery. (Index ${i})`}
              />
            ))}

            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Details & Features</h5>
            <AdminInputField label="Description" value={property.description} onChange={(val) => onChange('description', val)} type="textarea" rows={5} isRequired />
            <AdminInputField label="Bedrooms" value={property.beds} onChange={(val) => onChange('beds', val)} type="number" isRequired />
            <AdminInputField label="Bathrooms" value={property.baths} onChange={(val) => onChange('baths', val)} type="number" isRequired />
            <AdminInputField label="Area" value={property.area} onChange={(val) => onChange('area', val)} description="e.g., 1800 sqft" isRequired />
            <AdminInputField label="Furnishing" value={property.furnishing} onChange={(val) => onChange('furnishing', val)} />
            <AdminInputField label="Suitable For" value={property.suitableFor} onChange={(val) => onChange('suitableFor', val)} />
            <AdminInputField label="Parking" value={property.parking} onChange={(val) => onChange('parking', val)} description="e.g., 1 car garage, Street parking" />
            <AdminInputField label="Tags" value={property.tags} onChange={(val) => onChange('tags', val as string[])} type="tags" description="Comma-separated values, e.g., Luxury, New Construction, Pet Friendly" />
            <AdminInputField label="Amenities" value={property.amenities} onChange={(val) => onChange('amenities', val as string[])} type="tags" description="Comma-separated values, e.g., Swimming Pool, Gym, Power Backup" />

            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Status & Styling</h5>
            <AdminInputField label="Status Text" value={property.status} onChange={(val) => onChange('status', val)} />
            {renderColorClassInput('Status Background Class', property.statusBgClass, (val) => onChange('statusBgClass', val), 'Tailwind CSS class for background, e.g., bg-red-500')}
            {renderColorClassInput('Status Text Color Class', property.statusTextColorClass, (val) => onChange('statusTextColorClass', val), 'Tailwind CSS class for text color, e.g., text-white')}

            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Features (comma-separated)</h5>
            <AdminInputField label="Features" value={property.features} onChange={(val) => onChange('features', val as string[])} type="tags" description="Comma-separated list of key features." />


            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Landmarks</h5>
            <div className="ml-4 border-l pl-4 border-gray-300 dark:border-gray-600 space-y-4">
              <h6 className="font-semibold text-md text-gray-700 dark:text-gray-300">Metro</h6>
              <AdminInputField label="Metro Title" value={property.landmarks.metro.title} onChange={(val) => onChange('landmarks', { ...property.landmarks, metro: { ...property.landmarks.metro, title: val } })} />
              <AdminInputField label="Metro Description" value={property.landmarks.metro.description} onChange={(val) => onChange('landmarks', { ...property.landmarks, metro: { ...property.landmarks.metro, description: val } })} />
              <AdminInputField label="Metro Icon" value={property.landmarks.metro.icon} onChange={(val) => onChange('landmarks', { ...property.landmarks, metro: { ...property.landmarks.metro, icon: val } })} description="Material Symbols icon name" />
              <h6 className="font-semibold text-md text-gray-700 dark:text-gray-300">Hospital</h6>
              <AdminInputField label="Hospital Title" value={property.landmarks.hospital.title} onChange={(val) => onChange('landmarks', { ...property.landmarks, hospital: { ...property.landmarks.hospital, title: val } })} />
              <AdminInputField label="Hospital Description" value={property.landmarks.hospital.description} onChange={(val) => onChange('landmarks', { ...property.landmarks, hospital: { ...property.landmarks.hospital, description: val } })} />
              <AdminInputField label="Hospital Icon" value={property.landmarks.hospital.icon} onChange={(val) => onChange('landmarks', { ...property.landmarks, hospital: { ...property.landmarks.hospital, icon: val } })} description="Material Symbols icon name" />
              <h6 className="font-semibold text-md text-gray-700 dark:text-gray-300">School</h6>
              <AdminInputField label="School Title" value={property.landmarks.school.title} onChange={(val) => onChange('landmarks', { ...property.landmarks, school: { ...property.landmarks.school, title: val } })} />
              <AdminInputField label="School Description" value={property.landmarks.school.description} onChange={(val) => onChange('landmarks', { ...property.landmarks, school: { ...property.landmarks.school, description: val } })} />
              <AdminInputField label="School Icon" value={property.landmarks.school.icon} onChange={(val) => onChange('landmarks', { ...property.landmarks, school: { ...property.landmarks.school, icon: val } })} description="Material Symbols icon name" />
            </div>

            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Nearby Areas</h5>
            <div className="ml-4 border-l pl-4 border-gray-300 dark:border-gray-600 space-y-4">
              {property.nearbyAreas.map((area, index) => (
                <div key={index} className="flex items-end gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md">
                  <div className="flex-1">
                    <AdminInputField label={`Area ${index + 1} Name`} value={area.name} onChange={(val) => {
                      const newAreas = [...property.nearbyAreas];
                      newAreas[index].name = val as string;
                      onChange('nearbyAreas', newAreas);
                    }} />
                  </div>
                  <div className="flex-1">
                    <AdminInputField label={`Area ${index + 1} Distance`} value={area.distance} onChange={(val) => {
                      const newAreas = [...property.nearbyAreas];
                      newAreas[index].distance = val as string;
                      onChange('nearbyAreas', newAreas);
                    }} />
                  </div>
                  <button type="button" onClick={() => {
                    const newAreas = property.nearbyAreas.filter((_, i) => i !== index);
                    onChange('nearbyAreas', newAreas);
                  }} className="text-red-500 hover:text-red-700 size-10 flex items-center justify-center rounded-md border border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => onChange('nearbyAreas', [...property.nearbyAreas, { name: '', distance: '' }])} className="mt-2 text-primary hover:text-primary-dark font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-lg">add</span> Add Nearby Area
              </button>
            </div>


            <h5 className="font-bold text-lg border-b pb-2 mb-4 mt-8">Financial & Agent Info</h5>
            <AdminInputField label="Deposit" value={property.deposit} onChange={(val) => onChange('deposit', val)} />
            <AdminInputField label="Maintenance" value={property.maintenance} onChange={(val) => onChange('maintenance', val)} />
            <AdminInputField label="Brokerage" value={property.brokerage} onChange={(val) => onChange('brokerage', val)} />
            <ImageUploader
              label="Agent Image"
              currentImageUrl={property.agentImage}
              bucketName="avatars"
              onImageChange={(url) => onChange('agentImage', url)}
              onFileSelect={(file) => uploadAvatarImage(file, currentPropertyId)}
              description="Profile picture of the agent for this property."
            />
            <AdminInputField label="Agent Name" value={property.agentName} onChange={(val) => onChange('agentName', val)} />
            <AdminInputField label="Agent Title" value={property.agentTitle} onChange={(val) => onChange('agentTitle', val)} />
            <AdminInputField label="Detail Location Address" value={property.detailLocationAddress} onChange={(val) => onChange('detailLocationAddress', val)} />
            <AdminInputField label="Detail Price Suffix" value={property.detailPriceSuffix} onChange={(val) => onChange('detailPriceSuffix', val)} description="e.g., / month" />
            <AdminInputField label="Detail Maintenance Note" value={property.detailMaintenanceNote} onChange={(val) => onChange('detailMaintenanceNote', val)} description="e.g., + ₹5,000 monthly maintenance" />
            <AdminInputField label="Detail Views Text" value={property.detailViewsText} onChange={(val) => onChange('detailViewsText', val)} description="e.g., 45 people viewed this..." />

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={onSave} className="px-6 py-2 rounded-md bg-primary text-charcoal font-semibold hover:brightness-105 transition-colors" type="button"> {/* Changed type to button */}
                {isNew ? 'Add Property' : 'Save Changes'}
              </button>
              {!isNew && onDelete && (
                <button onClick={onDelete} className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors" type="button">
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  type EditableConstructionProjectData = ConstructionProjectData | Omit<ConstructionProjectData, 'id'>;

  const renderConstructionProjectForm = (
    project: EditableConstructionProjectData, // Updated type
    isNew: boolean,
    onChange: (key: keyof (ConstructionProjectData | Omit<ConstructionProjectData, 'id'>), value: any) => void,
    onSave: () => Promise<void>, // Fix: Changed signature from `() => void` to `() => Promise<void>`
    onDelete?: () => Promise<void> // Fix: Changed signature from `() => void` to `() => Promise<void>`
  ) => {
    // Safely access id for comparison or display
    const currentProjectId = isNew ? 'new' : (project as ConstructionProjectData).id;
    const isExpanded = isNew ? expandedProjectId === 'new' : expandedProjectId === currentProjectId;
    const toggleExpand = () => setExpandedProjectId(isExpanded ? null : currentProjectId);

    return (
      <div key={isNew ? 'new-project-form' : `project-form-${currentProjectId}`} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex justify-between items-center cursor-pointer" onClick={toggleExpand}>
          <h4 className="font-semibold text-lg text-primary">
            {project.title || (isNew ? 'New Project' : `Project ID: ${currentProjectId}`)}
          </h4>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 transition-transform" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
        </div>

        {isExpanded && (
          <div className="mt-4 space-y-4">
            <AdminInputField label="Title" value={project.title} onChange={(val) => onChange('title', val)} isRequired />
            <AdminInputField label="Location" value={project.location} onChange={(val) => onChange('location', val)} isRequired />
            <AdminInputField label="Status" value={project.status} onChange={(val) => onChange('status', val)} description="e.g., Completed, In Progress" />
            <ImageUploader
              label="Project Image"
              currentImageUrl={project.imageUrl}
              bucketName="project-images"
              onImageChange={(url) => onChange('imageUrl', url)}
              onFileSelect={(file) => uploadProjectImage(file, currentProjectId)}
            />
            <AdminInputField label="Alt Text" value={project.alt} onChange={(val) => onChange('alt', val)} />

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={onSave} className="px-6 py-2 rounded-md bg-primary text-charcoal font-semibold hover:brightness-105 transition-colors" type="button"> {/* Changed type to button */}
                {isNew ? 'Add Project' : 'Save Changes'}
              </button>
              {!isNew && onDelete && (
                <button onClick={onDelete} className="px-6 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors" type="button">
                  Delete
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Fix: Removed 'e: FormEvent' argument and onSubmit from parent form
  const handleAddProperty = async () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price || !newProperty.area || !newProperty.description || newProperty.beds === 0 || newProperty.baths === 0) {
      alert("Please fill all required fields for the new property.");
      return;
    }
    await addProperty(newProperty);
    setNewProperty({ // Reset form
      images: [], location: '', title: '', price: '', beds: 0, baths: 0, area: '',
      furnishing: '', suitableFor: '', status: 'Available', statusBgClass: 'bg-primary/10 text-primary',
      statusTextColorClass: 'text-primary', type: 'buy', isFeatured: false,
      parking: '', tags: [], nearbyAreas: [], amenities: [],
      description: '', features: [], deposit: '', maintenance: '', brokerage: '', agentImage: '',
      agentName: '', agentTitle: '', detailLocationAddress: '', detailPriceSuffix: '',
      detailMaintenanceNote: '', detailViewsText: '',
      landmarks: { metro: { title: '', description: '', icon: 'subway' }, hospital: { title: '', description: '', icon: 'local_hospital' }, school: { title: '', description: '', icon: 'school' } }
    });
    setExpandedPropertyId(null); // Collapse the new property form
  };

  // Fix: Removed 'currentProperty' argument. Changes are saved via individual field updates.
  const handleUpdateProperty = async (id: number) => {
    // Changes are presumed to be saved by individual AdminInputField onChange handlers
    setExpandedPropertyId(null); // Collapse after saving
  };

  const handleDeleteProperty = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id);
      setExpandedPropertyId(null); // Collapse after deleting
    }
  };

  // Fix: Removed 'e: FormEvent' argument and onSubmit from parent form
  const handleAddConstructionProject = async () => {
    if (!newConstructionProject.title || !newConstructionProject.location || !newConstructionProject.imageUrl) {
      alert("Please fill all required fields for the new construction project.");
      return;
    }
    await addConstructionProject(newConstructionProject);
    setNewConstructionProject({ // Reset form
      status: 'Completed', title: '', location: '', imageUrl: '', alt: ''
    });
    setExpandedProjectId(null); // Collapse the new project form
  };

  // Fix: Removed 'currentProject' argument. Changes are saved via individual field updates.
  const handleUpdateConstructionProject = async (id: number) => {
    setExpandedProjectId(null); // Collapse after saving
  };

  const handleDeleteConstructionProject = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await deleteConstructionProject(id);
      setExpandedProjectId(null); // Collapse after deleting
    }
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-background-dark text-xl dark:text-white">
        Loading Admin Panel...
      </div>
    );
  }

  // Show a non-blocking banner when remote content couldn't be loaded,
  // but avoid showing raw error messages. Always show a friendly message.
  const errorBanner = error ? (
    <div className="max-w-full mx-auto my-4 p-3 rounded-md bg-yellow-50 text-yellow-800 text-center">
      Remote content unavailable — showing fallback content.
    </div>
  ) : null;

  // Save / Discard handlers for content changes
  const handleSave = async () => {
    try {
      await updateGlobalContent(content);
      // small feedback
      alert('Content saved. Reload the site to see updates.');
    } catch (e) {
      console.error('Error saving content:', e);
      alert('Failed to save content. See console for details.');
    }
  };

  const handleDiscard = () => {
    if (confirm('Discard unsaved changes and reload from server?')) {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar Navigation */}
      <aside ref={asideRef} className="w-64 bg-white text-gray-900 p-6 border-r border-gray-200 flex flex-col sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-2 text-gray-900 text-xl font-semibold mb-6">
          <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          Admin Panel
        </div>
        <nav className="flex-1">
          <ul className="space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
              { id: 'navbar', label: 'Navbar', icon: 'menu' },
              { id: 'footer', label: 'Footer', icon: 'logout' },
              { id: 'homePage', label: 'Home Page', icon: 'home' },
              { id: 'aboutUsPage', label: 'About Page', icon: 'info' },
              { id: 'contactPage', label: 'Contact Page', icon: 'call' },
              { id: 'services', label: 'Services', icon: 'work' },
              { id: 'properties', label: 'Properties List', icon: 'home_work' },
              { id: 'constructionProjects', label: 'Construction Projects', icon: 'engineering' },
              { id: 'all', label: 'All Content', icon: 'edit_document' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    // Map certain sidebar items to the Content editor
                    const contentMap: Record<string, string> = {
                      aboutUsPage: 'aboutUsPage',
                      contactPage: 'contactPage',
                      services: 'homePage',
                      homePage: 'homePage',
                      buyHomesPage: 'buyHomesPage',
                      rentPropertiesPage: 'rentPropertiesPage',
                      constructionPortfolioPage: 'constructionPortfolioPage',
                      all: 'homePage',
                    };

                    if (contentMap[item.id]) {
                      setActiveTab('content');
                      setActiveContentTab(contentMap[item.id]);
                    } else {
                      setActiveTab(item.id);
                    }

                    // Collapse any open forms when changing tabs
                    setExpandedPropertyId(null);
                    setExpandedProjectId(null);
                  }}
                  className={`flex items-center w-full p-2 rounded-md transition-colors ${activeTab === item.id || (activeTab === 'content' && activeContentTab === item.id) ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'}`}
                >
                  <span className="material-symbols-outlined mr-3">{item.icon}</span>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto">
          <button
            onClick={onNavigateWebsite}
            className="flex items-center w-full p-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            <span className="material-symbols-outlined mr-3">arrow_back</span>
            View Website
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        {errorBanner}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {activeTab.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={handleDiscard} className="px-3 py-2 rounded border border-gray-300 text-sm bg-white">Discard</button>
            <button onClick={handleSave} className="px-3 py-2 rounded bg-black text-white text-sm">Save changes</button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <section className="bg-white dark:bg-[#1f2916] p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to your Admin Dashboard!</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Use the sidebar to navigate and manage your website content, properties, and construction projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-blue-700 dark:text-blue-300 text-lg font-semibold">Total Properties</p>
                <p className="text-4xl font-bold text-charcoal dark:text-white">{properties.length}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-lg border border-green-200 dark:border-green-800">
                <p className="text-green-700 dark:text-green-300 text-lg font-semibold">Total Projects</p>
                <p className="text-4xl font-bold text-charcoal dark:text-white">{constructionProjects.length}</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-5 rounded-lg border border-purple-200 dark:border-purple-800">
                <p className="text-purple-700 dark:text-purple-300 text-lg font-semibold">Content Sections</p>
                <p className="text-4xl font-bold text-charcoal dark:text-white">{Object.keys(content).length}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'navbar' && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            {renderSectionHeader("Header / Navbar")}
            <ImageUploader
              label="Logo Image (PNG/JPG/SVG)"
              currentImageUrl={content.header.logoImageUrl || ''}
              bucketName="assets"
              onImageChange={(url) => updateSection('header', 'logoImageUrl', url)}
              onFileSelect={(file) => uploadLogoImage(file, 'header.logoImageUrl')}
              description="Upload a logo image to display instead of the SVG (recommended: 40x40 or similar)."
            />
            <AdminInputField label="Search Placeholder" value={content.header.searchPlaceholder} onChange={(val) => updateSection('header', 'searchPlaceholder', val as string)} />
            <AdminInputField label="WhatsApp Button Text" value={content.header.contactWhatsAppButtonText} onChange={(val) => updateSection('header', 'contactWhatsAppButtonText', val as string)} />
            <AdminInputField label="WhatsApp Button Link" value={content.header.contactWhatsAppButtonLink || ''} onChange={(val) => updateSection('header', 'contactWhatsAppButtonLink', val as string)} type="url" description="Full URL for the header button (e.g., https://wa.me/12345)" />
            <AdminInputField label="WhatsApp Chat Icon" value={content.header.whatsappChatIcon} onChange={(val) => updateSection('header', 'whatsappChatIcon', val as string)} description="Material Symbols icon name" />

            {renderArrayEditor<NavLinkData>(
              "Navigation Links",
              content.header.navLinks,
              'header.navLinks',
              (link, _, updateLink) => (
                <>
                  <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                  <AdminInputField label="Page" value={link.page || ''} onChange={(val) => updateLink({ page: val as any, url: undefined })} type="select" options={[{ value: '', label: '— Select —' }, { value: 'home', label: 'Home' }, { value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }, { value: 'construction', label: 'Construction' }, { value: 'about', label: 'About Us' }, { value: 'contact', label: 'Contact' }]} />
                  <AdminInputField label="Or URL (overrides Page)" value={link.url || ''} onChange={(val) => updateLink({ url: val as string, page: undefined })} type="url" description="If set, this URL will be used instead of internal page routing." />
                </>
              ),
              'label'
            )}
          </section>
        )}

        {activeTab === 'footer' && (
          <section className="bg-white p-6 rounded-lg shadow-md">
            {renderSectionHeader("Footer")}
            <ImageUploader
              label="Footer Logo Image (PNG/JPG/SVG)"
              currentImageUrl={content.footer.logoImageUrl || ''}
              bucketName="assets"
              onImageChange={(url) => updateSection('footer', 'logoImageUrl', url)}
              onFileSelect={(file) => uploadLogoImage(file, 'footer.logoImageUrl')}
              description="Upload a footer logo image (optional)."
            />
            <AdminInputField label="Description" value={content.footer.description} onChange={(val) => updateSection('footer', 'description', val as string)} type="textarea" rows={3} />
            <AdminInputField label="Services Title" value={content.footer.servicesTitle} onChange={(val) => updateSection('footer', 'servicesTitle', val as string)} />
            <AdminInputField label="Company Title" value={content.footer.companyTitle} onChange={(val) => updateSection('footer', 'companyTitle', val as string)} />
            <AdminInputField label="Newsletter Title" value={content.footer.newsletterTitle} onChange={(val) => updateSection('footer', 'newsletterTitle', val as string)} />
            <AdminInputField label="Newsletter Description" value={content.footer.newsletterDescription} onChange={(val) => updateSection('footer', 'newsletterDescription', val as string)} />

            {renderArrayEditor<FooterLinkData>(
              "Services Links",
              content.footer.servicesLinks,
              'footer.servicesLinks',
              (link, _, updateLink) => (
                <>
                  <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                  <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                </>
              ),
              'label'
            )}

            {renderArrayEditor<FooterLinkData>(
              "Company Links",
              content.footer.companyLinks,
              'footer.companyLinks',
              (link, _, updateLink) => (
                <>
                  <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                  <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                </>
              ),
              'label'
            )}

            {renderArrayEditor<SocialLinkData>(
              "Social Links",
              content.footer.socialLinks,
              'footer.socialLinks',
              (link, _, updateLink) => (
                <>
                  <AdminInputField label="Icon (text)" value={link.icon} onChange={(val) => updateLink({ icon: val as string })} />
                  <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                </>
              ),
              'icon'
            )}
          </section>
        )}

        {activeTab === 'homePage' && (
          <>
            {/* Reuse existing Home Page editor from Content tab */}
            { /* Copy of activeContentTab === 'homePage' block */ }
            <section className="bg-white p-6 rounded-lg shadow-md">
              {renderSectionHeader("Home Page - Hero Section")}
              <AdminInputField label="Tagline" value={content.homePage.hero.tagline} onChange={(val) => updateNestedSection('homePage', 'hero', 'tagline', val as string)} />
              <AdminInputField label="Title (HTML allowed)" value={content.homePage.hero.title} onChange={(val) => updateNestedSection('homePage', 'hero', 'title', val as string)} type="textarea" rows={3} />
              <AdminInputField label="Description" value={content.homePage.hero.description} onChange={(val) => updateNestedSection('homePage', 'hero', 'description', val as string)} type="textarea" rows={3} />
              <AdminInputField label="Primary Button Text" value={content.homePage.hero.primaryButtonText} onChange={(val) => updateNestedSection('homePage', 'hero', 'primaryButtonText', val as string)} />
              <AdminInputField label="Primary Button Link" value={content.homePage.hero.primaryButtonLink} onChange={(val) => updateNestedSection('homePage', 'hero', 'primaryButtonLink', val as string)} type="url" />
              <AdminInputField label="Secondary Button Text" value={content.homePage.hero.secondaryButtonText} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonText', val as string)} />
              <AdminInputField label="Secondary Button Icon" value={content.homePage.hero.secondaryButtonIcon} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonIcon', val as string)} description="Material Symbols icon name" />
              <AdminInputField label="Secondary Button Link" value={content.homePage.hero.secondaryButtonLink} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonLink', val as string)} type="url" />
              <ImageUploader
                label="Background Image (URL or CSS)"
                currentImageUrl={extractUrl(content.homePage.hero.backgroundImage)}
                bucketName="page-backgrounds"
                onImageChange={(url) => updateNestedSection('homePage', 'hero', 'backgroundImage', `url('${url}')`)}
                onFileSelect={(file) => uploadPageImage(file, 'homePage.hero.backgroundImage')}
                description="Use a direct image URL or a CSS linear-gradient with a URL."
              />
            </section>
          </>
        )}
        {activeTab === 'content' && (
          <div className="bg-white dark:bg-[#1f2916] p-6 rounded-lg shadow-md">
            <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex flex-wrap space-x-4 md:space-x-8" aria-label="Tabs">
                {['meta', 'header', 'footer', 'homePage', 'aboutUsPage', 'contactPage', 'buyHomesPage', 'rentPropertiesPage', 'constructionPortfolioPage'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveContentTab(tab)}
                    className={`${
                      activeContentTab === tab
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
                  >
                    {tab.replace(/([A-Z])/g, ' $1').trim()}
                  </button>
                ))}
              </nav>
            </div>
            {activeContentTab === 'meta' && (
              <section>
                {renderSectionHeader("Meta Data")}
                <AdminInputField label="Website Title" value={content.meta.title} onChange={(val) => updateSection('meta', 'title', val as string)} />
                <AdminInputField label="Website Description" value={content.meta.description} onChange={(val) => updateSection('meta', 'description', val as string)} type="textarea" rows={3} />
              </section>
            )}

            {activeContentTab === 'header' && (
              <section>
                {renderSectionHeader("Header Section")}
                <AdminInputField label="Logo Text" value={content.header.logoText} onChange={(val) => updateSection('header', 'logoText', val as string)} />
                <AdminInputField label="Logo SVG (HTML)" value={content.header.logoSvg} onChange={(val) => updateSection('header', 'logoSvg', val as string)} type="textarea" rows={5} />
                <ImageUploader
                  label="Logo Image (PNG/JPG/SVG)"
                  currentImageUrl={content.header.logoImageUrl || ''}
                  bucketName="assets"
                  onImageChange={(url) => updateSection('header', 'logoImageUrl', url)}
                  onFileSelect={(file) => uploadLogoImage(file, 'header.logoImageUrl')}
                  description="Upload a logo image to display instead of the SVG (recommended: 40x40 or similar)."
                />
                <AdminInputField label="Search Placeholder" value={content.header.searchPlaceholder} onChange={(val) => updateSection('header', 'searchPlaceholder', val as string)} />
                <AdminInputField label="WhatsApp Button Text" value={content.header.contactWhatsAppButtonText} onChange={(val) => updateSection('header', 'contactWhatsAppButtonText', val as string)} />
                <AdminInputField label="WhatsApp Button Link" value={content.header.contactWhatsAppButtonLink || ''} onChange={(val) => updateSection('header', 'contactWhatsAppButtonLink', val as string)} type="url" description="Full URL for the header button (e.g., https://wa.me/12345)" />
                <AdminInputField label="WhatsApp Chat Icon" value={content.header.whatsappChatIcon} onChange={(val) => updateSection('header', 'whatsappChatIcon', val as string)} description="Material Symbols icon name" />

                {renderArrayEditor<NavLinkData>(
                  "Navigation Links",
                  content.header.navLinks,
                  'header.navLinks',
                  (link, _, updateLink) => (
                    <>
                      <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                      <AdminInputField label="Page" value={link.page || ''} onChange={(val) => updateLink({ page: val as any, url: undefined })} type="select" options={[{ value: '', label: '— Select —' }, { value: 'home', label: 'Home' }, { value: 'buy', label: 'Buy' }, { value: 'rent', label: 'Rent' }, { value: 'construction', label: 'Construction' }, { value: 'about', label: 'About Us' }, { value: 'contact', label: 'Contact' }]} />
                      <AdminInputField label="Or URL (overrides Page)" value={link.url || ''} onChange={(val) => updateLink({ url: val as string, page: undefined })} type="url" description="If set, this URL will be used instead of internal page routing." />
                    </>
                  ),
                  'label'
                )}
              </section>
            )}

            {activeContentTab === 'footer' && (
              <section>
                {renderSectionHeader("Footer Section")}
                <AdminInputField label="Logo Text" value={content.footer.logoText} onChange={(val) => updateSection('footer', 'logoText', val as string)} />
                <AdminInputField label="Logo SVG (HTML)" value={content.footer.logoSvg} onChange={(val) => updateSection('footer', 'logoSvg', val as string)} type="textarea" rows={5} />
                <ImageUploader
                  label="Footer Logo Image (PNG/JPG/SVG)"
                  currentImageUrl={content.footer.logoImageUrl || ''}
                  bucketName="assets"
                  onImageChange={(url) => updateSection('footer', 'logoImageUrl', url)}
                  onFileSelect={(file) => uploadLogoImage(file, 'footer.logoImageUrl')}
                  description="Upload a footer logo image (optional)."
                />
                <AdminInputField label="Description" value={content.footer.description} onChange={(val) => updateSection('footer', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Services Title" value={content.footer.servicesTitle} onChange={(val) => updateSection('footer', 'servicesTitle', val as string)} />
                <AdminInputField label="Company Title" value={content.footer.companyTitle} onChange={(val) => updateSection('footer', 'companyTitle', val as string)} />
                <AdminInputField label="Newsletter Title" value={content.footer.newsletterTitle} onChange={(val) => updateSection('footer', 'newsletterTitle', val as string)} />
                <AdminInputField label="Newsletter Description" value={content.footer.newsletterDescription} onChange={(val) => updateSection('footer', 'newsletterDescription', val as string)} />
                <AdminInputField label="Newsletter Placeholder" value={content.footer.newsletterPlaceholder} onChange={(val) => updateSection('footer', 'newsletterPlaceholder', val as string)} />
                <AdminInputField label="Newsletter Button Icon" value={content.footer.newsletterButtonIcon} onChange={(val) => updateSection('footer', 'newsletterButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Copyright Text" value={content.footer.copyrightText} onChange={(val) => updateSection('footer', 'copyrightText', val as string)} />
                <AdminInputField label="WhatsApp Floating Link" value={content.footer.whatsappFloatingLink} onChange={(val) => updateSection('footer', 'whatsappFloatingLink', val as string)} type="url" />
                <AdminInputField label="WhatsApp Floating Icon SVG (HTML)" value={content.footer.whatsappFloatingIconSvg} onChange={(val) => updateSection('footer', 'whatsappFloatingIconSvg', val as string)} type="textarea" rows={5} />

                {renderArrayEditor<FooterLinkData>(
                  "Services Links",
                  content.footer.servicesLinks,
                  'footer.servicesLinks',
                  (link, _, updateLink) => (
                    <>
                      <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                      <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                    </>
                  ),
                  'label'
                )}

                {renderArrayEditor<FooterLinkData>(
                  "Company Links",
                  content.footer.companyLinks,
                  'footer.companyLinks',
                  (link, _, updateLink) => (
                    <>
                      <AdminInputField label="Label" value={link.label} onChange={(val) => updateLink({ label: val as string })} />
                      <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                    </>
                  ),
                  'label'
                )}

                {renderArrayEditor<SocialLinkData>(
                  "Social Links",
                  content.footer.socialLinks,
                  'footer.socialLinks',
                  (link, _, updateLink) => (
                    <>
                      <AdminInputField label="Icon (text)" value={link.icon} onChange={(val) => updateLink({ icon: val as string })} />
                      <AdminInputField label="URL" value={link.url} onChange={(val) => updateLink({ url: val as string })} type="url" />
                    </>
                  ),
                  'icon'
                )}
              </section>
            )}

            {activeContentTab === 'homePage' && (
              <section>
                {renderSectionHeader("Home Page - Hero Section")}
                <AdminInputField label="Tagline" value={content.homePage.hero.tagline} onChange={(val) => updateNestedSection('homePage', 'hero', 'tagline', val as string)} />
                <AdminInputField label="Title (HTML allowed)" value={content.homePage.hero.title} onChange={(val) => updateNestedSection('homePage', 'hero', 'title', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Description" value={content.homePage.hero.description} onChange={(val) => updateNestedSection('homePage', 'hero', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Primary Button Text" value={content.homePage.hero.primaryButtonText} onChange={(val) => updateNestedSection('homePage', 'hero', 'primaryButtonText', val as string)} />
                <AdminInputField label="Primary Button Link" value={content.homePage.hero.primaryButtonLink} onChange={(val) => updateNestedSection('homePage', 'hero', 'primaryButtonLink', val as string)} type="url" />
                <AdminInputField label="Secondary Button Text" value={content.homePage.hero.secondaryButtonText} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonText', val as string)} />
                <AdminInputField label="Secondary Button Icon" value={content.homePage.hero.secondaryButtonIcon} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Secondary Button Link" value={content.homePage.hero.secondaryButtonLink} onChange={(val) => updateNestedSection('homePage', 'hero', 'secondaryButtonLink', val as string)} type="url" />
                <ImageUploader
                  label="Background Image (URL or CSS)"
                  currentImageUrl={content.homePage.hero.backgroundImage}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('homePage', 'hero', 'backgroundImage', `url('${url}')`)}
                  onFileSelect={(file) => uploadPageImage(file, 'homePage.hero.backgroundImage')}
                  description="Use a direct image URL or a CSS linear-gradient with a URL."
                />

                {renderSectionHeader("Home Page - Stats Section", "Update individual statistics.")}
                <AdminInputField label="Experience Tag" value={content.homePage.stats.experience.tag} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'experience', 'tag', val as string)} />
                <AdminInputField label="Experience Value" value={content.homePage.stats.experience.value} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'experience', 'value', val as string)} />
                <AdminInputField label="Experience Description" value={content.homePage.stats.experience.description} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'experience', 'description', val as string)} />
                <AdminInputField label="Portfolio Tag" value={content.homePage.stats.portfolio.tag} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'portfolio', 'tag', val as string)} />
                <AdminInputField label="Portfolio Value" value={content.homePage.stats.portfolio.value} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'portfolio', 'value', val as string)} />
                <AdminInputField label="Portfolio Description" value={content.homePage.stats.portfolio.description} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'portfolio', 'description', val as string)} />
                <AdminInputField label="Craftsmanship Tag" value={content.homePage.stats.craftsmanship.tag} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'craftsmanship', 'tag', val as string)} />
                <AdminInputField label="Craftsmanship Value" value={content.homePage.stats.craftsmanship.value} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'craftsmanship', 'value', val as string)} />
                <AdminInputField label="Craftsmanship Description" value={content.homePage.stats.craftsmanship.description} onChange={(val) => updateDeepNestedSection('homePage', 'stats', 'craftsmanship', 'description', val as string)} />

                {renderSectionHeader("Home Page - Services Section")}
                <AdminInputField label="Services Section Title" value={content.homePage.services.sectionTitle} onChange={(val) => updateNestedSection('homePage', 'services', 'sectionTitle', val as string)} />
                {renderArrayEditor<ServiceCardData>(
                  "Service Cards",
                  content.homePage.services.servicesList,
                  'homePage.services.servicesList',
                  (service, _, updateService) => (
                    <>
                      <AdminInputField label="Title" value={service.title} onChange={(val) => updateService({ title: val as string })} />
                      <AdminInputField label="Description" value={service.description} onChange={(val) => updateService({ description: val as string })} />
                      <AdminInputField label="Tag" value={service.tag} onChange={(val) => updateService({ tag: val as string })} />
                      <ImageUploader
                        label="Background Image URL"
                        currentImageUrl={extractUrl(service.backgroundImage)}
                        bucketName="page-backgrounds"
                        onImageChange={(url) => updateService({ backgroundImage: url })}
                        onFileSelect={(file) => uploadPageImage(file, `homePage.services.servicesList.${service.id}.backgroundImage`)}
                      />
                    </>
                  ),
                  'title'
                )}

                {renderSectionHeader("Home Page - Featured Properties Section")}
                <AdminInputField label="Featured Properties Tagline" value={content.homePage.featuredProperties.tagline} onChange={(val) => updateNestedSection('homePage', 'featuredProperties', 'tagline', val as string)} />
                <AdminInputField label="Featured Properties Section Title" value={content.homePage.featuredProperties.sectionTitle} onChange={(val) => updateNestedSection('homePage', 'featuredProperties', 'sectionTitle', val as string)} />
                <AdminInputField label="View All Button Text" value={content.homePage.featuredProperties.viewAllButtonText} onChange={(val) => updateNestedSection('homePage', 'featuredProperties', 'viewAllButtonText', val as string)} />
                <AdminInputField label="View All Button Icon" value={content.homePage.featuredProperties.viewAllButtonIcon} onChange={(val) => updateNestedSection('homePage', 'featuredProperties', 'viewAllButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="View All Button Link" value={content.homePage.featuredProperties.viewAllButtonLink} onChange={(val) => updateNestedSection('homePage', 'featuredProperties', 'viewAllButtonLink', val as string)} type="url" />

                {renderSectionHeader("Home Page - Commitment Section")}
                <AdminInputField label="Commitment Tagline" value={content.homePage.commitment.tagline} onChange={(val) => updateNestedSection('homePage', 'commitment', 'tagline', val as string)} />
                <AdminInputField label="Commitment Section Title" value={content.homePage.commitment.sectionTitle} onChange={(val) => updateNestedSection('homePage', 'commitment', 'sectionTitle', val as string)} />
                <AdminInputField label="Commitment Description" value={content.homePage.commitment.description} onChange={(val) => updateNestedSection('homePage', 'commitment', 'description', val as string)} type="textarea" rows={3} />
                {renderArrayEditor<CommitmentItemData>(
                  "Commitment Items",
                  content.homePage.commitment.items,
                  'homePage.commitment.items',
                  (item, _, updateItem) => (
                    <>
                      <AdminInputField label="Icon" value={item.icon} onChange={(val) => updateItem({ icon: val as string })} description="Material Symbols icon name" />
                      <AdminInputField label="Title" value={item.title} onChange={(val) => updateItem({ title: val as string })} />
                      <AdminInputField label="Description" value={item.description} onChange={(val) => updateItem({ description: val as string })} />
                    </>
                  ),
                  'title'
                )}

                {renderSectionHeader("Home Page - Contact Section")}
                <AdminInputField label="Contact Heading" value={content.homePage.contactSection.heading} onChange={(val) => updateNestedSection('homePage', 'contactSection', 'heading', val as string)} />
                <AdminInputField label="Contact Subheading" value={content.homePage.contactSection.subheading} onChange={(val) => updateNestedSection('homePage', 'contactSection', 'subheading', val as string)} type="textarea" rows={3} />
                {/* WhatsApp Card */}
                <h4 className="font-semibold text-lg mt-6 mb-2">WhatsApp Card</h4>
                <AdminInputField label="WhatsApp Card Title" value={content.homePage.contactSection.whatsappCard.title} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'title', val as string)} />
                <AdminInputField label="WhatsApp Card Description" value={content.homePage.contactSection.whatsappCard.description} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'description', val as string)} />
                <AdminInputField label="WhatsApp Card Icon" value={content.homePage.contactSection.whatsappCard.icon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'icon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="WhatsApp Card Button Text" value={content.homePage.contactSection.whatsappCard.buttonText} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'buttonText', val as string)} />
                <AdminInputField label="WhatsApp Card Button Icon" value={content.homePage.contactSection.whatsappCard.buttonIcon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'buttonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="WhatsApp Card Button Link" value={content.homePage.contactSection.whatsappCard.buttonLink} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'whatsappCard', 'buttonLink', val as string)} type="url" />
                {/* Call Card */}
                <h4 className="font-semibold text-lg mt-6 mb-2">Call Card</h4>
                <AdminInputField label="Call Card Title" value={content.homePage.contactSection.callCard.title} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'title', val as string)} />
                <AdminInputField label="Call Card Phone Number" value={content.homePage.contactSection.callCard.phoneNumber} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'phoneNumber', val as string)} />
                <AdminInputField label="Call Card Description" value={content.homePage.contactSection.callCard.description} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'description', val as string)} />
                <AdminInputField label="Call Card Icon" value={content.homePage.contactSection.callCard.icon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'icon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Call Card Button Text" value={content.homePage.contactSection.callCard.buttonText} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'buttonText', val as string)} />
                <AdminInputField label="Call Card Button Icon" value={content.homePage.contactSection.callCard.buttonIcon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'buttonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Call Card Button Link" value={content.homePage.contactSection.callCard.buttonLink} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'callCard', 'buttonLink', val as string)} type="url" />
                {/* Office Info Card */}
                <h4 className="font-semibold text-lg mt-6 mb-2">Office Info Card</h4>
                <AdminInputField label="Office Info Title" value={content.homePage.contactSection.officeInfoCard.title} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'title', val as string)} />
                <AdminInputField label="Office Info Icon" value={content.homePage.contactSection.officeInfoCard.icon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'icon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Address Line 1" value={content.homePage.contactSection.officeInfoCard.addressLine1} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'addressLine1', val as string)} />
                <AdminInputField label="Address Line 2" value={content.homePage.contactSection.officeInfoCard.addressLine2} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'addressLine2', val as string)} />
                <AdminInputField label="Address Line 3" value={content.homePage.contactSection.officeInfoCard.addressLine3} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'addressLine3', val as string)} />
                <AdminInputField label="Schedule Mon-Sat" value={content.homePage.contactSection.officeInfoCard.scheduleMonSat} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'scheduleMonSat', val as string)} />
                <AdminInputField label="Schedule Hours Mon-Sat" value={content.homePage.contactSection.officeInfoCard.scheduleHoursMonSat} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'scheduleHoursMonSat', val as string)} />
                <AdminInputField label="Schedule Sunday" value={content.homePage.contactSection.officeInfoCard.scheduleSunday} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'scheduleSunday', val as string)} />
                <AdminInputField label="Schedule Hours Sunday" value={content.homePage.contactSection.officeInfoCard.scheduleHoursSunday} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'officeInfoCard', 'scheduleHoursSunday', val as string)} />
                {/* Enquiry Form */}
                <h4 className="font-semibold text-lg mt-6 mb-2">Enquiry Form</h4>
                <AdminInputField label="Enquiry Form Title" value={content.homePage.contactSection.enquiryForm.title} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'title', val as string)} />
                <AdminInputField label="Full Name Label" value={content.homePage.contactSection.enquiryForm.fullNameLabel} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'fullNameLabel', val as string)} />
                <AdminInputField label="Full Name Placeholder" value={content.homePage.contactSection.enquiryForm.fullNamePlaceholder} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'fullNamePlaceholder', val as string)} />
                <AdminInputField label="Phone Number Label" value={content.homePage.contactSection.enquiryForm.phoneNumberLabel} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'phoneNumberLabel', val as string)} />
                <AdminInputField label="Phone Number Placeholder" value={content.homePage.contactSection.enquiryForm.phoneNumberPlaceholder} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'phoneNumberPlaceholder', val as string)} />
                <AdminInputField label="Enquiry Type Label" value={content.homePage.contactSection.enquiryForm.enquiryTypeLabel} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'enquiryTypeLabel', val as string)} />
                {/* Enquiry Type Options - complex, just show for now */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enquiry Type Options (Read-only for now)</label>
                  <ul className="text-sm text-gray-600 dark:text-gray-400">
                    {content.homePage.contactSection.enquiryForm.enquiryTypeOptions.map((option, idx) => (
                      <li key={idx}>{option.label} (Value: {option.value})</li>
                    ))}
                  </ul>
                </div>
                <AdminInputField label="Message Label" value={content.homePage.contactSection.enquiryForm.messageLabel} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'messageLabel', val as string)} />
                <AdminInputField label="Message Placeholder" value={content.homePage.contactSection.enquiryForm.messagePlaceholder} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'messagePlaceholder', val as string)} />
                <AdminInputField label="Submit Button Text" value={content.homePage.contactSection.enquiryForm.submitButtonText} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'submitButtonText', val as string)} />
                <AdminInputField label="Submit Button Icon" value={content.homePage.contactSection.enquiryForm.submitButtonIcon} onChange={(val) => updateDeepNestedSection('homePage', 'contactSection', 'enquiryForm', 'submitButtonIcon', val as string)} description="Material Symbols icon name" />
              </section>
            )}

            {activeContentTab === 'aboutUsPage' && (
              <section>
                {renderSectionHeader("About Us Page - Hero Section")}
                <AdminInputField label="Tagline" value={content.aboutUsPage.hero.tagline} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'tagline', val as string)} />
                <AdminInputField label="Title" value={content.aboutUsPage.hero.title} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'title', val as string)} />
                <AdminInputField label="Description" value={content.aboutUsPage.hero.description} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Primary Button Text" value={content.aboutUsPage.hero.primaryButtonText} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'primaryButtonText', val as string)} />
                <AdminInputField label="Primary Button Link" value={content.aboutUsPage.hero.primaryButtonLink} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'primaryButtonLink', val as string)} type="url" />
                <AdminInputField label="Secondary Button Text" value={content.aboutUsPage.hero.secondaryButtonText} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'secondaryButtonText', val as string)} />
                <AdminInputField label="Secondary Button Link" value={content.aboutUsPage.hero.secondaryButtonLink} onChange={(val) => updateNestedSection('aboutUsPage', 'hero', 'secondaryButtonLink', val as string)} type="url" />
                <ImageUploader
                  label="Background Image"
                  currentImageUrl={content.aboutUsPage.hero.backgroundImage}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('aboutUsPage', 'hero', 'backgroundImage', `url('${url}')`)}
                  onFileSelect={(file) => uploadPageImage(file, 'aboutUsPage.hero.backgroundImage')}
                />
                
                {renderSectionHeader("About Us Page - Our Story")}
                <AdminInputField label="Story Section Title" value={content.aboutUsPage.ourStory.sectionTitle} onChange={(val) => updateNestedSection('aboutUsPage', 'ourStory', 'sectionTitle', val as string)} />
                <AdminInputField label="Paragraph 1" value={content.aboutUsPage.ourStory.paragraph1} onChange={(val) => updateNestedSection('aboutUsPage', 'ourStory', 'paragraph1', val as string)} type="textarea" rows={5} />
                <AdminInputField label="Paragraph 2" value={content.aboutUsPage.ourStory.paragraph2} onChange={(val) => updateNestedSection('aboutUsPage', 'ourStory', 'paragraph2', val as string)} type="textarea" rows={5} />
                <AdminInputField label="Paragraph 3" value={content.aboutUsPage.ourStory.paragraph3} onChange={(val) => updateNestedSection('aboutUsPage', 'ourStory', 'paragraph3', val as string)} type="textarea" rows={5} />

                {renderSectionHeader("About Us Page - What We Do")}
                <AdminInputField label="What We Do Section Title" value={content.aboutUsPage.whatWeDo.sectionTitle} onChange={(val) => updateNestedSection('aboutUsPage', 'whatWeDo', 'sectionTitle', val as string)} />
                <AdminInputField label="What We Do Section Description" value={content.aboutUsPage.whatWeDo.sectionDescription} onChange={(val) => updateNestedSection('aboutUsPage', 'whatWeDo', 'sectionDescription', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Explore All Services Button Text" value={content.aboutUsPage.whatWeDo.exploreAllServicesButtonText} onChange={(val) => updateNestedSection('aboutUsPage', 'whatWeDo', 'exploreAllServicesButtonText', val as string)} />
                <AdminInputField label="Explore All Services Button Icon" value={content.aboutUsPage.whatWeDo.exploreAllServicesButtonIcon} onChange={(val) => updateNestedSection('aboutUsPage', 'whatWeDo', 'exploreAllServicesButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Explore All Services Button Link" value={content.aboutUsPage.whatWeDo.exploreAllServicesButtonLink} onChange={(val) => updateNestedSection('aboutUsPage', 'whatWeDo', 'exploreAllServicesButtonLink', val as string)} type="url" />

                {/* What We Do Cards - Using deep nested update */}
                <h4 className="font-semibold text-lg mt-6 mb-2">What We Do Cards</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                  <h5 className="font-semibold text-lg mb-4 text-primary">Rent Card (ID: {content.aboutUsPage.whatWeDo.rentCard.id})</h5>
                  <AdminInputField label="Icon" value={content.aboutUsPage.whatWeDo.rentCard.icon} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'rentCard', 'icon', val as string)} description="Material Symbols icon name" />
                  <AdminInputField label="Title" value={content.aboutUsPage.whatWeDo.rentCard.title} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'rentCard', 'title', val as string)} />
                  <AdminInputField label="Description" value={content.aboutUsPage.whatWeDo.rentCard.description} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'rentCard', 'description', val as string)} type="textarea" rows={3} />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                  <h5 className="font-semibold text-lg mb-4 text-primary">Buy Card (ID: {content.aboutUsPage.whatWeDo.buyCard.id})</h5>
                  <AdminInputField label="Icon" value={content.aboutUsPage.whatWeDo.buyCard.icon} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'buyCard', 'icon', val as string)} description="Material Symbols icon name" />
                  <AdminInputField label="Title" value={content.aboutUsPage.whatWeDo.buyCard.title} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'buyCard', 'title', val as string)} />
                  <AdminInputField label="Description" value={content.aboutUsPage.whatWeDo.buyCard.description} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'buyCard', 'description', val as string)} type="textarea" rows={3} />
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h5 className="font-semibold text-lg mb-4 text-primary">Construction Card (ID: {content.aboutUsPage.whatWeDo.constructionCard.id})</h5>
                  <AdminInputField label="Icon" value={content.aboutUsPage.whatWeDo.constructionCard.icon} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'constructionCard', 'icon', val as string)} description="Material Symbols icon name" />
                  <AdminInputField label="Title" value={content.aboutUsPage.whatWeDo.constructionCard.title} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'constructionCard', 'title', val as string)} />
                  <AdminInputField label="Description" value={content.aboutUsPage.whatWeDo.constructionCard.description} onChange={(val) => updateDeepNestedSection('aboutUsPage', 'whatWeDo', 'constructionCard', 'description', val as string)} type="textarea" rows={3} />
                </div>

                {renderSectionHeader("About Us Page - Our Values")}
                <AdminInputField label="Our Values Section Title" value={content.aboutUsPage.ourValues.sectionTitle} onChange={(val) => updateNestedSection('aboutUsPage', 'ourValues', 'sectionTitle', val as string)} />
                <ImageUploader
                  label="Image URL"
                  currentImageUrl={content.aboutUsPage.ourValues.image}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('aboutUsPage', 'ourValues', 'image', url)}
                  onFileSelect={(file) => uploadPageImage(file, 'aboutUsPage.ourValues.image')}
                />
                <AdminInputField label="Image Alt Text" value={content.aboutUsPage.ourValues.imageAlt} onChange={(val) => updateNestedSection('aboutUsPage', 'ourValues', 'imageAlt', val as string)} />
                {renderArrayEditor<CommitmentItemData>(
                  "Value Items",
                  content.aboutUsPage.ourValues.items,
                  'aboutUsPage.ourValues.items',
                  (item, _, updateItem) => (
                    <>
                      <AdminInputField label="Icon" value={item.icon} onChange={(val) => updateItem({ icon: val as string })} description="Material Symbols icon name" />
                      <AdminInputField label="Title" value={item.title} onChange={(val) => updateItem({ title: val as string })} />
                      <AdminInputField label="Description" value={item.description} onChange={(val) => updateItem({ description: val as string })} />
                    </>
                  ),
                  'title'
                )}

                {renderSectionHeader("About Us Page - Local Commitment")}
                <AdminInputField label="Local Commitment Section Title" value={content.aboutUsPage.localCommitment.sectionTitle} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'sectionTitle', val as string)} />
                <AdminInputField label="Local Commitment Section Description" value={content.aboutUsPage.localCommitment.sectionDescription} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'sectionDescription', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Main Office Icon" value={content.aboutUsPage.localCommitment.mainOfficeIcon} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mainOfficeIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Main Office Info" value={content.aboutUsPage.localCommitment.mainOfficeInfo} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mainOfficeInfo', val as string)} />
                <AdminInputField label="Phone Icon" value={content.aboutUsPage.localCommitment.phoneIcon} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'phoneIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Phone Info" value={content.aboutUsPage.localCommitment.phoneInfo} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'phoneInfo', val as string)} />
                <ImageUploader
                  label="Map Image URL"
                  currentImageUrl={content.aboutUsPage.localCommitment.mapImage}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('aboutUsPage', 'localCommitment', 'mapImage', url)}
                  onFileSelect={(file) => uploadPageImage(file, 'aboutUsPage.localCommitment.mapImage')}
                />
                <AdminInputField label="Map Image Alt Text" value={content.aboutUsPage.localCommitment.mapImageAlt} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mapImageAlt', val as string)} />
                <AdminInputField label="Map Pin Title" value={content.aboutUsPage.localCommitment.mapPinTitle} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mapPinTitle', val as string)} />
                <AdminInputField label="Map Pin Subtitle" value={content.aboutUsPage.localCommitment.mapPinSubtitle} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mapPinSubtitle', val as string)} />
                <AdminInputField label="Map Pin Icon" value={content.aboutUsPage.localCommitment.mapPinIcon} onChange={(val) => updateNestedSection('aboutUsPage', 'localCommitment', 'mapPinIcon', val as string)} description="Material Symbols icon name" />

                {renderSectionHeader("About Us Page - CTA Section")}
                <AdminInputField label="CTA Title" value={content.aboutUsPage.ctaSection.title} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'title', val as string)} />
                <AdminInputField label="CTA Description" value={content.aboutUsPage.ctaSection.description} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="WhatsApp Button Text" value={content.aboutUsPage.ctaSection.whatsappButtonText} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'whatsappButtonText', val as string)} />
                <AdminInputField label="WhatsApp Button Icon SVG (HTML)" value={content.aboutUsPage.ctaSection.whatsappButtonIconSvg} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'whatsappButtonIconSvg', val as string)} type="textarea" rows={5} />
                <AdminInputField label="WhatsApp Button Link" value={content.aboutUsPage.ctaSection.whatsappButtonLink} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'whatsappButtonLink', val as string)} type="url" />
                <AdminInputField label="Book Meeting Button Text" value={content.aboutUsPage.ctaSection.bookMeetingButtonText} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'bookMeetingButtonText', val as string)} />
                <AdminInputField label="Book Meeting Button Link" value={content.aboutUsPage.ctaSection.bookMeetingButtonLink} onChange={(val) => updateNestedSection('aboutUsPage', 'ctaSection', 'bookMeetingButtonLink', val as string)} type="url" />
              </section>
            )}

            {activeContentTab === 'contactPage' && (
              <section>
                {renderSectionHeader("Contact Page - Hero Section")}
                <AdminInputField label="Hero Heading" value={content.contactPage.hero.heading} onChange={(val) => updateNestedSection('contactPage', 'hero', 'heading', val as string)} />
                <AdminInputField label="Hero Subheading" value={content.contactPage.hero.subheading} onChange={(val) => updateNestedSection('contactPage', 'hero', 'subheading', val as string)} type="textarea" rows={3} />

                {renderSectionHeader("Contact Page - Map Section")}
                <AdminInputField label="Map Alt Text" value={content.contactPage.mapSection.alt} onChange={(val) => updateNestedSection('contactPage', 'mapSection', 'alt', val as string)} />
                <AdminInputField label="Map Location Display" value={content.contactPage.mapSection.locationDisplay} onChange={(val) => updateNestedSection('contactPage', 'mapSection', 'locationDisplay', val as string)} />
                <ImageUploader
                  label="Map Background Image"
                  currentImageUrl={content.contactPage.mapSection.backgroundImage}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('contactPage', 'mapSection', 'backgroundImage', `url('${url}')`)}
                  onFileSelect={(file) => uploadPageImage(file, 'contactPage.mapSection.backgroundImage')}
                />
                <AdminInputField label="Map Pin Title" value={content.contactPage.mapSection.pinTitle} onChange={(val) => updateNestedSection('contactPage', 'mapSection', 'pinTitle', val as string)} />
                <AdminInputField label="Map Pin Subtitle" value={content.contactPage.mapSection.pinSubtitle} onChange={(val) => updateNestedSection('contactPage', 'mapSection', 'pinSubtitle', val as string)} />
                <AdminInputField label="Map Pin Icon" value={content.contactPage.mapSection.pinIcon} onChange={(val) => updateNestedSection('contactPage', 'mapSection', 'pinIcon', val as string)} description="Material Symbols icon name" />

                {renderSectionHeader("Contact Page - Trust & Transparency Section")}
                <AdminInputField label="Trust Section Title" value={content.contactPage.trustTransparency.sectionTitle} onChange={(val) => updateNestedSection('contactPage', 'trustTransparency', 'sectionTitle', val as string)} />
                <AdminInputField label="Trust Section Description" value={content.contactPage.trustTransparency.sectionDescription} onChange={(val) => updateNestedSection('contactPage', 'trustTransparency', 'sectionDescription', val as string)} type="textarea" rows={3} />
                {renderArrayEditor<CommitmentItemData>(
                  "Trust & Transparency Items",
                  content.contactPage.trustTransparency.items,
                  'contactPage.trustTransparency.items',
                  (item, _, updateItem) => (
                    <>
                      <AdminInputField label="Icon" value={item.icon} onChange={(val) => updateItem({ icon: val as string })} description="Material Symbols icon name" />
                      <AdminInputField label="Title" value={item.title} onChange={(val) => updateItem({ title: val as string })} />
                      <AdminInputField label="Description" value={item.description} onChange={(val) => updateItem({ description: val as string })} />
                    </>
                  ),
                  'title'
                )}
              </section>
            )}

            {activeContentTab === 'buyHomesPage' && (
              <section>
                {renderSectionHeader("Buy Homes Page - Hero Section")}
                <AdminInputField label="Hero Title" value={content.buyHomesPage.hero.title} onChange={(val) => updateNestedSection('buyHomesPage', 'hero', 'title', val as string)} />
                <AdminInputField label="Hero Description" value={content.buyHomesPage.hero.description} onChange={(val) => updateNestedSection('buyHomesPage', 'hero', 'description', val as string)} type="textarea" rows={3} />

                {renderArrayEditor(
                  "Filters",
                  content.buyHomesPage.filters,
                  'buyHomesPage.filters',
                  (filter, _, updateFilter) => (
                    <>
                      <AdminInputField label="Text" value={filter.text} onChange={(val) => updateFilter({ text: val as string })} />
                      <AdminInputField label="Icon (optional)" value={filter.icon || ''} onChange={(val) => updateFilter({ icon: val as string })} />
                      {filter.isMoreFilters && <p className="text-xs text-gray-500 dark:text-gray-400">Is "More Filters" button</p>}
                    </>
                  ),
                  'text'
                )}

                {renderSectionHeader("Buy Homes Page - Trust Strip")}
                <AdminInputField label="Trust Strip Icon" value={content.buyHomesPage.trustStrip.icon} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'icon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Trust Strip Heading" value={content.buyHomesPage.trustStrip.heading} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'heading', val as string)} />
                <AdminInputField label="Trust Strip Description" value={content.buyHomesPage.trustStrip.description} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'description', val as string)} />
                <AdminInputField label="Trust Strip Link Text" value={content.buyHomesPage.trustStrip.linkText} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'linkText', val as string)} />
                <AdminInputField label="Trust Strip Link URL" value={content.buyHomesPage.trustStrip.linkUrl} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'linkUrl', val as string)} type="url" />
                <AdminInputField label="Trust Strip Link Icon" value={content.buyHomesPage.trustStrip.linkIcon} onChange={(val) => updateNestedSection('buyHomesPage', 'trustStrip', 'linkIcon', val as string)} description="Material Symbols icon name" />

                <AdminInputField label="Load More Button Text" value={content.buyHomesPage.loadMoreButtonText} onChange={(val) => updateSection('buyHomesPage', 'loadMoreButtonText', val as string)} />
                <AdminInputField label="Load More Button Icon" value={content.buyHomesPage.loadMoreButtonIcon} onChange={(val) => updateSection('buyHomesPage', 'loadMoreButtonIcon', val as string)} description="Material Symbols icon name" />
              </section>
            )}

            {activeContentTab === 'rentPropertiesPage' && (
              <section>
                {renderSectionHeader("Rent Properties Page - Hero Section")}
                <AdminInputField label="Hero Title" value={content.rentPropertiesPage.hero.title} onChange={(val) => updateNestedSection('rentPropertiesPage', 'hero', 'title', val as string)} />
                <AdminInputField label="Hero Description" value={content.rentPropertiesPage.hero.description} onChange={(val) => updateNestedSection('rentPropertiesPage', 'hero', 'description', val as string)} type="textarea" rows={3} />

                {renderArrayEditor(
                  "Filters",
                  content.rentPropertiesPage.filters,
                  'rentPropertiesPage.filters',
                  (filter, _, updateFilter) => (
                    <>
                      <AdminInputField label="Text" value={filter.text} onChange={(val) => updateFilter({ text: val as string })} />
                      <AdminInputField label="Icon (optional)" value={filter.icon || ''} onChange={(val) => updateFilter({ icon: val as string })} />
                      {filter.isMoreFilters && <p className="text-xs text-gray-500 dark:text-gray-400">Is "More Filters" button</p>}
                    </>
                  ),
                  'text'
                )}

                {renderSectionHeader("Rent Properties Page - Trust Strip")}
                <AdminInputField label="Trust Strip Icon" value={content.rentPropertiesPage.trustStrip.icon} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'icon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Trust Strip Heading" value={content.rentPropertiesPage.trustStrip.heading} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'heading', val as string)} />
                <AdminInputField label="Trust Strip Description" value={content.rentPropertiesPage.trustStrip.description} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'description', val as string)} />
                <AdminInputField label="Trust Strip Link Text" value={content.rentPropertiesPage.trustStrip.linkText} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'linkText', val as string)} />
                <AdminInputField label="Trust Strip Link URL" value={content.rentPropertiesPage.trustStrip.linkUrl} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'linkUrl', val as string)} type="url" />
                <AdminInputField label="Trust Strip Link Icon" value={content.rentPropertiesPage.trustStrip.linkIcon} onChange={(val) => updateNestedSection('rentPropertiesPage', 'trustStrip', 'linkIcon', val as string)} description="Material Symbols icon name" />

                <AdminInputField label="Load More Button Text" value={content.rentPropertiesPage.loadMoreButtonText} onChange={(val) => updateSection('rentPropertiesPage', 'loadMoreButtonText', val as string)} />
                <AdminInputField label="Load More Button Icon" value={content.rentPropertiesPage.loadMoreButtonIcon} onChange={(val) => updateSection('rentPropertiesPage', 'loadMoreButtonIcon', val as string)} description="Material Symbols icon name" />
              </section>
            )}

            {activeContentTab === 'constructionPortfolioPage' && (
              <section>
                {renderSectionHeader("Construction Portfolio Page - Hero Section")}
                <ImageUploader
                  label="Background Image"
                  currentImageUrl={content.constructionPortfolioPage.hero.backgroundImage}
                  bucketName="page-backgrounds"
                  onImageChange={(url) => updateNestedSection('constructionPortfolioPage', 'hero', 'backgroundImage', `url('${url}')`)}
                  onFileSelect={(file) => uploadPageImage(file, 'constructionPortfolioPage.hero.backgroundImage')}
                />
                <AdminInputField label="Background Image Alt" value={content.constructionPortfolioPage.hero.backgroundImageAlt} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'backgroundImageAlt', val as string)} />
                <AdminInputField label="Title" value={content.constructionPortfolioPage.hero.title} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'title', val as string)} />
                <AdminInputField label="Craftsmanship Highlight" value={content.constructionPortfolioPage.hero.craftsmanshipHighlight} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'craftsmanshipHighlight', val as string)} />
                <AdminInputField label="Description" value={content.constructionPortfolioPage.hero.description} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Primary Button Text" value={content.constructionPortfolioPage.hero.primaryButtonText} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'primaryButtonText', val as string)} />
                <AdminInputField label="Primary Button Link" value={content.constructionPortfolioPage.hero.primaryButtonLink} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'primaryButtonLink', val as string)} type="url" />
                <AdminInputField label="Secondary Button Text" value={content.constructionPortfolioPage.hero.secondaryButtonText} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'secondaryButtonText', val as string)} />
                <AdminInputField label="Secondary Button Icon" value={content.constructionPortfolioPage.hero.secondaryButtonIcon} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'secondaryButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Secondary Button Link" value={content.constructionPortfolioPage.hero.secondaryButtonLink} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'hero', 'secondaryButtonLink', val as string)} type="url" />

                {renderSectionHeader("Construction Portfolio Page - Who This Service Is For")}
                <AdminInputField label="Section Title" value={content.constructionPortfolioPage.whoThisServiceIsFor.sectionTitle} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'whoThisServiceIsFor', 'sectionTitle', val as string)} />
                {renderArrayEditor<CommitmentItemData>( // Reusing CommitmentItemData interface
                  "Service For Items",
                  content.constructionPortfolioPage.whoThisServiceIsFor.items,
                  'constructionPortfolioPage.whoThisServiceIsFor.items',
                  (item, _, updateItem) => (
                    <>
                      <AdminInputField label="Icon" value={item.icon} onChange={(val) => updateItem({ icon: val as string })} description="Material Symbols icon name" />
                      <AdminInputField label="Title" value={item.title} onChange={(val) => updateItem({ title: val as string })} />
                      <AdminInputField label="Description" value={item.description} onChange={(val) => updateItem({ description: val as string })} />
                    </>
                  ),
                  'title'
                )}

                {renderSectionHeader("Construction Portfolio Page - Construction Approach")}
                <AdminInputField label="Approach Section Title" value={content.constructionPortfolioPage.constructionApproach.sectionTitle} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'constructionApproach', 'sectionTitle', val as string)} />
                <AdminInputField label="Approach Section Description" value={content.constructionPortfolioPage.constructionApproach.sectionDescription} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'constructionApproach', 'sectionDescription', val as string)} type="textarea" rows={3} />
                {renderArrayEditor<{ id: string; icon: string; title: string; description: string; }>(
                  "Approach Steps",
                  content.constructionPortfolioPage.constructionApproach.steps,
                  'constructionPortfolioPage.constructionApproach.steps',
                  (step, _, updateStep) => (
                    <>
                      <AdminInputField label="Icon" value={step.icon} onChange={(val) => updateStep({ icon: val as string })} description="Material Symbols icon name" />
                      <AdminInputField label="Title" value={step.title} onChange={(val) => updateStep({ title: val as string })} />
                      <AdminInputField label="Description" value={step.description} onChange={(val) => updateStep({ description: val as string })} />
                    </>
                  ),
                  'title'
                )}

                {renderSectionHeader("Construction Portfolio Page - Gallery Section Info")}
                <AdminInputField label="Gallery Section Title" value={content.constructionPortfolioPage.gallery.sectionTitle} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'gallery', 'sectionTitle', val as string)} />
                <AdminInputField label="Gallery Section Description" value={content.constructionPortfolioPage.gallery.sectionDescription} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'gallery', 'sectionDescription', val as string)} type="textarea" rows={3} />
                <AdminInputField label="View All Projects Button Text" value={content.constructionPortfolioPage.gallery.viewAllProjectsButtonText} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'gallery', 'viewAllProjectsButtonText', val as string)} />
                <AdminInputField label="View All Projects Button Icon" value={content.constructionPortfolioPage.gallery.viewAllProjectsButtonIcon} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'gallery', 'viewAllProjectsButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="View All Projects Button Link" value={content.constructionPortfolioPage.gallery.viewAllProjectsButtonLink} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'gallery', 'viewAllProjectsButtonLink', val as string)} type="url" />

                {renderSectionHeader("Construction Portfolio Page - FAQ Section")}
                <AdminInputField label="FAQ Section Title" value={content.constructionPortfolioPage.faqSection.sectionTitle} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'faqSection', 'sectionTitle', val as string)} />
                <AdminInputField label="FAQ Section Description" value={content.constructionPortfolioPage.faqSection.sectionDescription} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'faqSection', 'sectionDescription', val as string)} type="textarea" rows={3} />
                {renderArrayEditor<FAQItemData>(
                  "FAQs",
                  content.constructionPortfolioPage.faqSection.faqs,
                  'constructionPortfolioPage.faqSection.faqs',
                  (faq, _, updateFaq) => (
                    <>
                      <AdminInputField label="Question" value={faq.question} onChange={(val) => updateFaq({ question: val as string })} />
                      <AdminInputField label="Answer" value={faq.answer} onChange={(val) => updateFaq({ answer: val as string })} type="textarea" rows={3} />
                    </>
                  ),
                  'question'
                )}

                {renderSectionHeader("Construction Portfolio Page - Final CTA Section")}
                <ImageUploader
                  label="Avatar 1 Image URL"
                  currentImageUrl={content.constructionPortfolioPage.finalCtaSection.avatar1Image}
                  bucketName="avatars"
                  onImageChange={(url) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar1Image', url)}
                  onFileSelect={(file) => uploadAvatarImage(file, 'new')}
                />
                <AdminInputField label="Avatar 1 Alt Text" value={content.constructionPortfolioPage.finalCtaSection.avatar1Alt} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar1Alt', val as string)} />
                <ImageUploader
                  label="Avatar 2 Image URL"
                  currentImageUrl={content.constructionPortfolioPage.finalCtaSection.avatar2Image}
                  bucketName="avatars"
                  onImageChange={(url) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar2Image', url)}
                  onFileSelect={(file) => uploadAvatarImage(file, 'new')}
                />
                <AdminInputField label="Avatar 2 Alt Text" value={content.constructionPortfolioPage.finalCtaSection.avatar2Alt} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar2Alt', val as string)} />
                <ImageUploader
                  label="Avatar 3 Image URL"
                  currentImageUrl={content.constructionPortfolioPage.finalCtaSection.avatar3Image}
                  bucketName="avatars"
                  onImageChange={(url) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar3Image', url)}
                  onFileSelect={(file) => uploadAvatarImage(file, 'new')}
                />
                <AdminInputField label="Avatar 3 Alt Text" value={content.constructionPortfolioPage.finalCtaSection.avatar3Alt} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'avatar3Alt', val as string)} />
                <AdminInputField label="Title" value={content.constructionPortfolioPage.finalCtaSection.title} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'title', val as string)} />
                <AdminInputField label="Description" value={content.constructionPortfolioPage.finalCtaSection.description} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'description', val as string)} type="textarea" rows={3} />
                <AdminInputField label="Consultation Button Text" value={content.constructionPortfolioPage.finalCtaSection.consultationButtonText} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'consultationButtonText', val as string)} />
                <AdminInputField label="Consultation Button Icon" value={content.constructionPortfolioPage.finalCtaSection.consultationButtonIcon} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'consultationButtonIcon', val as string)} description="Material Symbols icon name" />
                <AdminInputField label="Consultation Button Link" value={content.constructionPortfolioPage.finalCtaSection.consultationButtonLink} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'consultationButtonLink', val as string)} type="url" />
                <AdminInputField label="WhatsApp Button Text" value={content.constructionPortfolioPage.finalCtaSection.whatsappButtonText} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'whatsappButtonText', val as string)} />
                <AdminInputField label="WhatsApp Button Icon SVG (HTML)" value={content.constructionPortfolioPage.finalCtaSection.whatsappButtonIconSvg} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'whatsappButtonIconSvg', val as string)} type="textarea" rows={5} />
                <AdminInputField label="WhatsApp Button Link" value={content.constructionPortfolioPage.finalCtaSection.whatsappButtonLink} onChange={(val) => updateNestedSection('constructionPortfolioPage', 'finalCtaSection', 'whatsappButtonLink', val as string)} type="url" />
              </section>
            )}
          </div>
        )}

        {activeTab === 'properties' && (
          <section>
            <div className="flex justify-between items-center mb-6">
              {renderSectionHeader("Properties")}
              <button
                onClick={() => setExpandedPropertyId('new')}
                className="px-6 py-2 rounded-md bg-primary text-charcoal font-semibold hover:brightness-105 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span> Add New Property
              </button>
            </div>

            {expandedPropertyId === 'new' && (
              <form className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-4"> {/* Fix: Removed onSubmit={handleAddProperty} */}
                <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">New Property Details</h4>
                {renderPropertyForm(
                  newProperty,
                  true, // Is new
                  (key, value) => setNewProperty(prev => ({ ...prev, [key]: value as any })), // Updates local state
                  handleAddProperty, // Fix: Now matches () => Promise<void>
                  () => Promise.resolve(setExpandedPropertyId(null)) // Fix: Cancel for new property is effectively a discard
                )}
              </form>
            )}

            <h3 className="text-xl font-semibold mb-4 text-charcoal dark:text-white">Existing Properties</h3>
            {properties.length === 0 && <p className="text-muted-text dark:text-gray-400">No properties available. Click "Add New Property" to add one.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {property.images[0] ? (
                      <img src={property.images[0]} alt={property.title} className="h-full w-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400 text-5xl">image</span>
                    )}
                    <span className={`${property.statusBgClass} ${property.statusTextColorClass} text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full absolute top-3 left-3`}>
                      {property.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{property.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{property.location}</p>
                    <p className="text-primary text-xl font-bold mb-3">{property.price}</p>
                    <button
                      onClick={() => setExpandedPropertyId(property.id)}
                      className="w-full px-4 py-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">edit</span> View/Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Expanded form for editing an existing property */}
            {expandedPropertyId !== 'new' && expandedPropertyId !== null && properties.find(p => p.id === expandedPropertyId) && (
                <div className="mt-8">
                    {renderPropertyForm(
                        properties.find(p => p.id === expandedPropertyId)!,
                        false,
                        (key, value) => {
                            // Fix: Pass only the partial updated data
                            updateProperty(expandedPropertyId as number, { [key]: value as any });
                        },
                        // Fix: Updated to match () => Promise<void> signature
                        () => handleUpdateProperty(expandedPropertyId as number),
                        // Fix: handleDeleteProperty already returns Promise<void>
                        () => handleDeleteProperty(expandedPropertyId as number)
                    )}
                </div>
            )}
          </section>
        )}

        {(activeTab === 'projects' || activeTab === 'constructionProjects') && (
          <section>
            <div className="flex justify-between items-center mb-6">
              {renderSectionHeader("Construction Projects")}
              <button
                onClick={() => setExpandedProjectId('new')}
                className="px-6 py-2 rounded-md bg-primary text-charcoal font-semibold hover:brightness-105 transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined">add</span> Add New Project
              </button>
            </div>

            {expandedProjectId === 'new' && (
              <form className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 space-y-4"> {/* Fix: Removed onSubmit={handleAddConstructionProject} */}
                <h4 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">New Project Details</h4>
                {renderConstructionProjectForm(
                  newConstructionProject,
                  true, // Is new
                  (key, value) => setNewConstructionProject(prev => ({ ...prev, [key]: value as any })), // Updates local state
                  handleAddConstructionProject, // Fix: Now matches () => Promise<void>
                  () => Promise.resolve(setExpandedProjectId(null)) // Fix: Cancel for new project is effectively a discard
                )}
              </form>
            )}

            <h3 className="text-xl font-semibold mb-4 text-charcoal dark:text-white">Existing Projects</h3>
            {constructionProjects.length === 0 && <p className="text-muted-text dark:text-gray-400">No construction projects available. Click "Add New Project" to add one.</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {constructionProjects.map((project) => (
                <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="relative h-48 w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.alt} className="h-full w-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-gray-400 text-5xl">image</span>
                    )}
                    <span className="bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full absolute top-3 left-3">
                      {project.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg">{project.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.location}</p>
                    <button
                      onClick={() => setExpandedProjectId(project.id)}
                      className="w-full px-4 py-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold hover:bg-green-200 dark:hover:bg-green-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base">edit</span> View/Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Expanded form for editing an existing project */}
            {expandedProjectId !== 'new' && expandedProjectId !== null && constructionProjects.find(p => p.id === expandedProjectId) && (
                <div className="mt-8">
                    {renderConstructionProjectForm(
                        constructionProjects.find(p => p.id === expandedProjectId)!,
                        false,
                        (key, value) => {
                            // Fix: Pass only the partial updated data
                            updateConstructionProject(expandedProjectId as number, { [key]: value as any });
                        },
                        // Fix: Updated to match () => Promise<void> signature
                        () => handleUpdateConstructionProject(expandedProjectId as number),
                        // Fix: handleDeleteConstructionProject already returns Promise<void>
                        () => handleDeleteConstructionProject(expandedProjectId as number)
                    )}
                </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminPanelPage;
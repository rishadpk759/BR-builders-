import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const ContactEnquiryForm: React.FC = () => {
  const { content } = useWebsiteContent();
  const enquiryFormContent = content.homePage.contactSection.enquiryForm; // Reusing this from HomePage

  return (
    <div className="bg-white dark:bg-[#252d1c] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e5e7eb] dark:border-[#2d3a1f]">
      <h3 className="text-charcoal dark:text-white text-2xl font-bold mb-6">{enquiryFormContent.title}</h3>
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-charcoal dark:text-white">{enquiryFormContent.fullNameLabel}</label>
            <input id="fullName" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm" placeholder={enquiryFormContent.fullNamePlaceholder} type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-charcoal dark:text-white">{enquiryFormContent.phoneNumberLabel}</label>
            <input id="phoneNumber" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm" placeholder={enquiryFormContent.phoneNumberPlaceholder} type="tel" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="enquiryType" className="text-sm font-semibold text-charcoal dark:text-white">{enquiryFormContent.enquiryTypeLabel}</label>
          <select id="enquiryType" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm">
            {enquiryFormContent.enquiryTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-charcoal dark:text-white">{enquiryFormContent.messageLabel}</label>
          <textarea id="message" className="w-full p-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm resize-none" placeholder={enquiryFormContent.messagePlaceholder} rows={4}></textarea>
        </div>
        <button className="w-full h-12 bg-primary text-charcoal font-bold rounded-lg shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
          <span>{enquiryFormContent.submitButtonText}</span>
          <span className="material-symbols-outlined">{enquiryFormContent.submitButtonIcon}</span>
        </button>
      </form>
    </div>
  );
};

export default ContactEnquiryForm;
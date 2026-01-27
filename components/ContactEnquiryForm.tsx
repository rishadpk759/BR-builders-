import React from 'react';

const ContactEnquiryForm: React.FC = () => {
  return (
    <div className="bg-white dark:bg-[#252d1c] p-8 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e5e7eb] dark:border-[#2d3a1f]">
      <h3 className="text-charcoal dark:text-white text-2xl font-bold mb-6">Send an Enquiry</h3>
      <form className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-charcoal dark:text-white">Full Name</label>
            <input id="fullName" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm" placeholder="Your Name" type="text" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phoneNumber" className="text-sm font-semibold text-charcoal dark:text-white">Phone Number</label>
            <input id="phoneNumber" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm" placeholder="+91 00000 00000" type="tel" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="enquiryType" className="text-sm font-semibold text-charcoal dark:text-white">Enquiry Type</label>
          <select id="enquiryType" className="w-full h-12 px-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm">
            <option value="buy">I want to Buy</option>
            <option value="rent">I want to Rent</option>
            <option value="construction">Construction Services</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="text-sm font-semibold text-charcoal dark:text-white">Message</label>
          <textarea id="message" className="w-full p-4 rounded-lg bg-background-light dark:bg-[#192210] border-none focus:ring-2 focus:ring-primary text-sm resize-none" placeholder="How can we help you?" rows={4}></textarea>
        </div>
        <button className="w-full h-12 bg-primary text-charcoal font-bold rounded-lg shadow-lg hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
          <span>Submit Enquiry</span>
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </div>
  );
};

export default ContactEnquiryForm;
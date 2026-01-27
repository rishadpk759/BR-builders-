import React from 'react';

const ContactDirectInfo: React.FC = () => {
  return (
    <>
      {/* WhatsApp Card */}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#252d1c] p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-3xl">chat</span>
              <p className="text-charcoal dark:text-white text-lg font-bold">Chat on WhatsApp</p>
            </div>
            <p className="text-muted-text dark:text-[#a3b391] text-sm font-normal">Our team is available for instant queries. Response time: &lt; 5 mins</p>
          </div>
          <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-background-light dark:bg-[#192210] text-charcoal dark:text-white border border-[#e5e7eb] dark:border-[#2d3a1f] gap-2 text-sm font-semibold hover:bg-primary hover:text-charcoal transition-all w-fit">
            <span className="material-symbols-outlined text-lg">send</span>
            <span>Message Now</span>
          </button>
        </div>
      </div>
      {/* Call Card */}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#252d1c] p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-3xl">call</span>
              <p className="text-charcoal dark:text-white text-lg font-bold">Call Us Direct</p>
            </div>
            <p className="text-charcoal dark:text-white text-base font-medium">+91 98765 43210</p>
            <p className="text-muted-text dark:text-[#a3b391] text-sm font-normal">Available Mon-Sat, 9:00 AM - 7:00 PM</p>
          </div>
          <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-background-light dark:bg-[#192210] text-charcoal dark:text-white border border-[#e5e7eb] dark:border-[#2d3a1f] gap-2 text-sm font-semibold hover:bg-primary hover:text-charcoal transition-all w-fit">
            <span className="material-symbols-outlined text-lg">phone_in_talk</span>
            <span>Call Now</span>
          </button>
        </div>
      </div>
      {/* Office Hours & Address */}
      <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
        <h4 className="text-charcoal dark:text-white font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">location_on</span>
          Main Office
        </h4>
        <p className="text-[#3a4430] dark:text-[#cbd5c0] text-sm leading-relaxed mb-4">
          123 Skyline Towers, MG Road Area,<br />
          Bangalore, Karnataka 560001
        </p>
        <div className="space-y-2 border-t border-primary/20 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-text dark:text-[#a3b391]">Monday - Saturday</span>
            <span className="font-semibold">9 AM - 7 PM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-text dark:text-[#a3b391]">Sunday</span>
            <span className="font-semibold text-red-500">Closed</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDirectInfo;
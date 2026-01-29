import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const ContactDirectInfo: React.FC = () => {
  const { content } = useWebsiteContent();
  const contactSectionContent = content.homePage.contactSection; // Reusing this from HomePage

  return (
    <>
      {/* WhatsApp Card */}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#252d1c] p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-3xl">{contactSectionContent.whatsappCard.icon}</span>
              <p className="text-charcoal dark:text-white text-lg font-bold">{contactSectionContent.whatsappCard.title}</p>
            </div>
            <p className="text-muted-text dark:text-[#a3b391] text-sm font-normal">{contactSectionContent.whatsappCard.description}</p>
          </div>
          <a href={contactSectionContent.whatsappCard.buttonLink} className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-background-light dark:bg-[#192210] text-charcoal dark:text-white border border-[#e5e7eb] dark:border-[#2d3a1f] gap-2 text-sm font-semibold hover:bg-primary hover:text-charcoal transition-all w-fit">
            <span className="material-symbols-outlined text-lg">{contactSectionContent.whatsappCard.buttonIcon}</span>
            <span>{contactSectionContent.whatsappCard.buttonText}</span>
          </a>
        </div>
      </div>
      {/* Call Card */}
      <div className="flex items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-[#252d1c] p-6 shadow-sm border border-[#e5e7eb] dark:border-[#2d3a1f]">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-3xl">{contactSectionContent.callCard.icon}</span>
              <p className="text-charcoal dark:text-white text-lg font-bold">{contactSectionContent.callCard.title}</p>
            </div>
            <p className="text-charcoal dark:text-white text-base font-medium">{contactSectionContent.callCard.phoneNumber}</p>
            <p className="text-muted-text dark:text-[#a3b391] text-sm font-normal">{contactSectionContent.callCard.description}</p>
          </div>
          <a href={contactSectionContent.callCard.buttonLink} className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-lg h-10 px-6 bg-background-light dark:bg-[#192210] text-charcoal dark:text-white border border-[#e5e7eb] dark:border-[#2d3a1f] gap-2 text-sm font-semibold hover:bg-primary hover:text-charcoal transition-all w-fit">
            <span className="material-symbols-outlined text-lg">{contactSectionContent.callCard.buttonIcon}</span>
            <span>{contactSectionContent.callCard.buttonText}</span>
          </a>
        </div>
      </div>
      {/* Office Hours & Address */}
      <div className="p-6 rounded-xl bg-primary/10 border border-primary/20">
        <h4 className="text-charcoal dark:text-white font-bold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">{contactSectionContent.officeInfoCard.icon}</span>
          {contactSectionContent.officeInfoCard.title}
        </h4>
        <p className="text-[#3a4430] dark:text-[#cbd5c0] text-sm leading-relaxed mb-4">
          {contactSectionContent.officeInfoCard.addressLine1}<br />
          {contactSectionContent.officeInfoCard.addressLine2}<br />
          {contactSectionContent.officeInfoCard.addressLine3}
        </p>
        <div className="space-y-2 border-t border-primary/20 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-text dark:text-[#a3b391]">{contactSectionContent.officeInfoCard.scheduleMonSat}</span>
            <span className="font-semibold">{contactSectionContent.officeInfoCard.scheduleHoursMonSat}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-text dark:text-[#a3b391]">{contactSectionContent.officeInfoCard.scheduleSunday}</span>
            <span className="font-semibold text-red-500">{contactSectionContent.officeInfoCard.scheduleHoursSunday}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactDirectInfo;
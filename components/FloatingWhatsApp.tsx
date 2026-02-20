import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const FloatingWhatsApp: React.FC = () => {
  const { content } = useWebsiteContent();
  const link = content.header.contactWhatsAppButtonLink || content.footer.whatsappFloatingLink || '#';

  return (
    <a
      href={link}
      target={/^https?:\/\//.test(link) ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white size-14 rounded-full flex items-center justify-center shadow-2xl w-14 h-14 hover:scale-110 transition-transform"
    >
      <i className="fa-brands fa-whatsapp text-lg" aria-hidden="true"></i>
    </a>
  );
};

export default FloatingWhatsApp;


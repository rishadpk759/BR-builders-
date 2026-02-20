import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const Footer: React.FC = () => {
  const { content } = useWebsiteContent();

  return (
    <footer className="bg-charcoal text-gray-400 py-12 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-white mb-6">
            {(() => {
              const raw = content.footer.logoImageUrl || '';
              const trimmed = raw.trim ? raw.trim() : raw;
              const m = trimmed.match(/^url\((['"]?)(.*)\1\)$/i);
              const footerLogoUrl = m ? m[2] : trimmed;
              return footerLogoUrl ? (
                <img src={footerLogoUrl} alt={content.footer.logoText} className="h-10 w-auto max-w-[160px] object-contain" style={{ display: 'block' }} />
              ) : (
                <div className="size-6 text-primary" dangerouslySetInnerHTML={{ __html: content.footer.logoSvg }} />
              );
            })()}
          </div>
          <p className="text-sm leading-relaxed">{content.footer.description}</p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{content.footer.servicesTitle}</h5>
          <ul className="space-y-4 text-sm">
            {content.footer.servicesLinks.map((link) => (
              <li key={link.id}><a className="hover:text-primary" href={link.url}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{content.footer.companyTitle}</h5>
          <ul className="space-y-4 text-sm">
            {content.footer.companyLinks.map((link) => (
              <li key={link.id}><a className="hover:text-primary" href={link.url}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">{content.footer.newsletterTitle}</h5>
          <p className="text-sm mb-4">{content.footer.newsletterDescription}</p>
          <div className="flex">
            <input className="bg-white/10 border-none rounded-l-lg p-3 text-sm focus:ring-1 focus:ring-primary w-full" placeholder={content.footer.newsletterPlaceholder} type="email"/>
            <button className="bg-primary text-charcoal px-4 rounded-r-lg font-bold">
              <span className="material-symbols-outlined">{content.footer.newsletterButtonIcon}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto border-t border-white/10 mt-12 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>{content.footer.copyrightText}</p>
        <div className="flex gap-6">
          {content.footer.socialLinks.map((link) => (
            <a key={link.id} className="hover:text-white transition-colors" href={link.url}>
              {/* Assuming icon is text for now, could be SVG */}
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      {/* Floating WhatsApp removed — handled via header button */}
    </footer>
  );
};

export default Footer;
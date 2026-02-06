import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateConstruction: () => void;
  onNavigateBuy: () => void;
  onNavigateRent: () => void;
  onNavigateAboutUs: () => void;
  onNavigateContact: () => void;
  activeNav: 'home' | 'construction' | 'buy' | 'rent' | 'contact' | 'about';
}

export const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateConstruction, onNavigateBuy, onNavigateRent, onNavigateAboutUs, onNavigateContact, activeNav }) => {
  const { content } = useWebsiteContent();

  const handleNavLinkClick = (page: 'home' | 'construction' | 'buy' | 'rent' | 'contact' | 'about') => {
    switch (page) {
      case 'home':
        onNavigateHome();
        break;
      case 'construction':
        onNavigateConstruction();
        break;
      case 'buy':
        onNavigateBuy();
        break;
      case 'rent':
        onNavigateRent();
        break;
      case 'about':
        onNavigateAboutUs();
        break;
      case 'contact':
        onNavigateContact();
        break;
      default:
        onNavigateHome();
    }
  };

  const linkClass = (navItemPage?: 'home' | 'construction' | 'buy' | 'rent' | 'contact' | 'about') =>
    `text-sm font-medium leading-normal hover:text-primary transition-colors cursor-pointer ${
      navItemPage && activeNav === navItemPage ? 'text-primary underline underline-offset-4' : ''
    }`;

  // Normalize stored image URL values (strip url(...) wrapper if present)
  const resolveImageUrl = (raw?: string) => {
    if (!raw) return '';
    const trimmed = raw.trim();
    const match = trimmed.match(/^url\((['"]?)(.*)\1\)$/i);
    if (match) return match[2];
    return trimmed;
  };

  const headerLogoUrl = resolveImageUrl(content.header.logoImageUrl || '');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e0e6db] bg-white dark:bg-background-dark dark:border-[#2a3620] px-4 md:px-10 lg:px-40 py-3">
      <div className="flex items-center justify-between whitespace-nowrap max-w-[1280px] mx-auto">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-charcoal dark:text-white cursor-pointer" onClick={onNavigateHome}>
            {headerLogoUrl ? (
              <img src={headerLogoUrl} alt={content.header.logoText} className="w-10 h-10 object-contain" />
            ) : (
              <div className="size-6 text-primary" dangerouslySetInnerHTML={{ __html: content.header.logoSvg }} />
            )}
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {content.header.navLinks.map((link) => {
              // If an explicit URL is provided, render as an anchor
              if (link.url) {
                const isExternal = /^https?:\/\//.test(link.url);
                return (
                  <a key={link.id} className="text-sm font-medium leading-normal hover:text-primary transition-colors" href={link.url} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined}>
                    {link.label}
                  </a>
                );
              }
              // Otherwise fall back to internal page routing via page field
              return (
                <button key={link.id} className={linkClass(link.page as any)} onClick={() => handleNavLinkClick(link.page as any)}>
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Search */}
        <div className="flex-1 px-6">
          <label className="hidden lg:flex w-full">
            <div className="flex w-full items-stretch rounded-lg h-10 max-w-2xl mx-auto">
              <div className="text-muted-text flex border-none bg-[#f2f4f0] dark:bg-[#2a3620] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-charcoal dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f2f4f0] dark:bg-[#2a3620] focus:border-none h-full placeholder:text-muted-text px-4 rounded-l-none border-l-0 pl-2 text-base font-normal"
                placeholder={content.header.searchPlaceholder}
                aria-label="Search properties"
                value=""
              />
            </div>
          </label>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <a
            className="flex min-w-[84px] items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#25D366] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-105 active:scale-95 transition-all"
            href={content.header.contactWhatsAppButtonLink || content.header.contactWhatsAppButtonText === 'Contact WhatsApp' ? content.header.contactWhatsAppButtonLink || '#' : '#'}
            target={content.header.contactWhatsAppButtonLink && /^https?:\/\//.test(content.header.contactWhatsAppButtonLink) ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined mr-2">{content.header.whatsappChatIcon}</span>
            <span>{content.header.contactWhatsAppButtonText}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
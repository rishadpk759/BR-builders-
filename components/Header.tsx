import React, { useState, useEffect, useRef } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement | null>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e0e6db] bg-white dark:bg-background-dark dark:border-[#2a3620] px-4 md:px-10 lg:px-40 py-3">
      <div className="flex items-center justify-between whitespace-nowrap max-w-[1280px] mx-auto">
        {/* Left: Logo + Nav Links */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-charcoal dark:text-white cursor-pointer" onClick={onNavigateHome}>
            {headerLogoUrl ? (
              <img
                src={headerLogoUrl}
                alt={content.header.logoText}
                className="h-10 md:h-12 w-auto max-w-[200px] object-contain"
                style={{ display: 'block' }}
              />
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
          {/* Mobile: hamburger */}
          <div className="md:hidden flex items-center" ref={mobileRef}>
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {mobileOpen && (
              <div className="absolute left-4 top-full mt-2 w-[90%] bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4">
                <div className="flex flex-col gap-3">
                  {content.header.navLinks.map((link) => {
                    if (link.url) {
                      const isExternal = /^https?:\/\//.test(link.url);
                      return (
                        <a key={link.id} className="text-sm font-medium leading-normal hover:text-primary transition-colors" href={link.url} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} onClick={() => setMobileOpen(false)}>
                          {link.label}
                        </a>
                      );
                    }
                    return (
                      <button key={link.id} className="text-sm text-left" onClick={() => { setMobileOpen(false); handleNavLinkClick(link.page as any); }}>
                        {link.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </label>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop: full button */}
          <a
            className="hidden md:flex min-w-[84px] items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#25D366] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-105 active:scale-95 transition-all"
            href={content.header.contactWhatsAppButtonLink || '#'}
            target={content.header.contactWhatsAppButtonLink && /^https?:\/\//.test(content.header.contactWhatsAppButtonLink) ? '_blank' : undefined}
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-whatsapp mr-2" aria-hidden="true"></i>
            <span>{content.header.contactWhatsAppButtonText}</span>
          </a>
          {/* Mobile: icon-only */}
          <a
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366] text-white"
            href={content.header.contactWhatsAppButtonLink || '#'}
            target={content.header.contactWhatsAppButtonLink && /^https?:\/\//.test(content.header.contactWhatsAppButtonLink) ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="fa-brands fa-whatsapp" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
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

  const linkClass = (navItemPage: 'home' | 'construction' | 'buy' | 'rent' | 'contact' | 'about') =>
    `text-sm font-medium leading-normal hover:text-primary transition-colors cursor-pointer ${
      activeNav === navItemPage ? 'text-primary underline underline-offset-4' : ''
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e0e6db] bg-white dark:bg-background-dark dark:border-[#2a3620] px-4 md:px-10 lg:px-40 py-3">
      <div className="flex items-center justify-between whitespace-nowrap max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-charcoal dark:text-white cursor-pointer" onClick={onNavigateHome}>
            <div className="size-6 text-primary" dangerouslySetInnerHTML={{ __html: content.header.logoSvg }}>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-display">{content.header.logoText}</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            {content.header.navLinks.map((link) => (
              <a key={link.id} className={linkClass(link.page)} onClick={() => handleNavLinkClick(link.page)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-muted-text flex border-none bg-[#f2f4f0] dark:bg-[#2a3620] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-charcoal dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f2f4f0] dark:bg-[#2a3620] focus:border-none h-full placeholder:text-muted-text px-4 rounded-l-none border-l-0 pl-2 text-base font-normal" placeholder={content.header.searchPlaceholder} value="" />
            </div>
          </label>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#25D366] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined">{content.header.whatsappChatIcon}</span>
            {content.header.contactWhatsAppButtonText}
          </button>
          <div className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
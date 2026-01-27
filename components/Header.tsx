import React from 'react';

interface HeaderProps {
  onNavigateHome: () => void; // For the actual homepage
  onNavigateConstruction: () => void; // For the Construction Portfolio Page
  onNavigateBuy: () => void;
  onNavigateRent: () => void;
  onNavigateAboutUs: () => void; // Added handler for About Us
  onNavigateContact: () => void;
  activeNav: 'home' | 'construction' | 'buy' | 'rent' | 'contact'; // Updated activeNav type
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateConstruction, onNavigateBuy, onNavigateRent, onNavigateAboutUs, onNavigateContact, activeNav }) => {
  const linkClass = (navItem: 'home' | 'construction' | 'buy' | 'rent' | 'contact') =>
    `text-sm font-medium leading-normal hover:text-primary transition-colors cursor-pointer ${
      activeNav === navItem ? 'text-primary underline underline-offset-4' : ''
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-solid border-[#e0e6db] bg-white dark:bg-background-dark dark:border-[#2a3620] px-4 md:px-10 lg:px-40 py-3">
      <div className="flex items-center justify-between whitespace-nowrap max-w-[1280px] mx-auto">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 text-charcoal dark:text-white cursor-pointer" onClick={onNavigateHome}>
            <div className="size-6 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] font-display">BR Builders &amp; Developers</h2>
          </div>
          <nav className="hidden md:flex items-center gap-9">
            <a className={linkClass('construction')} onClick={onNavigateConstruction}>Construction</a>
            <a className={linkClass('buy')} onClick={onNavigateBuy}>Buy Homes</a>
            <a className={linkClass('rent')} onClick={onNavigateRent}>Rent Homes</a>
            <a className={linkClass('home')} onClick={onNavigateAboutUs}>About Us</a> {/* Changed 'href' to 'onClick' and 'home' as a placeholder for about us */}
            <a className={linkClass('contact')} onClick={onNavigateContact}>Contact</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-muted-text flex border-none bg-[#f2f4f0] dark:bg-[#2a3620] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined text-[20px]">search</span>
              </div>
              <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-charcoal dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f2f4f0] dark:bg-[#2a3620] focus:border-none h-full placeholder:text-muted-text px-4 rounded-l-none border-l-0 pl-2 text-base font-normal" placeholder="Search areas..." value="" />
            </div>
          </label>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-[#25D366] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:brightness-105 active:scale-95 transition-all">
            <span className="material-symbols-outlined">chat</span>
            Contact WhatsApp
          </button>
          <div className="hidden sm:block bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-[#e0e6db] dark:border-[#2a3620]" data-alt="User profile avatar" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBgrgdRV4Cu0GgCfWOmpNLDllaUocsXN4C1Y1sFB7ycm3AUBwqYR70QP7NcPhga0FrlVA_UyRcbnYMaqRD4iiARkPKdtvQRyZnGAJf9qrLyJeTrJbFrJiBZ-keTgsimVbU1amVuezKepmZZnGAJf9qrLyJeTrJbFrJiBZ-keTgsimVbU1amVuezKepmZJCZw2fqtBRJ5VweHQzxXHCzfVat-gMFF-DndJgc16H0Gzhvt5Oa42bWWTNdfMsgqP6XKUIjP8m1LCfMl4xAu1L2ZYw_Pp8u2D7PxLNt4PjJ02u7fv225cNrBNHmpjDpQ")' }}></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
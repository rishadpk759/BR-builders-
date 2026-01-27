import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-gray-400 py-12 px-6 md:px-10">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 text-white mb-6">
            <div className="size-6 text-primary">
              <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"></path>
              </svg>
            </div>
            <span className="text-lg font-bold">BR Builders</span>
          </div>
          <p className="text-sm leading-relaxed">Defining skyline and quality of living since 1998. Your dream, our foundation.</p>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Services</h5>
          <ul className="space-y-4 text-sm">
            <li><a className="hover:text-primary" href="#">Build Your Dream Home</a></li>
            <li><a className="hover:text-primary" href="#">Turnkey Construction</a></li>
            <li><a className="hover:text-primary" href="#">Renovations</a></li>
            <li><a className="hover:text-primary" href="#">Buy Property</a></li>
            <li><a className="hover:text-primary" href="#">Rent a Property</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Company</h5>
          <ul className="space-y-4 text-sm">
            <li><a className="hover:text-primary" href="#">Blog</a></li>
            <li><a className="hover:text-primary" href="#">About Us</a></li>
            <li><a className="hover:text-primary" href="#">Contact</a></li>
            <li><a className="hover:text-primary" href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-bold mb-6 uppercase tracking-wider text-xs">Newsletter</h5>
          <p className="text-sm mb-4">Get construction tips and trends.</p>
          <div className="flex">
            <input className="bg-white/10 border-none rounded-l-lg p-3 text-sm focus:ring-1 focus:ring-primary w-full" placeholder="Your email" type="email"/>
            <button className="bg-primary text-charcoal px-4 rounded-r-lg font-bold">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-[1280px] mx-auto border-t border-white/10 mt-12 pt-8 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© 2024 BR Builders &amp; Developers. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-white transition-colors" href="#">Instagram</a>
          <a className="hover:text-white transition-colors" href="#">LinkedIn</a>
          <a className="hover:text-white transition-colors" href="#">YouTube</a>
        </div>
      </div>
      {/* Floating WhatsApp for Mobile */}
      <a className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white size-14 rounded-full flex items-center justify-center shadow-2xl md:hidden hover:scale-110 transition-transform" href="#">
        <svg className="size-8 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.503-2.961-2.617-.087-.114-.708-.941-.708-1.792s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.238-.046.373.275.138.332.472 1.154.513 1.241.041.087.068.188.01.303-.058.114-.087.188-.173.289l-.26.3c-.087.101-.18.211-.077.39.103.179.458.753.985 1.223.677.602 1.248.789 1.422.875.173.085.275.071.376-.046.101-.117.433-.505.548-.678.114-.173.231-.144.39-.087s1.011.477 1.184.563c.173.085.289.13.332.202.045.072.045.419-.1.824zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></svg>
      </a>
    </footer>
  );
};

export default Footer;
import React from 'react';

const ConstructionPortfolioPage: React.FC = () => {
  return (
    <main className="max-w-[1280px] mx-auto overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-10 py-10">
        <div className="relative min-h-[520px] rounded-xl overflow-hidden flex items-end p-8 md:p-16 bg-cover bg-center" data-alt="Modern luxury villa under construction with scaffolding" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAWI0t4Du691d4twU3y_HN6y2Tm1SbwjiXwrf_4PLnDPTxjeKeCX6AUj2n-tn0VHhxtXFMzVXp9k5706TwxcjtMyvHw11tdeZLQLGK9aa68A2gswm_rEQ4xZUVg_dFRTa7JgufPmn1wo-fMzA82qVfERvU9GUbaGWYPzVwNpbb6yjZYj2Yqo4VYjNUmTvBW-3y-MBr1_iAlJdEMcj3poAd9TMyp15tkC1yApfWybR7IkrZZRYZvmEVdkW4mxIhzZuCHbvyJD3tySg')` }}>
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              Your Vision, Our <span className="text-primary">Craftsmanship</span>
            </h1>
            <p className="text-lg md:text-xl font-normal text-gray-200">
              Premium custom home building services on your plots. We bring architectural excellence to your doorstep with unmatched transparency.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-primary text-charcoal px-8 py-4 rounded-lg text-base font-bold hover:scale-105 transition-transform">
                Discuss Your Home Plan
              </button>
              <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-white/30 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">forum</span>
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Service Is For */}
      <section className="py-16 px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">Who This Service Is For</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white dark:bg-[#252c1e] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">landscape</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Plot Owners</h3>
            <p className="text-muted-text dark:text-gray-400 leading-relaxed">
              Individuals who already own land and want a reliable partner to transform their property into a dream home.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white dark:bg-[#252c1e] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">architecture</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Custom Home Seekers</h3>
            <p className="text-muted-text dark:text-gray-400 leading-relaxed">
              Those looking for a bespoke architectural design tailored specifically to their lifestyle and family needs.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white dark:bg-[#252c1e] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-4xl">apartment</span>
            </div>
            <h3 className="text-xl font-bold mb-3">Luxury Villa Investors</h3>
            <p className="text-muted-text dark:text-gray-400 leading-relaxed">
              Investors seeking high-quality construction and premium finishes for maximum appreciation and rental yield.
            </p>
          </div>
        </div>
      </section>

      {/* Construction Approach (Timeline) */}
      <section className="py-16 px-6 md:px-10 bg-white dark:bg-background-dark rounded-3xl mx-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold mb-4">Our Construction Approach</h2>
          <p className="text-muted-text max-w-xl mx-auto">A systematic, 5-step journey from your first call to the day you move in.</p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 px-4">
          {/* Step 1 */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Discussion</h4>
            <p className="text-sm text-muted-text px-2">Initial consultation to understand your vision and budget.</p>
          </div>
          {/* Line Decor */}
          <div className="hidden md:block flex-1 h-0.5 bg-primary/30 -mt-16"></div>
          {/* Step 2 */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined">draw</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Planning</h4>
            <p className="text-sm text-muted-text px-2">Architectural blueprints and regulatory approvals.</p>
          </div>
          <div className="hidden md:block flex-1 h-0.5 bg-primary/30 -mt-16"></div>
          {/* Step 3 */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined">layers</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Materials</h4>
            <p className="text-sm text-muted-text px-2">Selection of premium raw materials and high-end finishes.</p>
          </div>
          <div className="hidden md:block flex-1 h-0.5 bg-primary/30 -mt-16"></div>
          {/* Step 4 */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined">engineering</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Supervision</h4>
            <p className="text-sm text-muted-text px-2">Rigorous on-site quality control and daily reporting.</p>
          </div>
          <div className="hidden md:block flex-1 h-0.5 bg-primary/30 -mt-16"></div>
          {/* Step 5 */}
          <div className="flex-1 flex flex-col items-center text-center group">
            <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
              <span className="material-symbols-outlined">vpn_key</span>
            </div>
            <h4 className="font-bold text-lg mb-2">Handover</h4>
            <p className="text-sm text-muted-text px-2">Final inspection and key ceremony for your new home.</p>
          </div>
        </div>
      </section>

      {/* Past Work Gallery */}
      <section className="py-20 px-6 md:px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">Gallery of Past Work</h2>
            <p className="text-muted-text">Explore our recently completed residential projects across the city.</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-2 hover:underline">
            View All Projects <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Project 1 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all"></div>
              <img alt="Luxury White Villa" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Modern white luxury villa project with pool" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIqhD37EOmXZhJFEqZzXPYQFNMHrp4RiwIR1iRK0T79E0SenmnQ9dJP5pda4s714_wsnV2Q50J8Q47vY2KmonC0M2QEqvdMvR_8KmIizV1NdAnCvbCjQVKUZqe97cAq97atfk0ZpeS1pW_aLtXpaiFYnAbdo-TzCk0eIOu-A2p5897B59EVZb2gKMei5U4m9dir30qjJxdPOPAIfyB0o9XSZ5fGif1CxqI1lMOcrND41rsVcH4uEMgDOhB_t8kUVMgB0swrzs6s3o"/>
              <div className="absolute top-4 right-4 bg-primary text-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Completed
              </div>
            </div>
            <h4 className="font-bold text-lg">Emerald Heights Villa</h4>
            <p className="text-sm text-muted-text flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span> Skyline Residency, Bangalore
            </p>
          </div>
          {/* Project 2 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all"></div>
              <img alt="Modern minimalist home" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Minimalist modern house architecture showcase" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAb9zqpqtRFbg4fYu8u2Ynt17NJMwFPFSV9v1S7lg90MS1ycpHV0HxEBwYWFPwiqPKxOH9ucK1zKJhP1EadOTvlK0vUulWKOIGUiF_JvDXnrVxIj50R6mvhzkhlES6rjFH9UCLjluC2c9WW0ZKmRuDOSqAcVjqa7KKVLkixuwdWkmn9X2zj7xCWbEw6gfw_V36s7TsySDCmn3vyKH-CA9UuwAQtHp9iFGpMuu75i3lxoNsrZwa_pnFjMLDC9uTCKlB9Kx6pqY6il3A"/>
              <div className="absolute top-4 right-4 bg-primary text-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Completed
              </div>
            </div>
            <h4 className="font-bold text-lg">The Minimalist Retreat</h4>
            <p className="text-sm text-muted-text flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span> Whitefield Estates
            </p>
          </div>
          {/* Project 3 */}
          <div className="group cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all"></div>
              <img alt="Traditional modern blend" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Traditional modern fusion architectural home design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJEYwohrNQMDijqxWiwPyI99iIv82P0cTr7HKR1DSSWk1quoziuRWB4auyQ3Q14evU4ZA1KsloLMZQVWMSz1DXLYXpi_EyZV6c5tS90Apnf2_TB0p-7AEqBPOkZpcGXFzrCv1zaWqHTgJpLqb6TUf4Gs85-046e-zWpkUxR6DIpT8Nhc7cDUnjBbf7MmLstwPcESIH2SWIzz3KUOUUW15e8pStqm79j8KJ98DtTiVZAq_of-s_WvdlmWPmZMnnfrOEcEWCmIqX7Xo"/>
              <div className="absolute top-4 right-4 bg-primary text-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Completed
              </div>
            </div>
            <h4 className="font-bold text-lg">Zenith Garden House</h4>
            <p className="text-sm text-muted-text flex items-center gap-1">
              <span className="material-symbols-outlined text-base">location_on</span> JP Nagar South
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-[#1f2913]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-text">Clear answers to your most pressing construction concerns.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h4 className="font-bold text-lg flex justify-between items-center cursor-pointer">
                Do I need to own land before starting?
                <span className="material-symbols-outlined">expand_more</span>
              </h4>
              <p className="mt-4 text-muted-text dark:text-gray-400">Yes, our primary service focuses on building high-quality custom homes on client-owned plots. However, we can assist with plot selection and soil testing during the pre-construction phase.</p>
            </div>
            <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h4 className="font-bold text-lg flex justify-between items-center cursor-pointer">
                How is pricing transparency maintained?
                <span className="material-symbols-outlined">expand_more</span>
              </h4>
              <p className="mt-4 text-muted-text dark:text-gray-400">We provide a detailed bill of quantities (BOQ) with fixed prices for materials and labor. Any deviations or upgrades are documented and approved by you beforehand, ensuring no hidden costs at handover.</p>
            </div>
            <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h4 className="font-bold text-lg flex justify-between items-center cursor-pointer">
                Do you handle building permits and local approvals?
                <span className="material-symbols-outlined">expand_more</span>
              </h4>
              <p className="mt-4 text-muted-text dark:text-gray-400">Absolutely. Our team takes care of all regulatory documentation, from initial plan approvals to occupancy certificates (OC) and utility connections.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="bg-primary/10 dark:bg-primary/5 rounded-3xl p-10 md:p-20 flex flex-col items-center text-center space-y-8 border-2 border-primary/20">
          <div className="flex -space-x-4">
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt="Project manager profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2ZWe7-7x4IaROTG3cfNMMw_hzjOgCu9y9X7cBhhqQlYxp0dNjhiSTyrp0jkIB7YBduCoXUEqljhHQjK8PINlzVwbqqjPC-14mZmxHG2w39AfSzomqQGYSayMCMRXsZ0uB8fdeC_6YMtC8ZXmGymurHDGkiJ9p-cB21yHjNVuAZK96QyrOGm4_5QkJLnIK4NKRKmGaKT6d9hJbYbNnPIj4R1TSxzLQ2l6HjZtwesnCPWoT30flKFOWbHsgLX_YCMVKfNXDKOjIUX0"/>
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt="Client service representative" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU6kXsWIc14lRsUhnd-vZClRx_xTtLLWaAO1JTDI66NZwnXVh2RwYAXV6ZD7r7Y6lQXNFmKDNbs-lNAhGvncdRfombBWeYVww1_BQ8FfFrUnLihAzGv-KwT1ADpMPao7bxyr6JF2G0uE7hMJGxwnSusjT6AwLigErdlAiAQ8o27qB3DGm6jBygYsRSBSyHZ4y7qVsFjptDm2AyfJFtIwf7iN-xoazGZM5pkevYMFSzr6dKcGVpp76yrG4tXKlyYHzMq1jWIsYqnpI"/>
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt="Architect profile photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjH56yvwEOw-ISgs6THm_dcewpvIhm_AGcb1MKGpo1abzyRKvebIQ0if_TvuXERPAAgOUXweX0-QOFhvfwyQ1YZT_IxN_btkqEtofT2Ns5rfI8yfJC92TWrOdtAeAiweDvizssqtU0Wx5YBkXgBz6UkJqKJhQLg0_K4sI32_0SYkVn1Ks_do7iWuQAVjuuFFdwILwBE0pwufzvvv4tkvw1UwKk6D1sRbsKvxe7zRFIsl_Itg-qL4e_qvRme4A2VgbDj4oPXjlPxg"/>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4 text-charcoal dark:text-white">Ready to Build Your Dream Home?</h2>
            <p className="text-lg text-muted-text dark:text-gray-300">Our experts are ready to guide you through every brick and tile. Join 200+ happy families who built their legacy with us.</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button className="bg-primary text-charcoal px-10 py-5 rounded-xl text-lg font-extrabold hover:scale-105 transition-all shadow-xl shadow-primary/30 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">calendar_today</span>
              Book Free Consultation
            </button>
            <button className="bg-[#25D366] text-white px-10 py-5 rounded-xl text-lg font-extrabold hover:scale-105 transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-3">
              <svg className="size-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.181-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.503-2.961-2.617-.087-.114-.708-.941-.708-1.792s.448-1.273.607-1.446c.159-.173.346-.217.462-.217s.231.006.332.013c.101.007.238-.046.373.275.138.332.472 1.154.513 1.241.041.087.068.188.01.303-.058.114-.087.188-.173.289l-.26.3c-.087.101-.18.211-.077.39.103.179.458.753.985 1.223.677.602 1.248.789 1.422.875.173.085.275.071.376-.046.101-.117.433-.505.548-.678.114-.173.231-.144.39-.087s1.011.477 1.184.563c.173.085.289.13.332.202.045.072.045.419-.1.824zM12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2z"></path></svg>
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConstructionPortfolioPage;
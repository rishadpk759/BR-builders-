import React from 'react';
import { useWebsiteContent } from '../WebsiteContentContext';

const HeroSection: React.FC = () => {
  const { content } = useWebsiteContent();
  const heroContent = content.homePage.hero;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-16">
        <div className="relative h-[500px] md:h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: heroContent.backgroundImage }} />
          <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-20 max-w-2xl">
            <div className="mb-4">
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {heroContent.tagline}
              </span>
            </div>
            <div className="space-y-4">
              <div className="transform transition-all duration-700 hover:scale-[1.02]">
                <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6" dangerouslySetInnerHTML={{ __html: heroContent.title }} />
              </div>
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-8">
                {heroContent.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={heroContent.primaryButtonLink} className="bg-primary text-charcoal px-8 py-3 rounded-lg text-base font-bold transition-all transform hover:scale-105">
                  {heroContent.primaryButtonText}
                </a>
                <a href={heroContent.secondaryButtonLink} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-lg text-base font-bold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2">
                  <span className="material-symbols-outlined">{heroContent.secondaryButtonIcon}</span>
                  {heroContent.secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
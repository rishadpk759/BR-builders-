import React from 'react';
import { useWebsiteContent, CommitmentItemData } from '../WebsiteContentContext';

interface WhatWeDoCardProps {
  card: { id: string; icon: string; title: string; description: string; };
}

const WhatWeDoCard: React.FC<WhatWeDoCardProps> = ({ card }) => {
  return (
    <div className="group bg-white dark:bg-background-dark p-8 rounded-xl border border-transparent hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5">
      <div className="size-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
        <span className="material-symbols-outlined text-3xl">{card.icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-4">{card.title}</h3>
      <p className="opacity-70 leading-relaxed">
        {card.description}
      </p>
    </div>
  );
};

const AboutUsPage: React.FC = () => {
  const { content } = useWebsiteContent();
  const pageContent = content.aboutUsPage;

  return (
    <main className="relative flex-1 flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 py-8 md:py-16">
          <div className="relative h-[500px] md:h-[600px] w-full rounded-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: pageContent.hero.backgroundImage }}>
            </div>
            <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-20 max-w-2xl">
              <span className="bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">{pageContent.hero.tagline}</span>
              <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
                {pageContent.hero.title}
              </h1>
              <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed mb-8">
                {pageContent.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <a href={pageContent.hero.primaryButtonLink} className="bg-primary text-charcoal px-8 py-3 rounded-lg text-base font-bold transition-all hover:shadow-lg hover:shadow-primary/30">
                  {pageContent.hero.primaryButtonText}
                </a>
                <a href={pageContent.hero.secondaryButtonLink} className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-3 rounded-lg text-base font-bold hover:bg-white/20 transition-all">
                  {pageContent.hero.secondaryButtonText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-background-dark/50">
        <div className="max-w-[800px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{pageContent.ourStory.sectionTitle}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="prose prose-lg dark:prose-invert mx-auto text-charcoal/80 dark:text-white/80 space-y-6 leading-relaxed text-center md:text-left">
            <p>
              {pageContent.ourStory.paragraph1}
            </p>
            <p>
              {pageContent.ourStory.paragraph2}
            </p>
            <p>
              {pageContent.ourStory.paragraph3}
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">{pageContent.whatWeDo.sectionTitle}</h2>
              <p className="text-lg opacity-80">{pageContent.whatWeDo.sectionDescription}</p>
            </div>
            <a className="text-primary font-bold flex items-center gap-2 hover:underline" href={pageContent.whatWeDo.exploreAllServicesButtonLink}>
              {pageContent.whatWeDo.exploreAllServicesButtonText} <span className="material-symbols-outlined">{pageContent.whatWeDo.exploreAllServicesButtonIcon}</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <WhatWeDoCard card={pageContent.whatWeDo.rentCard} />
            <WhatWeDoCard card={pageContent.whatWeDo.buyCard} />
            <WhatWeDoCard card={pageContent.whatWeDo.constructionCard} />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24 bg-charcoal text-white">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-black mb-8">{pageContent.ourValues.sectionTitle}</h2>
            <ul className="space-y-8">
              {pageContent.ourValues.items.map((item: CommitmentItemData) => (
                <li key={item.id} className="flex gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 rotate-3 transition-transform hover:rotate-0">
              <img alt={pageContent.ourValues.imageAlt} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" src={pageContent.ourValues.image}/>
            </div>
          </div>
        </div>
      </section>

      {/* Local Commitment Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-background-light dark:bg-background-dark p-8 md:p-16 rounded-3xl border border-black/5 dark:border-white/5 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/3 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{pageContent.localCommitment.sectionTitle}</h3>
              <p className="opacity-70 mb-6">{pageContent.localCommitment.sectionDescription}</p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-primary">{pageContent.localCommitment.mainOfficeIcon}</span> {pageContent.localCommitment.mainOfficeInfo}
                </div>
                <div className="flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-primary">{pageContent.localCommitment.phoneIcon}</span> {pageContent.localCommitment.phoneInfo}
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3 h-[300px] bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative border border-white/10">
              {/* Stylized Map Placeholder */}
              <img alt={pageContent.localCommitment.mapImageAlt} className="w-full h-full object-cover opacity-50 dark:opacity-30" src={pageContent.localCommitment.mapImage}/>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-primary/40"></div>
                  <div className="relative size-6 bg-primary rounded-full border-2 border-white shadow-lg"></div>
                </div>
              </div>
            </div>
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-charcoal">
        <div className="max-w-[1000px] mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-black mb-6">{pageContent.ctaSection.title}</h2>
          <p className="text-lg md:text-xl font-normal max-w-3xl mx-auto mb-10">
            {pageContent.ctaSection.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={pageContent.ctaSection.whatsappButtonLink} className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-lg text-lg font-bold hover:brightness-110 transition-all shadow-xl shadow-[#25D366]/30">
              <div dangerouslySetInnerHTML={{ __html: pageContent.ctaSection.whatsappButtonIconSvg }} />
              {pageContent.ctaSection.whatsappButtonText}
            </a>
            <a href={pageContent.ctaSection.bookMeetingButtonLink} className="flex items-center justify-center gap-3 bg-white text-charcoal px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all shadow-xl shadow-gray-300/30">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              {pageContent.ctaSection.bookMeetingButtonText}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUsPage;
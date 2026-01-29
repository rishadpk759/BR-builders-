import React from 'react';
import { useWebsiteContent, ConstructionProjectData, FAQItemData, CommitmentItemData } from '../WebsiteContentContext';

interface WhoThisServiceIsForCardProps {
  item: CommitmentItemData; // Reusing CommitmentItemData for structure here
}

const WhoThisServiceIsForCard: React.FC<WhoThisServiceIsForCardProps> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-[#252c1e] p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl">{item.icon}</span>
      </div>
      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
      <p className="text-muted-text dark:text-gray-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  );
};

interface ConstructionApproachStepProps {
  step: { id: string; icon: string; title: string; description: string; };
}

const ConstructionApproachStep: React.FC<ConstructionApproachStepProps> = ({ step }) => {
  return (
    <div className="flex-1 flex flex-col items-center text-center group">
      <div className="size-16 rounded-full bg-primary flex items-center justify-center text-charcoal font-bold mb-4 relative z-10 shadow-lg shadow-primary/20 ring-4 ring-white dark:ring-background-dark">
        <span className="material-symbols-outlined">{step.icon}</span>
      </div>
      <h4 className="font-bold text-lg mb-2">{step.title}</h4>
      <p className="text-sm text-muted-text px-2">{step.description}</p>
    </div>
  );
};

interface ConstructionProjectCardProps {
  project: ConstructionProjectData;
}

const ConstructionProjectCard: React.FC<ConstructionProjectCardProps> = ({ project }) => {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-video rounded-xl overflow-hidden mb-4 shadow-md">
        <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/0 transition-all"></div>
        <img alt={project.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src={project.imageUrl}/>
        <div className="absolute top-4 right-4 bg-primary text-charcoal px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          {project.status}
        </div>
      </div>
      <h4 className="font-bold text-lg">{project.title}</h4>
      <p className="text-sm text-muted-text flex items-center gap-1">
        <span className="material-symbols-outlined text-base">location_on</span> {project.location}
      </p>
    </div>
  );
};

interface FAQItemProps {
  faq: FAQItemData;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="bg-white dark:bg-background-dark border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h4
        className="font-bold text-lg flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {faq.question}
        <span className="material-symbols-outlined transition-transform duration-300" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>expand_more</span>
      </h4>
      {isOpen && (
        <p className="mt-4 text-muted-text dark:text-gray-400">
          {faq.answer}
        </p>
      )}
    </div>
  );
};


const ConstructionPortfolioPage: React.FC = () => {
  const { content, constructionProjects, isLoading, error } = useWebsiteContent(); // Use constructionProjects from context
  const pageContent = content.constructionPortfolioPage;

  if (isLoading) {
    return <main className="max-w-[1280px] mx-auto py-16 text-center text-xl dark:text-white">Loading construction portfolio...</main>;
  }

  if (error) {
    return <main className="max-w-[1280px] mx-auto py-16 text-center text-red-500 text-xl">Error: {error}</main>;
  }

  return (
    <main className="max-w-[1280px] mx-auto overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-6 md:px-10 py-10">
        <div className="relative min-h-[520px] rounded-xl overflow-hidden flex items-end p-8 md:p-16 bg-cover bg-center" data-alt={pageContent.hero.backgroundImageAlt} style={{ backgroundImage: pageContent.hero.backgroundImage }}>
          <div className="max-w-2xl text-white space-y-6">
            <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tight">
              {pageContent.hero.title} <span className="text-primary">{pageContent.hero.craftsmanshipHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl font-normal text-gray-200">
              {pageContent.hero.description}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href={pageContent.hero.primaryButtonLink} className="bg-primary text-charcoal px-8 py-4 rounded-lg text-base font-bold hover:scale-105 transition-transform">
                {pageContent.hero.primaryButtonText}
              </a>
              <a href={pageContent.hero.secondaryButtonLink} className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-lg text-base font-bold hover:bg-white/30 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">{pageContent.hero.secondaryButtonIcon}</span>
                {pageContent.hero.secondaryButtonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Service Is For */}
      <section className="py-16 px-6 md:px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-4">{pageContent.whoThisServiceIsFor.sectionTitle}</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pageContent.whoThisServiceIsFor.items.map((item) => (
            <WhoThisServiceIsForCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Construction Approach (Timeline) */}
      <section className="py-16 px-6 md:px-10 bg-white dark:bg-background-dark rounded-3xl mx-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold mb-4">{pageContent.constructionApproach.sectionTitle}</h2>
          <p className="text-muted-text max-w-xl mx-auto">{pageContent.constructionApproach.sectionDescription}</p>
        </div>
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-4 px-4">
          {pageContent.constructionApproach.steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <ConstructionApproachStep step={step} />
              {index < pageContent.constructionApproach.steps.length - 1 && (
                <div className="hidden md:block flex-1 h-0.5 bg-primary/30 -mt-16"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* Past Work Gallery */}
      <section className="py-20 px-6 md:px-10">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold mb-2">{pageContent.gallery.sectionTitle}</h2>
            <p className="text-muted-text">{pageContent.gallery.sectionDescription}</p>
          </div>
          <a href={pageContent.gallery.viewAllProjectsButtonLink} className="text-primary font-bold flex items-center gap-2 hover:underline">
            {pageContent.gallery.viewAllProjectsButtonText} <span className="material-symbols-outlined text-sm">{pageContent.gallery.viewAllProjectsButtonIcon}</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {constructionProjects.map((project) => (
            <ConstructionProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-10 bg-gray-50 dark:bg-[#1f2913]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-4">{pageContent.faqSection.sectionTitle}</h2>
            <p className="text-muted-text">{pageContent.faqSection.sectionDescription}</p>
          </div>
          <div className="space-y-4">
            {pageContent.faqSection.faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 md:px-10">
        <div className="bg-primary/10 dark:bg-primary/5 rounded-3xl p-10 md:p-20 flex flex-col items-center text-center space-y-8 border-2 border-primary/20">
          <div className="flex -space-x-4">
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt={pageContent.finalCtaSection.avatar1Alt} src={pageContent.finalCtaSection.avatar1Image}/>
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt={pageContent.finalCtaSection.avatar2Alt} src={pageContent.finalCtaSection.avatar2Image}/>
            <img className="size-16 rounded-full border-4 border-white object-cover" data-alt={pageContent.finalCtaSection.avatar3Alt} src={pageContent.finalCtaSection.avatar3Image}/>
          </div>
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black mb-4 text-charcoal dark:text-white">{pageContent.finalCtaSection.title}</h2>
            <p className="text-lg text-muted-text dark:text-gray-300">{pageContent.finalCtaSection.description}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <a href={pageContent.finalCtaSection.consultationButtonLink} className="bg-primary text-charcoal px-10 py-5 rounded-xl text-lg font-extrabold hover:scale-105 transition-transform shadow-xl shadow-primary/30 flex items-center justify-center gap-3">
              <span className="material-symbols-outlined">{pageContent.finalCtaSection.consultationButtonIcon}</span>
              {pageContent.finalCtaSection.consultationButtonText}
            </a>
            <a href={pageContent.finalCtaSection.whatsappButtonLink} className="bg-[#25D366] text-white px-10 py-5 rounded-xl text-lg font-extrabold hover:scale-105 transition-all shadow-xl shadow-[#25D366]/30 flex items-center justify-center gap-3">
              <div dangerouslySetInnerHTML={{ __html: pageContent.finalCtaSection.whatsappButtonIconSvg }} />
              {pageContent.finalCtaSection.whatsappButtonText}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConstructionPortfolioPage;
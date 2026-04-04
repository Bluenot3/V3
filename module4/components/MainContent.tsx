import React from 'react';
import type { Section } from '../types';
import SectionRenderer from './SectionRenderer';

interface MainContentProps {
  sections: Section[];
}

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
  const renderSection = (section: Section, level: number = 0) => (
    <section key={section.id} id={section.id} className="mb-24 scroll-mt-32 group/section">
      <div className={`bg-brand-surface/80 backdrop-blur-sm rounded-3xl shadow-soft p-8 md:p-12 border border-white/50 relative overflow-hidden animate-fade-in-up transition-all duration-500 hover:shadow-lg hover:border-white/80`}>
         
         {/* Subtle background gradient decoration */}
         <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-slate-50/50 to-transparent opacity-60 -z-10 pointer-events-none"></div>

        <div className="mb-10 relative">
             {level === 0 && <div className="h-1.5 w-16 bg-gradient-to-r from-brand-primary to-brand-secondary mb-6 rounded-full shadow-sm"></div>}
             <h2 className={`font-bold leading-tight tracking-tight text-brand-text ${
                level === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
            }`}>
                {section.title}
            </h2>
        </div>
        
        <div className="space-y-8">
            {section.content.map((item, index) => (
            <SectionRenderer key={index} item={item} section={section} />
            ))}
        </div>
      </div>
      {section.subSections && (
        <div className="mt-12 pl-0 md:pl-8 border-l border-brand-primary/10 space-y-12">
            {section.subSections.map((subSection) => renderSection(subSection, level + 1))}
        </div>
      )}
    </section>
  );

  return (
    <main className="flex-1 min-w-0 pb-32">
      {/* Hero Card with Gemini 3 Style */}
      <div className="mb-20 bg-brand-surface rounded-[2.5rem] shadow-soft p-10 md:p-16 border border-white relative overflow-hidden animate-fade-in-up group isolate">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-80 z-0"></div>
        <div className="absolute top-[-50%] right-[-20%] w-[800px] h-[800px] bg-gradient-to-br from-brand-secondary/20 to-brand-primary/20 rounded-full blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-[-50%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-tr from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-0"></div>
        
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary shadow-lg shadow-brand-primary/40"></span>
                </span>
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-brand-primary/80">System Core Online</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-brand-text mb-8 tracking-tight leading-[1.1]">
                Welcome to <br className="hidden md:block"/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-[length:200%_auto] animate-gradient">
                    Module 4
                </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl font-light">
                <span className="font-semibold text-brand-text">Systems Mastery & Professional Integration.</span> Elevate from practitioner to strategic operator. Master the engineering, governance, and analytical frameworks required to build robust, trustworthy AI systems at a professional scale.
            </p>
        </div>
      </div>

      <div className="space-y-24">
        {sections.map((section) => renderSection(section))}
      </div>
    </main>
  );
};

export default MainContent;
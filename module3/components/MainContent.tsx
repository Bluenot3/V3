import React from 'react';
import type { Section } from '../types';
import SectionRenderer from './SectionRenderer';

interface MainContentProps {
  sections: Section[];
}

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
  const renderSection = (section: Section, level: number = 0) => (
    <section key={section.id} id={section.id} className="mb-16 scroll-mt-20">
      <div className={`p-8 rounded-2xl shadow-neumorphic-out bg-brand-bg animate-fade-in-up border border-white/50`}>
        <h2 className={`font-bold text-brand-text mb-6 ${
            level === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
        }`}>
            {section.title}
        </h2>
        <div className="stagger-children">
            {section.content.map((item, index) => (
                <div key={index} style={{ animationDelay: `${index * 100}ms`}}>
                    <SectionRenderer item={item} section={section} />
                </div>
            ))}
        </div>
      </div>
      {section.subSections && (
        <div className="mt-8 pl-4 md:pl-8 border-l-4 border-brand-primary/20">
            {section.subSections.map((subSection) => renderSection(subSection, level + 1))}
        </div>
      )}
    </section>
  );

  return (
    <main className="flex-1 min-w-0">
      <div className="mb-16 p-8 rounded-2xl shadow-neumorphic-out bg-brand-bg animate-fade-in-up border border-white/50">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent mb-4">
            Welcome to Module 3
        </h1>
        <p className="text-xl text-brand-text-light leading-relaxed">
            <span className="font-semibold text-brand-primary">Theme: From Information to Intelligence.</span> This module is your hands-on guide to the world of data science and machine learning. You'll build practical skills, tackle ethical challenges, and deploy two of your own AI applications.
        </p>
      </div>
      {sections.map((section) => renderSection(section))}
    </main>
  );
};

export default MainContent;
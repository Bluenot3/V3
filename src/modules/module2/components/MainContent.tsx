import React from 'react';
import type { Section } from '../types';
import SectionRenderer from './SectionRenderer';

interface MainContentProps {
    sections: Section[];
}

const moduleHighlights = [
    'Reasoning loops and tool use',
    'Memory, orchestration, and security',
    'Shipping useful automation systems',
];

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
    const renderSection = (section: Section, level: number = 0) => (
        <section key={section.id} id={section.id} className="mb-16 scroll-mt-32">
            <div className="glass-card overflow-hidden border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(8,47,73,0.05)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 md:p-8">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
                <h2
                    className={[
                        'mb-6 font-outfit font-black tracking-tight text-brand-text',
                        level === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
                    ].join(' ')}
                >
                    {section.title}
                </h2>
                <div className="space-y-8">
                    {section.content.map((item, index) => (
                        <SectionRenderer key={index} item={item} section={section} />
                    ))}
                </div>
            </div>
            {section.subSections && (
                <div className="mt-8 border-l-2 border-cyan-200/70 pl-4 md:pl-8">
                    {section.subSections.map((subSection) => renderSection(subSection, level + 1))}
                </div>
            )}
        </section>
    );

    const overviewParagraph = sections.find((section) => section.id === 'overview')?.content
        .find((item) => item.type === 'paragraph')?.content;

    return (
        <main className="min-w-0 flex-1 py-4">
            <section className="mb-10 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/75 p-6 shadow-[0_18px_50px_rgba(8,47,73,0.05)] backdrop-blur-xl md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-cyan-600">Build Layer</p>
                <h1 className="mt-5 text-4xl font-outfit font-black tracking-tight text-slate-950 md:text-6xl md:leading-[1.02]">
                    Agent Systems that actually do work
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                    {typeof overviewParagraph === 'string' ? overviewParagraph : ''}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {moduleHighlights.map((highlight) => (
                        <div key={highlight} className="rounded-2xl border border-slate-200/80 bg-slate-950 px-4 py-4 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cyan-300">Capability</p>
                            <p className="mt-2 text-sm font-semibold leading-6">{highlight}</p>
                        </div>
                    ))}
                </div>
            </section>

            {sections.map((section) => renderSection(section))}
        </main>
    );
};

export default React.memo(MainContent);

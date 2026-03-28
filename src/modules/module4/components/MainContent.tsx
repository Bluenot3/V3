import React from 'react';
import type { Section } from '../../../types';
import SectionRenderer from './SectionRenderer';

interface MainContentProps {
    sections: Section[];
}

const operatingPillars = [
    'Evaluation and observability',
    'Security, governance, and controls',
    'Shipping systems people can trust',
];

const MainContent: React.FC<MainContentProps> = ({ sections }) => {
    const renderSection = (section: Section, level: number = 0) => (
        <section key={section.id} id={section.id} className="group/section mb-24 scroll-mt-32">
            <div className="glass-card relative overflow-hidden border border-white/60 bg-white/80 p-6 backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 md:p-8">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-amber-50/40" />
                <div className="relative">
                    <div className="mb-10">
                        {level === 0 && <div className="mb-6 h-1.5 w-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 shadow-sm" />}
                        <h2
                            className={[
                                'font-outfit font-black leading-tight tracking-tight text-brand-text',
                                level === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl',
                            ].join(' ')}
                        >
                            {section.title}
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {section.content.map((item, index) => (
                            <SectionRenderer key={index} item={item} section={section} />
                        ))}
                    </div>
                </div>
            </div>

            {section.subSections && (
                <div
                    className="mt-12 space-y-12 border-l-2 border-transparent pl-0 md:pl-8"
                    style={{ borderImage: 'linear-gradient(to bottom, rgba(245,158,11,0.32), rgba(249,115,22,0.2), rgba(244,63,94,0.12)) 1' }}
                >
                    {section.subSections.map((subSection) => renderSection(subSection, level + 1))}
                </div>
            )}
        </section>
    );

    return (
        <main className="min-w-0 flex-1 pb-32 pt-4">
            <div className="mb-10 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/76 p-6 shadow-[0_18px_50px_rgba(120,53,15,0.06)] backdrop-blur-xl md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-700">
                        System Core
                    </span>
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                        Production Mode
                    </span>
                </div>

                <h1 className="mt-5 text-4xl font-outfit font-black tracking-tight text-slate-900 md:text-6xl md:leading-[1.02]">
                    Welcome to{' '}
                    <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                        Module 4
                    </span>
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                    <span className="font-bold text-slate-900">Systems Mastery & Professional Integration.</span>{' '}
                    Build the operating judgment needed to evaluate, govern, and scale AI systems beyond demos and into durable real-world deployments.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {operatingPillars.map((pillar) => (
                        <div key={pillar} className="rounded-2xl border border-slate-200/80 bg-slate-950 px-4 py-4 text-white">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Pillar</p>
                            <p className="mt-2 text-sm font-semibold leading-6">{pillar}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-24">
                {sections.map((section) => renderSection(section))}
            </div>
        </main>
    );
};

export default MainContent;

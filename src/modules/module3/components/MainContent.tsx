import React from 'react';
import SectionRenderer from './SectionRenderer';
import type { Section } from '../types';

interface MainContentProps {
    title: string;
    sections: Section[];
    sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
    visibleSections: Set<string>;
}

const signalCards = [
    'Capture and retrieve the right knowledge fast',
    'Design decisions with evidence, not guesswork',
    'Turn your workflow into a repeatable system',
];

const MainContent: React.FC<MainContentProps> = ({ title, sections, sectionRefs, visibleSections }) => {
    const renderSections = (sectionsToRender: Section[], level: number = 0) => sectionsToRender.map((section) => (
        <div
            key={section.id}
            id={section.id}
            ref={(element) => { sectionRefs.current[section.id] = element; }}
            className="scroll-mt-28"
        >
            <div className="translate-y-0 opacity-100 transition-opacity duration-200 ease-out">
                <div className="glass-card mb-16 overflow-hidden rounded-[1.8rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_70px_rgba(6,95,70,0.05)] backdrop-blur-xl md:p-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/80 to-transparent" />
                    {level === 0 && (
                        <div className="mb-8 h-1.5 w-24 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400 shadow-lg shadow-emerald-500/20" />
                    )}

                    <h2
                        className={[
                            'mb-8 font-outfit font-black tracking-tight text-brand-text',
                            level === 0 ? 'text-3xl md:text-4xl' : level === 1 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl',
                        ].join(' ')}
                    >
                        {section.title}
                    </h2>

                    <div className="space-y-8">
                        {section.content.map((item, index) => (
                            <SectionRenderer key={`${section.id}-${index}`} item={item} section={section} />
                        ))}
                    </div>
                </div>

                {section.subSections && (
                    <div className="ml-4 border-l-2 border-emerald-200/70 pl-4 md:ml-8 md:pl-8">
                        {renderSections(section.subSections, level + 1)}
                    </div>
                )}
            </div>
        </div>
    ));

    const overviewParagraph = sections.find((section) => section.id === 'overview')?.content
        .find((item) => item.type === 'paragraph')?.content;

    return (
        <div className="py-8">
            <header className="mb-10 overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/72 p-6 shadow-[0_18px_50px_rgba(6,95,70,0.05)] backdrop-blur-xl md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.36em] text-emerald-600">Personal Intelligence</p>
                <h1 className="mt-5 text-4xl font-outfit font-black tracking-tight text-brand-text md:text-6xl md:leading-[1.02]">
                    <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-brand-text-light/85">
                    {typeof overviewParagraph === 'string' ? overviewParagraph : ''}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {signalCards.map((card) => (
                        <div key={card} className="rounded-2xl border border-emerald-100/90 bg-emerald-50/70 px-4 py-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700">Signal</p>
                            <p className="mt-2 text-sm font-semibold leading-6 text-slate-900">{card}</p>
                        </div>
                    ))}
                </div>
            </header>

            {renderSections(sections)}
        </div>
    );
};

export default MainContent;

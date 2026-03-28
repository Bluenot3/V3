import React from 'react';
import { ZenBrandMark, ZenTelemetryCard } from '../zen';

interface VanguardModuleFrameProps {
    moduleNumber: number;
    title: string;
    subtitle: string;
    accentClassName: string;
    chipLabels: string[];
    completedSections: number;
    totalSections: number;
    children: React.ReactNode;
    header: React.ReactNode;
    sidebar: React.ReactNode;
    footer: React.ReactNode;
    bleed?: boolean;
}

const VanguardModuleFrame: React.FC<VanguardModuleFrameProps> = ({
    moduleNumber,
    title,
    subtitle,
    accentClassName,
    chipLabels,
    completedSections,
    totalSections,
    children,
    header,
    sidebar,
    footer,
    bleed = true,
}) => {
    const progressPercent = totalSections > 0
        ? Math.min(100, Math.round((completedSections / totalSections) * 100))
        : 0;

    return (
        <div
            className={[
                'relative min-h-screen font-sans text-brand-text',
                'bg-[radial-gradient(circle_at_top_left,_rgba(201,168,76,0.12),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(168,85,247,0.16),_transparent_20%),radial-gradient(circle_at_50%_110%,_rgba(56,189,248,0.13),_transparent_34%),linear-gradient(180deg,_#050A18_0%,_#0A1426_48%,_#060B18_100%)]',
                bleed ? '-mx-6 -mt-6' : '',
            ].join(' ')}
        >
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-8rem] top-[-8rem] h-72 w-72 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-fuchsia-400/12 blur-3xl" />
                <div className="absolute inset-0 bg-grid-pattern [--grid-color:rgba(201,168,76,0.07)] [--grid-size:34px]" />
                <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-white/5 to-transparent" />
                <div className="absolute inset-x-[14%] bottom-0 h-44 rounded-full bg-cyan-300/10 blur-3xl" />
            </div>

            <div className="relative flex min-h-screen flex-col">
                {header}

                <div className="w-full flex-1 px-3 pb-16 pt-4 sm:px-5 lg:px-6 xl:px-8 2xl:px-10">
                    <div className="lg:grid lg:grid-cols-[minmax(286px,20.5vw)_minmax(0,1fr)] lg:items-start lg:gap-5 xl:grid-cols-[minmax(304px,19vw)_minmax(0,1fr)] 2xl:grid-cols-[minmax(328px,18vw)_minmax(0,1fr)]">
                        <div className="lg:pt-2">
                            {sidebar}
                        </div>
                        <section className="zen-hero-panel mb-5 overflow-hidden rounded-[1.9rem] px-5 py-5 text-white shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl transition-[transform,box-shadow] duration-300 sm:px-6 xl:px-7">
                            <div className="grid gap-5 xl:grid-cols-[1.45fr_0.85fr] xl:items-start">
                                <div className="min-w-0">
                                    <div className="flex flex-wrap items-center gap-2.5">
                                        <span className="zen-eyebrow-chip">Module {moduleNumber}</span>
                                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                                            Vanguard
                                        </span>
                                    </div>

                                    <div className="mt-4 flex items-start gap-4">
                                        <ZenBrandMark size="sm" />
                                        <div className="min-w-0">
                                            <h1 className="font-display max-w-4xl text-[2rem] font-semibold tracking-[0.04em] text-[#f8e5b3] sm:text-3xl lg:text-[2.8rem] lg:leading-[1.04]">
                                                {title}
                                            </h1>
                                            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-[15px]">
                                                {subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2.5">
                                        {chipLabels.map((label) => (
                                            <span
                                                key={label}
                                                className="zen-chip transition-all duration-200 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10"
                                            >
                                                {label}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                                        <ZenTelemetryCard title="Progress" value={`${progressPercent}%`} subtitle="Live section completion" icon="progress" variant="progress" />
                                        <ZenTelemetryCard title="Completed" value={`${completedSections}`} subtitle="Sections cleared" icon="verify" variant="integrity" />
                                        <ZenTelemetryCard title="Remaining" value={`${Math.max(totalSections - completedSections, 0)}`} subtitle="Modules left in queue" icon="readiness" variant="readiness" />
                                    </div>
                                </div>

                                <div className="zen-panel relative overflow-hidden rounded-[1.55rem] p-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_20px_36px_rgba(15,23,42,0.16)] transition-transform duration-300 hover:-translate-y-0.5">
                                    <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${accentClassName} opacity-[0.22]`} />
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <p className="zen-micro-label">Progress</p>
                                            <p className="mt-2 font-display text-3xl font-semibold text-[#f8e5b3]">{progressPercent}%</p>
                                            <p className="mt-2 max-w-[14rem] text-sm leading-7 text-slate-300">
                                                Move section by section and treat the module like a real delivery sprint.
                                            </p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
                                            <p className="text-sm font-semibold text-white">{completedSections}/{totalSections}</p>
                                            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-slate-400">Sections</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 h-2 rounded-full bg-white/10">
                                        <div
                                            className={`h-full rounded-full bg-gradient-to-r ${accentClassName} transition-[width] duration-500`}
                                            style={{ width: `${progressPercent}%` }}
                                        />
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            Track {moduleNumber}
                                        </div>
                                        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-300">
                                            {Math.max(totalSections - completedSections, 0)} left
                                        </div>
                                        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-100">
                                            Live module
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <main className="flex-1 text-white lg:col-span-2 lg:mt-2">{children}</main>
                        <div className="lg:col-span-2">{footer}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VanguardModuleFrame;

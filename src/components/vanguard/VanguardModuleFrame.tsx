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

// Per-module ambient color configs
const MODULE_AMBIENTS: Record<number, { orb1: string; orb2: string; orb3: string; ring: string }> = {
    1: {
        orb1: 'bg-violet-500/[0.14]',
        orb2: 'bg-fuchsia-400/[0.13]',
        orb3: 'bg-cyan-400/[0.09]',
        ring: 'from-violet-500 via-fuchsia-500 to-cyan-400',
    },
    2: {
        orb1: 'bg-sky-500/[0.13]',
        orb2: 'bg-cyan-400/[0.12]',
        orb3: 'bg-emerald-400/[0.09]',
        ring: 'from-sky-500 via-cyan-500 to-emerald-400',
    },
    3: {
        orb1: 'bg-emerald-500/[0.13]',
        orb2: 'bg-teal-400/[0.12]',
        orb3: 'bg-cyan-400/[0.09]',
        ring: 'from-emerald-500 via-teal-500 to-cyan-400',
    },
    4: {
        orb1: 'bg-amber-500/[0.13]',
        orb2: 'bg-orange-400/[0.12]',
        orb3: 'bg-rose-400/[0.09]',
        ring: 'from-amber-500 via-orange-500 to-rose-500',
    },
};

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

    const ambient = MODULE_AMBIENTS[moduleNumber] ?? MODULE_AMBIENTS[1];

    return (
        <div
            className={[
                'relative min-h-screen font-sans text-brand-text',
                'bg-[radial-gradient(circle_at_top_left,_rgba(201,168,76,0.10),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(168,85,247,0.14),_transparent_20%),radial-gradient(circle_at_50%_110%,_rgba(56,189,248,0.11),_transparent_34%),linear-gradient(180deg,_#050A18_0%,_#0A1426_48%,_#060B18_100%)]',
                bleed ? '-mx-6 -mt-6' : '',
            ].join(' ')}
        >
            {/* ─── Ambient Background ───────────────────────────────── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Dynamic module-colored orbs */}
                <div className={`absolute left-[-10rem] top-[-10rem] h-80 w-80 rounded-full ${ambient.orb2} blur-3xl`} />
                <div className={`absolute right-[-8rem] top-32 h-96 w-96 rounded-full ${ambient.orb1} blur-3xl`} />
                <div className={`absolute bottom-[-8rem] left-1/3 h-[28rem] w-[28rem] rounded-full ${ambient.orb3} blur-3xl`} />

                {/* Static gold orbs */}
                <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-zen-gold/[0.04] blur-3xl" />
                <div className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-zen-gold/[0.03] blur-2xl" />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-grid-pattern [--grid-color:rgba(201,168,76,0.06)] [--grid-size:34px]" />

                {/* Top light leak */}
                <div className="absolute inset-x-0 top-0 h-60 bg-gradient-to-b from-white/[0.04] to-transparent" />

                {/* Bottom glow */}
                <div className={`absolute inset-x-[12%] bottom-0 h-52 rounded-full bg-gradient-to-r ${ambient.ring} opacity-[0.08] blur-3xl`} />

                {/* Subtle scan lines */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)',
                }} />
            </div>

            <div className="relative flex min-h-screen flex-col">
                {header}

                {/* ─── Outer padding shell ─────────────────────────── */}
                <div className="w-full flex-1 px-3 pb-16 pt-4 sm:px-4 lg:px-5">

                    {/*
                      ┌──────────────────────────────────────────────────────┐
                      │  2-col grid: [sidebar] [right-column]                │
                      │  The sidebar is sticky and spans the full height.    │
                      │  The right column holds hero + content + footer.     │
                      └──────────────────────────────────────────────────────┘
                    */}
                    <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-4 xl:grid-cols-[256px_minmax(0,1fr)]">

                        {/* ── LEFT COLUMN — Sticky Sidebar ─────────────── */}
                        <div className="hidden lg:block lg:sticky lg:top-24 lg:self-start lg:pt-1">
                            {sidebar}
                        </div>

                        {/* ── RIGHT COLUMN — Hero + Content + Footer ────── */}
                        <div className="min-w-0">

                            {/* ─── Hero Module Banner ───────────────────── */}
                            <section className="zen-hero-panel relative mb-5 overflow-hidden rounded-[1.9rem] px-5 py-5 text-white shadow-[0_24px_70px_rgba(2,6,23,0.38)] backdrop-blur-xl sm:px-6 xl:px-7">
                                {/* Accent line top */}
                                <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${accentClassName} opacity-80`} />

                                {/* Corner glow */}
                                <div className={`pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-gradient-to-br ${accentClassName} opacity-[0.10] blur-3xl`} />
                                <div className={`pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-gradient-to-tr ${accentClassName} opacity-[0.07] blur-2xl`} />

                                <div className="relative">
                                    <div className="min-w-0">
                                        {/* Eyebrow chips */}
                                        <div className="flex flex-wrap items-center gap-2.5">
                                            <span className="zen-eyebrow-chip">Module {moduleNumber}</span>
                                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-white">
                                                Vanguard
                                            </span>
                                            {progressPercent === 100 && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.12] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-200">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                                    Complete
                                                </span>
                                            )}
                                            {progressPercent > 0 && progressPercent < 100 && (
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-200">
                                                    <span className="relative flex h-1.5 w-1.5">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                                                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                                    </span>
                                                    In Progress
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
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

                                        {/* Topic chips */}
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

                                        {/* Telemetry row */}
                                        <div className="mt-5 grid gap-3 md:grid-cols-3">
                                            <ZenTelemetryCard title="Progress" value={`${progressPercent}%`} subtitle="Live section completion" icon="progress" variant="progress" />
                                            <ZenTelemetryCard title="Completed" value={`${completedSections}`} subtitle="Sections cleared" icon="verify" variant="integrity" />
                                            <ZenTelemetryCard title="Remaining" value={`${Math.max(totalSections - completedSections, 0)}`} subtitle="Sections left in queue" icon="readiness" variant="readiness" />
                                        </div>
                                    </div>

                                </div>
                            </section>

                            {/* Mobile sidebar — below hero on small screens only */}
                            <div className="mb-5 lg:hidden">
                                {sidebar}
                            </div>

                            {/* ─── Module Content ───────────────────────── */}
                            <main className="min-w-0 text-white">
                                {children}
                            </main>

                            {/* ─── Footer ──────────────────────────────── */}
                            <div>{footer}</div>
                        </div>
                        {/* END RIGHT COLUMN */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default VanguardModuleFrame;

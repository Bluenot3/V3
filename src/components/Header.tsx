import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ZenBrandMark, ZenModuleGlyph } from './zen';
import type { ZenGlyphName } from './zen';

type PageMeta = {
    title: string;
    eyebrow: string;
    description: string;
    icon: ZenGlyphName;
};

const getPageMeta = (pathname: string): PageMeta => {
    if (pathname.includes('/dashboard')) {
        return {
            title: 'Vanguard Dashboard',
            eyebrow: 'Command Deck',
            description: 'Track program momentum, artifacts, and next moves across the full certification path.',
            icon: 'dashboard',
        };
    }

    if (pathname.includes('/hub')) {
        return {
            title: 'Program Hub',
            eyebrow: 'Workspace',
            description: 'Move across Vanguard and the rest of the ZEN ecosystem from one launch surface.',
            icon: 'programs',
        };
    }

    if (pathname.includes('/docs')) {
        return {
            title: 'Documentation Library',
            eyebrow: 'Reference Layer',
            description: 'Search playbooks, deployment notes, and grounded implementation guidance.',
            icon: 'research',
        };
    }

    if (pathname.includes('/guide')) {
        return {
            title: 'Starter Guide',
            eyebrow: 'Orientation',
            description: 'Get your bearings on AI, LLMs, automation, and the Vanguard learning sequence.',
            icon: 'guide',
        };
    }

    if (pathname.includes('/module/1')) {
        return {
            title: 'Module 1: AI Foundations',
            eyebrow: 'Learning Track',
            description: 'Build a reliable mental model for models, prompts, safety, and core AI literacy.',
            icon: 'module1',
        };
    }

    if (pathname.includes('/module/2')) {
        return {
            title: 'Module 2: Agents & Automation',
            eyebrow: 'Learning Track',
            description: 'Design workflows, tool use, memory, and production-grade automations.',
            icon: 'module2',
        };
    }

    if (pathname.includes('/module/3')) {
        return {
            title: 'Module 3: Personal Intelligence',
            eyebrow: 'Learning Track',
            description: 'Turn retrieval, research, and decision support into a personal AI operating system.',
            icon: 'module3',
        };
    }

    if (pathname.includes('/module/4')) {
        return {
            title: 'Module 4: Systems Mastery',
            eyebrow: 'Learning Track',
            description: 'Harden AI systems with governance, observability, evaluation, and operating rigor.',
            icon: 'module4',
        };
    }

    if (pathname.includes('/certificate')) {
        return {
            title: 'Certification Artifact',
            eyebrow: 'Verification',
            description: 'Review the issued record and completion details for your Vanguard milestone.',
            icon: 'certificate',
        };
    }

    return {
        title: 'ZEN Vanguard',
        eyebrow: 'Program Surface',
        description: 'Professional AI literacy, deployment fluency, and operational systems thinking.',
        icon: 'identity',
    };
};

const Header: React.FC = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const pageMeta = getPageMeta(pathname);

    const completedModules = user
        ? Object.values(user.modules).filter((moduleProgress) => moduleProgress.certificateId).length
        : 0;
    const completionPercent = Math.round((completedModules / 4) * 100);

    return (
        <header className="sticky top-0 z-30 border-b border-zen-border bg-[linear-gradient(180deg,rgba(5,10,24,0.98)_0%,rgba(8,14,29,0.95)_100%)] backdrop-blur-2xl">
            <div className="relative overflow-hidden px-4 py-4 lg:px-8">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute left-10 top-0 h-20 w-44 rounded-full bg-zen-gold/[0.06] blur-3xl" />
                    <div className="absolute right-12 top-0 h-24 w-52 rounded-full bg-brand-cyan/[0.06] blur-3xl" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zen-gold/20 to-transparent" />
                </div>

                <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="ml-14 min-w-0 lg:ml-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                            <span className="zen-eyebrow-chip">{pageMeta.eyebrow}</span>
                            <span className="rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
                                Vanguard Certification
                            </span>
                        </div>
                        <div className="mt-4 flex items-start gap-4">
                            <div className="hidden sm:block">
                                <ZenBrandMark size="sm" />
                            </div>
                            <div className="min-w-0">
                                <div className="flex items-center gap-3">
                                    <span className="zen-glyph-frame hidden text-[#f1d280] sm:inline-flex">
                                        <ZenModuleGlyph name={pageMeta.icon} className="h-[18px] w-[18px]" />
                                    </span>
                                    <h1 className="font-display text-[1.55rem] font-semibold tracking-[0.04em] text-[#f7e6b6] sm:text-[2.05rem]">
                                        {pageMeta.title}
                                    </h1>
                                </div>
                                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-400 sm:text-[15px]">
                                    {pageMeta.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[40rem]">
                        <div className="zen-panel rounded-[1.45rem] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                                <p className="zen-micro-label">XP</p>
                                <ZenModuleGlyph name="progress" className="h-4 w-4 text-[#f1d280]" />
                            </div>
                            <div className="mt-2 flex items-end gap-2">
                                <p className="font-display text-3xl font-semibold text-[#f7e4b0]">{user?.totalPoints || 0}</p>
                                <p className="pb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zen-gold">Points</p>
                            </div>
                        </div>

                        <div className="zen-panel rounded-[1.45rem] px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="zen-micro-label">Modules</p>
                                    <p className="mt-2 font-display text-3xl font-semibold text-[#f7e4b0]">{completedModules}/4</p>
                                </div>
                                <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-zen-gold via-zen-gold-light to-brand-cyan p-[2px] shadow-[0_12px_24px_rgba(2,6,23,0.38)]">
                                    <div className="flex h-full w-full items-center justify-center rounded-[0.9rem] bg-zen-navy text-[11px] font-bold uppercase tracking-[0.18em] text-zen-gold">
                                        {completionPercent}%
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="zen-panel rounded-[1.45rem] bg-gradient-to-br from-zen-gold/10 to-zen-gold/[0.03] px-4 py-3 text-white">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <p className="zen-micro-label">Quick Nav</p>
                                    <p className="mt-2 text-sm font-semibold text-white">Command palette</p>
                                </div>
                                <div className="flex items-center gap-1 text-[11px]">
                                    <kbd className="rounded-lg border border-zen-gold/15 bg-zen-gold/[0.06] px-2 py-1 font-mono text-zen-gold-light">Ctrl</kbd>
                                    <span className="text-slate-500">+</span>
                                    <kbd className="rounded-lg border border-zen-gold/15 bg-zen-gold/[0.06] px-2 py-1 font-mono text-zen-gold-light">K</kbd>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-1 bg-zen-surface">
                <div
                    className="h-full bg-gradient-to-r from-zen-gold via-zen-gold-light to-brand-cyan transition-all duration-1000"
                    style={{ width: `${completionPercent}%` }}
                />
            </div>
        </header>
    );
};

export default Header;

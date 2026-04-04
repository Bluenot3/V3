import React, { useMemo, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../hooks/useAuth';
import { useSidebar } from '../contexts/SidebarContext';
import zenMonogramLogoWebp from '../assets/branding/zen-monogram-signature.webp';
import zenMonogramLogoAvif from '../assets/branding/zen-monogram-signature.avif';
import { ZenModuleGlyph } from './zen';
import type { ZenGlyphName } from './zen';

const moduleInfo = [
    {
        id: 1 as const,
        title: 'Module 1',
        subtitle: 'AI Foundations',
        color: 'from-zen-gold via-zen-gold-light to-brand-cyan',
        icon: 'module1' as ZenGlyphName,
    },
    {
        id: 2 as const,
        title: 'Module 2',
        subtitle: 'Agents & Automation',
        color: 'from-brand-cyan via-zen-quantum to-zen-emerald',
        icon: 'module2' as ZenGlyphName,
    },
    {
        id: 3 as const,
        title: 'Module 3',
        subtitle: 'Personal Intelligence',
        color: 'from-zen-emerald via-teal-400 to-brand-cyan',
        icon: 'module3' as ZenGlyphName,
    },
    {
        id: 4 as const,
        title: 'Module 4',
        subtitle: 'Systems Mastery',
        color: 'from-zen-gold via-amber-400 to-rose-400',
        icon: 'module4' as ZenGlyphName,
    },
];

const primaryLinks = [
    { to: '/dashboard', label: 'Dashboard', hint: 'Overview and momentum', icon: 'dashboard' as ZenGlyphName },
    { to: '/docs', label: 'Docs Library', hint: 'Reference layer and playbooks', icon: 'research' as ZenGlyphName },
    { to: '/guide', label: 'Starter Guide', hint: 'Orientation and setup path', icon: 'guide' as ZenGlyphName },
    { to: '/hub', label: 'Program Hub', hint: 'Navigate the broader ecosystem', icon: 'programs' as ZenGlyphName },
    { to: '/profile', label: 'Profile', hint: 'Identity and progress record', icon: 'identity' as ZenGlyphName },
];

/** Tooltip wrapper that appears on the right side when sidebar is collapsed */
const Tooltip: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
    <div className="group/tip relative flex items-center">
        {children}
        <div className="pointer-events-none absolute left-full ml-3 z-[200] hidden group-hover/tip:flex items-center whitespace-nowrap rounded-xl border border-zen-gold/20 bg-zen-navy/95 px-3 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-xl">
            {label}
            <div className="absolute right-full mr-0 border-4 border-transparent border-r-zen-navy/95" />
        </div>
    </div>
);

const GlobalSidebar: React.FC = () => {
    const { user, logout, getModuleProgress } = useAuth();
    const { isDark, mode, openSettings } = useTheme();
    const { isCollapsed, toggle } = useSidebar();
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const currentPath = location.pathname;

    const moduleCompletion = useMemo(() => {
        return moduleInfo.reduce<Record<number, number>>((accumulator, module) => {
            const progress = getModuleProgress(module.id);
            const estimatedTotalSections = module.id === 1 ? 50 : module.id === 4 ? 60 : 40;
            accumulator[module.id] = Math.min(100, Math.round((progress.completedSections.length / estimatedTotalSections) * 100));
            return accumulator;
        }, {});
    }, [getModuleProgress, user]);

    const totalCompletion = Math.round(
        Object.values(moduleCompletion).reduce((sum, value) => sum + value, 0) / moduleInfo.length,
    );

    const handleNavigate = () => {
        setIsMobileOpen(false);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    /* ─────────────────────────────────────────────────────────
       COLLAPSED — icon rail (w-16 = 64px)
    ───────────────────────────────────────────────────────── */
    const iconRail = (
        <aside className="fixed left-0 top-0 z-[55] hidden h-screen w-16 flex-col items-center overflow-hidden border-r border-zen-gold/10 bg-[linear-gradient(180deg,rgba(6,11,24,0.98)_0%,rgba(15,23,42,0.96)_52%,rgba(6,11,24,0.98)_100%)] shadow-[20px_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:flex">

            {/* Logo + Expand button */}
            <div className="flex w-full flex-col items-center gap-2 border-b border-zen-gold/10 py-4">
                <Tooltip label="ZEN Vanguard">
                    <NavLink to="/hub" className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-[1rem] border border-zen-gold/24 bg-[radial-gradient(circle_at_28%_22%,rgba(201,168,76,0.32),rgba(6,11,24,0.92)_58%)] shadow-[0_8px_20px_rgba(2,6,23,0.5)]">
                        <picture>
                            <source srcSet={zenMonogramLogoAvif} type="image/avif" />
                            <source srcSet={zenMonogramLogoWebp} type="image/webp" />
                            <img src={zenMonogramLogoWebp} alt="ZEN" width={32} height={32} className="h-8 w-8 object-contain" />
                        </picture>
                    </NavLink>
                </Tooltip>

                {/* Expand button */}
                <Tooltip label="Expand sidebar">
                    <button
                        onClick={toggle}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-zen-gold/15 bg-zen-gold/[0.06] text-zen-gold/70 transition hover:border-zen-gold/30 hover:bg-zen-gold/[0.12] hover:text-zen-gold"
                        aria-label="Expand sidebar"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </Tooltip>
            </div>

            {/* Icon navigation */}
            <nav className="flex flex-1 flex-col items-center gap-1.5 overflow-y-auto py-3 w-full px-2">

                {/* Workspace links */}
                {primaryLinks.map((link) => {
                    const isActive = currentPath === link.to || currentPath.startsWith(link.to + '/');
                    return (
                        <Tooltip key={link.to} label={link.label}>
                            <NavLink
                                to={link.to}
                                onClick={handleNavigate}
                                className={`flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                                    isActive
                                        ? 'border-zen-gold/30 bg-zen-gold/[0.12] text-zen-gold'
                                        : 'border-transparent text-slate-500 hover:border-zen-gold/15 hover:bg-zen-gold/[0.06] hover:text-zen-gold/80'
                                }`}
                            >
                                <ZenModuleGlyph name={link.icon} className="h-4 w-4" />
                            </NavLink>
                        </Tooltip>
                    );
                })}

                {/* Divider */}
                <div className="my-1 h-px w-8 bg-zen-gold/10" />

                {/* Module links */}
                {moduleInfo.map((module) => {
                    const isActive = currentPath.startsWith(`/module/${module.id}`);
                    const pct = moduleCompletion[module.id] ?? 0;
                    return (
                        <Tooltip key={module.id} label={`${module.title} — ${module.subtitle} (${pct}%)`}>
                            <NavLink
                                to={`/module/${module.id}`}
                                onClick={handleNavigate}
                                className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition ${
                                    isActive
                                        ? `border-zen-gold/30 bg-gradient-to-br ${module.color} text-zen-navy shadow-[0_6px_16px_rgba(0,0,0,0.3)]`
                                        : 'border-white/[0.06] bg-white/[0.02] text-slate-400 hover:border-zen-gold/20 hover:text-zen-gold/70'
                                }`}
                            >
                                <ZenModuleGlyph name={module.icon} className="h-4 w-4" />
                                {/* Completion dot */}
                                {pct > 0 && (
                                    <div className={`absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border border-zen-navy ${pct >= 100 ? 'bg-emerald-400' : 'bg-zen-gold'}`} />
                                )}
                            </NavLink>
                        </Tooltip>
                    );
                })}
            </nav>

            {/* User avatar at bottom */}
            {user && (
                <div className="border-t border-zen-gold/10 py-4">
                    <Tooltip label={`${user.name} — ${user.totalPoints || 0} XP`}>
                        <button
                            onClick={handleLogout}
                            className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-zen-surface ring-2 ring-zen-gold/15 transition hover:ring-zen-gold/30"
                        >
                            <img
                                src={user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name || 'User'}`}
                                alt={user.name || 'User'}
                                className="h-10 w-10 object-cover"
                            />
                        </button>
                    </Tooltip>
                </div>
            )}
        </aside>
    );

    /* ─────────────────────────────────────────────────────────
       EXPANDED — full sidebar (w-72 = 288px)
    ───────────────────────────────────────────────────────── */
    const fullSidebar = (
        <>
            {/* Mobile overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-zen-void/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-[55] flex h-screen w-72 flex-col overflow-hidden border-r border-zen-gold/10 bg-[linear-gradient(180deg,rgba(6,11,24,0.98)_0%,rgba(15,23,42,0.96)_52%,rgba(6,11,24,0.98)_100%)] text-white shadow-[20px_0_60px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="relative z-20 shrink-0 overflow-hidden border-b border-zen-gold/10 bg-[linear-gradient(180deg,rgba(9,16,31,0.94)_0%,rgba(8,15,28,0.9)_100%)] px-5 pb-4 pt-6">
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute left-6 top-2 h-24 w-24 rounded-full bg-zen-gold/[0.06] blur-3xl" />
                        <div className="absolute right-5 top-8 h-28 w-28 rounded-full bg-brand-cyan/[0.04] blur-3xl" />
                    </div>

                    {/* Collapse button */}
                    <button
                        onClick={toggle}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-xl border border-zen-gold/15 bg-zen-gold/[0.06] text-zen-gold/60 transition hover:border-zen-gold/30 hover:text-zen-gold"
                        title="Collapse sidebar"
                        aria-label="Collapse sidebar"
                    >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <NavLink to="/hub" className="relative block transition-transform duration-300 hover:translate-x-0.5" onClick={handleNavigate}>
                        <div className="flex items-start gap-3.5">
                            <div className="relative mt-0.5 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-zen-gold/24 bg-[radial-gradient(circle_at_28%_22%,rgba(201,168,76,0.32),rgba(6,11,24,0.92)_58%)] shadow-[0_10px_28px_rgba(2,6,23,0.5),0_0_22px_rgba(201,168,76,0.12)]">
                                <div className="pointer-events-none absolute inset-[1px] rounded-[1rem] border border-white/14" />
                                <picture>
                                    <source srcSet={zenMonogramLogoAvif} type="image/avif" />
                                    <source srcSet={zenMonogramLogoWebp} type="image/webp" />
                                    <img
                                        src={zenMonogramLogoWebp}
                                        alt="ZEN Vanguard monogram"
                                        width={44}
                                        height={44}
                                        className="relative h-11 w-11 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                                        fetchPriority="high"
                                        loading="eager"
                                        decoding="async"
                                    />
                                </picture>
                            </div>
                            <div className="min-w-0">
                                <p className="font-display text-[1.55rem] font-semibold tracking-[0.04em] text-[#f6e2ac]">ZEN Vanguard</p>
                                <p className="mt-1 text-[11px] uppercase tracking-[0.28em] text-zen-gold/70">AI Literacy Console</p>
                                <p className="mt-3 max-w-[12rem] text-xs leading-6 text-slate-400">
                                    The first verified AI literacy ecosystem in U.S. history.
                                </p>
                            </div>
                        </div>
                    </NavLink>

                    <div className="relative mt-4 rounded-[1.6rem] border border-zen-gold/10 bg-zen-surface/60 p-4">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="zen-micro-label">Program completion</p>
                                <p className="mt-2 font-display text-3xl font-semibold text-[#f7e4b0]">{totalCompletion}%</p>
                            </div>
                            <div className="rounded-2xl border border-zen-gold/15 bg-zen-gold/[0.06] px-3 py-2 text-right">
                                <p className="text-sm font-semibold text-zen-gold">{user?.totalPoints || 0} XP</p>
                                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zen-gold/60">Momentum</p>
                            </div>
                        </div>
                        <div className="mt-4 h-2 rounded-full bg-white/[0.06]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-zen-gold via-zen-gold-light to-brand-cyan"
                                style={{ width: `${totalCompletion}%` }}
                            />
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-2.5">
                            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/85">Network</p>
                                <p className="mt-1 text-base font-semibold text-cyan-50">100%</p>
                            </div>
                            <div className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-100/85">Integrity</p>
                                <p className="mt-1 text-base font-semibold text-emerald-50">Secure</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                    <nav className="space-y-8 px-4 py-5">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Workspace</p>
                            <span className="rounded-full border border-zen-gold/10 bg-zen-gold/[0.04] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zen-gold/50">
                                Core
                            </span>
                        </div>

                        {primaryLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                onClick={handleNavigate}
                                className={({ isActive }) =>
                                    `block rounded-[1.3rem] border px-4 py-3.5 transition ${
                                        isActive
                                            ? 'border-zen-gold/20 bg-zen-gold/[0.06] shadow-[inset_0_1px_0_rgba(201,168,76,0.08)]'
                                            : 'border-transparent bg-white/[0.01] hover:border-zen-gold/10 hover:bg-zen-gold/[0.03]'
                                    }`
                                }
                            >
                                <div className="flex items-start gap-3">
                                    <span className="zen-glyph-frame text-[#f1d280]">
                                        <ZenModuleGlyph name={link.icon} className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-sm font-bold text-white">{link.label}</p>
                                        <p className="mt-1 text-xs leading-6 text-slate-500">{link.hint}</p>
                                    </div>
                                </div>
                            </NavLink>
                        ))}

                        <NavLink
                            to="/dashboard#certificates"
                            onClick={handleNavigate}
                            className="block rounded-[1.3rem] border border-transparent bg-white/[0.01] px-4 py-3.5 transition hover:border-zen-gold/10 hover:bg-zen-gold/[0.03]"
                        >
                            <div className="flex items-start gap-3">
                                <span className="zen-glyph-frame text-[#f1d280]">
                                    <ZenModuleGlyph name="certificate" className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-white">Certificates</p>
                                    <p className="mt-1 text-xs leading-6 text-slate-500">Review issued artifacts and achievements</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between px-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Modules</p>
                            <span className="rounded-full border border-zen-gold/15 bg-zen-gold/[0.06] px-2 py-1 text-[10px] font-semibold text-zen-gold/80">
                                4 tracks
                            </span>
                        </div>

                        {moduleInfo.map((module) => {
                            const isActive = currentPath.startsWith(`/module/${module.id}`);

                            return (
                                <NavLink
                                    key={module.id}
                                    to={`/module/${module.id}`}
                                    onClick={handleNavigate}
                                    className={`block rounded-[1.65rem] border px-4 py-4 transition duration-300 ${
                                        isActive
                                            ? 'border-zen-gold/20 bg-zen-gold/[0.06] shadow-[0_16px_34px_rgba(0,0,0,0.2)]'
                                            : 'border-white/[0.04] bg-white/[0.015] hover:-translate-y-0.5 hover:border-zen-gold/12 hover:bg-zen-gold/[0.03]'
                                    }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`mt-0.5 flex h-11 w-11 items-center justify-center rounded-[1rem] bg-gradient-to-br ${module.color} text-sm font-black text-zen-navy shadow-[0_12px_26px_rgba(0,0,0,0.3)]`}>
                                            <ZenModuleGlyph name={module.icon} className="h-5 w-5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="text-sm font-bold text-white">{module.title}</p>
                                                <span className="text-[11px] font-semibold text-zen-gold/70">
                                                    {moduleCompletion[module.id] ?? 0}%
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs text-slate-500">{module.subtitle}</p>
                                            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                                                <div
                                                    className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                                                    style={{ width: `${moduleCompletion[module.id] ?? 0}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-3">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">Support</p>
                            <span className="rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                                Utility
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                openSettings();
                                setIsMobileOpen(false);
                            }}
                            className="flex w-full items-center justify-between rounded-[1.3rem] border border-transparent bg-white/[0.01] px-4 py-3.5 text-left transition hover:border-zen-gold/10 hover:bg-zen-gold/[0.03]"
                        >
                            <div className="flex items-start gap-3">
                                <span className="zen-glyph-frame text-[#f1d280]">
                                    <ZenModuleGlyph name="telemetry" className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-white">Theme Settings</p>
                                    <p className="mt-1 text-xs leading-6 text-slate-500">Adjust shell appearance and viewing mode</p>
                                </div>
                            </div>
                            <span className="rounded-full border border-zen-gold/10 bg-zen-gold/[0.04] px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-zen-gold/60">
                                {isDark ? 'Dark' : mode}
                            </span>
                        </button>

                        <NavLink
                            to="/guide"
                            onClick={handleNavigate}
                            className="block rounded-[1.3rem] border border-transparent bg-white/[0.01] px-4 py-3.5 transition hover:border-zen-gold/10 hover:bg-zen-gold/[0.03]"
                        >
                            <div className="flex items-start gap-3">
                                <span className="zen-glyph-frame text-[#f1d280]">
                                    <ZenModuleGlyph name="resources" className="h-4 w-4" />
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-white">Deployment Help</p>
                                    <p className="mt-1 text-xs leading-6 text-slate-500">Review Hugging Face and API setup guidance</p>
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    </nav>
                </div>

                <div className="border-t border-zen-gold/10 p-4 pb-5">
                    <div className="rounded-[1.6rem] border border-zen-gold/10 bg-zen-surface/60 p-4">
                        <div className="flex items-center gap-3">
                            <img
                                src={user?.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`}
                                alt={user?.name || 'User'}
                                className="h-11 w-11 rounded-full bg-zen-surface ring-2 ring-zen-gold/15"
                            />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-bold text-white">{user?.name || 'Learner'}</p>
                                <p className="truncate text-xs text-zen-gold">{user?.totalPoints || 0} XP</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-white/[0.06] px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-white"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );

    return (
        <>
            {/* Mobile hamburger — always shown */}
            <button
                onClick={() => setIsMobileOpen((open) => !open)}
                className="fixed left-4 top-4 z-50 rounded-2xl border border-zen-gold/20 bg-zen-navy/95 p-3 text-zen-gold shadow-zen-card backdrop-blur-xl lg:hidden"
                aria-label="Toggle navigation"
            >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isMobileOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Desktop: show icon rail when collapsed, full sidebar when expanded */}
            {isCollapsed ? iconRail : fullSidebar}
        </>
    );
};

export default GlobalSidebar;

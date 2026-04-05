import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Types ─────────────────────────────────────────────────────────────── */

type NavSection = {
    id: string;
    title: string;
    subSections?: NavSection[];
    icon?: string;
};

interface StickySectionNavCardProps<TSection extends NavSection> {
    sections: TSection[];
    activeSection: string;
    completedSections: string[];
    moduleLabel: string;
    accentClassName: string;
    activeAccentClassName: string;
    onNavigate: (sectionId: string) => void;
    renderIcon?: (section: TSection, isActive: boolean) => React.ReactNode;
    compact?: boolean;
    moduleNumber?: number;
}

/* ─── Helpers ───────────────────────────────────────────────────────────── */

const flattenSections = <T extends NavSection>(sections: T[]): T[] => {
    const result: T[] = [];
    const visit = (items: T[]) => {
        items.forEach((item) => {
            result.push(item);
            if (item.subSections?.length) visit(item.subSections as T[]);
        });
    };
    visit(sections);
    return result;
};

const buildParentMap = <T extends NavSection>(
    sections: T[],
    parentId?: string,
    map: Record<string, string | undefined> = {},
): Record<string, string | undefined> => {
    sections.forEach((s) => {
        map[s.id] = parentId;
        if (s.subSections?.length) buildParentMap(s.subSections as T[], s.id, map);
    });
    return map;
};

const filterSections = <T extends NavSection>(sections: T[], query: string): T[] => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.reduce<T[]>((acc, s) => {
        const kids = s.subSections?.length ? filterSections(s.subSections as T[], q) : [];
        const self = s.title.toLowerCase().includes(q);
        if (!self && kids.length === 0) return acc;
        acc.push({ ...s, subSections: self ? s.subSections : kids });
        return acc;
    }, []);
};

/* ─── Drag hook ──────────────────────────────────────────────────────────── */

interface DragPos { x: number; y: number }

function useDraggable(enabled: boolean) {
    const [pos, setPos] = useState<DragPos>({ x: 0, y: 0 });
    const dragging = useRef(false);
    const origin = useRef<DragPos>({ x: 0, y: 0 });
    const startPos = useRef<DragPos>({ x: 0, y: 0 });

    const onPointerDown = useCallback((e: React.PointerEvent<HTMLElement>) => {
        if (!enabled) return;
        e.currentTarget.setPointerCapture(e.pointerId);
        dragging.current = true;
        origin.current = { x: e.clientX, y: e.clientY };
        startPos.current = { ...pos };
    }, [enabled, pos]);

    const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
        if (!dragging.current) return;
        const dx = e.clientX - origin.current.x;
        const dy = e.clientY - origin.current.y;
        setPos({ x: startPos.current.x + dx, y: startPos.current.y + dy });
    }, []);

    const onPointerUp = useCallback(() => {
        dragging.current = false;
    }, []);

    return { pos, onPointerDown, onPointerMove, onPointerUp };
}

/* ─── Tick / Check icons ─────────────────────────────────────────────────── */

const CheckIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
        <path d="M3 8.5l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const DotIcon = () => (
    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3">
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
);

/* ─── Component ──────────────────────────────────────────────────────────── */

const StickySectionNavCard = <TSection extends NavSection>({
    sections,
    activeSection,
    completedSections,
    moduleLabel,
    accentClassName,
    activeAccentClassName,
    onNavigate,
    renderIcon,
    moduleNumber,
}: StickySectionNavCardProps<TSection>) => {
    const navigate = useNavigate();

    /* state */
    const [isMinimized, setIsMinimized] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [filterQuery, setFilterQuery] = useState('');
    const [optimisticSection, setOptimisticSection] = useState<string | null>(null);
    const [collapsedSections, setCollapsedSections] = useState<Set<string>>(() => new Set());

    /* derived */
    const allSections = useMemo(() => flattenSections(sections), [sections]);
    const parentMap = useMemo(() => buildParentMap(sections), [sections]);
    const resolvedActive = optimisticSection ?? activeSection;
    const activeIndex = allSections.findIndex((s) => s.id === resolvedActive);
    const activeTitle = allSections[activeIndex]?.title ?? 'Overview';
    const prevId = activeIndex > 0 ? allSections[activeIndex - 1]?.id : undefined;
    const nextId = activeIndex >= 0 ? allSections[activeIndex + 1]?.id : undefined;
    const firstId = allSections[0]?.id;
    const lastId = allSections[allSections.length - 1]?.id;
    const completionPct = allSections.length > 0
        ? Math.round((completedSections.length / allSections.length) * 100)
        : 0;
    const filteredSections = useMemo(() => filterSections(sections, filterQuery), [sections, filterQuery]);

    /* drag (only works when sticky/floating) */
    const [isSticky, setIsSticky] = useState(false);
    const slotRef = useRef<HTMLDivElement>(null);
    const { pos, onPointerDown, onPointerMove, onPointerUp } = useDraggable(isSticky);

    /* sticky detection */
    useEffect(() => {
        const slot = slotRef.current;
        if (!slot || typeof window === 'undefined') return;
        let raf = 0;
        const update = () => {
            raf = requestAnimationFrame(() => {
                if (window.innerWidth < 1024) { setIsSticky(false); return; }
                const rect = slot.getBoundingClientRect();
                setIsSticky(rect.top <= 20);
            });
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
            cancelAnimationFrame(raf);
        };
    }, []);

    /* auto-expand parent sections */
    useEffect(() => {
        setOptimisticSection(null);
    }, [activeSection]);

    useEffect(() => {
        setCollapsedSections((prev) => {
            const next = new Set(prev);
            let pid = parentMap[resolvedActive];
            let changed = false;
            while (pid) {
                if (next.delete(pid)) changed = true;
                pid = parentMap[pid];
            }
            return changed ? next : prev;
        });
    }, [parentMap, resolvedActive]);

    const handleNav = (id?: string) => {
        if (!id) return;
        setOptimisticSection(id);
        onNavigate(id);
    };

    const toggleSection = (id: string) => {
        setCollapsedSections((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    /* ── Section link renderer ────────────────────────────────────────────── */
    const renderLinks = (items: TSection[], level = 0): React.ReactNode => items.map((section) => {
        const isActive = resolvedActive === section.id;
        const isDone = completedSections.includes(section.id);
        const hasKids = Boolean(section.subSections?.length);
        const isOpen = filterQuery.trim().length > 0 || !collapsedSections.has(section.id);

        return (
            <li key={section.id} className="mb-0.5 last:mb-0">
                {/* Row */}
                <div className="flex items-center gap-1">
                    {/* Expand toggle for parent sections */}
                    {hasKids ? (
                        <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            className="flex h-6 w-5 shrink-0 items-center justify-center text-slate-500 transition hover:text-slate-300"
                        >
                            <svg viewBox="0 0 20 20" fill="none" className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                                <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ) : (
                        <span className="w-5 shrink-0" />
                    )}

                    {/* Section button */}
                    <button
                        type="button"
                        onClick={() => handleNav(section.id)}
                        style={{ paddingLeft: `${0.5 + level * 0.75}rem` }}
                        className={[
                            'group flex flex-1 items-center gap-2 overflow-hidden rounded-xl border px-2.5 py-2 text-left text-sm transition-all duration-150',
                            isActive
                                ? `border-white/20 bg-gradient-to-r ${activeAccentClassName} text-white shadow-md`
                                : isDone
                                    ? 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-200 hover:bg-emerald-400/[0.12]'
                                    : 'border-white/[0.06] bg-white/[0.03] text-slate-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white',
                        ].join(' ')}
                    >
                        {/* Icon */}
                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg transition-all ${
                            isActive ? 'bg-white/20 text-white'
                            : isDone ? 'bg-emerald-400/20 text-emerald-400'
                            : 'bg-white/[0.06] text-slate-500 group-hover:text-slate-300'
                        }`}>
                            {renderIcon ? renderIcon(section, isActive)
                                : isDone ? <CheckIcon />
                                : <DotIcon />}
                        </span>

                        {/* Title */}
                        <span className="min-w-0 flex-1 truncate text-[0.8rem] font-medium leading-5">{section.title}</span>

                        {/* Status dot */}
                        {isDone && !isActive && (
                            <span className="shrink-0 text-emerald-400"><CheckIcon /></span>
                        )}
                    </button>
                </div>

                {/* Children */}
                {hasKids && isOpen && (
                    <ul className="mt-0.5 border-l border-white/[0.06] pl-2">
                        {renderLinks(section.subSections as TSection[], level + 1)}
                    </ul>
                )}
            </li>
        );
    });

    /* ── Module switcher buttons ──────────────────────────────────────────── */
    const moduleSwitcher = moduleNumber !== undefined ? (
        <div className="mb-3">
            <p className="mb-1.5 px-0.5 text-[9px] font-bold uppercase tracking-[0.28em] text-slate-600">Modules</p>
            <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-black/20 p-1">
                {/* Prev arrow */}
                <button
                    type="button"
                    onClick={() => navigate(`/module/${moduleNumber - 1}`)}
                    disabled={moduleNumber <= 1}
                    title="Previous module"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-400 transition hover:bg-white/[0.12] hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>

                {/* M1–M4 chips */}
                <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((n) => {
                        const isCurrent = n === moduleNumber;
                        const isPast = n < moduleNumber;
                        const isLocked = n > moduleNumber && completionPct < 100;
                        return (
                            <button
                                key={n}
                                type="button"
                                onClick={() => !isLocked && navigate(`/module/${n}`)}
                                disabled={isLocked}
                                title={isLocked ? `Complete Module ${n - 1} first` : `Go to Module ${n}`}
                                className={[
                                    'flex flex-1 items-center justify-center rounded-xl border py-2 text-[11px] font-bold uppercase transition-all duration-200',
                                    isCurrent
                                        ? `border-white/25 bg-gradient-to-r ${accentClassName} text-white shadow-[0_4px_12px_rgba(0,0,0,0.4)]`
                                        : isPast
                                            ? 'border-white/15 bg-white/[0.10] text-slate-200 hover:bg-white/[0.16]'
                                            : isLocked
                                                ? 'cursor-not-allowed border-white/5 bg-white/[0.03] text-slate-700'
                                                : 'border-white/10 bg-white/[0.06] text-slate-400 hover:bg-white/[0.12] hover:text-slate-200',
                                ].join(' ')}
                            >
                                M{n}
                            </button>
                        );
                    })}
                </div>

                {/* Next arrow */}
                <button
                    type="button"
                    onClick={() => navigate(`/module/${moduleNumber + 1}`)}
                    disabled={moduleNumber >= 4 || completionPct < 100}
                    title={completionPct < 100 ? 'Complete this module to unlock next' : 'Next module'}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-slate-400 transition hover:bg-white/[0.12] hover:text-white disabled:cursor-not-allowed disabled:opacity-20"
                >
                    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
            </div>
        </div>
    ) : null;

    /* ── Quick nav row ────────────────────────────────────────────────────── */
    const quickNav = (
        <div className="mb-3 flex items-center gap-1">
            {[
                { id: prevId, label: 'Previous section', icon: <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
                { id: firstId, label: 'Jump to top', icon: <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="M10 14V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M7 9l3-3 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { id: resolvedActive, label: 'Current section', isCurrent: true, icon: <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="2"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/></svg> },
                { id: lastId, label: 'Jump to bottom', icon: <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="M10 6v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M7 11l3 3 3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                { id: nextId, label: 'Next section', icon: <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5"><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
            ].map(({ id, label, icon, isCurrent }) => (
                <button
                    key={label}
                    type="button"
                    onClick={() => handleNav(id)}
                    disabled={!id}
                    title={label}
                    aria-label={label}
                    className={[
                        'flex h-8 flex-1 items-center justify-center rounded-xl border transition-all duration-150',
                        isCurrent
                            ? `border-white/20 bg-gradient-to-r ${accentClassName} text-white shadow-[0_3px_10px_rgba(0,0,0,0.35)]`
                            : 'border-white/[0.08] bg-white/[0.04] text-slate-400 hover:border-white/20 hover:bg-white/[0.10] hover:text-white disabled:cursor-not-allowed disabled:opacity-20',
                    ].join(' ')}
                >
                    {icon}
                    <span className="sr-only">{label}</span>
                </button>
            ))}
        </div>
    );

    /* ── Minimized pill ──────────────────────────────────────────────────── */
    if (isMinimized) {
        return (
            <div ref={slotRef} className="w-full">
                <button
                    type="button"
                    onClick={() => setIsMinimized(false)}
                    className={`flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-[linear-gradient(135deg,rgba(15,23,42,0.85)_0%,rgba(10,18,34,0.80)_100%)] px-4 py-3 text-left shadow-[0_8px_32px_rgba(2,6,23,0.4)] backdrop-blur-xl transition-all duration-200 hover:border-white/25 hover:shadow-[0_12px_40px_rgba(2,6,23,0.5)]`}
                >
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r ${accentClassName} shadow-md`}>
                        <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white">
                            <path d="M4 6h12M4 10h8M4 14h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-slate-400">{moduleLabel}</p>
                        <p className="truncate text-sm font-semibold text-white">{activeTitle}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className={`rounded-full bg-gradient-to-r ${accentClassName} px-2 py-0.5 text-[10px] font-bold text-white`}>
                            {completionPct}%
                        </span>
                        <span className="text-[9px] text-slate-600">{activeIndex + 1}/{allSections.length}</span>
                    </div>
                </button>
            </div>
        );
    }

    /* ── Floating styles when sticky ─────────────────────────────────────── */
    const floatStyle: React.CSSProperties = isSticky
        ? {
            position: 'fixed',
            top: 16 + pos.y,
            left: (slotRef.current?.getBoundingClientRect().left ?? 0) + pos.x,
            width: slotRef.current?.offsetWidth ?? 300,
            zIndex: 40,
            maxHeight: 'calc(100vh - 2rem)',
        }
        : { maxHeight: 'calc(100vh - 2rem)' };

    /* ── Full panel ──────────────────────────────────────────────────────── */
    return (
        <div
            ref={slotRef}
            className="relative w-full lg:self-start"
            style={isSticky ? { minHeight: slotRef.current?.firstElementChild ? (slotRef.current.firstElementChild as HTMLElement).offsetHeight : undefined } : undefined}
        >
            {/* The card */}
            <div
                className="relative flex flex-col overflow-hidden rounded-[1.5rem] border border-white/[0.12] bg-[linear-gradient(165deg,rgba(12,20,38,0.92)_0%,rgba(8,15,28,0.88)_100%)] shadow-[0_20px_60px_rgba(2,6,23,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl"
                style={floatStyle}
                onPointerMove={isSticky ? onPointerMove : undefined}
                onPointerUp={isSticky ? onPointerUp : undefined}
            >
                {/* Ambient glow inside card */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[1.5rem]">
                    <div className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-r ${accentClassName} opacity-[0.09]`} />
                    <div className="absolute -left-4 top-0 h-20 w-20 rounded-full bg-white/[0.05] blur-2xl" />
                </div>

                {/* ── DRAG HANDLE / HEADER ────────────────────────────── */}
                <div
                    className={`relative flex items-center gap-2 border-b border-white/[0.08] px-3 py-3 ${isSticky ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                    onPointerDown={isSticky ? onPointerDown : undefined}
                    title={isSticky ? 'Drag to reposition' : undefined}
                >
                    {/* Grip dots — visual drag indicator */}
                    {isSticky && (
                        <div className="flex shrink-0 flex-col gap-[3px]">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="flex gap-[3px]">
                                    <div className="h-[3px] w-[3px] rounded-full bg-white/20" />
                                    <div className="h-[3px] w-[3px] rounded-full bg-white/20" />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Module + title */}
                    <div className="min-w-0 flex-1">
                        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">{moduleLabel}</p>
                        <p className="truncate text-sm font-semibold text-white">Section Navigator</p>
                    </div>

                    {/* Header controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        {/* Search toggle */}
                        <button
                            type="button"
                            onClick={() => { setShowSearch((v) => !v); if (showSearch) setFilterQuery(''); }}
                            title={showSearch ? 'Hide search' : 'Search sections'}
                            className={`flex h-7 w-7 items-center justify-center rounded-xl border transition-all ${showSearch ? 'border-white/30 bg-white/[0.14] text-white' : 'border-white/10 bg-white/[0.05] text-slate-500 hover:border-white/20 hover:text-slate-300'}`}
                        >
                            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                <circle cx="8.5" cy="8.5" r="4.75" stroke="currentColor" strokeWidth="1.7" />
                                <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                            </svg>
                        </button>
                        {/* Minimize */}
                        <button
                            type="button"
                            onClick={() => setIsMinimized(true)}
                            title="Minimize panel"
                            className="flex h-7 w-7 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-500 transition hover:border-white/20 hover:text-slate-300"
                        >
                            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                <path d="M5 10h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── BODY ────────────────────────────────────────────────── */}
                <div className="relative flex flex-col gap-0 overflow-hidden">
                    <div className="px-3 pt-3">

                        {/* Module switcher */}
                        {moduleSwitcher}

                        {/* Progress row */}
                        <div className="mb-3">
                            <div className="mb-1.5 flex items-center justify-between gap-2">
                                <p className="text-[10px] font-semibold text-slate-400">
                                    <span className="tabular-nums text-white">{Math.max(activeIndex + 1, 1)}</span>
                                    <span className="text-slate-600"> / {allSections.length} sections</span>
                                </p>
                                <span className={`rounded-full bg-gradient-to-r ${accentClassName} px-2.5 py-0.5 text-[10px] font-bold tabular-nums text-white`}>
                                    {completionPct}%
                                </span>
                            </div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
                                <div
                                    className={`h-full rounded-full bg-gradient-to-r ${accentClassName} transition-[width] duration-500`}
                                    style={{ width: `${completionPct}%` }}
                                />
                            </div>
                        </div>

                        {/* Quick nav */}
                        {quickNav}

                        {/* Search bar */}
                        {showSearch && (
                            <div className="mb-3 relative">
                                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-500">
                                    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                        <circle cx="8.5" cy="8.5" r="4.75" stroke="currentColor" strokeWidth="1.7" />
                                        <path d="M12.5 12.5L16 16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={filterQuery}
                                    onChange={(e) => setFilterQuery(e.target.value)}
                                    placeholder="Find a section…"
                                    autoFocus
                                    className="w-full rounded-xl border border-white/[0.12] bg-white/[0.06] py-2 pl-9 pr-9 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-white/25 focus:bg-white/[0.10]"
                                />
                                {filterQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setFilterQuery('')}
                                        className="absolute inset-y-0 right-2 flex items-center px-1 text-slate-500 hover:text-slate-300"
                                    >
                                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Section list */}
                    <div className="flex-1 overflow-y-auto px-3 pb-3 [scrollbar-color:rgba(255,255,255,0.12)_transparent] [scrollbar-width:thin]" style={{ maxHeight: 'calc(100vh - 26rem)' }}>
                        {allSections.length > 0 ? (
                            <ul className="space-y-0.5">
                                {renderLinks(filteredSections)}
                            </ul>
                        ) : null}
                        {filterQuery && filteredSections.length === 0 && (
                            <div className="rounded-xl border border-dashed border-white/10 px-4 py-6 text-center">
                                <p className="text-sm font-semibold text-slate-300">No matches</p>
                                <p className="mt-1 text-xs text-slate-600">Try a different search term</p>
                            </div>
                        )}
                    </div>

                    {/* ── AI CHAT ROW ─────────────────────────────────────── */}
                    <div className="border-t border-white/[0.07] px-3 py-2.5">
                        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.28em] text-slate-600">Ask Gemma 3</p>
                        <div className="flex items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.04] px-3 py-2 transition hover:border-white/[0.18] hover:bg-white/[0.07]">
                            <span className="text-base">🤖</span>
                            <span className="flex-1 text-sm text-slate-500 italic">Ask anything about this module…</span>
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r ${accentClassName} text-white shadow-sm`}>
                                <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                    <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <p className="mt-1.5 text-center text-[9px] text-slate-700">
                            {isSticky ? '⠿ Drag header to reposition' : 'Scroll down to float & drag'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StickySectionNavCard;

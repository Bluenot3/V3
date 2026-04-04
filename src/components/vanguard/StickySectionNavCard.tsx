import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

type RailViewMode = 'icon' | 'compact' | 'expanded';

const flattenSections = <TSection extends NavSection>(sections: TSection[]): TSection[] => {
    const flattened: TSection[] = [];

    const visit = (items: TSection[]) => {
        items.forEach((item) => {
            flattened.push(item);

            if (item.subSections?.length) {
                visit(item.subSections as TSection[]);
            }
        });
    };

    visit(sections);
    return flattened;
};

const buildParentMap = <TSection extends NavSection>(
    sections: TSection[],
    parentId?: string,
    map: Record<string, string | undefined> = {},
) => {
    sections.forEach((section) => {
        map[section.id] = parentId;

        if (section.subSections?.length) {
            buildParentMap(section.subSections as TSection[], section.id, map);
        }
    });

    return map;
};

const filterSections = <TSection extends NavSection>(sections: TSection[], query: string): TSection[] => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return sections;
    }

    return sections.reduce<TSection[]>((filtered, section) => {
        const matchingChildren = section.subSections?.length
            ? filterSections(section.subSections as TSection[], normalizedQuery)
            : [];
        const selfMatches = section.title.toLowerCase().includes(normalizedQuery);

        if (!selfMatches && matchingChildren.length === 0) {
            return filtered;
        }

        filtered.push({
            ...section,
            subSections: selfMatches ? section.subSections : matchingChildren,
        });

        return filtered;
    }, []);
};

const quickButtonClassName = 'group relative flex h-8 items-center justify-center rounded-[0.95rem] border border-white/20 bg-white/[0.08] text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_24px_rgba(2,6,23,0.28)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/35 hover:bg-white/[0.14] hover:text-white active:translate-y-px active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0';

const utilityButtonClassName = 'group inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/24 bg-white/[0.08] text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_10px_26px_rgba(2,6,23,0.28)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/[0.16] hover:text-white';

const StickySectionNavCard = <TSection extends NavSection>({
    sections,
    activeSection,
    completedSections,
    moduleLabel,
    accentClassName,
    activeAccentClassName,
    onNavigate,
    renderIcon,
    compact = false,
    moduleNumber,
}: StickySectionNavCardProps<TSection>) => {
    const navigate = useNavigate();
    const railSlotRef = useRef<HTMLDivElement>(null);
    const railCardRef = useRef<HTMLDivElement>(null);
    const allSections = useMemo(() => flattenSections(sections), [sections]);
    const parentMap = useMemo(() => buildParentMap(sections), [sections]);
    const [optimisticSection, setOptimisticSection] = useState<string | null>(null);
    const [filterQuery, setFilterQuery] = useState('');
    const [collapsedSections, setCollapsedSections] = useState<Set<string>>(
        () => new Set(allSections.filter((section) => section.subSections?.length).map((section) => section.id)),
    );
    const [viewMode, setViewMode] = useState<RailViewMode>('expanded');
    const [isUtilityExpanded, setIsUtilityExpanded] = useState(false);
    const [floatingMetrics, setFloatingMetrics] = useState({
        enabled: false,
        left: 0,
        width: 0,
        height: 0,
    });
    const resolvedActiveSection = optimisticSection ?? activeSection;
    const lastSectionId = allSections[allSections.length - 1]?.id;
    const activeTitle = allSections.find((section) => section.id === resolvedActiveSection)?.title ?? 'Overview';
    const activeIndex = allSections.findIndex((section) => section.id === resolvedActiveSection);
    const activePreviewSection = activeIndex >= 0 ? allSections[activeIndex] : allSections[0];
    const previousSectionId = activeIndex > 0 ? allSections[activeIndex - 1]?.id : undefined;
    const nextSectionId = activeIndex >= 0 ? allSections[activeIndex + 1]?.id : undefined;
    const filteredSections = useMemo(() => filterSections(sections, filterQuery), [filterQuery, sections]);
    const filteredFlatSections = useMemo(() => flattenSections(filteredSections), [filteredSections]);
    const completionPercent = allSections.length > 0
        ? Math.round((completedSections.length / allSections.length) * 100)
        : 0;
    const completedCount = completedSections.length;
    const remainingCount = Math.max(allSections.length - completedCount, 0);
    const isExpanded = viewMode === 'expanded';
    const isIconMode = viewMode === 'icon';
    const showUtilityPanel = isExpanded && (isUtilityExpanded || filterQuery.trim().length > 0);

    useEffect(() => {
        setOptimisticSection(null);
    }, [activeSection]);

    useEffect(() => {
        if (!isExpanded && isUtilityExpanded) {
            setIsUtilityExpanded(false);
        }
    }, [isExpanded, isUtilityExpanded]);

    useLayoutEffect(() => {
        const slot = railSlotRef.current;
        const card = railCardRef.current;

        if (!slot || !card || typeof window === 'undefined') {
            return undefined;
        }

        let animationFrame = 0;

        const updateFloatingMetrics = () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }

            animationFrame = window.requestAnimationFrame(() => {
                const desktopMode = window.innerWidth >= 1024;
                const topOffset = 80;

                if (!desktopMode) {
                    setFloatingMetrics((previous) => (
                        previous.enabled
                            ? { enabled: false, left: 0, width: 0, height: 0 }
                            : previous
                    ));
                    return;
                }

                const slotRect = slot.getBoundingClientRect();
                const shouldFloat = slotRect.top <= topOffset;
                const nextMetrics = {
                    enabled: shouldFloat,
                    left: Math.round(slotRect.left),
                    width: Math.round(slotRect.width),
                    height: Math.round(card.offsetHeight),
                };

                setFloatingMetrics((previous) => (
                    previous.enabled === nextMetrics.enabled
                    && previous.left === nextMetrics.left
                    && previous.width === nextMetrics.width
                    && previous.height === nextMetrics.height
                        ? previous
                        : nextMetrics
                ));
            });
        };

        updateFloatingMetrics();

        const resizeObserver = new ResizeObserver(updateFloatingMetrics);
        resizeObserver.observe(slot);
        resizeObserver.observe(card);
        window.addEventListener('resize', updateFloatingMetrics);
        window.addEventListener('scroll', updateFloatingMetrics, { passive: true });

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateFloatingMetrics);
            window.removeEventListener('scroll', updateFloatingMetrics);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    useEffect(() => {
        setCollapsedSections((previous) => {
            const next = new Set(previous);
            let parentId = parentMap[resolvedActiveSection];
            let didChange = false;

            while (parentId) {
                if (next.delete(parentId)) {
                    didChange = true;
                }

                parentId = parentMap[parentId];
            }

            return didChange ? next : previous;
        });
    }, [parentMap, resolvedActiveSection]);

    const handleNavigate = (sectionId?: string) => {
        if (!sectionId) {
            return;
        }

        setOptimisticSection(sectionId);
        onNavigate(sectionId);
    };

    const toggleSection = (sectionId: string) => {
        setCollapsedSections((previous) => {
            const next = new Set(previous);

            if (next.has(sectionId)) {
                next.delete(sectionId);
            } else {
                next.add(sectionId);
            }

            return next;
        });
    };

    const toggleExpandedMode = () => {
        setViewMode((previous) => (previous === 'expanded' ? 'compact' : 'expanded'));
    };

    const renderStatusGlyph = (isActive: boolean, isCompleted: boolean) => {
        if (isCompleted) {
            return (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                    <path d="M5.5 10.5L8.5 13.5L14.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        }

        if (isActive) {
            return (
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                    <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.6" />
                    <circle cx="10" cy="10" r="1.8" fill="currentColor" />
                </svg>
            );
        }

        return (
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                <path d="M8 6L12 10L8 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        );
    };

    const renderLinks = (items: TSection[], level = 0) => items.map((section) => {
        const isActive = resolvedActiveSection === section.id;
        const isCompleted = completedSections.includes(section.id);
        const hasChildren = Boolean(section.subSections?.length);
        const isExpanded = filterQuery.trim().length > 0 || !collapsedSections.has(section.id);

        return (
            <li key={section.id} className="mb-1 last:mb-0">
                <div className="group relative flex items-stretch gap-1.5">
                    {hasChildren ? (
                        <button
                            type="button"
                            onClick={() => toggleSection(section.id)}
                            aria-label={isExpanded ? `Collapse ${section.title}` : `Expand ${section.title}`}
                            className="flex h-auto w-6 flex-shrink-0 items-center justify-center rounded-[0.9rem] border border-white/60 bg-white/55 text-slate-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.72)] backdrop-blur-xl transition-all duration-200 hover:border-white hover:bg-white/70 hover:text-slate-700"
                        >
                            <svg
                                viewBox="0 0 20 20"
                                fill="none"
                                aria-hidden="true"
                                className={`h-3 w-3 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                            >
                                <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    ) : (
                        <span className="w-6 flex-shrink-0" aria-hidden="true" />
                    )}

                    <button
                        type="button"
                        onClick={() => handleNavigate(section.id)}
                        className={[
                            'group relative flex min-w-0 flex-1 items-center justify-between overflow-hidden rounded-[1.05rem] border px-2.5 py-1.5 text-left transition-all duration-200 transform-gpu',
                            'hover:-translate-y-0.5 hover:border-white hover:shadow-[0_16px_32px_rgba(148,163,184,0.14)] active:translate-y-px active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/80',
                            isActive
                                ? `border-white/90 bg-gradient-to-r ${activeAccentClassName} text-white shadow-[0_18px_34px_rgba(99,102,241,0.18)]`
                                : 'border-white/70 bg-white/65 text-slate-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_10px_28px_rgba(148,163,184,0.12)] backdrop-blur-xl hover:bg-white/78',
                        ].join(' ')}
                        style={{ paddingLeft: `${0.65 + level * 0.85}rem` }}
                    >
                        {isActive && (
                            <span className="absolute inset-y-1.5 left-1 w-1 rounded-full bg-white/85 shadow-[0_0_14px_rgba(255,255,255,0.7)]" />
                        )}

                        <span className="relative flex min-w-0 items-center gap-2">
                            <span
                                className={[
                                    'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-[0.8rem] border transition-all duration-200',
                                    isActive
                                        ? 'border-white/20 bg-white/15 text-white'
                                        : isCompleted
                                            ? 'border-emerald-200/80 bg-emerald-50 text-emerald-600'
                                            : 'border-white/70 bg-white/68 text-slate-400 group-hover:text-slate-700',
                                ].join(' ')}
                            >
                                {renderIcon ? renderIcon(section, isActive) : <span className="h-2 w-2 rounded-full bg-current" />}
                            </span>
                            <span className="truncate text-[0.8rem] font-semibold leading-5">{section.title}</span>
                        </span>

                        <span
                            className={[
                                'relative ml-2 flex h-6 w-6 items-center justify-center rounded-full border transition-all duration-200',
                                isActive
                                    ? 'border-white/20 bg-white/15 text-white'
                                    : isCompleted
                                        ? 'border-emerald-200/80 bg-emerald-50 text-emerald-600'
                                        : 'border-white/70 bg-white/68 text-slate-400 group-hover:text-slate-700',
                            ].join(' ')}
                        >
                            {renderStatusGlyph(isActive, isCompleted)}
                        </span>
                    </button>
                </div>

                {hasChildren && isExpanded ? (
                    <ul className="mt-2 border-l border-slate-200/80 pl-2">
                        {renderLinks(section.subSections as TSection[], level + 1)}
                    </ul>
                ) : null}
            </li>
        );
    });

    return (
        <div
            ref={railSlotRef}
            className="relative w-full lg:self-start"
            style={floatingMetrics.enabled ? { minHeight: `${floatingMetrics.height}px` } : undefined}
        >
            <div
                ref={railCardRef}
                className={`relative overflow-hidden rounded-[1.65rem] border border-white/20 bg-[linear-gradient(165deg,rgba(15,23,42,0.8)_0%,rgba(10,18,34,0.72)_52%,rgba(7,13,26,0.84)_100%)] shadow-[0_24px_70px_rgba(2,6,23,0.5),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-[22px] ${isIconMode ? 'w-[4.6rem] p-2' : compact ? 'p-2.5' : 'p-3'}`}
                style={floatingMetrics.enabled ? {
                    position: 'fixed',
                    top: 80,
                    left: floatingMetrics.left,
                    width: isIconMode ? Math.min(78, floatingMetrics.width) : floatingMetrics.width,
                    maxHeight: 'calc(100vh - 12rem)',
                    zIndex: 30,
                } : { maxHeight: 'calc(100vh - 12rem)' }}
            >
                <div className="pointer-events-none absolute inset-0">
                    <div className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-r ${accentClassName} opacity-[0.12]`} />
                    <div className="absolute left-4 top-3 h-14 w-14 rounded-full bg-white/80 blur-2xl" />
                    <div className="absolute right-0 top-0 h-20 w-24 bg-gradient-to-l from-cyan-100/50 to-transparent" />
                </div>

                {/* Module navigation strip */}
                {moduleNumber !== undefined && !isIconMode && (
                    <div className="relative mb-3 flex items-center gap-1 rounded-[1.15rem] border border-white/20 bg-white/[0.06] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <button
                            type="button"
                            onClick={() => navigate(`/module/${moduleNumber - 1}`)}
                            disabled={moduleNumber <= 1}
                            title="Previous module"
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/20 bg-white/[0.1] text-slate-300 transition-all hover:bg-white/[0.18] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                <path d="M11.5 5.5L7 10L11.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <div className="flex flex-1 gap-1">
                            {[1, 2, 3, 4].map((n) => {
                                const isCurrent = n === moduleNumber;
                                const isPast = n < moduleNumber;
                                const isNextUnlocked = completionPercent >= 100;
                                const isLocked = n > moduleNumber && !isNextUnlocked;
                                return (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => !isLocked && navigate(`/module/${n}`)}
                                        disabled={isLocked}
                                        title={isLocked ? `Complete Module ${n - 1} first` : `Go to Module ${n}`}
                                        className={[
                                            'flex flex-1 items-center justify-center rounded-[0.75rem] border py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-200',
                                            isCurrent
                                                ? `border-white/30 bg-gradient-to-r ${accentClassName} text-white shadow-[0_8px_20px_rgba(0,0,0,0.25)]`
                                                : isPast
                                                    ? 'border-white/20 bg-white/[0.12] text-slate-200 hover:bg-white/[0.2] hover:text-white'
                                                    : isNextUnlocked
                                                        ? 'border-white/15 bg-white/[0.07] text-slate-400 hover:bg-white/[0.14] hover:text-slate-200'
                                                        : 'cursor-not-allowed border-white/10 bg-white/[0.04] text-slate-600',
                                        ].join(' ')}
                                    >
                                        M{n}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            onClick={() => navigate(`/module/${moduleNumber + 1}`)}
                            disabled={moduleNumber >= 4 || completionPercent < 100}
                            title={completionPercent < 100 ? 'Complete this module to unlock the next' : 'Next module'}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.85rem] border border-white/20 bg-white/[0.1] text-slate-300 transition-all hover:bg-white/[0.18] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                        >
                            <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                                <path d="M8.5 5.5L13 10L8.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                )}

                {isIconMode ? (
                    <div className="relative flex flex-col items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setViewMode('compact')}
                            aria-label="Expand section navigator"
                            title="Expand section navigator"
                            className={`group flex h-10 w-10 items-center justify-center rounded-[1rem] border border-white/28 bg-gradient-to-r ${activeAccentClassName} text-white shadow-[0_18px_34px_rgba(99,102,241,0.22)] transition-all duration-200 hover:-translate-y-0.5`}
                        >
                            {renderIcon && activePreviewSection
                                ? renderIcon(activePreviewSection, true)
                                : <span className="h-2 w-2 rounded-full bg-current" />}
                        </button>
                        <div className="rounded-full border border-white/20 bg-white/[0.1] px-1.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-100">
                            {completionPercent}%
                        </div>
                    </div>
                ) : (
                <>
                <div className="relative shrink-0 border-b border-white/20 pb-2.5">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="truncate text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-300">{moduleLabel}</p>
                                <span className="h-3.5 w-px bg-white/20" />
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    {Math.max(activeIndex + 1, 1)} / {allSections.length}
                                </p>
                            </div>
                            {isExpanded ? (
                                <p className="mt-1 text-[15px] font-semibold tracking-tight text-white">Section navigator</p>
                            ) : (
                                <p className="mt-1 truncate text-sm font-semibold tracking-tight text-slate-100">{activeTitle}</p>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <div className={`rounded-full bg-gradient-to-r ${accentClassName} px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_rgba(15,23,42,0.12)]`}>
                                {completionPercent}%
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsUtilityExpanded((previous) => !previous)}
                                aria-label={showUtilityPanel ? 'Collapse navigator tools' : 'Expand navigator tools'}
                                title={showUtilityPanel ? 'Collapse navigator tools' : 'Expand navigator tools'}
                                className={utilityButtonClassName}
                            >
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${showUtilityPanel ? 'rotate-180' : ''}`}>
                                    <path d="M5 7.5H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M7.5 10H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M9 12.5H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode('icon')}
                                aria-label="Minimize navigator to icon"
                                title="Minimize navigator to icon"
                                className={utilityButtonClassName}
                            >
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                    <path d="M12.5 5.5L8 10L12.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                onClick={toggleExpandedMode}
                                aria-label={isExpanded ? 'Collapse section navigator' : 'Expand section navigator'}
                                title={isExpanded ? 'Collapse section navigator' : 'Expand section navigator'}
                                className={utilityButtonClassName}
                            >
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                    <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="mt-2.5 h-1.5 rounded-full bg-white/10 shadow-[inset_0_1px_2px_rgba(15,23,42,0.36)]">
                        <div
                            className={`relative h-full rounded-full bg-gradient-to-r ${accentClassName} transition-[width] duration-300`}
                            style={{ width: `${completionPercent}%` }}
                        >
                            <span className="absolute inset-y-0 right-0 w-8 rounded-full bg-white/50 blur-sm" />
                        </div>
                    </div>

                    <div className="mt-2.5 grid grid-cols-5 gap-1">
                        <button
                            type="button"
                            onClick={() => handleNavigate(previousSectionId)}
                            disabled={!previousSectionId}
                            aria-label="Previous section"
                            title="Previous section"
                            className={quickButtonClassName}
                        >
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                <path d="M11.5 5.5L7 10L11.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="sr-only">Previous section</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(allSections[0]?.id ?? 'overview')}
                            aria-label="Jump to top"
                            title="Jump to top"
                            className={quickButtonClassName}
                        >
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                <path d="M10 14.5V5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M6.5 9L10 5.5L13.5 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="sr-only">Jump to top</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(resolvedActiveSection)}
                            aria-label="Jump to current section"
                            title="Jump to current section"
                            className={quickButtonClassName}
                        >
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.8" />
                                <circle cx="10" cy="10" r="1.8" fill="currentColor" />
                            </svg>
                            <span className="sr-only">Jump to current section</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(lastSectionId)}
                            aria-label="Jump to bottom"
                            title="Jump to bottom"
                            className={quickButtonClassName}
                        >
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                <path d="M10 5.5V14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M6.5 11L10 14.5L13.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="sr-only">Jump to bottom</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleNavigate(nextSectionId)}
                            disabled={!nextSectionId}
                            aria-label="Next section"
                            title="Next section"
                            className={quickButtonClassName}
                        >
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                <path d="M8.5 5.5L13 10L8.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="sr-only">Next section</span>
                        </button>
                    </div>

                    {isExpanded && showUtilityPanel ? (
                        <div className="mt-2.5 space-y-2 rounded-[1.25rem] border border-white/20 bg-white/[0.08] p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_16px_32px_rgba(2,6,23,0.24)] backdrop-blur-xl">
                            <div className="flex items-center justify-between gap-2 rounded-[1.1rem] border border-white/20 bg-white/[0.08] px-3 py-2.5">
                                <div className="min-w-0">
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Now viewing</p>
                                    <p className="mt-1 truncate text-sm font-semibold text-slate-100">{activeTitle}</p>
                                </div>
                                <div className="rounded-full border border-white/20 bg-white/[0.1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                                    {completedCount} done
                                </div>
                            </div>

                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                                    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-4 w-4">
                                        <circle cx="9" cy="9" r="5.75" stroke="currentColor" strokeWidth="1.6" />
                                        <path d="M13.25 13.25L17 17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={filterQuery}
                                    onChange={(event) => setFilterQuery(event.target.value)}
                                    placeholder="Find a section"
                                    className="w-full rounded-[1.15rem] border border-white/20 bg-white/[0.1] py-2.5 pl-10 pr-12 text-sm font-medium text-slate-100 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-xl transition-all duration-200 placeholder:text-slate-400 focus:border-white/40 focus:bg-white/[0.16]"
                                />
                                {filterQuery ? (
                                    <button
                                        type="button"
                                        onClick={() => setFilterQuery('')}
                                        className="absolute inset-y-0 right-2 flex items-center rounded-xl px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-slate-100"
                                    >
                                        Clear
                                    </button>
                                ) : null}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="rounded-[1rem] border border-white/20 bg-white/[0.08] px-3 py-2 text-xs font-medium text-slate-300">
                                    {Math.max(activeIndex + 1, 1)} of {allSections.length} sections
                                </div>
                                <div className="rounded-[1rem] border border-white/20 bg-white/[0.08] px-3 py-2 text-xs font-medium text-slate-300">
                                    {remainingCount} remaining
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {isExpanded ? (
                    <div className="relative min-h-0 flex-1 pt-2.5">
                        <div className="max-h-[calc(100vh-22rem)] overflow-y-auto pr-1 pb-1 [scrollbar-color:rgba(139,92,246,0.45)_transparent] [scrollbar-width:thin]">
                            <ul>{renderLinks(filteredSections)}</ul>
                            {filteredFlatSections.length === 0 ? (
                                <div className="rounded-[1rem] border border-dashed border-white/20 bg-white/[0.08] px-4 py-6 text-center backdrop-blur-xl">
                                    <p className="text-sm font-semibold text-slate-100">No sections found</p>
                                    <p className="mt-1 text-xs text-slate-400">Try a shorter phrase or clear the filter.</p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="relative pt-2.5">
                        <button
                            type="button"
                            onClick={() => setViewMode('expanded')}
                            className={`group flex w-full items-center gap-2 overflow-hidden rounded-[1.05rem] border border-white/80 bg-gradient-to-r ${activeAccentClassName} px-2.5 py-2 text-left text-white shadow-[0_18px_34px_rgba(99,102,241,0.16)] transition-all duration-200 hover:-translate-y-0.5`}
                        >
                            <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-[0.85rem] border border-white/20 bg-white/15">
                                {renderIcon && activePreviewSection
                                    ? renderIcon(activePreviewSection, true)
                                    : <span className="h-2 w-2 rounded-full bg-current" />}
                            </span>
                            <span className="min-w-0 flex-1">
                                <span className="block truncate text-[0.82rem] font-semibold leading-5">{activeTitle}</span>
                                <span className="block text-[10px] uppercase tracking-[0.18em] text-white/72">Tap to expand sections</span>
                            </span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/15">
                                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-3.5 w-3.5">
                                    <path d="M7 5L12 10L7 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
                        </button>
                    </div>
                )}
                </>
                )}
            </div>
        </div>
    );
};

export default StickySectionNavCard;

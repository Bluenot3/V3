import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import zenBadgeImage from '../../assets/zen-ai-record-badge.jpg';
import certificateTemplatePdf from '../assets/certificates/zen-ai-co-cred.pdf';
import { getCertificatesByUser, formatCertificateDate, truncateHash } from '../services/CertificateService';
import { useAuth } from '../hooks/useAuth';
import {
    ZenActionTile,
    ZenHeaderBanner,
    ZenIdentityCard,
    ZenModuleGlyph,
    ZenStatGauge,
    ZenTelemetryCard,
} from '../components/zen';
import type { ZenGlyphName } from '../components/zen';

const moduleInfo = [
    {
        id: 1 as const,
        title: 'AI Foundations',
        description: 'Build the mental model for modern AI, LLM behavior, and reliable prompt judgment.',
        outcome: 'Explain what the model is doing and spot weak outputs fast.',
        totalSections: 50,
        accent: 'from-zen-gold via-zen-gold-light to-brand-cyan',
        icon: 'module1' as ZenGlyphName,
    },
    {
        id: 2 as const,
        title: 'Agents & Automation',
        description: 'Design tool-using systems, memory patterns, workflows, and API-backed automations.',
        outcome: 'Architect an agent workflow that does more than chat.',
        totalSections: 40,
        accent: 'from-brand-cyan via-zen-quantum to-zen-emerald',
        icon: 'module2' as ZenGlyphName,
    },
    {
        id: 3 as const,
        title: 'Personal Intelligence',
        description: 'Turn research, retrieval, and decision-making into a structured AI operating system.',
        outcome: 'Build a second-brain workflow with real retrieval and decision support.',
        totalSections: 40,
        accent: 'from-zen-emerald via-teal-400 to-brand-cyan',
        icon: 'module3' as ZenGlyphName,
    },
    {
        id: 4 as const,
        title: 'Systems Mastery',
        description: 'Move from builder to operator with governance, observability, and production thinking.',
        outcome: 'Review and harden an AI system like a professional team would.',
        totalSections: 60,
        accent: 'from-zen-gold via-amber-400 to-rose-400',
        icon: 'module4' as ZenGlyphName,
    },
];

const Dashboard: React.FC = () => {
    const { user, getModuleProgress } = useAuth();
    const certificateCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const certificateCanvasFrameRef = useRef<HTMLDivElement | null>(null);
    const [isPreviewReady, setIsPreviewReady] = useState(false);
    const [previewRenderFailed, setPreviewRenderFailed] = useState(false);
    const [shouldRenderCertificatePreview, setShouldRenderCertificatePreview] = useState(false);

    const stats = useMemo(() => {
        if (!user) {
            return {
                overallProgress: 0,
                modulesCompleted: 0,
                totalSectionsCompleted: 0,
                totalSectionsAvailable: 0,
                totalPoints: 0,
            };
        }

        const totals = moduleInfo.reduce((accumulator, moduleDefinition) => {
            const progress = getModuleProgress(moduleDefinition.id);

            return {
                completedSections: accumulator.completedSections + progress.completedSections.length,
                totalSections: accumulator.totalSections + moduleDefinition.totalSections,
                completedModules: accumulator.completedModules + (progress.certificateId ? 1 : 0),
            };
        }, {
            completedSections: 0,
            totalSections: 0,
            completedModules: 0,
        });

        return {
            overallProgress: totals.totalSections > 0 ? Math.round((totals.completedSections / totals.totalSections) * 100) : 0,
            modulesCompleted: totals.completedModules,
            totalSectionsCompleted: totals.completedSections,
            totalSectionsAvailable: totals.totalSections,
            totalPoints: user.totalPoints,
        };
    }, [getModuleProgress, user]);

    const certificates = useMemo(() => (
        user ? getCertificatesByUser(user.email) : []
    ), [user]);
    const isCourseComplete = stats.modulesCompleted >= moduleInfo.length;
    const completionMilestone = Math.round((stats.modulesCompleted / moduleInfo.length) * 100);

    useEffect(() => {
        const frame = certificateCanvasFrameRef.current;
        if (!frame || shouldRenderCertificatePreview) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                setShouldRenderCertificatePreview(true);
                observer.disconnect();
            },
            { rootMargin: '280px 0px' },
        );

        observer.observe(frame);

        return () => {
            observer.disconnect();
        };
    }, [shouldRenderCertificatePreview]);

    useEffect(() => {
        if (!shouldRenderCertificatePreview) {
            return;
        }

        let cancelled = false;
        let activeTask: { destroy: () => void } | null = null;

        const renderPreview = async () => {
            const canvas = certificateCanvasRef.current;
            const frame = certificateCanvasFrameRef.current;
            if (!canvas || !frame) {
                return;
            }

            setIsPreviewReady(false);
            setPreviewRenderFailed(false);

            try {
                const [{ GlobalWorkerOptions, getDocument }, workerSource] = await Promise.all([
                    import('pdfjs-dist'),
                    import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
                ]);

                GlobalWorkerOptions.workerSrc = workerSource.default;
                activeTask = getDocument(certificateTemplatePdf);
                const documentProxy = await activeTask.promise;
                const firstPage = await documentProxy.getPage(1);

                const measuredFrameWidth = frame.clientWidth - 16;
                const frameWidth = measuredFrameWidth > 0 ? measuredFrameWidth : 640;
                const baseViewport = firstPage.getViewport({ scale: 1 });
                const scale = frameWidth / baseViewport.width;
                const viewport = firstPage.getViewport({ scale });
                const dpr = Math.max(window.devicePixelRatio || 1, 1);

                canvas.width = Math.floor(viewport.width * dpr);
                canvas.height = Math.floor(viewport.height * dpr);
                canvas.style.width = `${viewport.width}px`;
                canvas.style.height = `${viewport.height}px`;

                const context = canvas.getContext('2d', { alpha: false });
                if (!context) {
                    throw new Error('Certificate preview canvas context is unavailable.');
                }

                if (cancelled) {
                    firstPage.cleanup();
                    await documentProxy.destroy();
                    return;
                }

                context.setTransform(dpr, 0, 0, dpr, 0, 0);
                context.clearRect(0, 0, viewport.width, viewport.height);
                await firstPage.render({ canvasContext: context, viewport }).promise;
                firstPage.cleanup();
                await documentProxy.destroy();

                if (!cancelled) {
                    setIsPreviewReady(true);
                }
            } catch (error) {
                console.error('Certificate preview render failed.', error);
                if (!cancelled) {
                    setPreviewRenderFailed(true);
                }
            }
        };

        void renderPreview();

        return () => {
            cancelled = true;
            activeTask?.destroy();
        };
    }, [shouldRenderCertificatePreview]);

    if (!user) {
        return null;
    }

    return (
        <div className="mx-auto max-w-[96rem] space-y-8 pb-20 lg:pb-8">
            <ZenHeaderBanner
                variant="dashboard"
                eyebrow="Vanguard Command Deck"
                icon="dashboard"
                title="Advanced AI Research and Innovation for Future Leaders"
                description={`${user.name.split(' ')[0]}, Vanguard now opens like a premium ZEN control room: stronger identity, live telemetry, clearer action hierarchy, and a tighter visual bridge from program summary to module execution.`}
                chips={['Flagship track', 'Telemetry wall', 'Identity-first shell', 'Production-minded learning']}
                rightContent={(
                    <ZenIdentityCard
                        title="Vanguard Program"
                        subtitle="Doc ID: ZEN-VD-2024-2027"
                        description="Your dashboard now behaves like a branded mission console with a distinct ZEN emblem, tracked readiness, and a more memorable progression surface."
                        chips={['Ages 15+', 'Quantum-secure shell', 'Readiness index']}
                        imageSrc={zenBadgeImage}
                    />
                )}
            />

            <section className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="grid gap-4 md:grid-cols-3">
                    <ZenActionTile to="/module/1" label="Resume Vanguard" description="Move directly into the learning track and continue the active module sequence." icon="module1" variant="primary" badge="Active" />
                    <ZenActionTile to="/docs" label="Research Resources" description="Open the richer documentation layer for deployment notes, concepts, and playbooks." icon="research" variant="resource" />
                    <ZenActionTile to="/guide" label="Project Submit" description="Use the setup and deployment guidance to turn finished work into visible proof." icon="submit" variant="submit" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <ZenStatGauge title="Readiness" value={Math.max(68, stats.overallProgress)} subtitle="The dashboard now reflects a more complete ZEN operating identity." icon="readiness" variant="readiness" />
                    <ZenStatGauge title="Network" value={100} subtitle="Hub, dashboard, and module shell are visually synchronized." icon="network" variant="network" />
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-4">
                <ZenTelemetryCard title="Completion" value={`${stats.overallProgress}%`} subtitle="Overall Vanguard progress across all modules." icon="progress" variant="progress" />
                <ZenTelemetryCard title="Modules" value={`${stats.modulesCompleted}/4`} subtitle="Finished tracks with issued artifacts." icon="verify" variant="integrity" />
                <ZenTelemetryCard title="Sections" value={`${stats.totalSectionsCompleted}`} subtitle="Completed sections across the curriculum." icon="telemetry" variant="readiness" />
                <ZenTelemetryCard title="XP" value={`${stats.totalPoints}`} subtitle="Total momentum earned in the platform." icon="identity" variant="network" />
            </section>

            <section className="cv-auto grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
                <div className="zen-panel rounded-[2rem] p-6">
                    <p className="zen-micro-label">Documentation Intelligence</p>
                    <h2 className="mt-3 font-display text-3xl font-semibold tracking-[0.04em] text-[#f7e4b0]">
                        The docs library now supports the dashboard like an execution layer.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                        Use it to search concepts, deployment guidance, API key patterns, Hugging Face playbooks, and production checklists without leaving the ZEN shell. The goal is not just prettier surfaces, but better movement between learning, research, and shipping.
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link to="/docs" className="rounded-full bg-gradient-to-r from-zen-gold to-zen-gold-light px-5 py-3 text-sm font-semibold text-zen-navy transition duration-300 hover:-translate-y-0.5 hover:shadow-glowing-gold">
                            Open Docs Library
                        </Link>
                        <Link to="/docs?doc=hf-deployment" className="rounded-full border border-zen-gold/15 bg-zen-gold/[0.06] px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-zen-gold/25">
                            Jump to deployment docs
                        </Link>
                    </div>
                </div>

                <div className="grid gap-3">
                    <ZenTelemetryCard title="Learn" value="Sequenced" subtitle="Work through the modules like a structured operating system instead of a loose course catalog." icon="learn" variant="progress" />
                    <ZenTelemetryCard title="Ship" value="Artifact-led" subtitle="Treat labs and Hugging Face deployments as proof-producing milestones." icon="ship" variant="network" />
                    <ZenTelemetryCard title="Verify" value="Tracked" subtitle="Return here to review progress, achievements, and the next capability to unlock." icon="verify" variant="integrity" />
                </div>
            </section>

            <section className="cv-auto">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="zen-micro-label">Module Grid</p>
                        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[0.04em] text-[#f7e4b0]">Vanguard modules</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            Each track now reads like a branded ZEN capability card instead of a generic course block.
                        </p>
                    </div>
                    <Link to="/guide" className="hidden rounded-full border border-zen-gold/15 bg-zen-gold/[0.06] px-4 py-2 text-sm font-semibold text-zen-gold transition duration-300 hover:-translate-y-0.5 hover:border-zen-gold/25 sm:inline-flex">
                        Review guide
                    </Link>
                </div>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {moduleInfo.map((moduleDefinition) => {
                        const progress = getModuleProgress(moduleDefinition.id);
                        const completionPercent = Math.round((progress.completedSections.length / moduleDefinition.totalSections) * 100);

                        return (
                            <Link
                                key={moduleDefinition.id}
                                to={`/module/${moduleDefinition.id}`}
                                className="group zen-panel relative overflow-hidden rounded-[1.9rem] p-6 transition duration-300 hover:-translate-y-1.5 hover:border-zen-gold/20 hover:shadow-[0_26px_54px_rgba(2,6,23,0.46)]"
                            >
                                <div className={`pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r ${moduleDefinition.accent} opacity-[0.2]`} />
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="zen-micro-label">Module {moduleDefinition.id}</p>
                                        <h3 className="mt-3 font-display text-[1.9rem] font-semibold tracking-[0.04em] text-[#f6e1ac]">{moduleDefinition.title}</h3>
                                        <p className="mt-3 text-sm leading-7 text-slate-300">{moduleDefinition.description}</p>
                                    </div>
                                    <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-[1.25rem] bg-gradient-to-br ${moduleDefinition.accent} text-zen-navy shadow-[0_16px_34px_rgba(0,0,0,0.3)]`}>
                                        <ZenModuleGlyph name={moduleDefinition.icon} className="h-6 w-6" />
                                    </div>
                                </div>

                                <div className="mt-5 rounded-[1.35rem] border border-zen-gold/8 bg-zen-navy/50 p-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-slate-300">{progress.completedSections.length}/{moduleDefinition.totalSections} sections</span>
                                        <span className="font-semibold text-zen-gold">{completionPercent}%</span>
                                    </div>
                                    <div className="mt-3 h-2 rounded-full bg-white/[0.06]">
                                        <div className={`h-full rounded-full bg-gradient-to-r ${moduleDefinition.accent}`} style={{ width: `${completionPercent}%` }} />
                                    </div>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <div className="rounded-[1.35rem] border border-zen-gold/8 bg-zen-navy/50 p-4">
                                        <p className="zen-micro-label">Outcome</p>
                                        <p className="mt-2 text-sm leading-7 text-slate-300">{moduleDefinition.outcome}</p>
                                    </div>
                                    <div className={`rounded-[1.35rem] border border-white/10 bg-gradient-to-br ${moduleDefinition.accent} p-4 text-zen-navy`}>
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zen-navy/70">Signal</p>
                                        <p className="mt-2 text-sm leading-7 text-zen-navy/90">
                                            {completionPercent >= 75
                                                ? 'You are deep enough in this track to start shaping portfolio-grade proof.'
                                                : 'This track is active. Keep moving until the ideas turn into a working system.'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section id="certificates" className="cv-auto space-y-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="zen-micro-label">Achievements</p>
                        <h2 className="mt-3 font-display text-3xl font-semibold tracking-[0.04em] text-[#f7e4b0]">Certificates and artifacts</h2>
                        <p className="mt-3 text-sm leading-7 text-slate-300">
                            Verifiable proof appears here as you finish modules and issue records.
                        </p>
                    </div>
                </div>

                {certificates.length === 0 ? (
                    <div className="zen-panel mt-6 rounded-[1.9rem] border-dashed p-8 text-center">
                        <p className="font-display text-2xl font-semibold text-[#f7e4b0]">No certificates yet</p>
                        <p className="mt-3 text-sm leading-7 text-slate-400">
                            Finish a module, document the work, and return here to review your issued artifacts.
                        </p>
                    </div>
                ) : (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {certificates.map((certificate) => (
                            <Link
                                key={certificate.id}
                                to={`/certificate/${certificate.id}`}
                                className="zen-panel rounded-[1.8rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-zen-gold/20 hover:shadow-[0_24px_54px_rgba(2,6,23,0.44)]"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <p className="zen-micro-label">
                                            {certificate.type === 'final' ? 'Final certificate' : `Module ${certificate.moduleNumber}`}
                                        </p>
                                        <h3 className="mt-3 text-lg font-black tracking-tight text-white">
                                            {certificate.type === 'final' ? 'AI Literacy Certification' : `Module ${certificate.moduleNumber} Certificate`}
                                        </h3>
                                        <p className="mt-2 text-sm text-slate-400">Issued {formatCertificateDate(certificate.issuedAt)}</p>
                                        <p className="mt-3 text-xs font-mono text-zen-gold">{truncateHash(certificate.sha256Hash)}</p>
                                    </div>
                                    <div className="rounded-[1.35rem] border border-zen-gold/20 bg-gradient-to-br from-zen-gold/15 to-zen-gold/[0.04] px-4 py-3 text-center shadow-zen-glow">
                                        <p className="font-display text-2xl font-semibold text-zen-gold">{certificate.performance.completionPercentage}%</p>
                                        <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Score</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="zen-panel relative overflow-hidden rounded-[1.9rem] border border-zen-gold/15 p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_20%_20%,rgba(201,168,76,0.12),transparent_55%),radial-gradient(ellipse_90%_80%_at_80%_80%,rgba(34,211,238,0.07),transparent_65%)]" />

                    <div className="relative flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="zen-micro-label">Final Vanguard Credential</p>
                            <h3 className="mt-2 font-display text-2xl font-semibold tracking-[0.03em] text-[#f7e4b0]">
                                Certification preview
                            </h3>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                This stays in locked preview mode until all 4 modules are completed.
                            </p>
                        </div>

                        <div className="rounded-[1.2rem] border border-zen-gold/20 bg-zen-gold/[0.05] px-4 py-3 text-right">
                            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400">Unlock progress</p>
                            <p className="mt-1 font-display text-2xl font-semibold text-zen-gold">{completionMilestone}%</p>
                            <p className="text-xs text-slate-400">{stats.modulesCompleted}/{moduleInfo.length} modules complete</p>
                        </div>
                    </div>

                    <div className="relative mt-6 flex justify-center">
                        <div className="group relative w-full max-w-[46rem] overflow-hidden rounded-[1.65rem] border border-zen-gold/22 bg-[linear-gradient(135deg,rgba(16,25,45,0.92)_0%,rgba(9,16,32,0.95)_42%,rgba(11,22,43,0.9)_100%)] p-3 shadow-[0_26px_72px_rgba(2,6,23,0.5)] sm:p-4">
                            <div className="pointer-events-none absolute -left-7 top-8 h-24 w-24 rounded-full bg-zen-gold/18 blur-3xl" />
                            <div className="pointer-events-none absolute -right-8 bottom-6 h-28 w-28 rounded-full bg-brand-cyan/18 blur-3xl" />
                            <div className="pointer-events-none absolute inset-[1px] rounded-[1.55rem] border border-white/12" />
                            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" />

                            <div className="relative overflow-hidden rounded-[1.28rem] border border-white/16 bg-[radial-gradient(ellipse_95%_55%_at_50%_6%,rgba(255,255,255,0.15),transparent_58%),linear-gradient(180deg,rgba(16,25,45,0.62)_0%,rgba(8,13,24,0.76)_100%)] px-3 py-3 backdrop-blur-3xl sm:px-5 sm:py-4">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                    <span className="rounded-full border border-zen-gold/30 bg-zen-gold/[0.09] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-zen-gold">
                                        Digital display case
                                    </span>
                                    <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] ${isCourseComplete ? 'border border-emerald-300/30 bg-emerald-300/10 text-emerald-100' : 'border border-slate-300/20 bg-slate-300/10 text-slate-200'}`}>
                                        {isCourseComplete ? 'Verified render' : 'Locked render'}
                                    </span>
                                </div>

                                <div className="mx-auto w-full max-w-[32rem]">
                                    <div className="relative overflow-hidden rounded-[1.1rem] border border-zen-gold/18 bg-zen-navy/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_42px_rgba(2,6,23,0.44)]">
                                        <div className="aspect-[11/8.5] w-full">
                                            <div ref={certificateCanvasFrameRef} className="relative flex h-full items-center justify-center p-2 sm:p-3">
                                                <canvas
                                                    ref={certificateCanvasRef}
                                                    className={`pointer-events-none max-h-full w-full select-none rounded-[0.8rem] shadow-[0_12px_30px_rgba(2,6,23,0.35)] transition-opacity duration-500 ${isPreviewReady ? 'opacity-100' : 'opacity-0'}`}
                                                    aria-label="ZEN Vanguard certificate preview"
                                                />

                                                {!isPreviewReady && !previewRenderFailed && (
                                                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-slate-300">
                                                        {shouldRenderCertificatePreview
                                                            ? 'Rendering certificate preview...'
                                                            : 'Preview initializes as you approach this section.'}
                                                    </div>
                                                )}

                                                {previewRenderFailed && (
                                                    <div className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-slate-300">
                                                        Certificate preview unavailable right now.
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {!isPreviewReady && !previewRenderFailed && (
                                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.14)_0%,rgba(2,6,23,0.2)_100%)]">
                                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-zen-gold/20 bg-zen-navy/75 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-slate-200">
                                                    Preparing preview
                                                </div>
                                            </div>
                                        )}

                                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.03)_0%,rgba(2,6,23,0.18)_100%)]" />

                                        <div className="pointer-events-none absolute left-1/2 top-[53%] w-[70%] -translate-x-1/2 text-center">
                                            <p className={`font-serif text-[clamp(0.78rem,1.4vw,1.45rem)] tracking-[0.04em] ${isCourseComplete ? 'text-slate-800/85' : 'text-slate-700/50'}`}>
                                                {isCourseComplete ? user.name : 'LOCKED UNTIL FULL COURSE COMPLETION'}
                                            </p>
                                        </div>

                                        {!isCourseComplete && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(180deg,rgba(2,6,23,0.38)_0%,rgba(2,6,23,0.6)_100%)] backdrop-blur-[1px]">
                                                <div className="rounded-full border border-zen-gold/35 bg-zen-gold/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-zen-gold">
                                                    Preview only
                                                </div>
                                                <p className="max-w-xl px-6 text-center text-xs leading-6 text-slate-100/90 sm:text-sm sm:leading-7">
                                                    Complete all modules to unlock your personalized certificate and full certificate access.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-4 space-y-3">
                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.08]">
                            <div
                                className="h-full rounded-full bg-gradient-to-r from-zen-gold via-zen-gold-light to-brand-cyan transition-all duration-700"
                                style={{ width: `${completionMilestone}%` }}
                            />
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <p className="text-xs text-slate-400">
                                Personalization unlocks automatically at 100% completion.
                            </p>

                            {isCourseComplete ? (
                                <a
                                    href={certificateTemplatePdf}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full border border-zen-gold/30 bg-zen-gold/[0.08] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zen-gold transition duration-300 hover:-translate-y-0.5 hover:bg-zen-gold/[0.14]"
                                >
                                    Open full certificate
                                </a>
                            ) : (
                                <span className="rounded-full border border-slate-500/30 bg-slate-800/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                                    Locked
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Dashboard;

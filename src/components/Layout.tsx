import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BackToTopButton from './BackToTopButton';
import AnimatedBackground from './AnimatedBackground';
import GlobalSidebar from './GlobalSidebar';
import Header from './Header';
import MobileBottomNav from './MobileBottomNav';
import OpsShell from './ops/OpsShell';
import { useOpsThemeSafe } from '../theme/OpsThemeContext';
import LuxuryClickEffects from './LuxuryClickEffects';

const Layout: React.FC = () => {
    const { pathname } = useLocation();
    const mainContentRef = React.useRef<HTMLDivElement>(null);
    const opsTheme = useOpsThemeSafe();
    const isOpsMode = opsTheme?.isOpsMode ?? false;

    React.useLayoutEffect(() => {
        if (window.location.hash) {
            window.history.replaceState(null, '', window.location.pathname);
        }

        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        const resetScroll = () => {
            window.scrollTo(0, 0);
            if (mainContentRef.current) {
                mainContentRef.current.scrollTop = 0;
            }
        };

        resetScroll();

        const t1 = setTimeout(resetScroll, 50);
        const t2 = setTimeout(resetScroll, 150);
        const t3 = setTimeout(resetScroll, 500);
        const t4 = setTimeout(resetScroll, 1200);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [pathname]);

    const content = (
        <div className={`relative flex min-h-screen font-sans text-brand-text ${isOpsMode ? 'bg-[var(--ops-base)]' : 'bg-transparent'}`}>
            {!isOpsMode && <AnimatedBackground />}
            <LuxuryClickEffects />

            <GlobalSidebar />

            <div className="relative z-10 flex min-h-screen flex-1 flex-col transition-all duration-300 lg:ml-72">
                <Header />
                <main ref={mainContentRef} className={`no-scrollbar flex-1 ${pathname.startsWith('/module/') ? 'p-0' : 'p-4 lg:p-8'}`}>
                    <Outlet />
                </main>

                <footer
                    className={`border-t py-8 text-center text-sm lg:mb-0 ${
                        isOpsMode
                            ? 'border-[var(--ops-border)] bg-[var(--ops-surface-1)]/80 text-[var(--ops-text-muted)] backdrop-blur-sm'
                            : 'border-zen-gold/8 bg-zen-navy/60 text-slate-500 backdrop-blur-sm'
                    }`}
                    style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 2rem)' }}
                >
                    <p>&copy; {new Date().getFullYear()} ZEN AI Co. — Vanguard Program. All rights reserved.</p>
                    <p
                        className={`mt-1 font-medium ${
                            isOpsMode
                                ? 'text-[var(--ops-primary)]'
                                : 'bg-gradient-to-r from-zen-gold to-brand-cyan bg-clip-text text-transparent'
                        }`}
                    >
                        Powered by ZEN Vanguard AI Literacy Certification
                    </p>
                </footer>
            </div>

            <BackToTopButton />
            <MobileBottomNav />
        </div>
    );

    return isOpsMode ? <OpsShell>{content}</OpsShell> : content;
};

export default Layout;

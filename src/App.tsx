import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAdmin } from './contexts/AdminContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const Module1Page = React.lazy(() => import('./pages/Module1Page'));
const Module2Page = React.lazy(() => import('./pages/Module2Page'));
const Module3Page = React.lazy(() => import('./pages/Module3Page'));
const Module4Page = React.lazy(() => import('./pages/Module4Page'));
const CertificatePage = React.lazy(() => import('./pages/CertificatePage'));
const StarterGuidePage = React.lazy(() => import('./pages/StarterGuidePage'));
const DocumentationPage = React.lazy(() => import('./pages/DocumentationPage'));
const AdminLoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const AdminLayout = React.lazy(() => import('./components/AdminLayout'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PioneerProfilePage = React.lazy(() => import('./pages/PioneerProfilePage'));
const AdminStudents = React.lazy(() => import('./pages/AdminStudents'));
const AdminMessages = React.lazy(() => import('./pages/AdminMessages'));
const AdminAnalytics = React.lazy(() => import('./pages/AdminAnalytics'));
const AdminSettings = React.lazy(() => import('./pages/AdminSettings'));
const ProgramHubPage = React.lazy(() => import('./zen-programs/pages/ProgramHubPage'));
const ProgramDashboardPage = React.lazy(() => import('./zen-programs/pages/ProgramDashboardPage'));

const PageLoader: React.FC = () => (
    <div className="min-h-screen flex items-center justify-center bg-zen-navy">
        <div className="flex flex-col items-center gap-5 text-center">
            <div className="relative">
                <div className="h-14 w-14 rounded-full border-[3px] border-zen-gold/15 border-t-zen-gold animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black text-zen-gold">Z</span>
                </div>
            </div>
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-zen-gold">ZEN Vanguard</p>
                <p className="mt-2 text-sm text-slate-500">Loading your workspace…</p>
            </div>
        </div>
    </div>
);

const AdminLoader: React.FC = () => (
    <div className="min-h-screen bg-zen-navy flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
            <div className="relative">
                <div className="w-14 h-14 border-[3px] border-zen-gold/15 border-t-zen-gold rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black text-zen-gold">Z</span>
                </div>
            </div>
            <p className="text-slate-500 font-medium text-sm">Loading admin panel…</p>
        </div>
    </div>
);

const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAdminAuthenticated } = useAdmin();

    if (!isAdminAuthenticated) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Navigate to="/hub" replace />} />
            <Route path="/paywall" element={<Navigate to="/hub" replace />} />
            <Route path="/billing/success" element={<Navigate to="/hub" replace />} />

            <Route
                path="/admin/login"
                element={
                    <Suspense fallback={<AdminLoader />}>
                        <AdminLoginPage />
                    </Suspense>
                }
            />

            <Route
                path="/admin"
                element={
                    <Suspense fallback={<AdminLoader />}>
                        <AdminProtectedRoute>
                            <AdminLayout />
                        </AdminProtectedRoute>
                    </Suspense>
                }
            >
                <Route index element={<AdminDashboard />} />
                <Route path="students" element={<AdminStudents />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            <Route
                path="/hub"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ProgramHubPage />
                    </Suspense>
                }
            />

            <Route
                path="/programs/:programId"
                element={
                    <Suspense fallback={<PageLoader />}>
                        <ProgramDashboardPage />
                    </Suspense>
                }
            />

            <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/hub" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                    path="guide"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <StarterGuidePage />
                        </Suspense>
                    }
                />
                <Route
                    path="docs"
                    element={
                        <Suspense fallback={<PageLoader />}>
                            <DocumentationPage />
                        </Suspense>
                    }
                />
                <Route path="profile" element={<PioneerProfilePage />} />
                <Route path="module/1/*" element={<Suspense fallback={<PageLoader />}><Module1Page /></Suspense>} />
                <Route path="module/2/*" element={<Suspense fallback={<PageLoader />}><Module2Page /></Suspense>} />
                <Route path="module/3/*" element={<Suspense fallback={<PageLoader />}><Module3Page /></Suspense>} />
                <Route path="module/4/*" element={<Suspense fallback={<PageLoader />}><Module4Page /></Suspense>} />
                <Route path="certificate/:certId" element={<Suspense fallback={<PageLoader />}><CertificatePage /></Suspense>} />
            </Route>

            <Route path="*" element={<Navigate to="/hub" replace />} />
        </Routes>
    );
};

export default App;

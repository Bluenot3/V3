import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { AdminProvider } from './contexts/AdminContext';
import { BillingProvider } from './contexts/BillingContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { OpsThemeProvider } from './theme/OpsThemeContext';
const SettingsPanel = React.lazy(() => import('./components/SettingsPanel'));
import './index.css';
import './styles/zen-ops.css';

import { FriendlyErrorBoundary } from './components/FriendlyErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <FriendlyErrorBoundary>
            <ThemeProvider>
                <OpsThemeProvider>
                    <AuthProvider>
                        <AdminProvider>
                            <BillingProvider>
                                <App />
                                <Suspense fallback={null}>
                                    <SettingsPanel />
                                </Suspense>
                            </BillingProvider>
                        </AdminProvider>
                    </AuthProvider>
                </OpsThemeProvider>
            </ThemeProvider>
        </FriendlyErrorBoundary>
    </BrowserRouter>
);

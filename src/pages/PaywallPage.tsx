import React, { useState } from 'react';
import { useBilling } from '../contexts/BillingContext';

const includedFeatures = [
    '4 structured AI learning modules',
    'Interactive labs and simulations',
    'Agent deployment and automation training',
    'Certificates and progress tracking',
    'Program hub and guided learning paths',
];

const PaywallPage: React.FC = () => {
    const { createCheckoutSession, adminBypass, error } = useBilling();
    const [showAdminModal, setShowAdminModal] = useState(false);
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminError, setAdminError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        setLoading(true);
        const url = await createCheckoutSession();
        if (url) {
            window.location.href = url;
        }
        setLoading(false);
    };

    const handleAdminLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        setAdminError('');
        setLoading(true);

        const success = await adminBypass(adminUsername, adminPassword);

        if (success) {
            window.location.href = '/dashboard';
        } else {
            setAdminError('Admin access is unavailable or the credentials were rejected.');
        }

        setLoading(false);
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-bg p-4 font-sans">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-brand-primary/10 blur-[100px] animate-blob" />
                <div className="animation-delay-2000 absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-brand-cyan/10 blur-[80px] animate-blob" />
            </div>

            <div className="relative z-10 w-full max-w-lg">
                <div className="mb-8 flex flex-col items-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-purple-600 shadow-glowing">
                        <span className="text-4xl font-black text-white">Z</span>
                    </div>
                    <h1 className="text-2xl font-bold text-brand-text">ZEN Vanguard</h1>
                    <p className="mt-1 text-sm text-brand-text-light">AI Professionals Program</p>
                </div>

                <div className="rounded-2xl bg-brand-bg p-8 shadow-neumorphic-out md:p-12">
                    <div className="mb-8 text-center">
                        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                            <svg className="h-8 w-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="mb-2 text-xl font-bold text-brand-text">Subscription Required</h2>
                        <p className="text-brand-text-light">
                            Unlock the full ZEN Vanguard learning experience with subscription access.
                        </p>
                    </div>

                    <div className="mb-8 rounded-xl bg-brand-bg p-6 shadow-neumorphic-in">
                        <h3 className="mb-4 font-semibold text-brand-text">Included</h3>
                        <ul className="space-y-3 text-sm">
                            {includedFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-3 text-brand-text-light">
                                    <span className="text-pale-green">✓</span>
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {error && <p className="mb-4 text-center text-sm font-semibold text-red-500">{error}</p>}

                    <button
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="mb-4 w-full rounded-full bg-gradient-to-r from-brand-primary to-purple-600 px-8 py-4 font-bold text-white shadow-neumorphic-out transition-all duration-300 hover:scale-95 hover:shadow-neumorphic-in disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Processing...
                            </span>
                        ) : (
                            'Subscribe Now'
                        )}
                    </button>

                    <div className="text-center">
                        <button
                            onClick={() => setShowAdminModal(true)}
                            className="text-sm text-brand-text-light underline transition-colors hover:text-brand-primary"
                        >
                            Internal Admin Access
                        </button>
                    </div>
                </div>

                <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-brand-text-light/60">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Secure payment powered by Stripe
                </p>
            </div>

            {showAdminModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="relative w-full max-w-sm rounded-2xl bg-brand-bg p-8 shadow-neumorphic-out">
                        <button
                            onClick={() => {
                                setShowAdminModal(false);
                                setAdminError('');
                                setAdminUsername('');
                                setAdminPassword('');
                            }}
                            className="absolute right-4 top-4 text-brand-text-light hover:text-brand-text"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h3 className="mb-6 text-center text-xl font-bold text-brand-text">Internal Admin Access</h3>

                        <form onSubmit={handleAdminLogin} className="space-y-4">
                            <input
                                type="text"
                                value={adminUsername}
                                onChange={(event) => setAdminUsername(event.target.value)}
                                placeholder="Username"
                                className="input-neumorphic"
                                disabled={loading}
                            />
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(event) => setAdminPassword(event.target.value)}
                                placeholder="Password"
                                className="input-neumorphic"
                                disabled={loading}
                            />

                            {adminError && <p className="text-center text-sm font-semibold text-red-500">{adminError}</p>}

                            <button
                                type="submit"
                                disabled={loading || !adminUsername || !adminPassword}
                                className="w-full rounded-full bg-gradient-to-r from-slate-700 to-slate-800 px-8 py-3 font-bold text-white shadow-neumorphic-out transition-all duration-300 hover:shadow-neumorphic-in disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loading ? 'Verifying...' : 'Continue'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaywallPage;

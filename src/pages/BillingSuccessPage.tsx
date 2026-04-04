import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBilling } from '../contexts/BillingContext';

const BillingSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { checkEntitlement } = useBilling();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = searchParams.get('session_id');

            if (!sessionId) {
                setStatus('error');
                return;
            }

            // Wait a moment for webhook to process
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Refresh entitlement status
            await checkEntitlement();

            setStatus('success');

            // Redirect to dashboard after showing success
            setTimeout(() => {
                navigate('/dashboard', { replace: true });
            }, 3000);
        };

        verifyPayment();
    }, [searchParams, checkEntitlement, navigate]);

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md text-center">
                {status === 'loading' && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                        <h2 className="text-xl font-bold text-brand-text">Verifying Payment...</h2>
                        <p className="text-brand-text-light">Please wait while we confirm your subscription.</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="bg-brand-bg rounded-2xl shadow-neumorphic-out p-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text mb-2">Payment Successful!</h2>
                        <p className="text-brand-text-light mb-6">
                            Welcome to ZEN Vanguard. Your subscription is now active.
                        </p>
                        <div className="flex items-center justify-center gap-2 text-brand-text-light">
                            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span>Redirecting to dashboard...</span>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="bg-brand-bg rounded-2xl shadow-neumorphic-out p-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text mb-2">Something went wrong</h2>
                        <p className="text-brand-text-light mb-6">
                            We couldn't verify your payment. Please contact support.
                        </p>
                        <button
                            onClick={() => navigate('/paywall')}
                            className="bg-gradient-to-r from-brand-primary to-purple-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BillingSuccessPage;

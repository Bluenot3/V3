import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { MagicZIcon } from '../icons/MagicZIcon';

const LoginPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!email || !password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await signup(email, password);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md">
                 <div className="flex justify-center mb-8">
                    <MagicZIcon />
                </div>
                <div className="bg-brand-bg rounded-2xl shadow-neumorphic-out p-8 md:p-12">
                   
                    <div className="flex justify-center mb-6">
                        <div className="bg-brand-bg p-1.5 rounded-full shadow-neumorphic-in flex">
                            <button
                                onClick={() => setIsLogin(true)}
                                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${isLogin ? 'text-white bg-brand-primary shadow-sm' : 'text-brand-text-light'}`}
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setIsLogin(false)}
                                className={`px-6 py-2 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'text-white bg-brand-primary shadow-sm' : 'text-brand-text-light'}`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-full px-4 py-3 bg-brand-bg rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text shadow-neumorphic-in"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="password"className="sr-only">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-brand-bg rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text shadow-neumorphic-in"
                                disabled={loading}
                            />
                        </div>

                         {error && <p className="text-center text-red-500 text-sm font-semibold">{error}</p>}

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-brand-primary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-neumorphic-out hover:shadow-neumorphic-in transform hover:scale-95 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
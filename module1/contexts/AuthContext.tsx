import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  updateProgress: (id: string, type: 'section' | 'interactive') => void;
  addPoints: (amount: number) => void;
  updateLastViewedSection: (sectionId: string) => void;
  resetProgress: () => void;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USER_STORAGE_KEY = 'zenVanguardUser';

const defaultUser: User = {
  email: 'user@example.com',
  name: 'Zen Vanguard',
  picture: '',
  points: 0,
  progress: { completedSections: [], completedInteractives: [] },
  lastViewedSection: 'overview',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedData = localStorage.getItem(USER_STORAGE_KEY);
            if (storedData) {
                // Ensure lastViewedSection exists on old stored data
                const storedUser = JSON.parse(storedData);
                if (!storedUser.lastViewedSection) {
                    storedUser.lastViewedSection = 'overview';
                }
                setUser(storedUser);
            } else {
                setUser(defaultUser);
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
            }
        } catch (error) {
            console.error("Failed to access localStorage:", error);
            setUser(defaultUser);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateProgress = useCallback(async (id: string, type: 'section' | 'interactive') => {
        setUser(prevUser => {
            if (!prevUser) return null;

            const newProgress = { ...prevUser.progress };
            let updated = false;

            if (type === 'section' && !newProgress.completedSections.includes(id)) {
                newProgress.completedSections.push(id);
                updated = true;
            } else if (type === 'interactive' && !newProgress.completedInteractives.includes(id)) {
                newProgress.completedInteractives.push(id);
                updated = true;
            }

            if (updated) {
                const updatedUser = { ...prevUser, progress: newProgress };
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
                return updatedUser;
            }

            return prevUser;
        });
    }, []);

    const addPoints = useCallback(async (amount: number) => {
        setUser(prevUser => {
            if (!prevUser) return null;
            const updatedUser = { ...prevUser, points: prevUser.points + amount };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            // Dispatch a custom event for UI feedback
            document.dispatchEvent(new CustomEvent('pointsAdded', { detail: { amount } }));
            return updatedUser;
        });
    }, []);

    const updateLastViewedSection = useCallback(async (sectionId: string) => {
        setUser(prevUser => {
            if (!prevUser || prevUser.lastViewedSection === sectionId) return prevUser;
            const updatedUser = { ...prevUser, lastViewedSection: sectionId };
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
            return updatedUser;
        });
    }, []);

    const resetProgress = useCallback(() => {
        setUser(prevUser => {
            if (!prevUser) return null;
            
            // Create a clean user object preserving identity but resetting progress
            const resetUser: User = { 
                ...defaultUser,
                email: prevUser.email,
                name: prevUser.name,
                picture: prevUser.picture,
                points: 0,
                progress: { completedSections: [], completedInteractives: [] },
                lastViewedSection: 'overview'
            };
            
            // Sync to storage immediately
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(resetUser));
            
            return resetUser;
        });

        // Perform scroll side-effect outside the state updater
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }, []);

    const login = useCallback(async (email: string, _pass: string) => {
        // Mock login.
        const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const loggedInUser: User = {
            ...defaultUser,
            email: email,
            name: name,
            picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
        };
        setUser(loggedInUser);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(loggedInUser));
    }, []);

    const signup = useCallback(async (email: string, pass: string) => {
        await login(email, pass);
    }, [login]);

    const value = { user, loading, updateProgress, addPoints, login, signup, updateLastViewedSection, resetProgress };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
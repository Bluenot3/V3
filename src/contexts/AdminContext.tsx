import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Student, Message, ActivityEvent, AdminStats } from '../types';
import { dal } from '../services/dal';

interface AdminContextType {
    isAdminAuthenticated: boolean;
    adminLogin: (username: string, password: string) => Promise<boolean>;
    adminLogout: () => void;
    students: Student[];
    messages: Message[];
    activityFeed: ActivityEvent[];
    stats: AdminStats;
    sendMessage: (to: string[], subject: string, body: string, type: Message['type']) => void;
    createAssignment: (studentIds: string[], assignment: any) => void;
    getStudent: (id: string) => Student | undefined;
    searchStudents: (query: string) => Student[];
    refreshData: () => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

// Helper to calculate stats
const calculateStats = (students: Student[]): AdminStats => {
    if (students.length === 0) {
        return {
            totalStudents: 0,
            activeToday: 0,
            averageProgress: 0,
            certificatesIssued: 0,
            atRiskStudents: 0,
            completionRate: 0,
            averageEngagementTime: '0h 0m',
            weeklyGrowth: 0,
            totalSectionsCompleted: 0,
            totalInteractivesCompleted: 0,
            totalPoints: 0,
        };
    }

    const now = Date.now();
    const oneDayAgo = now - 24 * 60 * 60 * 1000;

    const activeToday = students.filter(s => {
        const lastActiveTime = new Date(s.lastActive).getTime();
        return lastActiveTime > oneDayAgo;
    }).length;

    const certificatesIssued = students.reduce((sum, s) => {
        return sum + Object.values(s.moduleProgress).filter(m => m.certificateId).length;
    }, 0);

    const totalSectionsCompleted = students.reduce((sum, s) => {
        return sum + Object.values(s.moduleProgress).reduce((mSum, m) => mSum + m.completedSections.length, 0);
    }, 0);

    const totalInteractivesCompleted = students.reduce((sum, s) => {
        return sum + Object.values(s.moduleProgress).reduce((mSum, m) => mSum + m.completedInteractives.length, 0);
    }, 0);

    const totalPoints = students.reduce((sum, s) => sum + s.totalPoints, 0);
    const totalPossibleSections = students.length * 4 * 50;
    const averageProgress = totalPossibleSections > 0
        ? Math.round((totalSectionsCompleted / totalPossibleSections) * 100)
        : 0;

    const atRiskStudents = students.filter(s => s.status === 'at-risk').length;
    const possibleCerts = students.length * 4;
    const completionRate = possibleCerts > 0 ? Math.round((certificatesIssued / possibleCerts) * 100) : 0;

    // Engagement time approx
    let totalSessionTime = 0;
    let sessionCount = 0;
    students.forEach(s => {
        s.sessionHistory?.forEach(session => {
            if (session.startedAt && session.endedAt) {
                const duration = new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime();
                totalSessionTime += duration;
                sessionCount++;
            }
        });
    });

    const avgSessionMs = sessionCount > 0 ? totalSessionTime / sessionCount : 0;
    const avgHours = Math.floor(avgSessionMs / (1000 * 60 * 60));
    const avgMinutes = Math.floor((avgSessionMs % (1000 * 60 * 60)) / (1000 * 60));

    return {
        totalStudents: students.length,
        activeToday,
        averageProgress,
        certificatesIssued,
        atRiskStudents,
        completionRate,
        averageEngagementTime: `${avgHours}h ${avgMinutes}m`,
        weeklyGrowth: 0,
        totalSectionsCompleted,
        totalInteractivesCompleted,
        totalPoints,
    };
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([]);

    // Load real data from DAL
    const loadRealData = useCallback(async () => {
        if (!isAdminAuthenticated) return;

        try {
            const loadedStudents = await dal.user.getAllStudents();
            setStudents(loadedStudents);
        } catch (error) {
            console.error("Failed to load admin data:", error);
        }
    }, [isAdminAuthenticated]);

    useEffect(() => {
        if (isAdminAuthenticated) {
            loadRealData();
        }
    }, [isAdminAuthenticated, loadRealData]);

    const adminLogin = useCallback(async (username: string, password: string): Promise<boolean> => {
        // Map username to email if needed
        let email = username;
        if (!email.includes('@')) {
            email = 'admin@zenvanguard.com'; // Default admin email mapping
        }

        try {
            await dal.auth.login(email, password);

            // Post-login check
            // For now, if login succeeds, we verify simplified admin check
            // Ideally we should check user role from DAL if supported
            // Using same logic as before:

            const currentUser = dal.auth.getCurrentUser();
            // Note: getCurrentUser depends on sync state, but login awaits.
            // On success, state might not be instantly updated in DAL without an observer?
            // Actually, `login` in Firebase is stateful.
            // But we need to verify email.
            // We can trust the login call and the email we sent.

            if (email === 'admin@zenvanguard.com' || email === 'admin') {
                setIsAdminAuthenticated(true);
                return true;
            } else {
                const adminEmails = ['admin@zenvanguard.com', 'alexleschik@bgcgw.org', 'testadmin@zenai.co'];
                // We can't easily check auth.currentUser.email from DAL synchronously if getCurrentUser returns null initially
                // But since we just awaited login, let's assume valid.
                // We'll trust the input email if login succeeded with it.
                if (adminEmails.includes(email)) {
                    setIsAdminAuthenticated(true);
                    return true;
                }

                // If not in list, denied
                await dal.auth.logout();
                return false;
            }
        } catch (error) {
            console.error("Admin Login Failed:", error);
            return false;
        }
    }, []);

    const adminLogout = useCallback(() => {
        dal.auth.logout();
        setIsAdminAuthenticated(false);
        setStudents([]);
    }, []);

    const sendMessage = useCallback((to: string[], subject: string, body: string, type: Message['type']) => {
        // Implementation for sending messages (Firestore 'messages' collection)
        console.log("Send message:", to, subject);
    }, []);

    const createAssignment = useCallback((studentIds: string[], assignment: any) => {
        console.log("Create assignment", studentIds, assignment);
    }, []);

    const getStudent = useCallback((id: string) => {
        return students.find(s => s.id === id);
    }, [students]);

    const searchStudents = useCallback((query: string) => {
        const lower = query.toLowerCase();
        return students.filter(s =>
            s.name.toLowerCase().includes(lower) ||
            s.email.toLowerCase().includes(lower)
        );
    }, [students]);

    const refreshData = useCallback(() => {
        loadRealData();
    }, [loadRealData]);

    const stats = React.useMemo(() => calculateStats(students), [students]);

    return (
        <AdminContext.Provider value={{
            isAdminAuthenticated,
            adminLogin,
            adminLogout,
            students,
            messages,
            activityFeed,
            stats,
            sendMessage,
            createAssignment,
            getStudent,
            searchStudents,
            refreshData,
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};

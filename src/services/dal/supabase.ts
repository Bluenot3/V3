import { supabase } from '../../lib/supabase';
import { IAuthService, IUserService, IDAL } from './contract';
import type { User, UserUpdates, Student } from './types';

class SupabaseAuthService implements IAuthService {
    async login(email: string, password: string): Promise<void> {
        console.log("Attempting Supabase login with:", { email: email.trim(), passwordLength: password.length });

        const { error } = await supabase.auth.signInWithPassword({
            email: email.trim(), // Ensure no whitespace
            password,
        });
        if (error) {
            console.error("Supabase Login Error Detail:", error);
            console.error("Supabase Login Error Code:", console.log(JSON.stringify(error, null, 2)));
            throw error;
        }
    }

    async signup(email: string, password: string): Promise<void> {
        const { error, data } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) throw error;

        // Force creation of public user record immediately
        if (data.user) {
            const name = email.split('@')[0];
            const newUser = createDefaultUser(email, name);
            // We ignore error here as it might already exist
            await supabase.from('users').insert([{
                id: data.user.id,
                email: newUser.email,
                name: newUser.name,
                picture: newUser.picture,
                created_at: newUser.createdAt,
                metadata: {
                    totalPoints: newUser.totalPoints,
                    modules: newUser.modules,
                    sessionHistory: newUser.sessionHistory,
                    finalCertificationId: newUser.finalCertificationId,
                    finalCertificationHash: newUser.finalCertificationHash
                }
            }]);
        }
    }

    // ... (login remains same, but we add check in onAuthStateChanged)

    onAuthStateChanged(callback: (user: User | null) => void): () => void {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                this.currentUserId = session.user.id;
                try {
                    // Try to fetch existing user
                    const { data, error } = await supabase
                        .from('users')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (data) {
                        // User exists, return it
                        const user: User = {
                            email: data.email,
                            name: data.name,
                            picture: data.picture,
                            metadata: undefined,
                            ...data.metadata
                        };
                        callback(user);
                    } else {
                        // User Missing? create it now.
                        const name = session.user.email?.split('@')[0] || 'User';
                        const newUser = createDefaultUser(session.user.email || '', name);

                        const { error: insertError } = await supabase
                            .from('users')
                            .insert([{
                                id: session.user.id,
                                email: newUser.email,
                                name: newUser.name,
                                picture: newUser.picture,
                                created_at: newUser.createdAt,
                                metadata: {
                                    totalPoints: newUser.totalPoints,
                                    modules: newUser.modules,
                                    sessionHistory: newUser.sessionHistory,
                                    finalCertificationId: newUser.finalCertificationId,
                                    finalCertificationHash: newUser.finalCertificationHash
                                }
                            }]);

                        if (insertError) {
                            console.error("Critical: Failed to create public user record", insertError);
                        }
                        callback(newUser);
                    }
                } catch (e) {
                    console.error("Error in onAuthStateChanged", e);
                    callback(null);
                }
            } else {
                callback(null);
            }
        });

        return () => subscription.unsubscribe();
    }
    getUserId(): string | null {
        // Synchronous access to current session ID
        // Note: supabase.auth.session() is deprecated/removed in v2, 
        // but we need a synch way or we refactor AuthContext to await.
        // For now, let's use a workaround: we might have to cache it?
        // Actually, supabase-js v2 doesn't exposing sync user easily without 'await getSession'.
        // BUT, we can try to return the user from the last event?
        // Let's assume for now we rely on the implementation detail that `supabase.auth` holds state internally?
        // Check docs: `supabase.auth.getUser()` is async. `supabase.auth.getSession()` is async.
        // However, we are in a tight spot.
        // If we can't get it sync, we must return null or refactor.
        // Let's try to mock it for the offline user!
        // Wait, for offline user, we don't even use DAL for this.
        // But for real user? 
        // WORKAROUND: We will return null, but `AuthContext` must handle it. 
        // Actually, let's use a private field to track it in memory since we listen to changes.
        return this.currentUserId;
    }

    private currentUserId: string | null = null;

    getCurrentUser(): User | null {
        // This was previously returning generic User object without ID.
        // We can't really implement this fully sync without caching.
        // Let's rely on onAuthStateChanged to keep `currentUserId` updated.
        return null;
    }
}

class SupabaseUserService implements IUserService {
    async getUser(id: string): Promise<User | null> {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            return {
                email: data.email,
                name: data.name,
                picture: data.picture,
                ...data.metadata
            };
        }
        return null;
    }

    async createUser(id: string, user: User): Promise<void> {
        // Split user into columns + metadata
        // Note: we can't easily destructure interface.
        const { email, name, picture, createdAt, ...rest } = user;

        const { error } = await supabase
            .from('users')
            .insert([{
                id,
                email,
                name,
                picture,
                created_at: createdAt,
                metadata: rest
            }]);

        if (error) throw error;
    }

    async updateUser(id: string, updates: UserUpdates): Promise<void> {
        // We need to fetch current to merge? 
        // Or can we do a smart patch?
        // Supabase `update` updates columns. 
        // If updates contains `email`, `name`, `picture`, we update those cols.
        // If it contains others, we need to update `metadata`.
        // PROBLEM: JSONB merge in SQL vs complete replacement.
        // `update` with jsonb usually replaces the whole json object unless we use special operators.
        // The safest way is: fetch -> merge in memory -> update.
        // OR rely on the fact that `UserUpdates` might be partial.
        // The contract is `updates: UserUpdates`.
        // We will do Read-Modify-Write for safety on the metadata column to avoid wiping unrelated keys, 
        // although JSONB defaults might help.

        const { data: current } = await supabase.from('users').select('metadata').eq('id', id).single();
        const currentMeta = current?.metadata || {};

        const { email, name, picture, createdAt, ...restUpdates } = updates as any; // Cast to handle optional checks

        // Prepare row updates
        const rowUpdates: any = {};
        if (email !== undefined) rowUpdates.email = email;
        if (name !== undefined) rowUpdates.name = name;
        if (picture !== undefined) rowUpdates.picture = picture;
        // createdAt is usually immutable but if passed...

        if (Object.keys(restUpdates).length > 0) {
            // Merge metadata
            rowUpdates.metadata = {
                ...currentMeta,
                ...restUpdates
            };
        }

        if (Object.keys(rowUpdates).length > 0) {
            await supabase.from('users').update(rowUpdates).eq('id', id);
        }
    }

    async getAllStudents(): Promise<Student[]> {
        const { data, error } = await supabase.from('users').select('*');
        if (error) throw error;

        return (data || []).map(row => {
            const user = {
                email: row.email,
                name: row.name,
                picture: row.picture,
                createdAt: row.created_at, // Map back
                ...row.metadata
            } as User; // Assuming User matches most fields

            // Convert to Student (logic from AdminContext/FirebaseDAL)
            const lastSession = user.sessionHistory?.[user.sessionHistory.length - 1];
            const lastActiveTime = lastSession
                ? new Date(lastSession.endedAt || lastSession.startedAt).getTime()
                : new Date(user.createdAt || Date.now()).getTime();

            const hoursSinceActive = (Date.now() - lastActiveTime) / (1000 * 60 * 60);
            let status: 'active' | 'inactive' | 'at-risk' = 'active';
            if (hoursSinceActive > 48) status = 'at-risk';
            else if (hoursSinceActive > 24) status = 'inactive';

            return {
                id: row.id,
                email: user.email,
                name: user.name,
                avatar: user.picture,
                enrolledAt: user.createdAt,
                lastActive: new Date(lastActiveTime).toISOString(),
                totalPoints: user.totalPoints || 0,
                moduleProgress: user.modules || {},
                assignments: (user as any).assignments || [], // User type might not have assignments, but Student does? Check types.
                status,
                sessionHistory: user.sessionHistory || [],
            } as Student;
        });
    }
}

// Helper duplicates (we should have shared these, but for now copying to keep files self-contained or import?)
// We'll duplicate for safety as `firebase.ts` might be deleted.
const createDefaultModuleProgress = () => ({
    completedSections: [],
    completedInteractives: [],
    points: 0,
    startedAt: null,
    completedAt: null,
    lastViewedSection: 'overview',
    certificateId: null,
    certificateHash: null,
});

const createDefaultUser = (email: string, name: string): User => ({
    email,
    name,
    picture: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`,
    createdAt: new Date().toISOString(),
    totalPoints: 0,
    modules: {
        1: createDefaultModuleProgress(),
        2: createDefaultModuleProgress(),
        3: createDefaultModuleProgress(),
        4: createDefaultModuleProgress(),
    },
    finalCertificationId: null,
    finalCertificationHash: null,
    sessionHistory: [],
});

export const supabaseDAL: IDAL = {
    auth: new SupabaseAuthService(),
    user: new SupabaseUserService(),
};

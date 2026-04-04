import { User, UserUpdates, Student, AdminStats } from './types';

export interface IAuthService {
    login(email: string, password: string): Promise<void>;
    signup(email: string, password: string): Promise<void>;
    logout(): Promise<void>;
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
    getCurrentUser(): User | null;
    getUserId(): string | null;
}

export interface IUserService {
    getUser(id: string): Promise<User | null>;
    createUser(id: string, user: User): Promise<void>;
    updateUser(id: string, updates: UserUpdates): Promise<void>;

    // Admin functions
    getAllStudents(): Promise<Student[]>;
    // Activity feed and messages can be added here if they are backed by DB
    // For now based on AdminContext, they seem derived or separate.
}

export interface IDAL {
    auth: IAuthService;
    user: IUserService;
}

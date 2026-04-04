import type { User, Student, Message, ActivityEvent, AdminStats } from '../../types';

export type { User, Student, Message, ActivityEvent, AdminStats };

// Define the shape of the user updates to ensure safety
export type UserUpdates = Partial<User>;

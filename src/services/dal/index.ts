import { supabaseDAL } from './supabase';
import { IDAL } from './contract';

// Hardcoded to Supabase as Firebase has been removed
export const dal: IDAL = supabaseDAL;

export * from './contract';
export * from './types';

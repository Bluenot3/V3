-- 1. CLEANUP SCRIPT
-- Run this FIRST to clear out any old data or conflicted tables.
-- This WILL DELETE data in public.users, so be sure you are okay with that (since we are setting up).

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS public.users CASCADE;

-- Verify cleanup (Optional, will show output in results)
SELECT 'Cleanup Complete' as status;

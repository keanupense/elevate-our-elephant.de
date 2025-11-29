-- Add avatar_url column to profiles table
ALTER TABLE public.profiles
ADD COLUMN avatar_url TEXT;

COMMENT ON COLUMN public.profiles.avatar_url IS 'URL or base64 data for user profile picture';
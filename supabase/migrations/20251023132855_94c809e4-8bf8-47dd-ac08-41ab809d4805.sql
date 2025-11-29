-- Create level_progress table to track user's learning progress
CREATE TABLE public.level_progress (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  topic_id text NOT NULL,
  level_id integer NOT NULL,
  xp_earned integer NOT NULL DEFAULT 0,
  completed_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, topic_id, level_id)
);

-- Enable Row Level Security
ALTER TABLE public.level_progress ENABLE ROW LEVEL SECURITY;

-- Create policies for level_progress
CREATE POLICY "Users can view their own progress"
ON public.level_progress
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progress"
ON public.level_progress
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
ON public.level_progress
FOR UPDATE
USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_level_progress_user_topic ON public.level_progress(user_id, topic_id);
CREATE INDEX idx_level_progress_user ON public.level_progress(user_id);
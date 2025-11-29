-- Fix security warnings by adding search_path to functions

-- Update update_activity_log function
CREATE OR REPLACE FUNCTION public.update_activity_log()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.activity_log (user_id, activity_date, xp_earned, levels_completed)
  VALUES (NEW.user_id, CURRENT_DATE, NEW.xp_earned, 1)
  ON CONFLICT (user_id, activity_date)
  DO UPDATE SET
    xp_earned = activity_log.xp_earned + NEW.xp_earned,
    levels_completed = activity_log.levels_completed + 1,
    updated_at = now();
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, age)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Lernender'),
    COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, NULL)
  );
  RETURN NEW;
END;
$$;
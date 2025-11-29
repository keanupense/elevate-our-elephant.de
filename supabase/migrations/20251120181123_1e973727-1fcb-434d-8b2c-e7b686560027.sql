-- Create trigger to update activity_log when level_progress is inserted
CREATE TRIGGER update_activity_log_on_level_completion
  AFTER INSERT ON public.level_progress
  FOR EACH ROW
  EXECUTE FUNCTION public.update_activity_log();
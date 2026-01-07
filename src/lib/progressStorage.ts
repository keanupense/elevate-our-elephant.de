export type ProgressEntry = {
  topicId: string;
  levelId: string;
  completedAt: string;
};

const COMPLETED_IDS_SUFFIX = "_completed_ids";
const PROGRESS_LOG_KEY = "elevate_progress_log";

const readJson = <T>(value: string | null, fallback: T): T => {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getCompletedLevelIds = (topicId: string): string[] => {
  if (!topicId) return [];
  const key = `elevate_${topicId}${COMPLETED_IDS_SUFFIX}`;
  return readJson<string[]>(window.localStorage.getItem(key), []);
};

export const setCompletedLevelIds = (topicId: string, ids: string[]) => {
  if (!topicId) return;
  const key = `elevate_${topicId}${COMPLETED_IDS_SUFFIX}`;
  window.localStorage.setItem(key, JSON.stringify(ids));
};

export const addCompletedLevel = (topicId: string, levelId: string) => {
  const ids = getCompletedLevelIds(topicId);
  if (ids.includes(levelId)) return false;
  ids.push(levelId);
  setCompletedLevelIds(topicId, ids);
  return true;
};

export const getProgressLog = (): ProgressEntry[] => {
  return readJson<ProgressEntry[]>(
    window.localStorage.getItem(PROGRESS_LOG_KEY),
    []
  );
};

const setProgressLog = (entries: ProgressEntry[]) => {
  window.localStorage.setItem(PROGRESS_LOG_KEY, JSON.stringify(entries));
};

export const addProgressEntry = (topicId: string, levelId: string) => {
  const entries = getProgressLog();
  const exists = entries.some(
    (entry) => entry.topicId === topicId && entry.levelId === levelId
  );
  if (exists) return false;
  entries.push({
    topicId,
    levelId,
    completedAt: new Date().toISOString(),
  });
  setProgressLog(entries);
  return true;
};

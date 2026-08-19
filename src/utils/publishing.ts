export function isPublished(entry: {
  data: {
    draft?: boolean;
    publishDate?: Date | string;
  };
}): boolean {
  if (entry.data.draft) return false;

  if (!entry.data.publishDate) return true;

  const publishTime =
    entry.data.publishDate instanceof Date
      ? entry.data.publishDate.getTime()
      : new Date(entry.data.publishDate).getTime();

  return Number.isNaN(publishTime) || publishTime <= Date.now();
}
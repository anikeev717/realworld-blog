export const isUndefined = (articlesText: string | undefined, message: string, limit: number) => {
  if (!articlesText) return message;
  return articlesText.trim().slice(0, limit) || message;
};

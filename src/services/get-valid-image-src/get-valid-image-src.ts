export const getValidImageSrc = async (url: URL) => {
  const resp = await fetch(url, { mode: 'no-cors' });
  const data = await resp.blob();
  return data;
};

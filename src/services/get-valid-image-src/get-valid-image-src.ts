export const getValidImageSrc = async (url: string) => {
  try {
    const newUrl = new URL(url);
    const resp = await fetch(newUrl, { method: 'GET', mode: 'no-cors' });
    const blob = await resp.blob();
    const imgUrl = await URL.createObjectURL(blob);
    return imgUrl;
  } catch {
    return false;
  }
};

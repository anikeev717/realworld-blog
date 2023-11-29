export const getValidImageSrc = async (src: string) => {
  const data = await fetch(src, { method: 'GET', mode: 'no-cors' });
  const blobData = await data.blob();

  return blobData;
};

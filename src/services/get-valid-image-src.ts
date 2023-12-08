export const getValidImageSrc = async (url: string) => {
  const testImage = new Image();
  testImage.src = url;
  return new Promise((resolve) => {
    testImage.onload = () => resolve(true);
    testImage.onerror = () => resolve(false);
  });
};

const formatRegex = /^http.*\.(jpeg|jpg|gif|png|tiff|bmp|eps|svg)$/;

export const useImageFromUrl = () => {
  const isImage = (url: string) =>
    new Promise<boolean>(resolve => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });

  const validateFormat = (url: string) => url.match(formatRegex) !== null;

  return { isImage, validateFormat };
};

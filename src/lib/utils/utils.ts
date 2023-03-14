export const isImage = (src: string): Promise<boolean> =>
  new Promise(resolve => {
    const img = new Image();

    img.src = src;
    img.addEventListener('load', () => resolve(true));
    img.addEventListener('error', () => resolve(false));
  });

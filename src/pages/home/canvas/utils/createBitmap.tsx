export default async function createBitmap(canvas: OffscreenCanvas) : Promise<ImageBitmap> {
    return new Promise((resolve, reject) => {
      canvas.convertToBlob()
      .then((blob) => {
        createImageBitmap(blob)
        .then((imageBitmap) => {
          resolve(imageBitmap);
        })
        .catch((error) => {
          reject(error);
        });
      })
      .catch((error) => {
        reject(error);
      });
    });
  };
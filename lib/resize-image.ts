import sharp from "sharp";

const MAX_PIXELS = 4194304;

export async function resizeToMaxPixels(inputBuffer: Buffer): Promise<Buffer> {
  const image = sharp(inputBuffer).rotate();
  const metadata = await image.metadata();

  const { width, height } = metadata;

  if (!width || !height) {
    throw new Error("Impossible de lire les dimensions de l’image.");
  }

  const currentPixels = width * height;

  if (currentPixels <= MAX_PIXELS) {
    return inputBuffer; // Pas besoin de redimensionner
  }

  const scale = Math.sqrt(MAX_PIXELS / currentPixels);
  const newWidth = Math.floor(width * scale);
  const newHeight = Math.floor(height * scale);

  return await image.resize(newWidth, newHeight).toBuffer();
}

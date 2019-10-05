// @flow

import sharp from "sharp";

export type Image = Buffer;
export type EmbedableImage = string;

export async function toEmbedableImage(
  image: Image,
  size: number
): Promise<EmbedableImage> {
  const resizedImage = await sharp(image)
    .resize(size, size)
    .png()
    .toBuffer();

  return `data:image/png;base64,${resizedImage.toString("base64")}`;
}

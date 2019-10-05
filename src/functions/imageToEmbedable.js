// @flow

import sharp from "sharp";

export type ImageToEmbedableFunction = (
  avatarSize: number
) => (buffer: Buffer) => Promise<string>;

export function imageToEmbedable(avatarSize: number) {
  return async (buffer: Buffer) => {
    const resizedImage = await sharp(buffer)
      .resize(avatarSize, avatarSize)
      .png()
      .toBuffer();

    return `data:image/png;base64,${resizedImage.toString("base64")}`;
  };
}

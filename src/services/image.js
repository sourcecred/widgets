// @flow

import sharp from "sharp";

export interface ImageService {
  toEmbedable(avatarSize: number): (buffer: Buffer) => Promise<string>;
}

export const imageService = {
  toEmbedable: (avatarSize: number) => async (buffer: Buffer) => {
    const resizedImage = await sharp(buffer)
      .resize(avatarSize, avatarSize)
      .png()
      .toBuffer();

    return `data:image/png;base64,${resizedImage.toString("base64")}`;
  },
};

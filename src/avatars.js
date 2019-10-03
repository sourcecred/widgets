"use strict";

import got from "got";
import sharp from "sharp";
import createCache from "keyv-fs-sync";

export const fetchEmbedableAvatar = async (
  username,
  token,
  {avatarSize, cacheDir}
) => {
  const url = `https://github.com/${username.toLowerCase()}.png`;
  const cache = cacheDir ? createCache({path: cacheDir}) : null;
  const httpResult = await got.get(url, {encoding: null, cache});
  if (!httpResult.fromCache) console.warn("Cache miss for avatar:", username);
  const resizedImage = await sharp(httpResult.body)
    .resize(avatarSize, avatarSize)
    .png()
    .toBuffer();

  return `data:image/png;base64,${resizedImage.toString("base64")}`;
};

// @flow

import got from "got";
import sharp from "sharp";
import createCache from "keyv-fs-sync";

export interface AvatarService {
  githubAvatar(username: string): Promise<Buffer>;
}

export function avatarServiceFactory(cacheDir?: string): AvatarService {
  const githubAvatar = async (username: string) => {
    const url = `https://github.com/${username.toLowerCase()}.png`;
    const cache = cacheDir ? createCache({path: cacheDir}) : null;
    const httpResult = await got.get(url, {encoding: null, cache});
    if (!httpResult.fromCache) console.warn("Cache miss for avatar:", username);
    return httpResult.body;
  };

  return {
    githubAvatar,
  };
}

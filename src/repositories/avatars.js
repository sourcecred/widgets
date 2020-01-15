// @flow

import got from "got";
import createCache from "keyv-fs-sync";
import {type Image} from "../models/image";

export interface AvatarRepository {
  githubAvatar(username: string): Promise<Image>;
}

export function avatarRepositoryFactory(cacheDir?: string): AvatarRepository {
  const githubAvatar = async (username: string) => {
    const url = `https://github.com/${username.toLowerCase()}.png`;
    const cache = cacheDir ? createCache({path: cacheDir}) : null;
    const httpResult = await got.get(url, {responseType: "buffer", cache});
    if (!httpResult.fromCache) console.warn("Cache miss for avatar:", username);
    return httpResult.body;
  };

  return {
    githubAvatar,
  };
}

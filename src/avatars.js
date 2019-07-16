"use strict";

import getAvatarURL from "gh-avatar";
import axios from "axios";
import sharp from "sharp";

export const fetchEmbedableAvatar = async (username, token, {avatarSize}) => {
  const url = await getAvatarURL(username);
  const httpResult = await axios.get(url, {responseType: "arraybuffer"});
  const resizedImage = await sharp(Buffer.from(httpResult.data))
    .resize(avatarSize, avatarSize)
    .png()
    .toBuffer();

  return `data:image/png;base64,${resizedImage.toString("base64")}`;
};

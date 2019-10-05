"use strict";

import {fetchEmbedableAvatar} from "./avatars";
import {svgContributorWall} from "./svg";

export const createContributorWall = async (
  users,
  token,
  {minCred, maxUsers, usersPerRow, avatarSize, margin, cacheDir}
) => {
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map((user) =>
      fetchEmbedableAvatar(user.id, token, {avatarSize, cacheDir}).then(
        (avatarSlug) => ({
          id: user.id,
          totalCred: user.totalCred,
          avatarSlug,
        })
      )
    )
  );

  return svgContributorWall(usersWithImages, {usersPerRow, avatarSize, margin});
};

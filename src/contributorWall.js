"use strict";

import {avatarServiceFactory} from "./services/avatars";
import {svgContributorWall} from "./svg";

export const createContributorWall = async (
  users,
  token,
  {minCred, maxUsers, usersPerRow, avatarSize, margin, cacheDir}
) => {
  const avatarService = avatarServiceFactory(cacheDir);
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map((user) =>
      avatarService
        .githubAvatar(user.id)
        .then(avatarService.toEmbedable(avatarSize))
        .then((avatarSlug) => ({
          id: user.id,
          totalCred: user.totalCred,
          avatarSlug,
        }))
    )
  );

  return svgContributorWall(usersWithImages, {usersPerRow, avatarSize, margin});
};

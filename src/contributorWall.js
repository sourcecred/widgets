// @flow

import {type ImageService} from "./services/image";
import {type AvatarService} from "./services/avatars";
import {svgContributorWall} from "./svg";

export const createContributorWall = async (
  users: any,
  avatarService: AvatarService,
  imageService: ImageService,
  {minCred, maxUsers, usersPerRow, avatarSize, margin}: any
) => {
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map((user) =>
      avatarService
        .githubAvatar(user.id)
        .then(imageService.toEmbedable(avatarSize))
        .then((avatarSlug) => ({
          id: user.id,
          totalCred: user.totalCred,
          avatarSlug,
        }))
    )
  );

  return svgContributorWall(usersWithImages, {usersPerRow, avatarSize, margin});
};

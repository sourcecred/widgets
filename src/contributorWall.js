// @flow

import {type ImageService} from "./services/image";
import {type AvatarRepository} from "./repositories/avatars";
import {svgContributorWall} from "./svg";

export const createContributorWall = async (
  users: any,
  avatarRepository: AvatarRepository,
  imageService: ImageService,
  {minCred, maxUsers, usersPerRow, avatarSize, margin}: any
) => {
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map((user) =>
      avatarRepository
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

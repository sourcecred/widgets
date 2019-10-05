// @flow

import {type SvgService} from "./services/svg";
import {type ImageService} from "./services/image";
import {type AvatarRepository} from "./repositories/avatars";

export const createContributorWall = async (
  users: any,
  avatarRepository: AvatarRepository,
  imageService: ImageService,
  svgService: SvgService,
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

  return svgService.contributorWall(usersWithImages, {
    usersPerRow,
    avatarSize,
    margin,
  });
};

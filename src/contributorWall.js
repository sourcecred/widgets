// @flow

import {type SvgService} from "./services/svg";
import {type ImageService} from "./services/image";
import {type AvatarRepository} from "./repositories/avatars";

type ContributorWallDependencies = {|
  +avatarRepository: AvatarRepository,
  +imageService: ImageService,
  +svgService: SvgService,
|};

type ContributorWallOptions = {|
  +minCred: number,
  +maxUsers: number,
  +usersPerRow: number,
  +avatarSize: number,
  +margin: number,
|};

export const createContributorWall = async (
  users: any,
  {avatarRepository, imageService, svgService}: ContributorWallDependencies,
  {minCred, maxUsers, usersPerRow, avatarSize, margin}: ContributorWallOptions
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

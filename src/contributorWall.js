// @flow

import {type SvgService} from "./services/svg";
import {type ImageToEmbedableFunction} from "./functions/imageToEmbedable";
import {type AvatarRepository} from "./repositories/avatars";

type ContributorWallDependencies = {|
  +avatarRepository: AvatarRepository,
  +imageToEmbedable: ImageToEmbedableFunction,
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
  {avatarRepository, imageToEmbedable, svgService}: ContributorWallDependencies,
  {minCred, maxUsers, usersPerRow, avatarSize, margin}: ContributorWallOptions
) => {
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map(async (user) => {
      const avatar = await avatarRepository.githubAvatar(user.id);
      const avatarSlug = await imageToEmbedable(avatar, avatarSize);
      return {
        id: user.id,
        totalCred: user.totalCred,
        avatarSlug,
      };
    })
  );

  return svgService.contributorWall(usersWithImages, {
    usersPerRow,
    avatarSize,
    margin,
  });
};

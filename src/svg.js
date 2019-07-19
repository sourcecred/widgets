"use strict";

import {fetchEmbedableAvatar} from "./avatars";

export const createContributorWall = async (
  users,
  token,
  {minCred, maxUsers, usersPerRow, avatarSize, margin}
) => {
  const selectedUsers = users
    .slice(0, maxUsers)
    .filter((user) => user.totalCred >= minCred);

  const usersWithImages = await Promise.all(
    selectedUsers.map((user) =>
      fetchEmbedableAvatar(user.id, token, {avatarSize}).then((avatarSlug) => ({
        id: user.id,
        totalCred: user.totalCred,
        avatarSlug,
      }))
    )
  );

  const images = usersWithImages
    .map((user, i) => ({
      ...user,
      posX: (i % usersPerRow) * (avatarSize + margin),
      posY: Math.floor(i / usersPerRow) * (avatarSize + margin),
    }))
    .map(
      (user) =>
        `<a href="https://github.com/${user.id}" class="link" target="_blank" id="${user.id}" aria-label="Visit the profile of ${user.id} at GitHub">` +
        `<image x="${user.posX}" y="${user.posY}" width="${avatarSize}" height="${avatarSize}" xlink:href="${user.avatarSlug}" />` +
        `</a>`
    );

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${(avatarSize +
    margin) *
    usersPerRow -
    margin}" height="${Math.ceil(images.length / usersPerRow) *
    (avatarSize + margin) -
    margin}">
		<style>.link { cursor: pointer; }</style>
		${images.join("\n")}
	</svg>`;
};

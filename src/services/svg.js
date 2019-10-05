// @flow

export interface SvgService {
  contributorWall(
    usersWithImages: Array<Object>,
    options: Object
  ): Promise<string>;
}

export const svgService = {
  contributorWall: async (
    usersWithImages: Array<Object>,
    {usersPerRow, avatarSize, margin}: Object
  ) => {
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

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${(avatarSize +
        margin) *
        usersPerRow -
        margin}" height="${Math.ceil(images.length / usersPerRow) *
        (avatarSize + margin) -
        margin}">\n` +
      `<style>.link { cursor: pointer; }</style>\n` +
      images.join("\n") +
      `\n</svg>`
    );
  },
};

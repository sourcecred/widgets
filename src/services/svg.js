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
    const sizeWithMargin = avatarSize + margin;
    const images = usersWithImages
      .map((user, i) => ({
        ...user,
        posX: (i % usersPerRow) * sizeWithMargin,
        posY: Math.floor(i / usersPerRow) * sizeWithMargin,
      }))
      .map(
        ({id, posX, posY, avatarSlug}) =>
          `<a href="https://github.com/${id}" class="link" target="_blank" id="${id}" aria-label="Visit the profile of ${id} at GitHub">` +
          `<image x="${posX}" y="${posY}" width="${avatarSize}" height="${avatarSize}" xlink:href="${avatarSlug}" />` +
          `</a>`
      );

    const w = sizeWithMargin * usersPerRow - margin;
    const h = Math.ceil(images.length / usersPerRow) * sizeWithMargin - margin;
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}">\n` +
      `<style>.link { cursor: pointer; }</style>\n` +
      images.join("\n") +
      `\n</svg>`
    );
  },
};

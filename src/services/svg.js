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
      .map(avatarTemplate(avatarSize));

    return contributorWallTemplate({
      width: sizeWithMargin * usersPerRow - margin,
      height: Math.ceil(images.length / usersPerRow) * sizeWithMargin - margin,
      images,
    });
  },
};

const avatarTemplate = (avatarSize) => ({id, posX, posY, avatarSlug}) =>
  `<a href="https://github.com/${id}" class="link" target="_blank" id="${id}" aria-label="Visit the profile of ${id} at GitHub">` +
  `<image x="${posX}" y="${posY}" width="${avatarSize}" height="${avatarSize}" xlink:href="${avatarSlug}" />` +
  `</a>`;

const contributorWallTemplate = ({width, height, images}) =>
  `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">\n` +
  `<style>.link { cursor: pointer; }</style>\n` +
  images.join("\n") +
  `\n</svg>`;

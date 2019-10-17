"use strict";

const minScoresV2 = require("./data/min-scores-v2.json");
const {createTmpCacheDir, clearTmpCacheDir} = require("../util/caching");
const {
  createContributorWall,
  avatarRepositoryFactory,
  svgService,
} = require("../../lib");

test("Expect min-scores-v2 SVG to match snapshot", async () => {
  // Given
  const avatarRepository = avatarRepositoryFactory();
  const users = minScoresV2[1].users;
  const dependencies = {
    avatarRepository,
    svgService,
  };
  const options = {
    minCred: 0,
    maxUsers: 10,
    usersPerRow: 10,
    avatarSize: 64,
    margin: 5,
  };

  // When
  const svg = await createContributorWall(users, dependencies, options);

  // Then
  expect(svg).toMatchSnapshot();
});

test("Expect image caching to produce identical results", async () => {
  // Given
  const users = minScoresV2[1].users;
  const cacheDir = createTmpCacheDir();
  const avatarRepository = avatarRepositoryFactory(cacheDir);
  const dependencies = {
    avatarRepository,
    svgService,
  };
  const options = {
    minCred: 0,
    maxUsers: 10,
    usersPerRow: 10,
    avatarSize: 64,
    margin: 5,
  };

  // When
  const svg1 = await createContributorWall(users, dependencies, options);
  const svg2 = await createContributorWall(users, dependencies, options);

  // Then
  expect(svg1).toEqual(svg2);
  expect(svg1).toMatchSnapshot();

  // Cleanup
  clearTmpCacheDir(cacheDir);
});

"use strict";

const minScoresV1 = require("./data/min-scores-v1.json");
const {createTmpCacheDir, clearTmpCacheDir} = require("../util/caching");
const {
  createContributorWall,
  avatarServiceFactory,
  imageService,
} = require("../../lib");

test("Expect min-scores-v1 SVG to match snapshot", async () => {
  // Given
  const avatarService = avatarServiceFactory();
  const users = minScoresV1[1].users;
  const options = {
    minCred: 0,
    maxUsers: 10,
    usersPerRow: 10,
    avatarSize: 64,
    margin: 5,
  };

  // When
  const svg = await createContributorWall(
    users,
    avatarService,
    imageService,
    options
  );

  // Then
  expect(svg).toMatchSnapshot();
});

test("Expect image caching to produce identical results", async () => {
  // Given
  const users = minScoresV1[1].users;
  const cacheDir = createTmpCacheDir();
  const avatarService = avatarServiceFactory(cacheDir);
  const options = {
    minCred: 0,
    maxUsers: 10,
    usersPerRow: 10,
    avatarSize: 64,
    margin: 5,
  };

  // When
  const svg1 = await createContributorWall(
    users,
    avatarService,
    imageService,
    options
  );
  const svg2 = await createContributorWall(
    users,
    avatarService,
    imageService,
    options
  );

  // Then
  expect(svg1).toEqual(svg2);
  expect(svg1).toMatchSnapshot();

  // Cleanup
  clearTmpCacheDir(cacheDir);
});

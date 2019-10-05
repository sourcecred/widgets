"use strict";

require = require("esm")(module /*, options*/);

const minScoresV1 = require("./data/min-scores-v1.json");
const {createTmpCacheDir, clearTmpCacheDir} = require("../util/caching");
const {createContributorWall} = require("../../src/svg");

test("Expect min-scores-v1 SVG to match snapshot", async () => {
  // Given
  const users = minScoresV1[1].users;
  const SOURCECRED_GITHUB_TOKEN = null;
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
    SOURCECRED_GITHUB_TOKEN,
    options
  );

  // Then
  expect(svg).toMatchSnapshot();
});

test("Expect image caching to produce identical results", async () => {
  // Given
  const users = minScoresV1[1].users;
  const SOURCECRED_GITHUB_TOKEN = null;
  const cacheDir = createTmpCacheDir();
  const options = {
    minCred: 0,
    maxUsers: 10,
    usersPerRow: 10,
    avatarSize: 64,
    margin: 5,
    cacheDir,
  };

  // When
  const svg1 = await createContributorWall(
    users,
    SOURCECRED_GITHUB_TOKEN,
    options
  );
  const svg2 = await createContributorWall(
    users,
    SOURCECRED_GITHUB_TOKEN,
    options
  );

  // Then
  expect(svg1).toEqual(svg2);
  expect(svg1).toMatchSnapshot();

  // Cleanup
  clearTmpCacheDir(cacheDir);
});

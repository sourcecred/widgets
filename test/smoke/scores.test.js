"use strict";

const minScoresV1 = require("./data/min-scores-v1.json");
const minScoresV2 = require("./data/min-scores-v2.json");
const {createTmpCacheDir, clearTmpCacheDir} = require("../util/caching");
const {scoreService} = require("../../lib");

test("Expect min-scores-v1 to validate", async () => {
  // Given

  // When
  const credData = scoreService.validateScoreFormat(minScoresV1);

  // Then
  expect(credData).toMatchSnapshot();
});

test("Expect min-scores-v2 to validate", async () => {
  // Given

  // When
  const credData = scoreService.validateScoreFormat(minScoresV2);

  // Then
  expect(credData).toMatchSnapshot();
});

test("Expect min-scores-v1 and v2 to normalize to the same output", async () => {
  // Given

  // When
  const v1Data = scoreService.validateScoreFormat(minScoresV1);
  const v2Data = scoreService.validateScoreFormat(minScoresV2);

  // Then
  expect(v1Data).toEqual(v2Data);
});

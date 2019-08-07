"use strict";

const EXPECTED_SCORE_VERSION = "0.1.0";
const EXPECTED_SCORE_TYPE = "sourcecred/cli/scores";

const validateScoreFormat = (plainObject) => {
  const [versionHeader, scoreData] = plainObject;

  if (
    versionHeader.version !== EXPECTED_SCORE_VERSION ||
    versionHeader.type !== EXPECTED_SCORE_TYPE
  ) {
    throw new Error(
      `Expecting type "${EXPECTED_SCORE_TYPE}" and version "${EXPECTED_SCORE_VERSION}" in the header of our scores file.`
    );
  }

  return scoreData;
};

export const fromJSONString = (jsonString) => {
  const plainObject = JSON.parse(jsonString);
  return validateScoreFormat(plainObject);
};

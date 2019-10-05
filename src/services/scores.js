// @flow

import {fromCompat, type Compatible} from "../util/compat";

const COMPAT_INFO = {type: "sourcecred/cli/scores", version: "0.1.0"};

export type Scores = Compatible<ScoreData>;
export type ScoreData = {|
  +users: $ReadOnlyArray<Object>,
  +intervals: $ReadOnlyArray<Object>,
|};

export interface ScoreService {
  validateScoreFormat(plainObject: Scores): ScoreData;
  fromJSONString(jsonString: string): ScoreData;
}

const validateScoreFormat = (plainObject: Scores) => {
  return fromCompat(COMPAT_INFO, plainObject);
};

const fromJSONString = (jsonString: string) => {
  const plainObject = JSON.parse(jsonString);
  return validateScoreFormat(plainObject);
};

export const scoreService = {
  validateScoreFormat,
  fromJSONString,
};

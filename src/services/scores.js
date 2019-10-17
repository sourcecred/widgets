// @flow

import {fromCompat, type Compatible} from "../util/compat";

const COMPAT_INFO = {type: "sourcecred/cli/scores", version: "0.2.0"};

export type Scores = Compatible<ScoreData>;
export type ScoreData = {|
  +users: $ReadOnlyArray<Object>,
  +intervals: $ReadOnlyArray<Object>,
|};

export interface ScoreService {
  validateScoreFormat(plainObject: Scores): ScoreData;
  fromJSONString(jsonString: string): ScoreData;
}

function upgradeFromV010(input: ScoreData): ScoreData {
  return {
    intervals: input.intervals,
    users: input.users.map((u) => ({
      address: ["sourcecred", "github", "USERLIKE", "USER", u.id],
      intervalCred: u.intervalCred,
      totalCred: u.totalCred,
    })),
  };
}

function validateScoreFormat(plainObject: Scores): ScoreData {
  return fromCompat(COMPAT_INFO, plainObject, {"0.1.0": upgradeFromV010});
}

function fromJSONString(jsonString: string): ScoreData {
  const plainObject = JSON.parse(jsonString);
  return validateScoreFormat(plainObject);
}

export const scoreService = {
  validateScoreFormat,
  fromJSONString,
};

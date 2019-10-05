"use strict";

const {tmpdir} = require("os");
const {join} = require("path");
const {mkdtempSync} = require("fs");
const {sync: rimrafSync} = require("rimraf");

exports.createTmpCacheDir = () =>
  mkdtempSync(join(tmpdir(), "sourcecred-widgets-test-run-"));

exports.clearTmpCacheDir = (path) => {
  if (!path.startsWith(tmpdir())) {
    throw new Error(
      "Trying to delete files that aren't in the OS temp folder!"
    );
  }
  rimrafSync(path);
};

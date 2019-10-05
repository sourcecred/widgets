#!/usr/bin/env node

require = require("esm")(module/*, options*/)

const {join} = require('path');
const {readFileSync} = require('fs');
const {sync: mkdirpSync} = require('mkdirp');
const {fromJSONString} = require('../src/scores');
const {createContributorWall} = require('../src/svg');

// Minimum required cred to be listed.
// Note this is before rounding.
const MIN_CRED = process.env.SVG_MIN_CRED ? Number(process.env.SVG_MIN_CRED) : 0.5;

// Maximum users to display.
const MAX_USERS = process.env.SVG_MAX_USERS ? Number(process.env.SVG_MAX_USERS) : 50;

// Required env var check.
if(!process.env.SOURCECRED_GITHUB_TOKEN) {
	throw new Error('SOURCECRED_GITHUB_TOKEN env var must be set to a github personal access token.');
}

// Perhaps you have a SOURCECRED_DIRECTORY still set to glean the cache path from, otherwise use CACHE_DIR.
const CACHE_DIR =
	process.env.CACHE_DIR ? process.env.CACHE_DIR :
	process.env.SOURCECRED_DIRECTORY ? join(process.env.SOURCECRED_DIRECTORY, 'cache/widgets') :
	null;

if(CACHE_DIR) {
	mkdirpSync(CACHE_DIR);
}

const USER_PER_ROW = 10;
const AVATAR_SIZE = 64;
const MARGIN = 5;

// Read all data from STDIN
const data = readFileSync(0, "utf-8");

// Parse score
const credData = fromJSONString(data);

createContributorWall(credData.users, process.env.SOURCECRED_GITHUB_TOKEN, {
	minCred: MIN_CRED,
	maxUsers: MAX_USERS,
	usersPerRow: USER_PER_ROW,
	avatarSize: AVATAR_SIZE,
	margin: MARGIN,
	cacheDir: CACHE_DIR
})
.then(console.log);

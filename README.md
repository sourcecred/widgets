# SourceCred Widgets

[![Build Status](https://circleci.com/gh/sourcecred/widgets.svg?style=svg)](https://circleci.com/gh/sourcecred/widgets)
[![Discourse topics](https://img.shields.io/discourse/https/discourse.sourcecred.io/topics.svg)](https://discourse.sourcecred.io)
[![Discord](https://img.shields.io/discord/453243919774253079.svg)](https://discord.gg/tsBTgc9)
[![Greenkeeper badge](https://badges.greenkeeper.io/sourcecred/widgets.svg)](https://greenkeeper.io/)

A Node.js based set of tools to interpret SourceCred scores and generate widgets.
For example to use in README's or as webpage static assets.

## Example usage

```sh
# 1. Use the main sourcecred's score feature to export scores to a file.
export SOURCECRED_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
node PATH_TO_SOURCECRED/bin/sourcecred.js load sourcecred/sourcecred
node PATH_TO_SOURCECRED/bin/sourcecred.js scores sourcecred/sourcecred > scores.json

# 2. Install this package's dependencies.
yarn

# 3. Generate a contributor wall SVG.
./bin/contributor-wall-svg.js < scores.json > contributors.svg
```

Or using the Docker equivalent of this.

```sh
# 1. Use the main sourcecred image to export scores to a file.
export SOURCECRED_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
docker run --rm -ti -v sourcecred_data:/data -e SOURCECRED_GITHUB_TOKEN sourcecred load sourcecred/sourcecred
docker run --rm -ti -v sourcecred_data:/data sourcecred scores sourcecred/sourcecred > scores.json

# 2. Generate a contributor wall SVG.
# Note: don't use the -t option here, it will produce an error "the input device is not a TTY".
docker run --rm -i -e SOURCECRED_GITHUB_TOKEN sourcecred-widgets < scores.json > contributors.svg
```

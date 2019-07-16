#!/usr/bin/env bash

toplevel="$(git -C "$(dirname "$0")" rev-parse --show-toplevel)"
cd "${toplevel}/example/site"

git init
git checkout -b gh-pages
git add --all
git commit -m "Publishing to gh-pages `date`"
git push -f git@github.com:sourcecred/widgets.git gh-pages

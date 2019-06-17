#!/bin/sh

set -e

## libelf1 is needed to run flow
apt-get update -qq
apt-get install -qy git

yarn install --no-progress
yarn generate-readme

if ! git diff-index --quiet HEAD -- src/README.md
then
  git add src/README.md;
  git config --global user.name "nemobot";
  git config --global user.email "our-bots@buildo.io";
  git commit -m "Update README [skip CI]";
  git push origin master;
else
  exit 0
fi

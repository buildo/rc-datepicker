#!/bin/sh

set -e

yarn install --no-progress
yarn lint
yarn lint-style
yarn test

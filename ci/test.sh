#!/bin/sh

set -e

# needed to run tests
apt-get update -qq
apt-get install -qy git

yarn
yarn lint
yarn lint-style
yarn test

#!/bin/sh

set -e

apt-get update -qq
apt-get install -qy chromium
export CHROME_BIN='/usr/bin/chromium'

yarn install --no-progress
yarn lint
yarn lint-style
yarn test

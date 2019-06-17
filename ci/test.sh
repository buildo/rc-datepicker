#!/bin/sh

set -e

yarn
yarn lint
yarn lint-style
yarn test

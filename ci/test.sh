#!/bin/sh

set -e

npm i --no-package-lock
npm run lint
npm run lint-style
npm run build

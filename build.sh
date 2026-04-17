#!/bin/sh

npm install
npx tsc
npx esbuild --bundle --platform=node --format=cjs --target=node25 --outfile=./dist/bundle.js ./dist/src/parse.js
node --build-sea sea-config.json

rm -r dist
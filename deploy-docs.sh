#!/bin/bash

cd docs &&
npm run build &&
mv docs-dist/ ../ &&
cp -rf ./markdown ../docs-dist/markdown &&
cd .. &&
git checkout local-gh-pages &&
mv docs-dist/bundle.js ./bundle.js &&
mv docs-dist/markdown ./ &&
git add --a &&
git commit -m 'Upgrade docs'

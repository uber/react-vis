#!/bin/bash

rm -rf docs-dist &&
cd docs &&
npm run build &&
mv docs-dist/ ../ &&
cp -rf ./markdown ../docs-dist/markdown &&
cd .. &&
git checkout gh-pages &&
rm -rf markdown
rm -rf public
mv docs-dist/bundle.js ./bundle.js &&
mv docs-dist/public ./ &&
mv docs-dist/markdown ./ &&
git add --a &&
git commit -m 'Upgrade docs'

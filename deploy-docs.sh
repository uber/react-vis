#!/bin/bash

cd docs
npm run build
cp -rf docs-dist/ ..
cp -rf docs/markdown public/
rm -rf docs-dist
cd ..
git checkout local-gh-pages
mv docs-dist/bundle.js ./bundle.js
mv public/markdown markdown
git add --a
git commit -m 'Upgrade docs'

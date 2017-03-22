#!/bin/bash

cd docs
npm run build
cp -rf docs-dist/ ..
rm -rf docs-dist
cd ..
git checkout local-gh-pages
mv docs-dist/bundle.js ./bundle.js
git add --a
git commit -m 'Upgrade docs'

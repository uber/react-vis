#!/bin/bash

cd docs
npm run build
mv docs-dist/ ../docs-dist
cp -rf docs/markdown ../docs-dist/markdown
cd ..
git checkout local-gh-pages
mv docs-dist/bundle.js ./bundle.js
mv public/markdown markdown
git add --a
git commit -m 'Upgrade docs'

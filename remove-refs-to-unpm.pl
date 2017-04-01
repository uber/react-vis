#!/bin/bash

perl -pi -e 's/unpm\.uberinternal\.com/registry\.yarnpkg\.com/g' `find . -name yarn.lock`

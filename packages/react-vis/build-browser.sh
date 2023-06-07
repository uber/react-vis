#!/bin/bash
# Browserify doesn't seem to support defining custom entry point for modules in node_modules
# This build script replaces the entry point (the main field of package.json) of d3 libraries to the files
# defined in the unpkg field when building browser bundles.
# The replacement are reverted after the build finishes.
D3_LIB_PATHS=$(ls -d ../../node_modules/d3-*)

get_key_from_d3_path() {
  local KEY=$(echo $1 | sed 's/..\/..\/node_modules\/d3-//')
  local KEY=$(echo $KEY | sed 's/-/_/')
  echo $KEY
}

for D3_LIB_PATH in $D3_LIB_PATHS
do
  PACKAGE_JSON=$D3_LIB_PATH/package.json
  UNPKG=$(jq -r '.unpkg' $PACKAGE_JSON)
  if ! [ -z $UNPKG ] && [ $UNPKG != null ]
  then
    # save the main field
    MAIN=$(jq -r '.main' $PACKAGE_JSON)
    KEY=$(get_key_from_d3_path $D3_LIB_PATH)
    declare var_$KEY=$MAIN

    # modify the main field
    MOD=$(jq --arg unpkg $UNPKG '.main = $unpkg' $PACKAGE_JSON)
    cat <<< $MOD | jq . > $PACKAGE_JSON
  fi
done

BABEL_ENV=browser browserify src/index.js -t [ babelify --rootMode upward --global ] --standalone reactVis > dist/dist.min.js

# set the main fields of package.json back to original
for D3_LIB_PATH in $D3_LIB_PATHS
do
  PACKAGE_JSON=$D3_LIB_PATH/package.json
  KEY=$(get_key_from_d3_path $D3_LIB_PATH)
  MAIN="var_$KEY"
  if ! [ -z  "${!MAIN}" ]
  then
    MOD=$(jq --arg var "${!MAIN}" '.main = $var' $PACKAGE_JSON)
    cat <<< $MOD | jq . > $PACKAGE_JSON
  fi
done


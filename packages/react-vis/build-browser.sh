#!/bin/bash
D3_LIB_PATHS=$(ls -d ../../node_modules/d3-*)

for D3_LIB_PATH in $D3_LIB_PATHS
do
  PACKAGE_JSON=$D3_LIB_PATH/package.json
  UNPKG=$(jq -r '.unpkg' $PACKAGE_JSON)
  MAIN=$(jq -r '.main' $PACKAGE_JSON)
  if ! [ -z $UNPKG ] && [ $UNPKG != null ]
  then
    MOD=$(jq --arg unpkg $UNPKG '.main = $unpkg' $PACKAGE_JSON)
    cat <<< $MOD | jq . > $PACKAGE_JSON
  fi
done

browserify src/index.js -t [ babelify --rootMode upward --global ] --standalone reactVis > dist/dist.min.js
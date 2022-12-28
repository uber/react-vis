#!/bin/bash
DRY_RUN=0

while true; do
  case $1 in
    -v | --version ) VERSION=$2; shift 2 ;;
    -t | --tag ) TAG=$2; shift 2 ;;
    -r | --registry ) REGISTRY=$2; shift 2 ;;
    --dry-run ) DRY_RUN=1; shift ;;
    -- ) shift; break ;;
    * ) break ;;
  esac
done

if [ -z $VERSION ]
then
    echo "Error: must specify version, with the -v option."
    exit 0
fi

if [ -z $REGISTRY ]
then
    echo "Registry unset, use the default npm registry https://registry.npmjs.org."
    REGISTRY="https://registry.npmjs.org"
fi

cp CHANGELOG.md README.md LICENSE packages/react-vis

cd packages/react-vis

npm version $VERSION

publish_command="npm publish"

if [ -z $TAG ]
then
    publish_command+=" --tag ${TAG} --registry ${REGISTRY}"
else
    publish_command+=" --registry ${REGISTRY}"
fi

if [ $DRY_RUN -eq 1 ]
then
    publish_command+=" --dry-run"
fi

eval $publish_command

rm CHANGELOG.md README.md LICENSE

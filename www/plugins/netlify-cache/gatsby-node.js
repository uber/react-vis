/* eslint-disable */
const {resolve, relative} = require(`path`)
const rimraf = require('rimraf')
const {isBefore} = require('date-fns')
const fs = require('fs')
const ncp = require('ncp').ncp

const {ensureDir, readdir} = require(`fs-extra`)

async function calculateDirs(
  store,
  {extraDirsToCache = [], cachePublic = false},
) {
  const program = store.getState().program
  const rootDirectory = program.directory

  const dirsToCache = [
    cachePublic && resolve(rootDirectory, `public`),
    ...extraDirsToCache.map(dirToCache => resolve(rootDirectory, dirToCache)),
  ].filter(Boolean)

  const checkDir = async function checkDir(dir) {
    await ensureDir(dir)
  }

  for (const dir of dirsToCache) {
    checkDir(dir)
  }

  const netlifyCacheDir = resolve(
    process.env.NETLIFY_BUILD_BASE,
    `cache`,
    `gatsby`,
  )

  await ensureDir(netlifyCacheDir)

  return {
    rootDirectory,
    dirsToCache,
    netlifyCacheDir,
  }
}

function generateCacheDirectoryNames(rootDirectory, netlifyCacheDir, dirPath) {
  const relativePath = relative(rootDirectory, dirPath)
  const dirName = relativePath.replace('/', '--')
  const cachePath = resolve(netlifyCacheDir, dirName)
  const humanName = relativePath
  return {cachePath, humanName}
}

exports.onPreInit = async function onPreInit(
  {store},
  {extraDirsToCache, cachePublic},
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }

  const {dirsToCache, netlifyCacheDir, rootDirectory} = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    },
  )

  const copyFiles = async function copyFiles(dirPath) {
    const {cachePath, humanName} = generateCacheDirectoryNames(
      rootDirectory,
      netlifyCacheDir,
      dirPath,
    )
    await ensureDir(cachePath)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `plugin-netlify-cache: Restoring ${
        cacheFiles.length
      } cached files for ${humanName} directory with ${
        dirFiles.length
      } already existing files.`,
    )

    ncp(cachePath, dirPath, function onFinish() {})
  }

  const killStale = async function killStale(dirPath) {
    const {cachePath} = generateCacheDirectoryNames(
      rootDirectory,
      netlifyCacheDir,
      dirPath,
    )
    await ensureDir(cachePath)
    const cacheFiles = await readdir(cachePath)
    let shouldClear = false
    const fortnightAway = new Date(Date.now() - 12096e5).getTime()
    cacheFiles.forEach(file => {
      try {
        const stats = fs.statSync(cachePath + '/' + file)
        const birthTime = new Date(stats.birthtime).getTime()
        shouldClear = isBefore(birthTime, fortnightAway)
      } catch (e) {
        console.error(e)
      }
    })

    if (shouldClear) {
      console.log(`clearing cached files`)
      rimraf(cachePath, () => {
        copyFiles(dirPath)
        console.log(`plugin-netlify-cache: Netlify cache restored`)
      })
    }
  }

  for (const dirPath of dirsToCache) {
    killStale(dirPath)
  }
}

exports.onPostBuild = async function onPostBuild(
  {store},
  {extraDirsToCache, cachePublic},
) {
  if (!process.env.NETLIFY_BUILD_BASE) {
    return
  }
  console.log('CACHE IT')
  const {dirsToCache, netlifyCacheDir, rootDirectory} = await calculateDirs(
    store,
    {
      extraDirsToCache,
      cachePublic,
    },
  )

  const copyFiles = async function copyFiles(dirPath) {
    const {cachePath, humanName} = generateCacheDirectoryNames(
      rootDirectory,
      netlifyCacheDir,
      dirPath,
    )

    console.log(`netlify-cache: Caching ${humanName}...`)
    console.log(dirPath, cachePath)
    ncp(dirPath, cachePath, function onError(err) {
      if (err) {
        return console.error(err)
      }
    })
  }

  for (const dirPath of dirsToCache) {
    copyFiles(dirPath)
  }

  console.log(`plugin-netlify-cache: Netlify cache refilled`)
}

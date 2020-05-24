console.log('showcase - babeljs')
module.exports = {
  "plugins": [
    [require.resolve("babel-plugin-module-resolver"), {
      "root": ["."],
      "alias": {
        "*": ["*", "../react-vis/src/*"]
      }
    }]
  ]
}
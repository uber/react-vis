const {getGatsbyConfig} = require('ocular-gatsby/api');
const util = require('util')

const config = require('./ocular-config');
console.log('myconfig', util.inspect(getGatsbyConfig(config), {depth: null}))
module.exports = getGatsbyConfig(config);

### What is react-vis
**react-vis** is a data visualization library based on React and d3. react-vis supports tooltips and legends for each example. react-vis provides support for the following types of charts and graphs:

* series
* treemap
* xy plot
* line
* radial

### Getting Started

**react-vis** can be installed with npm. Make sure you initialize npm and then install react-vis and its peerDependencies:

```bash
# Initialize npm with default config
npm init -y

# react-vis's peerDependencies
npm install --save react
npm install --save react-dom
npm install --save react-addons-shallow-compare

# react-vis itself
npm install --save react-vis
```

### Tooling Setup

Lets start an initial example with a radial graph. First we need to setup our Webpack and Babel. To do this, we need to install Webpack dependencies and create our Webpack config file:

```bash
# Install webpack dependencies
npm install --save-dev css-loader extract-text-webpack-plugin node-sass sass-loader style-loader webpack webpack-dev-server
```

```js
// webpack.config.js
module.exports = {
  entry: { app: './app.js' },

  // Enable live reload
  devServer: {
    stats: {
      warnings: false
    }
  },

  // Map compiled code to source
  devtool: 'source-maps',

  module: {
    rules: [
      // Sass and css integration
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      // Babel integration
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/]
      }
    ]
  }
};
```

Now let's setup our Babel dependencies...

```bash
# Install babel dependencies
npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2
```

and add the following section to your package.json
```
{
  // ...
  "babel": {
    "presets": ["es2015", "stage-2", "react"]
  }
}
```

### Initial example
To get our feet wet, let's start with the radial chart by using the following code:

```js
// app.js
import React from 'react';
import ReactDOM from 'react-dom';
import {RadialChart} from 'react-vis';
import 'react-vis/dist/styles/radial-chart.scss';
// import `react-vis/main.css` if you don't sass imports

export default class RadialChartExample extends React.Component {
  render() {
    return (
       <RadialChart
        innerRadius={100}
        radius={140}
        data={[
          {angle: 2},
          {angle: 6},
          {angle: 2},
          {angle: 3},
          {angle: 1}
        ]}
        width={300}
        height={300}
      />
    )
  }
}

ReactDOM.render(<RadialChartExample />, document.querySelector('#index'));
```
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>react-vis example</title>
  </head>
  <body>
    <div id="index"></div>
    <script src='bundle.js'></script>
  </body>
</html>
```

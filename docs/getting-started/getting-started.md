### Getting started

#### Jump right in on codepen!

You can use react-vis directly on [codepen](https://codepen.io/ubervisualization/pen/BZOeZB) (or equivalent).  
Each published version of react-vis is accessible via [unpkg.com](https://unpkg.com).

Add react files, and a link to the latest react-vis version - such as https://unpkg.com/react-vis@1.6.7/dist/dist.min.js.

But you can simply just use that [pen](https://codepen.io/ubervisualization/pen/BZOeZB) and take it from there.

#### Install the react-vis module

If you want to use react-vis in your project, add it from the command line: 

```
npm install react-vis
```

(or yarn add react-vis - the following will assume that you use npm for concision's sake but you can substitute yarn if installed)

#### Create a new project with react-vis

Let's create a new vis app from scratch.
To do this, let's use [create-react-app](https://github.com/facebookincubator/create-react-app), the popular Facebook scaffold. 

If you haven't installed yet, do so: 

```
npm install -g create-react-app
```

And now:
```
create-react-app my-awesome-vis-app
cd my-awesome-vis-app
npm install react-vis
```

That's it! you are now ready to create amazing charts. 

Let's edit create-react-app's default App.js: 

```jsx
import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';

class App extends Component {
  render() {
    const data = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ];
    return (
      <div className="App">
        <XYPlot height={300} width={300}>
          <LineSeries data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default App;
```

and then on the command line interface:

```
npm run start
```

and your chart is in the browser. 

Note that on line 3, I have imported the react-vis stylesheet. There are many ways to do that, and it is actually optional. But apps made with create-react-app will let you import stylesheets directly, so that's a simple way to do so.

#### Your first chart

We tried to make react-vis syntax as close to the traditional react syntax. You have components which have props and possibly children. 

Every react-vis chart is inside a component called XYPlot, for which a height and a width must be specified:

```jsx
<XYPlot height={300} width = {300} />
```

And all the elements of a chart - series, axes, gridlines, etc. are other components, which will be children of XYPlot.

```jsx
<XYPlot height={300} width= {300}>
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
  <LineSeries data={data} />
</XYPlot>
```

And like in traditional react, order matters as components are drawn in order. In the previous example, the gridlines are drawn below the line series, but in this next example, they will be drawn above it.

```jsx
<XYPlot height={300} width= {300}>
  <LineSeries data={data} />
  <VerticalGridLines />
  <HorizontalGridLines />
  <XAxis />
  <YAxis />
</XYPlot>
```


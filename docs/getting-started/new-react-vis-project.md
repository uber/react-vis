### Create a new project with react-vis

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

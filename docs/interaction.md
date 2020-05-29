## Interaction

Interaction in react-vis happens through _event handlers_ which are triggered by certain interactive events, such as mouse movement or clicks.

These events can be implemented either at the XYPlot level or at the plot level:
* At the plot level: this is for events that affect the whole chart. The mouse events that can be captured are: down, enter, leave, move. For instance, you can use `onMouseLeave` to reset the visualization when the user's mouse cursor is no longer on it.

* At the series level, there are three kind of handlers.
	* Some series (arc, bar, heatmap, label, mark, rect) support interaction at the individual mark level. These series have onValueClick, onValueMouseOut and onValueMouseOver, which, in addition to passing the event, also pass the datapoint corresponding to the mark with which the user interacted.
    * The above series, and some others (area, line, polygon) support interaction at the series level. These series have handlers like onSeriesClick, onSeriesMouseOut, onSeriesMouseOver. Those handlers only pass the mouseevent that triggered them.
    * Finally, all series support onNearestX and onNearestXY. These two special handlers are triggered when the user moves their mouse on the plot area, and can access the datapoint of the nearest mark, in addition to the mouse event.

* You can also interact with your plot through specialized components, such as the [highlight](highlight.md) for brushing and dragging or the [voronoi](voronoi.md) for mouse overs.

### What handlers are implemented by series type

| Series                                | Proximity handlers (onNearestX, onNearestY) | series level handlers (onSeriesClick, onSeriesRightClick, onSeriesMouseOver, onSeriesMouseOut) | mark-level handlers (onValueClick, onValueRightClick, onValueMouseOver, onValueMouseOut) |
|---------------------------------------|---------------------------------------------|------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| [ArcSeries](arc-series.md)            |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [AreaSeries](area-series.md)          |                      ✔︎                      |                                                ✔︎                                               |                                                                                          |
| [BarSeries](bar-series.md)            |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [ContourSeries](contour-series.md)    |                      ✔︎                      |                                                                                                |                                                                                          |
| [HeatmapSeries](heatmap-series.md)    |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [HexbinSeries](hexbin-series.md)    |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [LabelSeries](label-series.md)        |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [LineSeries](line-series.md)          |                      ✔︎                      |                                                ✔︎                                               |                                                                                          |
| [LineMarkSeries](line-mark-series.md) |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [MarkSeries](mark-series.md)          |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [PolygonSeries](polygon-series.md)    |                      ✔︎                      |                                                ✔︎                                               |                                                                                          |
| [RectSeries](rect-series.md)          |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |
| [WhiskerSeries](whisker-series.md)    |                      ✔︎                      |                                                ✔︎                                               |                                             ✔︎                                            |

How to read this table:
For some series types (Arc, Bar, Rect, Label, Mark) - onValueClick, onValueMouseOut and onValueMouseOver handlers will work at the mark type. When the user clicks on the series, or moves their mouse on our out of it, an event handler will be fired and will pass the datapoint corresponding to the mark that the user interacted with.

The other series types (area, line, polygon) have an onSeriesClick, onSeriesMouseOut and onSeriesMouseOver respectively. These event handler will work at the series level and will not pass a specific datapoint.

In all cases, onNearestX and onNearestXY can be implemented at the series level, but when fired, they will also pass a specific datapoint.

### Note
- the contour series doesn't support interaction other than onNearestX or onNearestXY
- whenever the datapoint-level handlers are supported, they can also catch all the events happening at the series level.

## API

### XYPlot event handlers

#### onMouseDown

Type: `function`

Default: none

This event handler is triggered whenever the mousebutton of the user is down while their mouse cursor is in the plot area. It passes a mouse event.

#### onMouseUp

Type: `function`

Default: none

This event handler is triggered whenever the user release the mouse button while their mouse cursor is in the plot area. It passes a mouse event.

#### onMouseEnter

Type: `function`

Default: none

This event handler is triggered whenever the mouse of the user enters the plot area. It passes a mouse event.

#### onMouseLeave

Type: `function`

Default: none

This event handler is triggered whenever the mouse of the user exits the plot area. It passes a mouse event.

#### onMouseMove

Type: `function`

Default: none

This event handler is triggered whenever the mouse of the user moves while in the plot area. It passes a mouse event.

#### onTouchStart

Type: `function`

The event handler is triggered whenever the finger of the user first touches the plot area. It passes a touch event.

#### onTouchMove

Type: `function`

This event handler is triggered whenever the finger of the user moves while in the plot area. It passes a touch event.

#### onTouchEnd

Type: `function`

This event handler is triggered when a touch point of the user lifts off the plot area. It passes a touch event.

#### onTouchCancel

Type: `function`

This event handler is triggered when a touch point of the user has been disrupted in an implementation-specific manner

### Series event handlers

#### onNearestX

Type: `function`

Default: none

This handler fires when the user moves their mouse somewhere on the plot. The handler fires a function that takes two argument: the datapoint with the x value closest to the cursor or touch point, and a second object containing: the `innerX` value (x coordinates of the cursor relative to the left of the plot), `index` (position of this datapoint in the dataset, where 0 is the first datapoint, 1 is the second, etc) plus the actual event as `event`.

onNearestX is at the series level, not at the plot level. If you attach onNearestX to several series, each time the user moves their mouse or touch point, each onNearestX handler will be triggered once with the closest mark of each series.

```jsx
<LineSeries
...
  onNearestX={(datapoint, event)=>{
  	// does something on mouseover
  	// you can access the value of the event
  }}
```

#### onNearestXY

Type: `function`

Default: none

This handler is nearly identical to `onNearestX`. The difference is that it will return datapoint corresponding to the mark closest to the cursor or touch point, not just the one with the closest x coordinate.

onNearestXY will supersede onNearestX, so if both exist for the same series, only onNearestXY will be fired.

This handler fires when the user moves their mouse or touch point somewhere on the plot. The handler fires a function that takes two argument: the datapoint which is closest to the cursor or touch point, and a second object containing: the `innerX` and `innerY` value (x, y coordinates of the cursor or touch point relative to the top left of the plot), `index` (position of this datapoint in the dataset, where 0 is the first datapoint, 1 is the second, etc) plus the actual event as `event`.

onNearestXY is at the series level, not at the plot level. If you attach onNearestX to several series, each time the user moves their mouse or touch point, each onNearestX handler will be triggered once with the closest mark of each series.

```jsx
<LineSeries
...
  onNearestX={(datapoint, event)=>{
  	// does something on mouseover
  	// you can access the value of the event
  }}
```

#### onSeriesClick

Type: `function`

Default: none

This handler fires when the user clicks somewhere on a series, and provides the corresponding event. Unlike onValueClick, it doesn't pass a specific datapoint.

```jsx
<AreaSeries
...
  onSeriesClick={(event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```

#### onSeriesRightClick

Type: `function`

Default: none

This handler fires when the user right-clicks somewhere on a series, and provides the corresponding event. Unlike onValueRightClick, it doesn't pass a specific datapoint.

```jsx
<AreaSeries
...
  onSeriesRightClick={(event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```


#### onSeriesMouseOut

Type: `function`

Default: none

This handler fires when the user's mouse cursor leaves a series, and provides the corresponding event. Unlike onValueMouseOut, it doesn't pass a specific datapoint.

```jsx
<AreaSeries
...
  onSeriesMouseOut={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```

#### onSeriesMouseOver

Type: `function`

Default: none

This handler fires when the user mouses over a series, and provides the corresponding event. Unlike onMouseOver, it doesn't pass a specific datapoint.

```jsx
<AreaSeries
...
  onSeriesMouseOver={(event)=>{
  	// does something on mouse over
  	// you can access the value of the event
  }}
```

#### onValueClick

Type: `function`

Default: none

This handler is triggered either when the user clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueClick={(datapoint, event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```

#### onValueRightClick

Type: `function`

Default: none

This handler is triggered either when the user right-clicks on a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueRightClick={(datapoint, event)=>{
    // does something on right click
    // you can access the value of the event
  }}
```

#### onValueMouseOut

Type: `function`

Default: none

This handler is triggered either when the user's mouse leaves a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueMouseOut={(datapoint, event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```

#### onValueMouseOver

Type: `function`

Default: none

This handler is triggered either when the user's mouse enters a mark.
The handler passes two arguments, the corresponding datapoint and the actual event.
```jsx
<MarkSeries
...
  onValueMouseOver={(datapoint, event)=>{
  	// does something on click
  	// you can access the value of the event
  }}
```


## Interaction strategies and examples

### Interaction and hints or crosshairs

This was the first use case we built for interaction. We have one line chart on a plot, we want to show the value of the nearest mark to the cursor, without requiring the user to actually be over the plot proper.

<!-- INJECT:"DynamicCrosshairWithLink" -->

```jsx
const DATA = [
  [
    {x: 1, y: 10},
    {x: 2, y: 7},
    {x: 3, y: 15}
  ],
  [
    {x: 1, y: 20},
    {x: 2, y: 5},
    {x: 3, y: 15}
  ]
];

export default class DynamicCrosshair extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crosshairValues: []
    };
  }

  render() {
    return (
      <XYPlot
        onMouseLeave={() => this.setState({crosshairValues: []})}
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <LineSeries
          onNearestX={(value, {index}) =>
          	this.setState({crosshairValues: DATA.map(d => d[index])})}
          data={DATA[0]}/>
        <LineSeries
          data={DATA[1]}/>
        <Crosshair values={this.state.crosshairValues}/>
      </XYPlot>
    );
  }
}
```

A few notes:
- here, we are using the state to record the position of the crosshair. So, we're using the class syntax vs the React functional API.
- We use onMouseLeave, at the plot level, to reset the visualization if the user's mouse cursor leaves the plot area.
- There are 2 LineSeries components, but we only outfit one of them with a onNearestX handler.
- In that handler, we get the datapoint value as first argument, and the index part of the object as 2nd argument. Actually, we only care about that index value. We're using it to generate values for the crosshair.
- Having the handler on the 2nd LineSeries would have the exact same effect. We would change the state twice, to the same value. This is why it's not useful to call it several times.

### Mousing over near scatterplot marks
<!-- INJECT:"ScatterPlotOnNearestXYWithLink" -->

```jsx
class ScatterPlotOnNearestXY extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    const data = scatterPlotData.map((d, i) => ({...d, color: i === index ? 1 : 0}));
    return <XYPlot
      colorDomain={[0, 1]}
      onMouseLeave={() => this.setState({index: null})}
    >
      <MarkSeries
        data={data}
        stroke="white"
        onNearestXY={(datapoint, {index}) => this.setState({index})}
      />
    </XYPlot>
  }
}
```

Notes:
- Here, we could have used the onMouseOver prop but that would require the user to move their mouse on each dot. But those dots are small! it would be more comfortable to select whichever dot is the nearest from the cursor.
- Again, we're going to use the state for interaction, so we use the class syntax.
- Each time we're rendering this component, we're going to regenerate a dataset that takes the state into account. The selected datapoint will have its color property set to 1, for others it will be 0.
- the colorDomain of XYPlot will be set to [0, 1]. This is because else, when no point is selected, the colorDomain would be [0, 0] and all dots would have the color of the higher bound (light orange).
- As above, when the mouse leaves the plot, the state of the visualization is reset.
- As above, in the onNearestXY handler, we're actually only interested in the index part of the second argument.

### Mousing over series - the 2nd series group option
<!-- INJECT:"LineChartMouseOverSeriesWithLink" -->
```jsx
class LineChartMouseOverSeries extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;
    return <XYPlot {...defaultProps}
        onMouseLeave={() => this.setState({index: null})}
      >
      {lineData.map((d, i) => (<LineSeries
        data={d} key={`${i}`} stroke={i === index ? "orange" : undefined}
      />))}
      {lineData.map((d, i) => (<LineSeries
        data={d} key={`${i}-mouseover`}
        onSeriesMouseOut={() => this.setState({index: null})}
        onSeriesMouseOver={() => this.setState({index: i})}
        strokeWidth={10} stroke="transparent"}
      />))}
    </XYPlot>
  }
}
```
Here, we are going to explore 2 strategies to handle highlighting one line series among several on screen.
We could do that with a simple onSeriesMouseOver but, again, that would require mousing over exactly on a line series, which are notoriously narrow.
Instead, we create a second set of LineSeries whose only purpose is to handle interaction. That second set of LineSeries is thicker (here, the stroke width is set at a generous 10px) and is also transparent. In the embedded example, I'm highlighting each lineSeries as it is moused over, but I'm not reflecting this on the snippet of code.

Here, lineData is an array of arrays. The LineSeries are created by mapping over that array, which is quite common.
When creating the LineSeries for mouseover, I write:

```jsx
{lineData.map((d, i) => (<LineSeries
  ...
  onSeriesMouseOver={() => this.setState({index: i})}
```

In the onSeriesMouseOver handler, I don't pass any argument in the handler proper, but I'm using the index of the array from the mapping method. So, for the first LineSeries, that value is 0, then 1, then 2.

### Mousing over series - the extra scatterplot option
<!-- INJECT:"LineChartMouseOverXYWithLink" -->
```jsx
const allData = lineData.reduce((prev, curr, i) => {
  return [...prev, ...curr.map((d) => ({...d, index: i}))]
}, []);

class LineChartMouseOverXY extends Component {
  constructor() {
    super();
    this.state = {index: null};
  }
  render() {
    const {index} = this.state;

    return <XYPlot {...defaultProps}
        onMouseLeave={() => this.setState({
          highlightedSeries: null,
          pointUsed: null
        })}
      >
      {lineData.map((d, i) => (<LineSeries
        data={d} key={`${i}`} stroke={i === index ? "orange" : undefined}
      />))}
      <MarkSeries
        data={allData}
        color="transparent"
        size={10}
        onNearestXY={({index}) => this.setState({index})}
      />
    </XYPlot>
  }
}
```
Here's a slightly different strategy to obtain a similar effect.
Prior to rendering this component, I've created an "allData" dataset which is a flat array of all the datapoints in the 3 lineSeries' datasets, only we've added to each of these datapoints an extra property, index, which will be 0, 1 or 2 depending from which of the 3 dataset each datapoint comes.

So allData will be an array of objects of the form: {x: ..., y: ..., index: ...}. Index, the last property, will be ignored by scales and won't affect the rendering in any way.

Then, on top of our 3 lineSeries, we're adding a MarkSeries with an onNearestXY handler, just as 2 examples above.

The first argument of the onNearestXY handler is the datapoint proper. So again: an object of the form: {x:... ,y:..., index:...}. While the index property was not taken into account for rendering, it is definitely part of the first argument. Actually, it's the only part that we care about, so we just write ({index}) =>.

In the embedded version of this example, I'm highlighting the mark that triggers onNearestXY, however I haven't added this in the snippet of code above.

### Linked Charts
<!-- INJECT:"LinkedChartsWithLink" -->

```jsx
class LinkedCharts extends Component {
  constructor() {
    super();
    this.state = {index: null};
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }
  handleMouseOver(index) {
    this.setState({index});
  }
  render() {
    const {index} = this.state;
    return (<div style={{display: 'flex'}}>
      {lineData.map((d, i) => (<div key={i}>
        <LineChart
          data={d}
          index={index}
          handleMouseOver={this.handleMouseOver} />
        </div>))}
    </div>);
  }
}

function LineChart({data, index, handleMouseOver}) {
  return (<XYPlot
    yDomain={[0, 10]}
    onMouseLeave={() => handleMouseOver(null)}
    >
      <LineSeries
        data={data}
        onNearestX={(datapoint, {index}) => handleMouseOver(index)} />
      {index === null ? null : <LineSeries
        data={[{x: index, y: 0}, {x: index, y: 10}]}
        opacity={0.5} />
      }
      {index === null ? null : <MarkSeries
        data={[data[index]}]}
        stroke="white" />
      }
    </XYPlot>);
}
```

More often than not, you want to be able to handle an action that happened in one of the charts and reflect it in different parts of your app, i.e. outside the chart.

This is a common React problem, and we're going to deal with it in a proven React way - with a container that has a state, and which will pass this state and actions to presentation components.

These presentation components will be represented according to the state of that container, and will be able to fire actions that will impact it.

Our container is a simple class. We create this method, handleMouseOver, that we'll have to bind to the container because we're going to pass it down. When we're doing that, we'll want that method to affect the state of the container.

Our container will create three "LineChart" components, to which it will pass the dataset of a line (i.e. an array of {x, y} objects, the contents of the state - which is simply an index value, if there has been a mouseOver action, or null if there hasn't been - and our handleMouseOver method.

Inside the LineChart components, we'll use onMouseLeave and onNearestX to trigger the handler, as in the examples above. So, if the user mouses over any of these line charts, this changes the state of the container above, which will trickle down to all 3 components again.

Finally, we create a dynamic line and dot gizmo to represent where the user is mousing over. We can easily generate a dataset for that, since index is the x value of where both the line and the dot should be.

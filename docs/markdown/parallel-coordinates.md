# Parallel Coordinates

Parallel Coordinates provide a robust method for displaying many variables simultaneously. It allows for rapid at-a-glance comparisons across a bunch of dimensions. These graphics can effectively be used either with several data rows on a single chart (as below) or as a small multiple. For more information, check out the [Wiki](https://en.wikipedia.org/wiki/Parallel_coordinates), it's got some really neat examples.

<!-- INJECT:"BasicParallelCoordinates" -->

Imagine you have a trio of models of cars that you are trying to compare. You're being data driven so you've collected a number of measurements based on a variety of values. You know basic facts about your variables, eg the interior rating a car can have is 7 and the minimum 1. You can use all this information to produce the above chart! Viola! Informed consumer.

<!-- INJECT:"AnimatedParallelCoordinates" -->

Just like every other chart and series ParallelCoordinates expects an array of data, each row or object corresponds to a line or polygon (depending on how you have your chart styled). A key caveat for this chart type is that react-vis can not simply infer the variables from each data object that you wish to plot, so we need you to tell us! So enters the domains prop, an array of object specifying the order and behavior of each of the variables. So you have to tell react-vis a little more to get started, but you get a lot more expressiveness. Let's consider some code. You might provide the following object as props to the parallel coordinates chart:

```javascript
const PARALLEL_COORDINATES_PROPS = {
  data: [{
    explosions: 7,
    wow: 10,
    dog: 8,
    sickMoves: 9,
    nice: 7
  }],
  domains: [
    {name: 'nice', domain: [0, 100]},
    {name: 'explosions', domain: [6.9, 7.1]},
    {name: 'wow', domain: [0, 11]},
    {name: 'sickMoves', domain: [0, 20]}
  ],
  height: 300,
  width: 400
};
```

In such a case, there would be ONE polygon rendered for four variables (nice/explosions/wow/sickMoves), because those values are listed in the domains prop.


## API Reference
#### data
Type: `arrayOf(Objects)`

#### domains
Type: `arrayOf(Objects)`
The domains allow the user to specify the nature of the variables being plotted. This information is captured in an object formatted like:

```javascript
PropTypes.shape({
  name: PropTypes.string.isRequired,
  domain: PropTypes.arrayOf([PropTypes.number]).isRequired,
  tickFormat: PropTypes.func
})
```

Let's looks at each member of the object

- name: generates a member of a labelSeries that shows at the end of the corresponding axis
- domain: a pair of numbers that are interpolated between. Setting these values correctly is essential for making your graphic legible! Because it is often the case that there will only be one or two data rows in a parallel coordinates, react-vis requires the user to specify the exact domain for each variable. Without which we would be unable to plot the variables well.
- tickFormat: allows the user to provide a formatting function for prettifiying the the way that axis interpolates between the domain values.

#### width
Type: `number`  
Width of the component.

#### height
Type: `number`  
Height of the component.

#### margin (optional)
Type: `Object`  
Default: `{left: 40, right: 10, top: 10, bottom: 40}`
Margin around the chart.

### style (optional)
Type: `object`
An object that contains CSS properties with which the axis component can be entirely re-styled.
As the ParallelCoordinates is composite of several composite elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level components `axes`, `labels`, and `lines`. These in turn lead to their corresponding to style objects. As an example, here is the default style object for the ParallelCoordinates:

```jsx
<ParallelCoordinates data={mydata} style={{
  axes: {
    line: {},
    ticks: {},
    text: {}
  },
  labels: {
    fontSize: 10
  },
  line: {
    strokeOpacity: 1
  }
}}/>
```

#### animation (optional)
Type: `boolean|Object`
Please refer to [Animation](animation.md) doc for more information.

#### className (optional)
Type: `string`
Provide an additional class name for the series.

#### colorType (optional)
Type: `string`
Specify the type of color scale to be used on the parallel coordinates chart, please refer to [Scales and data](scales-and-data.md) for more information.

#### showMarks (optional)
Type: 'boolean'
Specific whether or not to show the marks on the vertices of the lines

#### tickFormat (optional)
Type: 'function'
Specify the tick format for all axes. Will be over-ridden by tickFormats specified on single domains.

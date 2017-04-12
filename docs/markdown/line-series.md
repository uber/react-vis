# LineSeries/LineMarkSeries

<!-- INJECT:"LineChart" -->

react-vis offers two different types of LineSeries, one that renders SVG and one that renders WebGL.
The SVG mode is accessed by using the normal `LineSeries`, just as above, while the WebGL mode is used by simply calling
`LineSeriesGL` instead of `LineSeries`. It is most effective to hover over your points using onNearestX rather
than onValueMouseOver.

<!-- INJECT:"LineChartGL" -->

**NOTE**: using the GL version of this layer disables animation

## API Reference

##### strokeDasharray (optional)
Type: `string`
Specify a custom `stroke-dasharray` attribute which controls the pattern of dashes and gaps used to stroke paths.

##### strokeStyle (optional)
Type: `string`
If set to `dashed`, your series will use dashed lines. If set to `solid` or unspecified, your series will use solid lines. See `strokeDasharray` for specifying a custom stroke dash-array value.

##### strokeWidth (optional)
Type: `string|number`
Specifies the width of the line for the series. By default, this is determined by react-vis css (2px).

#### value
Type: `Object`
The data point to show the value at. Hint component will automatically find the place where the data point is and put the hint there.

#### format (optional)
Type: `function`
Format function for a tooltip. Receives the data point, should return an array of objects containing `title` and `value` properties. Each item of an array is shown on a separate line by default.
_Note: please pass custom contents in case if you need different look for the hint._

#### orientation (optional)
Type: `(auto|topleft|topright|bottomleft|bottomright)`
Default: `auto`
The way to align the hint inside the chart. When `auto` is set the hint is trying to stay inside the bounding box of the chart.
Set the hint to `topleft` if you want to see a "conventional" hint alignment.

#### curve (optional)
Type: `string|function`
Default: `null`
Apply the provided or named curve function from the D3 shape library to smooth the line series plot, see [the D3 documentation](https://github.com/d3/d3-shape#curves) for function names and instructions. Providing the function, not the name, will require importing the d3-shape package in order to configure it:

```javascript
// Setting up with only a name
const stringCurveProp = <LineSeries data={data} curve={'curveMonotoneX'} .../>;

const configuredCurve = d3Shape.curveCatmullRom.alpha(0.5);
const funcCurveProp = <LineSeries data={data} curve={configuredCurve} .../>;
```

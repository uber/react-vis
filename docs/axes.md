## Axes

<!-- INJECT:"CustomAxesOrientationWithLink" -->

`XAxis` and `YAxis` shows are responsible for the axis in the chart. They can be used simply

```javascript
<XYPlot
  width={300}
  height={300}>
  <XAxis />
  <YAxis />
  <MarkSeries data={myData}/>
</XYPlot>
```

Which will automatically interpolate across the relevant domains of the data (ie it will present reasonable values for x and y). It can also be used to create more complex axes

<!-- INJECT:"CustomAxesWithLink" -->

Which is produced via

```javascript
<XYPlot width={300} height={300}>
  <XAxis top={0} hideLine tickValues={[0, 1, 3, 4, 5]} title="X"/>
  <XAxis tickFormat={v => `Value is ${v}`} tickLabelAngle={-90} />
  <YAxis hideTicks/>
  <YAxis left={50} tickFormat={v => v * v}/>
  <YAxis hideLine left={150} tickFormat={v => WORDS[v]}/>
  <MarkSeries data={[{x: 0, y: 0}, {x: 5, y: 5}]} opacity={0} opacityType="linear"/>
</XYPlot>
```

For greater control over the specific styling and placement of the axis label, please see [ChartLabel](chart-label.md).

## API Reference

#### title (optional)

Type: `string`

Shows the title for the axis.

#### orientation (optional)

Type: `'top'|'left'|'bottom'|'right'`

The position of the axis inside the chart.
By default **it is already set** to `'bottom'` for `XAxis` and to `'left'` for `YAxis`. Similar to how the axis are oriented in d3-axis.

#### position (optional)

Type: `'end'|'middle'|'start'`

The position of the title relative to the axis. This value is set to `'end'` by default (i.e. towards the left of a horizontal axis, towards the top of a vertical axis.)

#### tickTotal (optional)

Type: `number`

Total number of ticks on the axis. Already set by default. Similar to the `tickTotal()` method of d3-axis.

#### tickValues (optional)

Type: `Array<*>`

An array of values (not coordinates!) that where the ticks should be shown. Similar to the `tickValues()` method of d3-axis.

#### tickFormat (optional)

Type: `function(value, index, scale, tickTotal)`

Format function for the tick label. Similar to the `tickFormat()` method of d3-axis. Typically the value that is returned is a string or a number, however this function also supports rendering SVG React elements. To wit, I could have formatting function like

```javascript
function myFormatter(t, i) {
  return (<tspan>
    <tspan x="0" dy="1em">MY VALUE</tspan>
    <tspan x="0" dy="1em">{t}</tspan>
  </tspan>);
}
```

Or you can customize the tick formatting by calling the `tickFormat()` function on the d3-scale by yourself and pass additional formatting parameters (e.g s for SI-prefix).
```javascript
function mySIPrefixFormatter(value, index, scale, tickTotal) {
  return `${scale.tickFormat(tickTotal, 's')(value)}Wh`;// -> e.g. 1.2kWh
}
```

**Note!** The return value will be wrapped with a `<text>` node if it's a string, `<tspan>`, or `<textPath>`. In all other cases the returned element will replace the `<text>` node. In case it's a custom React element it will also receive two additional props: `containerWidth` and `tickCount`. This way you can e.g. render a `<div>` to truncate long labels:

```javascript
const MyLabel = props => (
  <foreignObject>
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style={{
        width: props.containerWidth / props.tickCount, overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      {props.children}
    </div>
  </foreignObject>
);

function myFormatter(value) {
  return <MyLabel>{value}</MyLabel>;
}

<XAxis tickFormat={myFormatter} />
```

<!-- INJECT:"CustomAxisTickElement" -->

#### tickSize (optional)

Type: `number`

Default: `6`

Tick size for the axis. Sets both inner and outer sizes of the tick line. Similar to the `tickSize()` method of d3-axis.

#### tickSizeOuter (optional)

Type: `number`

Default: `null`

Tick size for the axis. Sets the outer size of the tick line. Similar to the `tickSizeOuter()` method of d3-axis.

NOTE: 1.0.0 and onwards now properly draws outer tick using this value. Previously, this value affected the drawing of inner tick.

#### tickSizeInner (optional)

Type: `number`

Default: `null`

Tick size for the axis. Sets the inner size of the tick line. Similar to the `tickSizeInner()` method of d3-axis.

NOTE: v1.0.0+ properly draws inner tick using this value. Previously, this value affected the drawing of outer tick.

#### tickPadding (optional)

Type: `number`

Default: `2`

Distance between the tick and the text of the tick in pixels. Similar to the `tickPadding()` method of d3-axis.

#### tickLabelAngle (optional)

Type: `number`

Default: `0`

The angle of the tick label. Can be used to fit the long labels of the axis without truncation.

#### left (optional)

Type: `number`

Horizontal position of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### top (optional)

Type: `number`

Vertical position of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### width (optional)

Type: `number`

Width of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### height (optional)

Type: `number`

Height of the axis in pixels. **Already set by default**, but can be overridden by the user.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

#### style (optional)

Type: `object`

An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Axis component is composite, it is possible to style its different parts individually. See [style](style.md)

The various parts of the axis can be styled by passing an object to the `line`, `ticks`, `text` and `title` properties:

```jsx
<XAxis title="X Axis" style={{
  line: {stroke: '#ADDDE1'},
  ticks: {stroke: '#ADDDE1'},
  text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}
}}/>
```

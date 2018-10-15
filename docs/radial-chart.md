# Radial chart

`RadialChart` is responsible for creating pie and donut charts. While this kind of chart is easy to overlook as insignificant, intentionally confusing, or almost always replaceable with a treemap; they can be useful for quickly showing small groups. People don't understand angles very well [(such is our biology)](https://www.interaction-design.org/literature/book/the-encyclopedia-of-human-computer-interaction-2nd-ed/data-visualization-for-human-perception), but over the last hundred years we have seen a lot of pie charts! This has caused us to become intimately familiar with them.

<!-- INJECT:"CustomRadiusRadialChartWithLink" -->

We can leverage this familiarity to quickly transmit information to our reader. The best type of information to display in this way (in our opinion) is groups of less 6 or so. More than that becomes pretty hard to compare and the reader just sees visual noise. The radial chart is easy to deploy:

```jsx

<RadialChart
  data={myData}
  width={300}
  height={300} />
```

The radial chart accepts children if you wish to give it them. This can be useful for adding tooltips, for example:

<!-- INJECT:"DonutChartExampleWithLink" -->


## Data format Reference


Radial chart has a very similar API to the arc series, but with even fewer requirements. To wit the data can be as simple as


```javascript
const myData = [{angle: 1}, {angle: 5}, {angle: 2}]
```

Or as complex as

[
  {angle: 1, radius: 10},
  {angle: 2, label: 'Super Custom label', subLabel: 'With annotation', radius: 20},
  {angle: 5, radius: 5, label: 'Alt Label'},
  {angle: 3, radius: 14},
  {angle: 5, radius: 12, subLabel: 'Sub Label only', className: 'custom-class'}
];

#### angle

Type: `number`

The only required property for the data, this determines the angular size of each wedge.

#### radius

Type: `number`

The distance between the origin and the outside of the arc. This values is scaled linearly by default

#### label

Type: `string`

The label to show next to the wedge.

#### subLabel

Type: `string`

The subLabel to show next to the wedge. This can be used for annotations to the top label.

#### color (optional)

Type: `string|number`

The color of a box in the series. By default the color is interpreted as number to be scaled to a color range. This can be over-ridden by providing the prop colorType="literal" to the series itself. This property can also be defined on the series level.

#### style (optional)

Type: `object`

SVG paths (which is what the arc series is made up of) have numerous manipulable properties, so rather than trying to prescribe all of them as props we offer a port to let you style it for yourself. This overrides the series level version of this property.

#### className (optional)

Type: `string`

The className to be added to an individual arc in the series.

#### padAngle (optional)

Type: `number|function`

The padding to be applied between arcs. See above donut chart for an example of a padded angle.

## Api

##### angleDomain, angleRange, angleType

Scale properties for the `angle` scale. The `angle` property _should be_ passed in the data, otherwise the chart won't be shown.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

##### className (optional)


Type: `string`

DOM classNames to be added to the wrapper component.

##### colorDomain, colorRange, colorType

Scale properties for the `color` scale. If `color` property is not passed in the data object, each new section of the chart gets the next color (e. g. the `'category'` scale is applied).
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### data


Type: `Array<Object>`

Array of data for the series. See above data format reference.

##### fillDomain, fillRange, fillType

Scale properties for the `fill` scale. If `fill` property is not passed in the data object, color scale is used instead.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### height (required, pixels)

#### innerRadius

Type: `number` in pixels

If radius is not set on the data then this can be used to set the innerRadius for all of the rows. This can be useful for building donut charts.

##### width (required, pixels)

##### labelsAboveChildren

Type: `boolean`

Whether or not to position the labels on top of the children. This can be useful if you have circular gridline and you want your labels to be legible on top of your grids.

##### labelsRadiusMultiplier

Type: `number`

How far the labels should be from the center of the chart as a function of the radius of the chart. If not specified, the default value of 1.1 is used (slightly outside of the chart).
Note that the property is labelsRadiusMultiplier (labels plural, not labelRadiusMultiplier)

##### labelsStyle

Type: 'Object'

A style object specifically for the labels.
Note that the property is labelsStyle (labels plural, not labelStyle)

##### margin (optional, pixels)

Type: `Object`

Default: `{left: 40, right: 40, top: 10, bottom: 10}`

#### radius

Type: `number` in pixels

If radius is not set on the data then this can be used to set the radius for all of the rows.

##### showLabels (optional)

Type: `boolean`

Whether or not to show the labels specified in the data

##### strokeDomain, strokeRange, strokeType

Scale properties for the `stroke` scale. If `stroke` property is not passed in the data object, stroke is _not_ visualized.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

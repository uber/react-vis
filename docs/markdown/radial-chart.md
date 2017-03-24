# Radial chart

`RadialChart` is responsible for creating pie and donut charts.
Note: currently radial chart _does not_ support series and it is not planned in the nearest future.

<!-- INJECT:"DonutChartExample" -->

## Usage

```jsx
import {RadialChart} from 'react-vis';

const data = [
  {angle: 2},
  {angle: 3},
  {angle: 5}
];

<RadialChart
  data={data}
  width={300}
  height={300} />
```

<!-- INJECT:"CustomRadiusRadialChart" -->

## Api

##### width (required, pixels)
##### height (required, pixels)

##### className (optional)

Type: `string`  
DOM classNames to be added to the wrapper component.

##### margin (optional, pixels)

Type: `Object`
Default: `{left: 40, right: 40, top: 10, bottom: 10}`

##### data

Type: `Array<Object>`
Data for the chart. Each data object should contain _at least_ `angle` property to be visualized.

##### angleDomain, angleRange, angleType

Scale properties for the `angle` scale. The `angle` property _should be_ passed in the data, otherwise the chart won't be shown.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### radiusDomain, radiusRange, radiusType

Scale properties for the `radius` scale. If the scale is not passed, the maximum possible radius is taken.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### innerRadiusDomain, innerRadiusRange, innerRadiusType

Scale properties for the `innerRadius` scale. If `innerRadius` property is not passed in the data object, opacity is _not_ visualized.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### opacityDomain, opacityRange, opacityType

Scale properties for the `opacity` scale. If `opacity` property is not passed in the data object, opacity is _not_ visualized.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### colorDomain, colorRange, colorType

Scale properties for the `color` scale. If `color` property is not passed in the data object, each new section of the chart gets the next color (e. g. the `'category'` scale is applied).
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### fillDomain, fillRange, fillType

Scale properties for the `fill` scale. If `fill` property is not passed in the data object, color scale is used insead.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### strokeDomain, strokeRange, strokeType

Scale properties for the `stroke` scale. If `stroke` property is not passed in the data object, stroke is _not_ visualized.
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

##### animation (optional)

Type: `boolean|Object`
Please refer to [Animation](animation.md) doc for more information.

### Further work

Currently no event handlers are provided for radial charts.

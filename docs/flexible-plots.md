## Flexible plots

By default, XYPlot, RadarChart, RadialChart, Sunburst, Treemap, Sankey require a width and a height. There are times, however, when you'd like your chart to take all the space it can.
For these cases, React-vis provides three different types of `XYPlot, RadarChart, RadialChart, Sunburst, Treemap, Sankey` with different flexible dimensions:

  - FlexibleXYPlot,
  - FlexibleWidthXYPlot -**NOTE**: has been deprecated and will be removed in a future version,
  - FlexibleHeightXYPlot -**NOTE**: has been deprecated and will be removed in a future version,
  - FlexibleRadarChart,
  - FlexibleRadialChart,
  - FlexibleSunburst,
  - FlexibleTreemap,
  - FlexibleSankey

and the associated helper functions that have been used to create these flexible components.

<!-- INJECT:"FlexibleChartsWithLink" -->

```jsx
import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot, // has been deprecated and will be removed in a future version
  FlexibleHeightXYPlot, // has been deprecated and will be removed in a future version
  FlexibleRadarChart,
  FlexibleRadialChart,
  FlexibleSunburst,
  FlexibleTreemap,
  FlexibleSankey
} from 'react-vis';
```

`Flexible[Component]` modifies `[Component]` so that it no longer requires eiter a width and a height, its dimensions will be that of its container. But you still can define a width and a height.

`FlexibleXYPlot`
```jsx
<FlexibleXYPlot height={100}>
  <VerticalBarSeries data={data} />
</FlexibleXYPlot>

<FlexibleXYPlot width={100}>
  <VerticalBarSeries data={data} />
</FlexibleXYPlot>

<FlexibleXYPlot>
  <VerticalBarSeries data={data} />
</FlexibleXYPlot>
```

`FlexibleSankey`
```jsx
<FlexibleSankey height={100} data={data} />

<FlexibleSankey width={100} data={data} />

<FlexibleSankey data={data} />
```

`FlexibleTreemap`
```jsx
<FlexibleTreemap height={100} data={data} />

<FlexibleTreemap width={100} data={data} />

<FlexibleTreemap data={data} />
```

`FlexibleRadarChart`
```jsx
<FlexibleRadarChart height={100} data={data} />

<FlexibleRadarChart width={100} data={data} />

<FlexibleRadarChart data={data} />
```

`FlexibleRadialChart`
```jsx
<FlexibleRadialChart height={100} data={data} />

<FlexibleRadialChart width={100} data={data} />

<FlexibleRadialChart data={data} />
```

`FlexibleSunburst`
```jsx
<FlexibleSunburst height={100} data={data} />

<FlexibleSunburst width={100} data={data} />

<FlexibleSunburst data={data} />
```

### No worries about resizing

A flexible plot is useful when you don't know for sure the size of the container where the chart will go.
On top of that, flexible plots resize themselves when the window size changes. You can try that by changing the size of this window.

### Size of parent container is not the same as "all the available space"

Flexible plots will inherit dimensions from their container. This is not the same thing as taking all the available space; if there are other elements in that container, a flexible plot won't deduce their dimensions from its own.
For best results, a flexible plot should be the only child of its container.

### Responsive visualizations

We can go one step beyond and not simply adjust the dimensions of the chart of the available space, but change how a dataset is being represented.
See the example [responsive visualizations](#/examples/charts/responsive-vis)

### Custom flexible components

By using the provided flexible helpers, you can use them to make your own components flexible, like we did to create `XYPlot, RadarChart, RadialChart, Sunburst, Treemap, Sankey` flexible alternatives:

```jsx
import {
  XYPlot,
  RadialChart
  makeVisFlexible,
  makeWidthFlexible, // has been deprecated and will be removed in a future version
  makeHeightFlexible, // has been deprecated and will be removed in a future version
} from 'react-vis';

const FlexibleXYPlot = makeVisFlexible(XYPlot);
const FlexibleRadialChart = makeVisFlexible(RadialChart);

const FlexibleWidthXYPlot = makeWidthFlexible(XYPlot); // has been deprecated and will be removed in a future version
const FlexibleHeightXYPlot = makeHeightFlexible(XYPlot); // has been deprecated and will be removed in a future version
```

## Flexible plots

By default, XYPlot requires a width and a height. There are times, however, when you'd like your chart to take all the space it can.
For these cases, React-vis provides three different types of `XYPlot` with different flexible dimensions:

  - FlexibleWidthXYPlot
  - FlexibleHeightXYPlot
  - FlexibleXYPlot

and the associated helper functions that have been used to create these flexible components.

<!-- INJECT:"FlexibleCharts" -->

```jsx
import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';
```

`FlexibleWidthXYPlot` modifies `XYPlot` so that it no longer requires a width, since it will take all the with in its container div.
Likewise, `FlexibleHeightXYPlot` modifies `XYPlot` so that is no longer requires a height, and its height will be that of its container div.
Finally, `FlexibleXYPlot` modifies `XYPlot` so that it no longer requires eiter a width and a height, its dimensions will be that of its container.

These components can be used exactly as `XYPlot`:

```jsx
<FlexibleWidthXYPlot height={100}>
  <VerticalBarSeries data={data} />
</FlexibleWidthXYPlot>

<FlexibleHeightXYPlot width={100}>
  <VerticalBarSeries data={data} />
</FlexibleHeightXYPlot>

<FlexibleXYPlot>
  <VerticalBarSeries data={data} />
</FlexibleVisXYPlot>
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

By using the provided flexible helpers, you can use them to make your own components flexible, like we did to create `XYPlot` flexible alternatives:

```jsx
import {
  XYPlot,
  makeVisFlexible,
  makeWidthFlexible,
  makeHeightFlexible,
} from 'react-vis';

const FlexibleXYPlot = makeVisFlexible(XYPlot);
const FlexibleWidthXYPlot = makeWidthFlexible(XYPlot);
const FlexibleHeightXYPlot = makeHeightFlexible(XYPlot);
```

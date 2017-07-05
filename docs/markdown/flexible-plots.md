## Flexible plots

By default, XYPlot requires a width and a height. There are times, however, when you'd like your chart to take all the space it can. For these cases, React-vis provides a helper function to make one or both dimensions of your chart flexible.

<!-- INJECT:"FlexibleCharts" -->

```jsx
const FlexibleWidth = makeWidthFlexible(XYPlot);
const FlexibleHeight = makeHeightFlexible(XYPlot);
const FlexibleVis = makeVisFlexible(XYPlot);
```

makeWidthFlexible modifies XYPlot so that it no longer requires a width. It will take all the with in its container div. Likewise, makeHeightFlexible modifies XYPlot so that is no longer requires a height. Its height will be that of its container div. Finally, makeVisFlexible modifies XYPlot so that it no longer requires eiter a width and a height. Its dimensions will be that of its container.

The result of that function can be used exactly as XYPlot:

```jsx
<FlexibleWidth height={100}>
  <VerticalBarSeries data={data} />
</FlexibleWidth>

<FlexibleHeight width={100}>
  <VerticalBarSeries data={data} />
</FlexibleHeight>

<FlexibleVis>
  <VerticalBarSeries data={data} />
</FlexibleVis>
```

### No worries about resizing
A flexible plot is useful when you don't know for sure the size of the container where the chart will go. On top of that, flexible plots resize themselves when the window size changes. You can try that by changing the size of this window.

### Size of parent container is not the same as "all the available space" 
Flexible plots will inherit dimensions from their container. This is not the same thing as taking all the available space; if there are other elements in that container, a flexible plot won't deduce their dimensions from its own. For best results, a flexible plot should be the only child of its container.

### Responsive visualizations
We can go one step beyond and not simply adjust the dimensions of the chart of the available space, but change how a dataset is being represented. See the example [responsive visualizations](/#/examples/charts/responsive-vis)

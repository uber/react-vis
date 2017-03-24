## HeatmapSeries:

The HeatmapSeries allows users to create a segment their chart domain and create beautiful fast charts.
Imagine you have a scatterplot will millions of points, this will be pretty hard to render in the browser.

<!-- INJECT:"HeatmapChart" -->

One solution is to to bin your data, and so arises HeatmapSeries!

```javascript
<XYPlot
  width={300}
  height={300}>
  <XAxis />
  <YAxis />
  <HeatmapSeries
    className="heatmap-series-example"
    data={myData}/>
</XYPlot>
```
Like other series it expects it's data to be formatted as a list of objects, as above.

```javascript
const myData = [
  {x: 1, y: 0, color: 10},
  {x: 1, y: 5, color: 10},
  {x: 1, y: 10, color: 6},
  {x: 1, y: 15, color: 7},
  {x: 2, y: 0, color: 12},
  {x: 2, y: 5, color: 2},
  {x: 2, y: 10, color: 1},
  {x: 2, y: 15, color: 12},
  {x: 3, y: 0, color: 9},
  {x: 3, y: 5, color: 2},
  {x: 3, y: 10, color: 6},
  {x: 3, y: 15, color: 12}
]
```

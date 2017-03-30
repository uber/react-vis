# MarkSeries

## API Reference

#### onNearestXY (optional)
Type: `function(value, info)`
A callback function which is triggered on mousemove and returns the closest point vased on the voronoi layout.
Callback is triggered with two arguments. `value` is the data point, `info` object has following properties:
- `innerX` is the horizontal position of the value;
- `innerY` is the vertical position of the value;
- `index` is the index of the data point in the array of data;
- `event` is the event object.

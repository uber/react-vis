
### Axes

**Note**: Axes API was changed in 0.5.

`XAxis` and `YAxis` shows are responsible for the axis in the chart. Both of them have following properties:

#### title (optional)
Type: `string`  
Shows the title for the axis.

#### orientation (optional)
Type: `'top'|'left'|'bottom'|'right'`  
The position of the axis inside the chart.
By default **it is already set** to `'bottom'` for `XAxis` and to `'left'` for `YAxis`. Similar to how the axis are oriented in d3-axis.

#### tickTotal (optional)
Type: `number`  
Total number of ticks on the axis. Already set by default. Similar to the `tickTotal()` method of d3-axis.

#### tickValues (optional)
Type: `Array<*>`  
An array of values (not coordinates!) that where the ticks should be shown. Similar to the `tickValues()` method of d3-axis.

#### tickFormat (optional)
Type: `function(*)`  
Format function for the tick label. Similar to the `tickFormat()` method of d3-axis.

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
Horizontal position of the axis in pixels. **Already set by default**, but can be overriden by the user.

#### top (optional)
Type: `number`  
Vertical position of the axis in pixels. **Already set by default**, but can be overriden by the user.

#### width (optional)
Type: `number`  
Width of the axis in pixels. **Already set by default**, but can be overriden by the user.

#### height (optional)
Type: `number`  
Height of the axis in pixels. **Already set by default**, but can be overriden by the user.

#### animation (optional)
See the [XYPlot](xy-plot.md)'s `animation` section for more information.

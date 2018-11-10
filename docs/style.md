## Style

In order to control the look and feel of your React-Vis components, you have four strategies.

### the React-Vis style sheet
React-Vis comes with a default style sheet. You need to import it or otherwise link it to your app (as shown in the [getting started](tutorial/getting-started.md) page), or you may overwrite it. 

### Class names
You may also use the class names of the React-Vis component to style them through your own stylesheets, or your own style strategies. 
Furthermore, all series components accept a `className` property, which adds a class of your own choosing to the element. 
Non-series elements (i.e. [gridlines](grids.md) or [hints](hint.md)) do not take a className property.

### Component-specific properties
Virtually every component accept several properties that affects its appearance. For instance, [line series](line-series.md) take a `color` property to control the stroke color of the line, but others as well such as strokeWidth that controls its thickness. Each of these is described in detail for each component. 

#### style property
Finally, components can also accept a special property called `style`. This let you pass an object to the component. The keys of that object are CSS properties, camel-cased (ie `stroke-width` would be written `strokeWidth`) and values are what you'd want to set those properties to. These are the same conventions than when [passing style](https://facebook.github.io/react/docs/dom-elements.html) to a standard DOM element with React.

```javascript
<LineSeries
  data={data}
  style={{strokeWidth: 2}}
/>
```

Some React-Vis components are composite in the sense that they group several elements that you may want to style distinctly. For instance, the [line-mark series](line-mark-series.md) combines a [line series](line-series.md) and a [mark series](mark-series.md). While you could pass the same style object to both, you can also use special properties (in this case, `line` and `mark`) to send a specific style object to either or both sub-components. 

```javascript
<LineMarkSeries
  data={data}
  color="red"
  style={{mark:{stroke: 'white'}}}
/>
```
In that example, without the style property, both lines and marks would be red. Without specifying `mark` in the style property, the stroke color of both lines and marks would be white. Here, the line remains red, and the marks are going to be red (their fill color) but with a white outline.

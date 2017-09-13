# Sankey

Sankey diagrams are a form of graph that allows for the easy communication of flows and other transferal processes.

<!-- INJECT:"EnergySankey" -->

### Usage

```jsx
import {Sankey} from 'react-vis';

const nodes = [{name: 'a'}, {name: 'b'}, {name: 'c'}];
const links = [
  {source: 0, target: 1, value: 10},
  {source: 0, target: 2, value: 20},
  {source: 1, target: 2, value: 20}
];

<Sankey
  nodes={nodes}
  links={links}
  width={200}
  height={200}
/>
```

### Api

##### width (required, pixels)
##### height (required, pixels)

<!-- INJECT:"BasicSankey" -->

##### nodes (required)
Type: `Object`
An array of objects matching the following shape:

```
{
  name: String,
  color: String,
  opacity: Number,
  key: String
}
```

The name will be displayed as a label next to its node.

All these fields are optional.

##### links (required)
Type: `Object`
An array of objects matching the following shape, where both `source` and `target`
are the indexes of the nodes they intent to represent, and `value` that would
match the height of the path link.

```
{
  // required
  source: Number,
  target: Number,
  value: Number,
  // optional
  color: String,
  opacity: Number,
  key: String
}
```

##### margin (pixels)
Type: either number or {top: Number, left: Number, right: Number, bottom: Number}
The margin that will applied around the edge of the diagram.

##### nodeWidth (optional)
Type: `Number`(pixels)
Defaults: `10`.
Width of the nodes.

##### nodePadding (optional)
Type: `Number`(pixels)
Defaults: `10`.
Padding between each node.

##### align (optional)
Type: `String`, one of  `justify`, `center`, `left`, `right`
Defaults: `justify`.
The alignment used for the sankey, see above for an example.

##### layout (optional)
Type: `Number`
Defaults: `50`.
The number of passes the sankey algorithm will do in order to arrange positioning.

##### hasVoronoi (optional)
Type: `Boolean`
Defaults: `false`
Determine if the node selection will be done using a voronoi or not. Although less
precise, it can help providing a better interactive experience to the user.

<!-- INJECT:"VornoiSankey" -->

##### hideLabels (optional)
Type: `Boolean`
Defaults: `false`.
Hide the display of the node names if specified to true.


##### onValueClick (optional)
Type: `function`
Default: noop
This handler is triggered either when the user clicks on a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```


##### onValueMouseOver (optional)
Type: `function`
Default: noop
This handler is triggered either when the user hovers over a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```

##### onValueMouseOut (optional)
Type: `function`
Default: noop
This handler is triggered either when the users mouse leaves a node. Callback when clicking a node, or the voronoi assigned to this node, pass the node.
```jsx
<Sankey
...
  onValueClick={(datapoint, event)=>{
    // does something on click
    // you can access the value of the event
  }}
```


### style (optional)
Type: `object`
An object that contains CSS properties with which the axis component can be entirely re-styled.
As the Sankey is composite of several composite elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level components `labels`, `links`, and `rects`. These in turn lead to their corresponding to style objects. As an example, here is the default style object for the Sankey:

```jsx
<Sankey data={mydata} style={{
  labels: {},
  links: {},
  rects: {}
}}/>
```

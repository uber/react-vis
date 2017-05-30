# Sankey

Note: This component is in alpha.

<!-- INJECT:"BasicSankeyExample" -->

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
##### nodes (required)

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

The margin that will be applied to each side of the Sankey.

Defaults to `20`.

##### nodeWidth (pixels)

Width of the nodes.

Defaults to `10`.

##### nodePadding (pixels)

Padding between each node.

Defaults to `10`.

##### align

The alignment used for the sankey ([example](http://bl.ocks.org/vasturiano/b0b14f2e58fdeb0da61e62d51c649908)).
Can be `justify`, `center`, `left`, `right`.

Defaults to `justify`.

##### layout

The number of passes the sankey algorithm will do in order to arrange positioning.

Defaults to `50`.

##### hasVoronoi

Determine if the node selection will be done using a voronoi or not. Although less
precise, it can help providing a better interactive experience to the user.

Defaults to `false`.

##### hideLabels

Hide the display of the node names if specified to true.

Defaults to `false`.

##### onClick

Callback when clicking a node, or the voronoi assigned to this node, pass the node.

##### onHover

Callback when hovering a node, or the voronoi assigned to this node, pass the node.

##### onBlur

Callback when bluring a node, or the voronoi assigned to this node, pass the node.

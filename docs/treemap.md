# Treemap

Treemaps are a splendid way to represent data that has a nested aspect to it. They allow for the easy display of complicated
relative information, such as nested-part-to-whole relationships in a easy to grok fashion. Checkout [the wikipedia page](https://en.wikipedia.org/wiki/Treemapping) or Ben Shneiderman's excellent [History of treemaps](http://www.cs.umd.edu/hcil/treemap-history/index.shtml) for more information.

<!-- INJECT:"SimpleTreemapWithLink" -->

The `treemap` in react-vis builds a series of nested divs (allow for easy and highly restyleable trees). We offer ten different layout
strategies, enabling the construction of standard treemaps, circle packed treemaps, and partition trees (also called icicle diagrams).

Our treemap can target SVG or pure dom (via the renderMode prop)! You can play with the representation above.

## Usage

Import the `treemap` component:
```jsx
import {Treemap} from 'react-vis';
```

Add the following code to your render function:
```jsx
<Treemap
  title={'My New Treemap'}
  width={300}
  height={300}
  data={myData}
  />
```

Like other systems that make use of d3's hierarchy layout system we ask that our data be presented to us in a tree like structure.
Here's a slice of the famous d3-flare dataset:


```javascript
const myData = {
 "title": "analytics",
 "color": "#12939A",
 "children": [
  {
   "title": "cluster",
   "children": [
    {"title": "AgglomerativeCluster", "color": "#12939A", "size": 3938},
    {"title": "CommunityStructure", "color": "#12939A", "size": 3812},
    {"title": "HierarchicalCluster", "color": "#12939A", "size": 6714},
    {"title": "MergeEdge", "color": "#12939A", "size": 743}
   ]
  },
  {
   "title": "graph",
   "children": [
    {"title": "BetweennessCentrality", "color": "#12939A", "size": 3534},
    {"title": "LinkDistance", "color": "#12939A", "size": 5731},
    {"title": "MaxFlowMinCut", "color": "#12939A", "size": 7840},
    {"title": "ShortestPaths", "color": "#12939A", "size": 5914},
    {"title": "SpanningTree", "color": "#12939A", "size": 3416}
   ]
  },
  {
   "title": "optimization",
   "children": [
    {"title": "AspectRatioBanker", "color": "#12939A", "size": 7074}
   ]
  }
 ]
}
```

First, note the recursive tree relationship: each node has a title, and an array of children.
This pattern continues until we reach the leaves, where we declare the size of the leaves. This value is rolled up, so that
the "cluster" node has  3938 + 3812 + 6714 + 743 = 15207 size units.

#### Hints

- It is often quite effective to use the literal scale type for Treemap's color attribute, as this allows highly granular control
over all of the nodes.

- It can useful to encode opacity to indicate tree depth, however because each tree leaf is a nested div this gets a little
tricky. One technique is to compute the effective RGBA to hex value, check out [this link](viget.com/inspire/equating-color-and-transparency)
for more details.

- If your not sure when to use a treemap, remember they provide an easy drop in relationship for pie charts.

## API Reference

#### width

Type: `number`

Width of the component.

#### height

Type: `number`

Height of the component.

#### padding

Type: `number`

The padding between cells the cells of the heatmap in pixels.

#### data

Type: `Object`

The data for the component. The `data` property is a tree-like structure.
Each point consists of following properties:

* `title`

  Type: `string`

  The title to show inside the cell. Might be a string or a React component.
* `size`

  Type: `number`

  The relative size of the cell.
* `opacity` (optional)

  Type: `number`

  The value to visualize the opacity with.
* `color` (optional)

  Type: `number` or `string`

  The value to visualize the color with.
* `style` (optional)

  Type: `object`

  style object to be added to the inline styles of the array
* `children` (optional)

  Type: `Array`

  The children for the leaf.

#### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

#### hideRootNode (optional)

Type: `boolean`

Simple boolean on whether or not to show the root node of the tree.

#### onLeafClick (optional)

Type: `function`

- Should accept arguments (leafNode, domEvent)

Pass in a function that will be called on click on a given leaf.

#### onLeafMouseOver (optional)

Type: `function`

- Should accept arguments (leafNode, domEvent)

Pass in a function that will be called on mouseEnter on a given leaf.

#### onLeafMouseOut (optional)

Type: `function`

- Should accept arguments (leafNode, domEvent)

Pass in a function that will be called on mouseOut on a given leaf.

#### mode (options)

Type: `string`

- One of squarify, resquarify, slice, dice, slicedice, binary, circlePack, partition, partition-pivot

This modifies the tiling strategy for the treemap, for more information see the [d3 hierarchy docs](https://github.com/d3/d3-hierarchy).

#### renderMode

Type: `string`

- One of 'SVG', or 'DOM'

Determines which type of rendering to use for the treemap.

#### sortFunction (optional)

Type: `function`

- Should accept arguments (a, b)

Pass in a function that will be used to sort the nodes, for more information see the [d3 hierarchy docs on sorting](https://github.com/d3/d3-hierarchy#node_sort).

##### colorDomain, colorRange, colorType

Scale properties for the `color` scale. If `color` property is not passed in the data object, each new section of the chart gets the next color (e. g. the `'category'` scale is applied).
Please refer to [Scales and Data](scales-and-data.md) for more information about scales.

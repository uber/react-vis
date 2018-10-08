# Sunbursts

Sunbursts are a powerful way to demonstrate part to whole relationships. While they certainly have the many of easily criticized problems of pie charts, they allow for
at a glance understanding of deeply nested systems. This could be useful for understanding for funnels problems or distributions of nested groups (eg how does my cities performance compare to other cities in my country?).

<!-- INJECT:"BasicSunburstWithLink" -->

The `Sunburst` is a thin data processing wrapper on an XYPlotted [ArcSeries](arc-series.md), it generates highly re-stylable SVG! Any props that are available in the arc series are also available here. Additionally it copies the data format of the treemap, so if you have data prepped to drop into the tree map, you can use that same data to get a sunburst.

## Usage

Import the `Sunburst` component:
```jsx
import {Sunburst} from 'react-vis';
```

Add the following code to your render function:
```jsx
<Sunburst
  hideRootNode
  colorType="literal"
  data={data}
  height={300}
  width={350}/>
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

### Adding annotations

Tooltips and other helpful annotations can be added to the sunburst diagram by providing those elements as children. For instance, if we wanted to add a tooltip to the above Sunburst, this could be done by adding a [Hint](hint.md) component as a child.

```jsx
<Sunburst
  hideRootNode
  colorType="literal"
  data={data}
  height={300}
  width={350}>
  <Hint value={hoveredValue} />
</Sunburst>
```

Where `hoveredValue` is an appropriately curated coordinate value. See the [sunburst-with-tooltips](https://github.com/uber/react-vis/blob/master/showcase/sunbursts/sunburst-with-tooltips.js) code for more details.

## API Reference

#### width

Type: `number`

Width of the component.

#### height

Type: `number`

Height of the component.

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
* `color` (optional)

  Type: `number` or `string`

  The value to visualize the color with.
* `label` (optional)

  Type: `string`

  The label to be attached for the current node.
* `labelStyle` (optional)

  Type: `object`

  The style of the attached label. Example `{labelStyle: {fontSize: 15}, ...}`
* `dontRotateLabel` (optional)

  Type: `boolean`

  Don't rotate this label
* `children` (optional)

  Type: `Array`

  The children for the leaf.

<!-- INJECT:"SunburstWithTooltipsWithLink" -->

#### hideRootNode (optional)

Type: `boolean`

Simple boolean on whether or not to show the root node of the tree.

#### children (optional)

Type: `react components`

Sunburst can accept react components as children if you wish to annotate your diagram.

#### animation (optional)

Type: `boolean|Object`

Please refer to [Animation](animation.md) doc for more information.

<!-- INJECT:"AnimatedSunburstWithLink" -->

#### onValueClick (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on click on a given arc.

#### onValueRightClick (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on right click on a given arc.

#### onValueMouseOver (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on mouseEnter on a given arc.

#### onValueMouseOut (optional)

Type: `function`

- Should accept arguments (arc node, domEvent)

Pass in a function that will be called on mouseOut on a given arc.

#### padAngle (optional)

Type: `number|function`

The padding to be applied between arcs.

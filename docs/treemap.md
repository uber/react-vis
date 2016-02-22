# Treemap

`treemap` is a component to show treemaps. For more information about this type of visualization please read [this article](https://en.wikipedia.org/wiki/Treemapping).

Note: currently only one-level treemaps are supported. No formatters and event handlers are available as well (to be implemented).

## Usage

Import the `treemap` component:
```jsx
import Table from 'react-vis/treemap';
```

Add the following code to your render function:
```jsx
<Treemap
  title={'My New Treemap'}
  height={300}
  data={
    {
      title: '',
      opacity: 1,
      children: [
        {
          title: 'dogs',
          size: 100,
          opacity: 10,
          color: 1
        },
        {
          title: 'cats',
          size: 60,
          opacity: 15,
          color: 10
        }
      ]
  }
  />
```

## API Reference

#### width
Type: `number`
Default: `null`
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
  Type: `number`
  The value to visualize the color with.
* `children` (optional)
  Type: `Array`
  The children for the leaf.


#### animation (optional)
Type: `{duration: number}|boolean`
Default: `false`
Animation config, which might have following values:

- If `false` is passed, then the component *will not be* animated.
- If `true` is passed then the component *will be* animated with the default settings.
- If an object is passed, then the component *will be* animated with the given settings.

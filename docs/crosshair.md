## Crosshair

<!-- INJECT:"DynamicCrosshairWithLink" -->

`Crosshair` is a tooltip for multiple values at the same time. Its purpose is to combine several values with the similar X coordinate in one tooltip. Crosshair is automatically aligned by the x coordinate depending on what values are passed.
In case if custom representation of crosshair is needed, the component is able to wrap the user's JSX. In this case no CSS is applied to that. Here's a short example:

```jsx
<Crosshair values={myValues}>
  <div style={{background: 'black'}}>
    <h3>Values of crosshair:</h3>
    <p>Series 1: {myValues[0].x}</p>
    <p>Series 2: {myValues[1].x}</p>
  </div>
</Crosshair>
```

#### className (optional)

Type: `string`

Provide an additional class name for the series.

#### itemsFormat (optional)

Type: `function`

The function that formats the list of items for the crosshair. Receives the list of data points, should return an array of objects containing `title` and `value` properties.
_Note: please pass custom contents in case if you need different look for the crosshair._

#### style (optional)

Type: `object`

An object that contains objects of CSS properties with which the component can be entirely re-styled.
As the Crosshair is composed of several elements, it is possible to provide style objects for any and all parts of the tree. See [style](style.md)
Most generally, there are three top level keys: `line`, `title`, and `box`. These in turn lead to their corresponding style objects.

#### titleFormat (optional)

Type: `function`

The function that formats the title for the crosshair. Receives the list of data points, should return an object containing `title` and `value` properties.
_Note: please pass custom contents in case if you need different look for the crosshair._

#### values

Type: `Array<Object>`

The array of data points to show the crosshair at. Crosshair will automatically align to the horizontal position of the points passed there.

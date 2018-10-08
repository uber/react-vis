## Legends

<!-- INJECT:"HorizontalDiscreteColorLegendExampleWithLink" -->

Currently following types of legends are supported:

- for colors:
  * DiscreteColorLegend (for a fixed number of colors, good for series);
  * SearchableDiscreteColorLegend) (same as DiscreteColorLegend, but with search on top);
  * ContinuousColorLegend (for gradually changing colors);
- for sizes:
  * ContinuousSizeLegend (for gradually changing size).

## Color legends

### DiscreteColorLegend

<!-- INJECT:"VerticalDiscreteColorLegendExampleWithLink" -->

#### items (required)

Type: `Array<string|{title: string, color: String, strokeDasharray: string, strokeStyle: string, strokeWidth: number, disabled: boolean}|react element>`

Array of items that should be shown on the legend. The array should consist from either objects (`title`, optional `color`, optional `strokeDasharray`, optional `strokeStyle`, optional `strokeWidth`, and optional `disabled` flag) or strings (treated as titles). The stroke properties should match those in your series (see [line series](line-mark-series.md))



#### orientation (optional)

Type: `(vertical|horizontal)`

Default: `'vertical'`

String either `horizontal` or `vertical` representing which direction the legend elements are rendered.

#### onItemClick

Type: `function(Object, number): void`

Default: noop

Click callback for the item in the list. Gets the clicked item and its index as parameters.

#### onItemMouseEnter

Type: `function`

Default: noop

This handler is triggered either when the user's mouse enters a legend item.
The handler passes three arguments, the corresponding item, legend index and the actual event.
```jsx
<DiscreteColorLegend
...
  onItemMouseEnter={(item, index, event) => {
    // does something on mouse enter
    // you can access the value of the event
  }}
```

#### onItemMouseLeave

Type: `function`

Default: noop

This handler is triggered either when the user's mouse leaves a legend item.
The handler passes three arguments, the corresponding item, legend index and the actual event.
```jsx
<DiscreteColorLegend
...
  onItemMouseLeave={(item, index, event) => {
    // does something on mouse leave
    // you can access the value of the event
  }}
```

#### width

Type: `number`

Outer width of the component. Default width is not set.

#### height

Type: `number`

Outer height of the component. Default is not set, the component stretches with the items added into it.

### SearchableDiscreteColorLegend

`SearchableDiscreteColorLegend` allows the user to perform search among the items.

<!-- INJECT:"SearchableDiscreteColorLegendExampleWithLink" -->

Its API includes the API of `DiscreteColorLegend`, but adds several search-related items:

#### searchText (optional)

Type: `string`

Default: `''`


#### searchFn (optional)

Type: `function(Array, string):Array`

Function that is should filter out the unnecessary items by the given initial array of items and the search string. By default the function returns an array of items which titles contain a string.

#### searchPlaceholder (optional)

Type: `string`

Default: `''`

Placeholder for an search input field.

#### onSearchChange (optional)

Type: `function(string):void`

Event handler for the change of the input field. The handler is triggered with the search field value as a parameter.

### ContinuousColorLegend

<!-- INJECT:"ContinuousColorLegendExampleWithLink" -->

#### startTitle

Type: `string|number`

The title that is shown in the beginning of the legend.

#### midTitle

Type: `string|number`

The title that is show in the middle of the legend.

#### endTitle

Type: `string|number`

The title that is show in the end of the legend.

#### startColor (optional)

Type: `string`

The initial color of the bar

#### endColor (optional)

Type: `string`

The end color of the bar.

#### midColor (optional)

Type: `string`

The middle color of the bar.

#### width (optional)

Type: `number`

Outer width of the component.

#### height (optional)

Type: `number`

Outer height of the component.

## Size Legends

### ContinuousSizeLegend

<!-- INJECT:"ContinuousSizeLegendExampleWithLink" -->

#### startTitle

Type: `string|number`

The title that is shown in the beginning of the legend.

#### endTitle

Type: `string|number`

The title that is show in the end of the legend.

#### startSize (optional)

Type: `number`

Default: `2`

The initial size of the circles in the legend.

#### endSize (optional)

Type: `number`

Default: `20`

The end size of the circles in the legend.

#### circlesTotal (optional)

Type: `number`

Default: `10`

Total amount of circles displayed in the legend

#### width (optional)

Type: `number`

Outer width of the component.

#### height (optional)

Type: `number`

Outer height of the component.

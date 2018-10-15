## Color

Color can be set and affected in many ways in React-vis.
The main principles are:
* sensible defaults - your chart should look good even if you don't do anything;
* respect of specificity - you can change things at a high level (ie <XYPlot /> component) but override this at the series level and, when relevant, at the mark level.
* flexibility - everything down to the humble tick can be colored and recolored.

### Setup

In this document, let's look at how different color choices affect 3 different mini charts.
Each chart in the doc is made of 3 series with x going from 0 to 9 and random values of y between 0 and 10. The left-most chart is made of VerticalBarSeries, the middle one is made of 3 LineSeries, and the right-most one is made of MarkSeries.

So it goes like this:

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={series1}/>
  <VerticalBarSeries data={series2}/>
  <VerticalBarSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1}/>
  <LineSeries data={series2}/>
  <LineSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200}>
  <MarkSeries data={series1}/>
  <MarkSeries data={series2}/>
  <MarkSeries data={series3}/>
</XYPlot>
```

### Cases

We do nothing:

<!-- INJECT:"SensibleDefaultsWithLink" -->

With no color instruction, colors are automatically set by series according to the default react-vis palette, which is:

<!-- INJECT:"ReactVis5WithLink" -->

We specify color in XYPlot

```jsx
<XYPlot height={200} width={200} color="red">
  <VerticalBarSeries data={series1}/>
  <VerticalBarSeries data={series2}/>
  <VerticalBarSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200} stroke="red">
  <LineSeries data={series1}/>
  <LineSeries data={series2}/>
  <LineSeries data={series3}/>
</XYPlot>
<XYPlot height={200} width={200} color="red">
  <MarkSeries data={series1}/>
  <MarkSeries data={series2}/>
  <MarkSeries data={series3}/>
</XYPlot>
```

<!-- INJECT:"ColorInXYPlotWithLink" -->

Without any further instruction, all the series are red. Note that in the case of LineSeries, we have to use stroke instead of color for this effect to work.

We specify color by series

The next step is passing colors to by series. When we do that, we add a color prop to each series component:

```jsx
<LineSeries data={series1} color="1" />
<LineSeries data={series2} color="red" />
```

How this color information is going to be treated depends on a number of factors.

Color scales

Once it's passed through series, color works like a [scale](scales-and-data.md); in other words, it transforms data into a visual representation.
There are several types of scales.

A linear scale works with a range of numerical values on one hand ("domain"), and two colors on the other hand ("range"). If given a numerical value in the domain, it transforms it into a color in the range depending on how far into the domain that value was. If given the minimum value of the domain, the scale will return the first color of the range. If given the maximum value of the domain, it will return the second color of the range. And if given a value in between, it will return an interpolation between these two colors - the closer that value is from the minimum, the more it will look like the first color, and the closer it is to the maximum, the more it will look like the second. Else, it's a proportional mix of the two.

For example, if a domain is [0, 1] and the range is ['black', 'white'], 0 will become 'black', 1 will become 'white', and 0.2 will become '#333333' (20% between black and white)

The linear scale can be extended to work with multi-point domains and range. If you pass 3 (ordered) values to the domain, and 3 values to the range, when given a data point, the scale will figure out which segment of the domain this data point corresponds to, and will match it with the corresponding segment of the range.

If our domain is [0, 1, 2] and our range is now ['black', 'white', 'blue'], 0.2 will still be '#333333' (20% between the first 2 values), but 1.5 will become '#8080ff' (halfway between white and blue)

A categorical color scale associates a discrete number of values (also called domain) to a discrete number of colors (also called range). One big difference is that the values can be number or strings.
For instance, if a categorical color scale has the domain: ['yes', 'maybe', 'no'] and the range ['blue', 'yellow', 'red'], it will transform 'yes' into 'blue' and 'no' into 'red'. There will be no interpolation. If it finds a value which is not in its domain, it will return undefined (which will be represented in black).

Finally, the literal color scale just returns whatever is provided as is. With a literal color scale, we can have color names in the dataset, and they will be used without transformation.

Categorical colors at series level

<!-- INJECT:"CategoryColorAtSeriesLevelWithLink" -->

For this example, the XYPlot props are:

```jsx
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <VerticalBarSeries data={series1} color={0} />
  <VerticalBarSeries data={series2} color={1} />
  <VerticalBarSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <LineSeries data={series1} color={0} />
  <LineSeries data={series2} color={1} />
  <LineSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="category"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <MarkSeries data={series1} color={0} />
  <MarkSeries data={series2} color={1} />
  <MarkSeries data={series3} color={2} />
</XYPlot>
```

As you can see, __using categorical color at the series level doesn't work for bar charts or scatterplots__. It does for line charts though.

Linear colors at series level

<!-- INJECT:"LinearColorAtSeriesLevelWithLink" -->

```jsx
<XYPlot height={200} width={200}
  colorRange="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <VerticalBarSeries data={series1} color={0} />
  <VerticalBarSeries data={series2} color={1} />
  <VerticalBarSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <LineSeries data={series1} color={0} />
  <LineSeries data={series2} color={1} />
  <LineSeries data={series3} color={2} />
</XYPlot>
<XYPlot height={200} width={200}
  colorType="linear"
  colorDomain={[0, 1, 2]}
  colorRange={myPalette}
>
  <MarkSeries data={series1} color={0} />
  <MarkSeries data={series2} color={1} />
  <MarkSeries data={series3} color={2} />
</XYPlot>
```

Likewise, __using linear color at the series level only works for line charts__.

Literal colors at series level

<!-- INJECT:"LiteralColorAtSeriesLevelWithLink" -->

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={series1} color="#cd3b54" />
  <VerticalBarSeries data={series2} color="#59b953" />
  <VerticalBarSeries data={series3} color="#ba4fb9" />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1} color="#cd3b54" />
  <LineSeries data={series2} color="#59b953" />
  <LineSeries data={series3} color="#ba4fb9" />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={series1} color="#cd3b54" />
  <LineSeries data={series2} color="#59b953" />
  <LineSeries data={series3} color="#ba4fb9" />
</XYPlot>
```

However, setting color at the series level works for all kinds of charts. It's not even necessary to specify a color type, a domain or a range.

We specify color information at mark level

For this second series of charts, we are going to specify color information inside of our dataset (ie the series which will be passed to the props "data").
Previously, our datasets only included x and y information:
```js
const series1 = [
  {x: 0, y: 2},
  {x: 1, y: 6},
  ...
];
```
Now, they will have a color information as well.
* For our categorical examples, that color value will be a random integer between 0 and 10.
* For our linear examples, that color value will be a random number between 0 and 10 (not necessarily an integer).
* Finally, for our literal example, the color information will be the name of a color in hex format.


Categorical colors at mark level
<!-- INJECT:"CategoryColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category">
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category">
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

So what happens here?

For line charts, __nothing!__ They ignore colors at mark level. So they behave just like the default case (as if we passed no color information at all)

For the 2 other charts, marks are colored according to the default extended palette:

<!-- INJECT:"ReactVis20WithLink" -->

Here, I have specified the colorType prop at the XYPlot level. I could have done so at the series level, inside of each series component (it cascades down). However, I haven't specified a colorRange or a colorDomain.

It's going to use the default extended palette as the color range. We'll override this in the next example. As for domain, it's going to associate the first color value it finds in the dataset with the first color of the palette, the second distinct color it finds with the second color of the palette, and so on and so forth.
With this syntax, we'll render marks which have different color information in different colors, but we don't control which color. If we want to control which color a specific value is going to be associated with, we have to pass a colorDomain.

Categorical colors at mark level, custom palette
<!-- INJECT:"CategoryColorAtMarkLevelCustomPaletteWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" colorRange={myPalette}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

This time, I'm passing a custom palette:

<!-- INJECT:"CustomPaletteWithLink" -->

Behavior for line chart is still identical, but the colors are different for our bar charts and scatterplots. As I'm not passing a color domain, I still don't control which value will be associated with which color - not super important since my color values are random numbers. But if order matters, a colorDomain is required.

Linear colors at mark level, default palette

<!-- INJECT:"LinearColorAtMarkLevelNoPaletteWithLink" -->

```jsx
<XYPlot height={200} width={200}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

The linear color scale is the default color scale. So, to get that behavior, we don't need to specify this colorType in XYPlot. Its associated color range was conceived by someone who really likes orange:

<!-- INJECT:"ContinuousWithLink" -->

I haven't specified the color range either. React-Vis will compute it by looking at the minimum and maximum value associated with color in all the series of a given XYPlot, and use that as the domain.

The line charts are still unaffected.

Linear colors at mark level, custom palette

<!-- INJECT:"LinearColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorRange={['#c7e9c0', '#00441b']}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

Here's the same code, but we define the color range. This green palette comes from ColorBrewer.

Literal colors at mark level, default palette

<!-- INJECT:"LiteralColorAtMarkLevelWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="literal"}>
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="literal"}>
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="literal"}>
  <MarkSeries data={seriesWithColor1} />
  <MarkSeries data={seriesWithColor2} />
  <MarkSeries data={seriesWithColor3} />
</XYPlot>
```

Finally, we can pass literal color names in our dataset from our custom palette. The line charts are still not affected.

### Going beyond

Independently control fill and stroke

The line chart series (LineSeries) is only a line, but most other series (AreaSeries, ArcSeries, BarSeries, HeatmapSeries, HexbinSeries, MarkSeries, RectSeries and their derivatives, including LineMarkSeries) involve 2D shapes that have both a fill color and a stroke color.

In SVG, those correspond to the fill and the stroke css properties (fillStyle and strokeStyle in canvas).

When we pass color information, we set both the fill and stroke. However, we can set them independently by using "fill" or "stroke" instead of color.

As of this writing, ContourSeries and PolygonSeries don't follow this model and their color can only be controlled by "color".

<!-- INJECT:"CategoryColorAtMarkLevelFixedStrokeWithLink" -->

```jsx
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <VerticalBarSeries data={seriesWithColor1} />
  <VerticalBarSeries data={seriesWithColor2} />
  <VerticalBarSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
<XYPlot height={200} width={200} colorType="category" stroke="#f70">
  <LineSeries data={seriesWithColor1} />
  <LineSeries data={seriesWithColor2} />
  <LineSeries data={seriesWithColor3} />
</XYPlot>
```

Here, we set a stroke value at the XYPlot level for all of our charts. What happens?

The bar chart outerbox is now of that color,

The line series are now represented in that color - this takes over the default behavior,

The scatterplot dots are also now surrounded with that color.

Note that in the case of a LineMarkSeries (a combination of a LineSeries and a MarkSeries) the stroke property will control both the color of the line and the stroke of the marks. If you want a different color, you can just instead create a LineSeries and a MarkSeries with the same data:

<!-- INJECT:"LineSeriesMarkSeriesWithLink" -->

```jsx
<XYPlot height={200} width={600}>
  <LineSeries data={series1} color={myPalette[0]} />
  <MarkSeries data={series1} color={myPalette[0]} stroke="white" />
  <LineSeries data={series2} color={myPalette[1]} />
  <MarkSeries data={series2} color={myPalette[1]} stroke="white" />
  <LineSeries data={series3} color={myPalette[2]} />
  <MarkSeries data={series3} color={myPalette[2]} stroke="white" />
</XYPlot>
```

Here, I want my dots to have a white outline.
Why did I specify the color of each of my series? You might have to scroll all the way to the top for the answer! If I had done nothing all the colors of my series would have been taken from the default palette for each new series. So the first line series would have had the first color, then the first mark series would have had the _second_ color... and so on and so forth. By specifying a color, we are guaranteeing that the dots and the lines have the same color.

Using styles

We can pass style information to anything - XYPlot, series, mark - and override the look and feel of that element. Styles don't have to be static objects - they can be computed at run time. Styles are a different way to control colors. While using the color prop, or a color property in a dataset, can be much more concise, everything can be affected by styles - including non-mark elements such as ticks or gridlines. See [style](style.md) for more info.

Using specificity

We've seen that we can set color information at the plot level, at the series level and at the mark level. But what happens when we do it at several levels at the same time? The most specific wins.

If you need to color one element (say, one mark) differently from all the others, you can specify color at a higher level (say, the series or the plot) and only pass color information to the exception, rather than pass color information to all elements.

<!-- INJECT:"ColorSpecificityWithLink" -->

```jsx
  <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal">
    <VerticalBarSeries data={seriesWithOneElementColored} />
  </XYPlot>
  <XYPlot {...defaultXYPlotProps} stroke="#e5e5e5" strokeType="literal">
    <LineSeries data={series1} />
    <LineSeries data={series2} />
    <LineSeries data={series3} stroke="#FF9833"/>
  </XYPlot>
  <XYPlot {...defaultXYPlotProps} color="#12939A" colorType="literal" stroke="white" >
    <MarkSeries data={series1} />
    <MarkSeries data={series2} />
    <MarkSeries data={seriesWithOneElementColored} color="#4fb79b"/>
  </XYPlot>

```

Notes:

* For the line series, which behave differently than other series, you must use stroke instead of color for this to work.
* For the scatterplot series, I'm using specificity twice: there's a color at the plot level, overridden by a color at the first series level, overridden by a color on the 7th mark of the series.

Using gradients

Why use a boring solid color when you can use gradients? We're not sure either! Once you define gradients (see [gradients](gradients.md)) you can use them instead of color (or fill, or stroke) at the series level.

<!-- INJECT:"GradientChartsWithLink" -->

```jsx
  const gradient = (<GradientDefs>
    <linearGradient
        id="myGradient"
        gradientUnits="userSpaceOnUse"
        x1="0" y1="0" x2="200" y2="200">
        <stop offset="10%" stopColor="#c6e48b" />
        <stop offset="33%" stopColor="#7bc96f" />
        <stop offset="66%" stopColor="#239a3b" />
        <stop offset="90%" stopColor="#196127" />
    </linearGradient>
  </GradientDefs>);
  return (<div style={{display: 'flex'}}>
    <XYPlot height={200} width={200}>
      {gradient}
      <VerticalBarSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={200} width={200}>
      {gradient}
      <LineSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
    <XYPlot height={200} width={200}>
      {gradient}
      <MarkSeries data={series1} color={'url(#myGradient)'} />
    </XYPlot>
  </div>)
```

Note that I'm using the userSpaceOnUse gradient unit, so the colors are set independently of the size of the object. I'm borrowing the colors of the gradient from the ones used on the activity sparklines in GitHub.

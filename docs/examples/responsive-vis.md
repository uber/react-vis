<!-- STYLETYPE:"example-page" -->
<!-- INJECT:"ResponsiveVis" -->

This demo explores the concept of "Responsive Data Visualization" (As coined by Nick Rabinowitz). The basic notion is lifted from responsive design: some features work for some screen resolutions, while others do not. Responsive design determines whether or not to use a given feature by consulting an aspect ratio (width by height). Through this notation we are able to create beautiful web experiences that work seamlessly between phones, tablets, and computers. Taking this idea on step farther we introduce a third element into the fray: data size.

In data visualization, we often need to create applications that work with enormous ranges of sizes of data. Sometimes the data might be small (10 - 100 rows), or it might be gigantic (100k-1M+ row): throughout the entire range it just needs to work. Again, following our cues from responsive design, we note that maybe labels on scatterplots look great when you have under 50 data points, but bad when you have 2000. Checkout Nicks [original demo](http://nrabinowitz.github.io/rdv/) for more details on the theory, as well to see his rad implementation in raw d3.

[Scatterplot source code](https://github.com/uber/react-vis/blob/master/showcase/examples/responsive-vis/responsive-scatterplot.js)

[Barchart source code](https://github.com/uber/react-vis/blob/master/showcase/examples/responsive-vis/responsive-bar-chart.js)

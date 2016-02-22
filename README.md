# react-vis

## Overview

A collection of react components to render common data visualization charts, such as **Line charts**, **Tables** and **TreeMaps**.

Some notable features:

- Provides a set of basic building blocks for charts, such as separate X and Y axis components. This provides a high level of control of chart layout for applications that need it.
- Provides a set of defaults which can be overriden by the custom user's settings.

**Note:** While the D3 charting library is currently used quite heavily under the hood, this module's API doesn't require the app to know anything about D3.


## Reference

* [Common Principles](docs/common-principles.md)
* [XYPlot](docs/xy-plot.md)
* [Table](docs/table.md)
* [Treemap](docs/treemap.md)

## Development

To develop on this component, install the dependencies and then build and watch the static files:

```
npm install && npm run watch
```

Once complete, you can view the component's example in your browser at [localhost:3000](http://localhost:3000). Any changes you make to the example code will automatically run the compiler to build the files again.

To lint your code, run the tests, and create code coverage reports:
```
npm test
```

You can view the code coverage reports with:
```
npm run view-cover
```

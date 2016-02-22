# Common principles

Currently all supported chart types are implemented in following components:

* `chart` is responsible for bar charts, area charts, line charts, heat maps and bubble charts/scatterplots.
* `treemap` is used to create tree maps.
* `table` is for creating different kinds of tables (including tables with infinite scroll).

## Data

It is expected that each visualization has a `data` property. Each data property is an object. Please refer to the documentation for each component for more detail.

## Scales, domains and ranges

Scales describe the visual aspects of each data point. Depending on the visualization are x and y scales (for the position of x and y), color scale (e.g. the stroke or the fill of the series), size scale, opacity scale, radius scale, angle scale and others.
Pleae refer to each component for more detail about the available scales.

Scales have their own range and domain. We are following the definition of scales which was given by Mike Bostock: _scales are functions that map from an input domain to an output range_. If the domain or the range for the scale is not passed, it will be calculcated automatically according to the data.

Scales are visualized only in case if the appropriate property exists in the data object. For instance, if you want to visualize color, you should have `color` property in the chart.

All scale properties are prepended with the name of the attribute, for instance `xDomain` where `x` is an attribute and `Domiain` indicates a domain.


### Scale Properties

* `[name]Domain` (optional)
  Type: `Array`
  Array of values to visualize from. If domain is not passed, it will be calculated from the values which are passed to component.
* `[name]Range` (optional)
  Type: `Array`
  Array of real-world values to visualize to. If range is not passed, the defaults will be applied.
* `[name]Type` (optional)
  Type: `('log'|'linear'|'ordinal'|'time'\'category')`
  Default: `'linear'`
  Each scale type can be one of following values:
    * `'linear'`
    Continuous scale, that works with numbers, equal to d3.scale.linear.
    * `'ordinal'`
    Ordinal scale, works with numbers and strings. Equal to d3.scale.ordinal.
    * `'category'`
    Ordinal scale based on repetitions of the range. Equal to d3.scale.category\[Number\], but works with other values besides colors.
    * `'time'`
    Time scale. Equal to d3.time.scale.
    * `'log'`
    Log scale. Equal to d3.scale.log.



import HorizontalBarSeriesCanvas from 'plot/series/horizontal-bar-series-canvas';
import VerticalBarSeriesCanvas from 'plot/series/vertical-bar-series-canvas';
import HorizontalRectSeriesCanvas from 'plot/series/horizontal-rect-series-canvas';
import VerticalRectSeriesCanvas from 'plot/series/vertical-rect-series-canvas';
import RectSeriesCanvas from 'plot/series/rect-series-canvas';
import BarSeriesCanvas from 'plot/series/bar-series-canvas';
import {testRenderWithProps, GENERIC_XYPLOT_SERIES_PROPS} from '../test-utils';

testRenderWithProps(HorizontalBarSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalBarSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(HorizontalRectSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(VerticalRectSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(RectSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);
testRenderWithProps(BarSeriesCanvas, GENERIC_XYPLOT_SERIES_PROPS);

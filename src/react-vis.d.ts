declare module "react-vis" {

    export class AbstractSeries extends React.Component<PropsAbstractSeries> {

    }

    export class ArcSeries extends React.Component<PropsArcSeries> {

    }

    export class AreaSeries extends React.Component<PropsAreaSeries> {

    }

    export class Borders extends React.Component<PropsBorders> {

    }

    export class CircularGridLines extends React.Component<PropsCircularGridLines> {

    }

    export class ContourSeries extends React.Component<PropsContourSeries> {

    }

    export class Crosshair extends React.Component<PropsCrosshair> {

    }

    export class CustomSVGSeries extends React.Component<PropsCustomSVGSeries> {

    }

    export class DecorativeAxis extends React.Component<PropsDecorativeAxis> {

    }

    export class FlexibleHeightXYPlot extends React.Component<PropsFlexibleHeightXYPlot> {

    }

    export class Voronoi extends React.Component<PropsVoronoi> {

    }

    export class FlexibleWidthXYPlot extends React.Component<PropsFlexibleWidthXYPlot> {

    }

    export class FlexibleXYPlot extends React.Component<PropsFlexibleXYPlot> {
        
    }

    export class GradientDefs extends React.Component<PropsGradientDefs> {

    }

    export class GridLines extends React.Component<PropsGridLines> {

    }

    export class HeatmapSeries extends React.Component<PropsHeatmapSeries> {

    }

    export class Hint extends React.Component<PropsHint> {

        static ALIGN: {
            AUTO?: string;
            BOTTOM?: string;
            BOTTOM_EDGE?: string;
            LEFT?: string;
            LEFT_EDGE?: string;
            RIGHT?: string;
            RIGHT_EDGE?: string;
            TOP?: string;
            TOP_EDGE?: string;
        };

        static ORIENTATION: {
            BOTTOM_LEFT?: string;
            BOTTOM_RIGHT?: string;
            TOP_LEFT?: string;
            TOP_RIGHT?: string;

        };

    }

    export class HorizontalBarSeries extends React.Component<PropsHorizontalBarSeries> {

    }

    export class HorizontalBarSeriesCanvas extends React.Component<PropsHorizontalBarSeriesCanvas> {

    }

    export class HorizontalGridLines extends React.Component<PropsHorizontalGridLines> {

    }

    export class HorizontalRectSeries extends React.Component<PropsHorizontalRectSeries> {

    }

    export class HorizontalRectSeriesCanvas extends React.Component<PropsHorizontalRectSeriesCanvas> {

    }

    export class LabelSeries extends React.Component<PropsLabelSeries> {

    }

    export class LineMarkSeries extends React.Component<PropsLineMarkSeries> {

    }

    export class LineMarkSeriesCanvas extends React.Component<PropsLineMarkSeriesCanvas> {

    }

    export class LineSeries extends React.Component<PropsLineSeries> {

    }

    export class LineSeriesCanvas extends React.Component<PropsLineSeriesCanvas> {

    }

    export class MarkSeries extends React.Component<PropsMarkSeries> {

    }

    export class MarkSeriesCanvas extends React.Component<PropsMarkSeriesCanvas> {

    }

    export class ParallelCoordinates extends React.Component<PropsParallelCoordinates> {

    }

    export class PolygonSeries extends React.Component<PropsPolygonSeries> {

    }

    export class RadarChart extends React.Component<PropsRadarChart> {

    }

    export class RadialChart extends React.Component<PropsRadialChart> {

    }

    export class RectSeries extends React.Component<PropsRectSeries> {

    }

    export class RectSeriesCanvas extends React.Component<PropsRectSeriesCanvas> {

    }

    export class Sankey extends React.Component<PropsSankey> {

    }

    export class Sunburst extends React.Component<PropsSunburst> {

    }

    export class Treemap extends React.Component<PropsTreemap> {

    }

    export class VerticalBarSeries extends React.Component<PropsVerticalBarSeries> {

    }    

    export class VerticalGridLines extends React.Component<PropsVerticalGridLines> {

    }
    
    export class VerticalBarSeriesCanvas extends React.Component<PropsVerticalBarSeriesCanvas> {

    }

    export class VerticalRectSeries extends React.Component<PropsVerticalRectSeries> {

    }

    export class VerticalRectSeriesCanvas extends React.Component<PropsVerticalRectSeriesCanvas> {

    }

    export class WhiskerSeries extends React.Component<PropsWhiskerSeries> {

    }

    export class XAxis extends React.Component<PropsXAxis> {

    }

    export class XYPlot extends React.Component<PropsXYPlot> {
    }

    export class YAxis extends React.Component<PropsYAxis> {

    }

    export type PropsAbstractSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsArcSeries = {

        angleBaseValue?: any;

        angleDistance?: any;

        angleDomain?: any;

        angleRange?: any;

        angleType?: any;

        animation?: any;

        arcClassName?: any;

        center?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getAngle?: any;

        getAngle0?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getRadius?: any;

        getRadius0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        radiusBaseValue?: any;

        radiusDistance?: any;

        radiusDomain?: any;

        radiusRange?: any;

        radiusType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsAreaSeries = {
        fill?: string | number;

        opacity?: number;

        className?: string;

        getNull(d: any, i: number, array: number[]): any;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

        stroke?: number | string;

        color?: number | string;

    };

    export type PropsAxisUtils = {
        DIRECTION: {
            HORIZONTAL?: string;
            VERTICAL?: string;

        }

        ORIENTATION: {
            BOTTOM?: string;
            HORIZONTAL?: string;
            LEFT?: string;
            RIGHT?: string;
            TOP?: string;
            VERTICAL?: string;
        }

        getTickValues(scale?: any, tickTotal?: any, tickValues?: any): any;

        getTicksTotalFromSize(size?: any): any;

    };

    export type PropsBorders = {

        innerHeight?: any;

        innerWidth?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        style?: any;

    };

    export type PropsCircularGridLines = {

        animation?: any;

        centerX?: any;

        centerY?: any;

        height?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        rRange?: any;

        style?: any;

        tickTotal?: any;

        tickValues?: any;

        top?: any;

        width?: any;

    };

    export type PropsContinuousColorLegend = {

        displayName?: string;

        className?: any;

        endColor?: any;

        endTitle?: any;

        height?: any;

        midColor?: any;

        midTitle?: any;

        startColor?: any;

        startTitle?: any;

        width?: any;

    };

    export type PropsContinuousSizeLegend = {

        displayName?: string;

        circlesTotal?: any;

        className?: any;

        endSize?: any;

        endTitle?: any;

        height?: any;

        startSize?: any;

        startTitle?: any;

        width?: any;

    };

    export type PropsContourSeries = {

        animation?: any;

        bandwidth?: any;

        className?: any;

        data?: any;

        marginLeft?: any;

        marginTop?: any;

        style?: any;

    };

    export type PropsCrosshair = {

        className?: any;

        innerHeight?: any;

        innerWidth?: any;

        itemsFormat?: any;

        marginLeft?: any;

        marginTop?: any;

        orientation?: any;

        series?: any;

        style?: any;

        titleFormat?: any;

        values?: any;

    };

    export type PropsCustomSVGSeries = {

        animation?: any;

        className?: any;

        customComponent?: any;

        data?: any;

        marginLeft?: any;

        marginTop?: any;

        style?: any;

    };

    export type PropsDecorativeAxis = {

        className?: string;

        tickValue(d?: any): any;

        animation?: any;

        axisDomain?: any;

        axisEnd?: any;

        axisStart?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        numberOfTicks?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        tickSize?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;


    };

    export type PropsDiscreteColorLegend = {

        displayName?: string;

        className?: any;

        height?: any;

        items?: any;

        onItemClick?: any;

        onItemMouseEnter?: any;

        onItemMouseLeave?: any;

        orientation?: any;

        width?: any;

    };

    export type PropsFlexibleHeightXYPlot = {

        animation?: any;

        className?: any;

        dontCheckIfEmpty?: any;

        margin?: any;

        onClick?: any;

        onDoubleClick?: any;

        onMouseDown?: any;

        onMouseEnter?: any;

        onMouseLeave?: any;

        onMouseMove?: any;

        onWheel?: any;

        stackBy?: any;

        style?: any;

    };

    export type PropsFlexibleWidthXYPlot = {

        animation?: any;

        className?: any;

        dontCheckIfEmpty?: any;

        margin?: any;

        onClick?: any;

        onDoubleClick?: any;

        onMouseDown?: any;

        onMouseEnter?: any;

        onMouseLeave?: any;

        onMouseMove?: any;

        onWheel?: any;

        stackBy?: any;

        style?: any;

        xType?: any;

        xDomain?: any;

        yPadding?: any;

    };

    export type PropsFlexibleXYPlot = {

        animation?: any;

        className?: any;

        dontCheckIfEmpty?: any;

        margin?: any;

        onClick?: any;

        onDoubleClick?: any;

        onMouseDown?: any;

        onMouseEnter?: any;

        onTouchStart?: any;

        
        onTouchEnd?: any;

        onMouseUp?: any;

        onMouseLeave?: any;

        onMouseMove?: any;

        onWheel?: any;

        stackBy?: any;

        style?: any;        

        xType?: any;

        xDomain?: any;

        yDomain?: any;

        yPadding?: any;

        xPadding?: any;

        color?: string;

    };

    export type PropsGradientDefs = {

        className?: any;

    };

    export type PropsGridLines = {

        animation?: any;

        attr?: any;

        direction?: any;

        height?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        style?: any;

        tickTotal?: any;

        tickValues?: any;

        top?: any;

        width?: any;

    };

    export type PropsHeatmapSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsHint = {

        horizontalAlign?: string;

        verticalAlign?: string;

        
        align?: any;

        format?: any;

        getAlignStyle?: any;

        innerHeight?: any;

        innerWidth?: any;

        marginLeft?: any;

        marginTop?: any;

        orientation?: any;

        scales?: any;

        style?: any;

        value?: any;

    };

    export type PropsHorizontalBarSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsHorizontalBarSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsHorizontalGridLines = {

        displayName?: string;

        requiresSVG?: boolean;

        animation?: any;

        attr?: any;

        direction?: any;

        height?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        style?: any;

        tickTotal?: any;

        tickValues?: any;

        top?: any;

        width?: any;

    };

    export type PropsHorizontalRectSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsHorizontalRectSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsLabelSeries = {

        animation?: boolean;

        className?: string;

        rotation?: number;

        stack?: boolean;

        allowOffsetToBeReversed?: any;

        data?: any;

        marginLeft?: any;

        marginTop?: any;

        style?: any;

        xRange?: any;

        yRange?: any;

    };

    export type PropsLineMarkSeries = {

        className?: string;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        curve?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getNull?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        size?:number;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        lineStyle?: any;

        markStyle?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        strokeStyle?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

        strokeWidth?: number;

        color?: string;

    };

    export type PropsLineMarkSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsLineSeries = {

        className?: string;

        opacity?: number;

        stack?: boolean;

        strokeStyle?: string;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        curve?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getNull?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

        color?: any;

        strokeWidth?: string|number;

    };

    export type PropsLineSeriesCanvas = {

        size?: number;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        curve?: string;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        strokeWidth?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

        color?: string;

    };

    export type PropsMarkSeries = {
        size?: number;

        color?:any;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getNull?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;
        
        stroke?: string;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        strokeWidth?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsMarkSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsParallelCoordinates = {

        className?: string;

        colorRange?: string[];

        colorType?: string;

        animation?: any;

        data?: any;

        domains?: any;

        height?: any;

        margin?: any;

        showMarks?: any;

        style?: any;

        tickFormat?: any;

        width?: any;

    };

    export type PropsPolygonSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsRadarChart = {

        className?: string;

        colorRange?: string[];

        colorType?: string;

        hideInnerMostValues?: boolean;

        startingAngle?: number;

        animation?: any;

        data?: any;

        domains?: any;

        height?: any;

        margin?: any;

        style?: any;

        tickFormat?: any;

        width?: any;

    };

    export type PropsRadialChart = {

        className?: string;

        colorRange?: string[];

        colorType?: string;

        getAngle?(d?: any): any;

        getAngle0?(d?: any): any;

        getLabel?(d?: any): any;

        getRadius?(d?: any): any;

        getRadius0?(d?: any): any;

        getSubLabel?(d?: any): any;

        animation?: any;

        data?: any;

        height?: any;

        labelsAboveChildren?: any;

        labelsStyle?: any;

        margin?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        showLabels?: any;

        style?: any;

        subLabel?: any;

        width?: any;

    };

    export type PropsRectSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        linePosAttr?: any;

        lineSizeAttr?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        valuePosAttr?: any;

        valueSizeAttr?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsRectSeriesCanvas = {

        className?: string;

        stack?: boolean;

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsSankey = {

        align?: string;

        className?: string;

        hasVoronoi?: boolean;

        hideLabels?: boolean;

        layout?: number;

        height?: any;

        links?: any;

        margin?: any;

        nodePadding?: any;

        nodeWidth?: any;

        nodes?: any;

        onLinkClick?: any;

        onLinkMouseOut?: any;

        onLinkMouseOver?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        style?: any;

        width?: any;

    };

    export type PropsScaleUtils = {
        extractScalePropsFromProps?(props?: any, attributes?: any): any;

        getAttr0Functor?(props?: any, attr?: any): any;

        getAttributeFunctor?(props?: any, attr?: any): any;

        getAttributeScale?(props?: any, attr?: any): any;

        getAttributeValue?(props?: any, attr?: any): any;

        getDomainByAccessor?(allData?: any, accessor?: any, accessor0?: any, type?: any): any;

        getFontColorFromBackground?(background?: any): any;

        getMissingScaleProps?(props?: any, data?: any, attributes?: any): any;

        getOptionalScaleProps?(props?: any): any;

        getScaleObjectFromProps?(props?: any, attr?: any): any;

        getScalePropTypesByAttribute?(attr?: any): any;

        getXYPlotValues?(props?: any, children?: any): any;

        literalScale?(defaultValue?: any): any;

    };

    export type PropsSearchableDiscreteColorLegend = {
        displayName?: string;

        className?: string;

        searchText?: string;

        searchFn?(items?: any, s?: any): any;

        height?: any;

        items?: any;

        onItemClick?: any;

        onItemMouseEnter?: any;

        onItemMouseLeave?: any;

        onSearchChange?: any;

        orientation?: any;

        searchPlaceholder?: any;

        width?: any;

    };

    export type PropsSunburst = {

        className?: string;

        colorType?: string;

        hideRootNode?: boolean;

        getAngle?(d?: any): any;

        getAngle0?(d?: any): any;

        getColor?(d?: any): any;

        getLabel?(d?: any): any;

        getSize?(d?: any): any;

        animation?: any;

        data?: any;

        height?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        width?: any;

    };

    export type PropsTreemap = {

        className?: string;

        colorRange?: string[];

        data: {
            children?: any[];
        }

        hideRootNode?: boolean;

        animation?: any;

        getColor?: any;

        getSize?: any;

        height?: any;

        margin?: any;

        mode?: any;

        onLeafClick?: any;

        onLeafMouseOut?: any;

        onLeafMouseOver?: any;

        padding?: any;

        sortFunction?: any;

        useCirclePacking?: any;

        width?: any;

    };
    export type PropsVerticalBarSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsVerticalBarSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsVerticalGridLines = {

        attr?: string;
        direction?: string;

        displayName?: string;

        requiresSVG?: boolean;

        animation?: any;

        height?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        style?: any;

        tickTotal?: any;

        tickValues?: any;

        top?: any;

        width?: any;

    };

    export type PropsVerticalRectSeries = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsVerticalRectSeriesCanvas = {

        animation?: any;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsVoronoi = {

        requiresSVG?: boolean;

        className?: string;

        onBlur?(f?: any): any;

        onClick?(f?: any): any;

        onHover?(f?: any): any;

        onMouseDown?(f?: any): any;

        onMouseUp?(f?: any): any;

        x?(d?: any): any;

        y?(d?: any): any;

        extent?: any;

        nodes?: any;

    };

    export type PropsWhiskerSeries = {

        animation?: any;

        position?: string;

        colorBaseValue?: any;

        colorDistance?: any;

        colorDomain?: any;

        colorRange?: any;

        colorType?: any;

        data?: any;

        getColor?: any;

        getColor0?: any;

        getOpacity?: any;

        getOpacity0?: any;

        getSize?: any;

        getSize0?: any;

        getX?: any;

        getX0?: any;

        getY?: any;

        getY0?: any;

        height?: any;

        onNearestX?: any;

        onNearestXY?: any;

        onSeriesClick?: any;

        onSeriesMouseOut?: any;

        onSeriesMouseOver?: any;

        onSeriesRightClick?: any;

        onValueClick?: any;

        onValueMouseOut?: any;

        onValueMouseOver?: any;

        onValueRightClick?: any;

        opacityBaseValue?: any;

        opacityDistance?: any;

        opacityDomain?: any;

        opacityRange?: any;

        opacityType?: any;

        sizeBaseValue?: any;

        sizeDistance?: any;

        sizeDomain?: any;

        sizeRange?: any;

        sizeType?: any;

        stack?: any;

        strokeWidth?: any;

        style?: any;

        width?: any;

        xBaseValue?: any;

        xDistance?: any;

        xDomain?: any;

        xRange?: any;

        xType?: any;

        yBaseValue?: any;

        yDistance?: any;

        yDomain?: any;

        yRange?: any;

        yType?: any;

    };

    export type PropsXAxis = {

        attr?: string;
        attrAxis?: string;
        orientation?: string;

        position?: string;
        
        displayName?: string;

        requiresSVG?: boolean;

        className?: any;

        height?: any;

        hideLine?: any;

        hideTicks?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        on0?: any;

        style?: any;

        tickFormat?: any;

        tickLabelAngle?: any;

        tickPadding?: any;

        tickSize?: any;

        tickSizeInner?: any;

        tickSizeOuter?: any;

        tickTotal?: any;

        tickValues?: any;

        title?: any;

        top?: any;

        width?: any;

    };

    export type PropsXYPlot = {

        animation?: any;

        className?: any;

        dontCheckIfEmpty?: any;

        height?: any;

        margin?: any;

        onClick?: any;

        onDoubleClick?: any;

        onMouseDown?: any;

        onMouseEnter?: any;

        onMouseLeave?: any;

        onMouseMove?: any;

        onWheel?: any;

        stackBy?: any;

        style?: any;

        width?: any;

        xType?: any;

        xDomain?: any;

        xDistance?: any;

        xPadding?: any;

        xRange?: any;

        yPadding?: any;

        yRange?: any;

        yDomain?: any;

    };

    export type PropsXYPlotNameSpace = {

        animation?: any;

        className?: any;

        dontCheckIfEmpty?: any;

        height?: any;

        margin?: any;

        onClick?: any;

        onDoubleClick?: any;

        onMouseDown?: any;

        onMouseEnter?: any;

        onMouseLeave?: any;

        onMouseMove?: any;

        onWheel?: any;

        stackBy?: any;

        style?: any;

        width?: any;

    };

    export type PropsYAxis = {

        attr?: string;

        attrAxis?: string;

        orientation?: string;

        displayName?: string;

        requiresSVG?: boolean;

        className?: any;

        height?: any;

        hideLine?: any;

        hideTicks?: any;

        innerHeight?: any;

        innerWidth?: any;

        left?: any;

        marginBottom?: any;

        marginLeft?: any;

        marginRight?: any;

        marginTop?: any;

        on0?: any;

        style?: any;

        tickFormat?: any;

        tickLabelAngle?: any;

        tickPadding?: any;

        tickSize?: any;

        tickSizeInner?: any;

        tickSizeOuter?: any;

        tickTotal?: any;

        tickValues?: any;

        title?: any;

        top?: any;

        width?: any;

        position?: string;

    };

    export type PropsmakeHeightFlexible = {

    };

    export type PropsmakeVisFlexible = {

    };

    export type PropsmakeWidthFlexible = {

    };
   
}
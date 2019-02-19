import {
  Component,
  ComponentType,
  PureComponent,
  ReactChild,
  ReactNode,
  SFC,
  MouseEventHandler,
  TouchEventHandler,
  WheelEventHandler,
  FocusEventHandler,
  MouseEvent,
  CSSProperties,
} from 'react';

export interface AbstractSeriesPoint {
  [key: string]: any;
}

export type RVMouseEventHandler = MouseEventHandler<HTMLElement>;
export type RVTouchEventHandler = TouchEventHandler<HTMLElement>;
export type RVWheelEventHandler = WheelEventHandler<HTMLElement>;
export type RVFocusEventHandler = FocusEventHandler<HTMLElement>;

export type RVBrushEventHandler = (e?: { left: number; top: number; right: number; bottom: number }) => void;

export type RVSearchChangeEventHandler = (value: string) => void;

export type RVItemEventHandler = (item: any, index: number, event: MouseEvent<HTMLElement>) => void;

export type RVValueEventHandler<T extends AbstractSeriesPoint> = (datapoint: T, event: MouseEvent<HTMLElement>) => void;

export type RVNearestXData<T extends AbstractSeriesPoint> = {
  event: MouseEvent<HTMLElement>;
  innerX: T['x'];
  index: number;
}
export type RVNearestXEventHandler<T extends AbstractSeriesPoint> = (datapoint: T, data: RVNearestXData<T>) => void;

export type RVNearestXYData<T extends AbstractSeriesPoint> = {
  event: MouseEvent<HTMLElement>;
  innerX: T['x'];
  innerY: T['y'];
  index: number;
}
export type RVNearestXYEventHandler<T extends AbstractSeriesPoint> = (datapoint: T, data: RVNearestXYData<T>) => void;

export type RVGet<T extends AbstractSeriesPoint, K extends keyof T> = (datapoint: T) => T[K];
export type RVGetNull<T extends AbstractSeriesPoint> = (datapoint: T) => any;
export type RVGetAlignStyle = (align: { horizontal: string, vertical: string }, x: number, y: number) => CSSProperties;

export type RVTickFormat = (tick: any) => string;

export type RVItemsFormat = (values: Array<any>) => Array<{ value: any; title: any }>;
export type RVTitleFormat = (values: Array<any>) => { value: any; title: any } | undefined;

export type RVHintFormat = (value: { [key: string]: any }) => Array<{ value: any; title: any }>;

export type RVPadAngle = (...args: Array<any>) => number | undefined;

export type RVSearchFn = (items: Array<any>, searchText: string) => Array<any>;

export type RVSortFn<T extends AbstractSeriesPoint> = (a: T, b: T, accessor: (val: T) => number) => number;

export interface LineSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
  color?: string | number;
}

export interface LineMarkSeriesPoint extends AbstractSeriesPoint {
  x: string | number | Date;
  y: string | number | Date;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
  size?: string | number;
}

export interface MarkSeriesPoint extends AbstractSeriesPoint {
  x: string | number | Date;
  y: string | number | Date;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
  size?: string | number;
}

export interface HorizontalBarSeriesPoint extends AbstractSeriesPoint {
  x: string | number;
  y: string | number;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
}

export interface VerticalBarSeriesPoint extends AbstractSeriesPoint {
  x: string | number;
  y: number;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
}

export interface ArcSeriesPoint extends AbstractSeriesPoint {
  angle0: number;
  angle: number;
  radius0: number;
  radius: number;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
}

export interface AreaSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
  y0?: number;
}

export interface ContourSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
}

export interface HeatmapSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
  color?: string | number;
}

export interface LabelSeriesPoint extends AbstractSeriesPoint {
  x: string | number;
  y: string | number;
  label: string;
  xOffset?: number;
  yOffset?: number;
  rotation?: number;
  style?: CSSProperties;
}

export interface CustomSVGSeriesPoint extends AbstractSeriesPoint {
  x: string | number;
  y: string | number;
}

export interface PolygonSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
}

export interface RectSeriesPoint extends AbstractSeriesPoint {
  x: string | number | Date;
  x0: string | number | Date;
  y: string | number | Date;
  y0: string | number | Date;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  fill?: string | number;
}
export type HorizontalRectSeriesPoint = RectSeriesPoint;
export type VerticalRectSeriesPoint = RectSeriesPoint;

export interface WhiskerSeriesPoint extends AbstractSeriesPoint {
  x: string | number | Date;
  y: string | number | Date;
  color?: string | number;
  opacity?: string | number;
  stroke?: string | number;
  size?: string | number;
  xVariance?: string | number;
  yVariance?: string | number;
}


export interface TreemapPoint extends AbstractSeriesPoint {
  title: string;
  size: number;
  opacity?: number;
  color?: string | number;
  style: CSSProperties;
  children: Array<TreemapPoint>;
}


export interface ParallelCoordinatesPoint extends AbstractSeriesPoint {
  [key: string]: number;
}

export interface RadialChartPoint extends AbstractSeriesPoint {
  angle: number;
  radius?: number;
  label?: string;
  subLabel?: string;
  color?: string;
  style?: object;
  className?: string;
}

export interface SankeyPoint extends AbstractSeriesPoint {
  name: string;
  color?: string;
  opacity?: number;
  key?: string;
}

export interface SunburstPoint extends AbstractSeriesPoint {
  title: string;
  size: number;
  color?: number;
  label?: string;
  labelStyle?: CSSProperties;
  dontRotateLabel?: boolean;
  children?: Array<SunburstPoint>;
}

export interface VoronoiPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
}

export interface HexbinSeriesPoint extends AbstractSeriesPoint {
  x: number;
  y: number;
}

export interface DecorativeAxisPoint extends AbstractSeriesPoint { }
export interface RadarChartPoint extends AbstractSeriesPoint { }
export interface HighlightPoint extends AbstractSeriesPoint { }

export function makeVisFlexible<T>(component: ComponentType<T>): ComponentType<Pick<T, Exclude<keyof T, 'width'|'height'>>>;
export function makeHeightFlexible<T>(component: ComponentType<T>): ComponentType<Pick<T, Exclude<keyof T, 'height'>>>;
export function makeWidthFlexible<T>(component: ComponentType<T>): ComponentType<Pick<T, Exclude<keyof T, 'width'>>>;

export const AxisUtils: {
  DIRECTION: {
    VERTICAL: 'vertical';
    HORIZONTAL: 'horizontal';
  };
  ORIENTATION: {
    TOP: 'top';
    LEFT: 'left';
    RIGHT: 'right';
    BOTTOM: 'bottom';
    VERTICAL: 'vertical';
    HORIZONTAL: 'horizontal';
  };
  getTicksTotalFromSize: (size: number) => number;
  getTickValues: (scale: Function, tickTotal: number, tickValues?: Array<number | string>) => Array<number | string>;
};

export const ScaleUtils: {
  extractScalePropsFromProps: (props: AbstractSeriesProps<AbstractSeriesPoint>, attributes: Array<string>) => { [key: string]: any };
  getAttributeScale: (props: AbstractSeriesProps<AbstractSeriesPoint>, attr: string) => any;
  getAttributeFunctor: (props: AbstractSeriesProps<AbstractSeriesPoint>, attr: string) => any;
  getAttr0Functor: (props: AbstractSeriesProps<AbstractSeriesPoint>, attr: string) => any;
  getAttributeValue: (props: AbstractSeriesProps<AbstractSeriesPoint>, attr: string) => any;
  getDomainByAccessor: (allData: Array<any>, accessor: Function, accessor0: Function, type: string) => Array<any>;
  getFontColorFromBackground: (background?: string | null) => string | null;
  getMissingScaleProps: (props: AbstractSeriesProps<AbstractSeriesPoint>, data: Array<any>, attributes: Array<string>) => { [key: string]: any };
  getOptionalScaleProps: (props: AbstractSeriesProps<AbstractSeriesPoint>) => { [key: string]: any };
  getScaleObjectFromProps: (props: AbstractSeriesProps<AbstractSeriesPoint>, attr: string) => any;
  getScalePropTypesByAttribute: (attr: string) => { [key: string]: any };
  getXYPlotValues: (props: AbstractSeriesProps<AbstractSeriesPoint>, children: Array<ReactChild>) => { [key: string]: any };
  literalScale: (defaultValue: any) => any;
};

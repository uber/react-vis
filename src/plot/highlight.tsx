import React from 'react';
import { AbstractSeries, ScaleUtils } from 'plot/series/abstract-series';
import { ScaleUtils } from 'utils/scales-utils';


export default class Highlight extends AbstractSeries {
  public static defaultProps = {
    allow: 'x',
    color: 'rgb(77, 182, 172)',
    opacity: 0.3,
  };

  public displayName = 'HighlightOverlay';
  public state = {
    drawArea: { top: 0, right: 0, bottom: 0, left: 0 },
    drawing: false,
    startLocX: 0,
    startLocY: 0,
  }
  public constructor(props: any) {
    super(props);

    this.stopDrawing = this.stopDrawing.bind(this);
  }


  public _getDrawArea(xLoc: number, yLoc: number): any {
    const {marginLeft,marginTop, innerWidth, innerHeight } = this.props;
    const { startLocX, startLocY } = this.state;

    const leftBorder = xLoc < startLocX ? Math.max(xLoc, marginLeft) : startLocX;  
    const rightBorder = xLoc < startLocX ? startLocX : Math.min(xLoc, innerWidth-marginLeft);

    const topBorder = yLoc < startLocY ? Math.max(yLoc, marginTop) : startLocY;
    const bottomBorder = yLoc < startLocY ? startLocY : Math.min(yLoc, innerHeight-marginTop);

    return {
      bottom: bottomBorder,
      left: leftBorder,
      right: rightBorder,
      top: topBorder,
    };

  }

  public onParentMouseDown(e: any): void {
    const {onBrushStart } = this.props;
    let offsetX = e.nativeEvent.offsetX;
    let offsetY = e.nativeEvent.offsetY;
    if (e.nativeEvent.type === 'touchstart') {
      offsetX = e.nativeEvent.pageX;
      offsetY = e.nativeEvent.pageY;
    }
    const Xlocation = offsetX;
    const Ylocation = offsetY;

    // TODO: Eventually support drawing as a full rectangle, if desired. Currently the code supports 'x' only
    this.setState({
      drawArea: {
        bottom: Ylocation,
        left: Xlocation,
        right: Xlocation,
        top: Ylocation,
      },
      drawing: true,
      startLocX: Xlocation,
      startLocY: Ylocation,
    });

    if (onBrushStart) {
      onBrushStart(e);
    }
  }

  public onParentTouchStart(e: React.SyntheticEvent<any>): void {
    e.preventDefault();
    this.onParentMouseDown(e);
  }

  public stopDrawing(): void {
    // Quickly short-circuit if the user isn't drawing in our component
    if (!this.state.drawing) {
      return;
    }

    const { onBrushEnd } = this.props;
    const { drawArea } = this.state;
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    const yScale = ScaleUtils.getAttributeScale(this.props, 'y');

    // Clear the draw area
    this.setState({
      drawArea: { top: 0, right: 0, bottom: 0, left: 0 },
      drawing: false,
      startLoc: 0,
    });

    // Invoke the callback with null if the selected area was < 5px
    if (Math.abs(drawArea.right - drawArea.left) < 5 && Math.abs(drawArea.top - drawArea.bottom) < 5) {
      onBrushEnd(null);
      return;
    }

    // Compute the corresponding domain drawn
    const domainArea = {
      bottom: yScale.invert(drawArea.bottom),
      left: xScale.invert(drawArea.left),
      right: xScale.invert(drawArea.right),
      top: yScale.invert(drawArea.top),
    };

    if (onBrushEnd) {
      onBrushEnd(domainArea);
    }
  }

  public onParentMouseMove(e: any): void {
    const {  onBrush } = this.props;
    const { drawing } = this.state;
    let offsetX = e.nativeEvent.offsetX;
    let offsetY = e.nativeEvent.offsetY;
    if (e.nativeEvent.type === 'touchmove') {
      offsetX = e.nativeEvent.pageX;
      offsetY = e.nativeEvent.pageY;
    }
    const xLoc = offsetX;
    const yLoc = offsetY;

    if (drawing) {
      const newDrawArea = this._getDrawArea(xLoc, yLoc);
      this.setState({ drawArea: newDrawArea });

      if (onBrush) {
        onBrush(e);
      }
    }
  }

  public onParentTouchMove(e: React.SyntheticEvent<MouseEvent>): void {
    e.preventDefault();
    this.onParentMouseMove(e);
  }

  public render(): React.ReactNode {
    const { innerWidth, innerHeight, color, opacity, marginBottom } = this.props;
    const { drawArea: { left, right, top, bottom } } = this.state;

    return (
      <g transform={`translate(${0}, ${0})`}
        className="highlight-container"
        onMouseUp={this.stopDrawing}
        onMouseLeave={this.stopDrawing}
        // preventDefault() so that mouse event emulation does not happen
        onTouchEnd={this.stopDrawing}
        onTouchCancel={this.handleTouch}
      >
        <rect
          className="mouse-target"
          fill="black"
          opacity="0"
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight-marginBottom}
        />
        <rect
          className="highlight"
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={left}
          y={top}
          width={right - left}
          height={bottom - top}
        />
      </g>
    );
  }
  public handleTouch(e: any): void {
    e.preventDefault();
    this.stopDrawing();
  }
}

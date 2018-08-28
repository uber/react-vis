import React from 'react';
import AbstractSeries from './series/abstract-series';
import {getAttributeScale} from 'utils/scales-utils';
import PropTypes from 'prop-types';

class Highlight extends AbstractSeries {
  state = {
    dragging: false,
    drawArea: {top: 0, right: 0, bottom: 0, left: 0},
    drawing: false,
    startLocX: 0,
    startLocY: 0
  };

  _getDrawArea(xLoc, yLoc) {
    const {startLocX, startLocY} = this.state;
    const {allow, innerWidth, innerHeight, marginLeft, marginRight, marginBottom, marginTop} = this.props;
    const plotHeight = innerHeight + marginTop + marginBottom;
    const plotWidth = innerWidth + marginLeft + marginRight;

    return {
      bottom: allow.includes('y') ? Math.max(startLocY, yLoc) : plotHeight,
      left: allow.includes('x') ? Math.min(xLoc, startLocX) : 0,
      right: allow.includes('x') ? Math.max(startLocX, xLoc) : plotWidth,
      top: allow.includes('y') ? Math.min(yLoc, startLocY) : 0
    };
  }

  _getDragArea(xLoc, yLoc) {
    const {marginLeft, marginTop, innerWidth, innerHeight} = this.props;
    const {startLocX, startLocY} = this.state;
    // i have a feel this is wrong
    return {
      bottom: Math.max(marginTop, Math.min(yLoc, innerHeight - marginTop)),
      left: startLocX,
      right: Math.max(marginLeft, Math.min(xLoc, innerWidth - marginLeft)),
      top: startLocY
    };
  }

  _convertAreaToCoordinates(drawArea) {
    const {marginLeft} = this.props;
    const xScale = getAttributeScale(this.props, 'x');
    const yScale = getAttributeScale(this.props, 'y');
    // NOTE only continuous scales are supported for this dragger
    return {
      bottom: yScale.invert(drawArea.bottom),
      left: xScale.invert(drawArea.left - marginLeft),
      right: xScale.invert(drawArea.right - marginLeft),
      top: yScale.invert(drawArea.top)
    };
  }

  onParentMouseDown(e) {
    const {onBrushStart, onDragStart} = this.props;
    const evt = e.nativeEvent;
    const xLoc = evt.type === 'touchstart' ? evt.pageX : evt.offsetX;
    const yLoc = evt.type === 'touchstart' ? evt.pageY : evt.offsetY;
    const startArea = dragging => {
      this.setState({
        dragging,
        drawArea: {
          bottom: yLoc,
          left: xLoc,
          right: xLoc,
          top: yLoc
        },
        drawing: !dragging,
        startLocX: xLoc,
        startLocY: yLoc
      });
    };
    if (e.nativeEvent.button === 0) {
      startArea(false);

      if (onBrushStart) {
        onBrushStart(e);
      }
    } else if (e.nativeEvent.button === 2) {
      e.preventDefault();
      startArea(true);
      if (onDragStart) {
        onDragStart();
      }
    }

  }

  onParentTouchStart(e) {
    e.preventDefault();
    this.onParentMouseDown(e);
  }

  stopDrawing() {
    const {drawing, dragging, drawArea} = this.state;
    // Quickly short-circuit if the user isn't drawing in our component
    if (!drawing && !dragging) {
      return;
    }

    const {onBrushEnd, onDragEnd} = this.props;

    // Clear the draw area
    this.setState({
      drawing: false,
      dragging: false,
      drawArea: {top: 0, right: 0, bottom: 0, left: 0},
      startLocX: 0,
      startLocY: 0
    });

    if (drawing && onBrushEnd) {
      // Invoke the callback with null if the selected area was < 5px
      const noHorizontal = Math.abs(drawArea.right - drawArea.left) < 5;
      const noVertical = Math.abs(drawArea.top - drawArea.bottom) < 5;
      const isNulled = noVertical && noHorizontal;
      onBrushEnd(!isNulled ? this._convertAreaToCoordinates(drawArea) : null);
    } else if (dragging && onDragEnd) {
      onDragEnd();
    }
  }

  onParentMouseMove(e) {
    const {onBrush, onDrag} = this.props;
    const {drawing, dragging} = this.state;
    const evt = e.nativeEvent;
    const xLoc = evt.type === 'touchstart' ? evt.pageX : evt.offsetX;
    const yLoc = evt.type === 'touchstart' ? evt.pageY : evt.offsetY;

    if (drawing) {
      const newDrawArea = this._getDrawArea(xLoc, yLoc);
      this.setState({drawArea: newDrawArea});

      if (onBrush) {
        onBrush(this._convertAreaToCoordinates(newDrawArea));
      }
    } else if (dragging) {
      const newDrawArea = this._getDragArea(xLoc, yLoc);
      this.setState({startLocX: xLoc, startLocY: yLoc});
      if (onDrag) {
        onDrag(this._convertAreaToCoordinates(newDrawArea));
      }
    }
  }

  onParentTouchMove(e) {
    e.preventDefault();
    this.onParentMouseMove(e);
  }

  render() {
    const {
      color,
      innerWidth,
      innerHeight,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      opacity
    } = this.props;
    const {drawArea: {left, right, top, bottom}} = this.state;

    return (
      <g
        className="rv-highlight-container"
        onMouseUp={() => this.stopDrawing()}
        onMouseLeave={() => this.stopDrawing()}
        // preventDefault() so that mouse event emulation does not happen
        onTouchEnd={e => {
          e.preventDefault();
          this.stopDrawing();
        }}
        onTouchCancel={e => {
          e.preventDefault();
          this.stopDrawing();
        }}
        onContextMenu={e => e.preventDefault()}
        onContextMenuCapture={e => e.preventDefault()}
        >
        <rect
          className="rv-mouse-target"
          fill="black"
          opacity="0.5"
          x={0}
          y={0}
          width={Math.max((marginLeft + marginRight) + innerWidth, 0)}
          height={Math.max((marginTop + marginBottom) + innerHeight, 0)}
        />
        <rect
          className="rv-highlight"
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={left}
          y={top}
          width={Math.max(0, right - left)}
          height={Math.max(0, bottom - top)}
        />
      </g>
    );
  }
}

Highlight.displayName = 'HighlightOverlay';
Highlight.defaultProps = {
  allow: ['x', 'y'],
  color: 'rgb(77, 182, 172)',
  opacity: 0.3
};

Highlight.propTypes = {
  ...AbstractSeries.propTypes,
  allow: PropTypes.arrayOf(PropTypes.oneOf(['x', 'y'])),
  onBrushStart: PropTypes.func,
  onDragStart: PropTypes.func,
  onBrush: PropTypes.func,
  onDrag: PropTypes.func,
  onBrushEnd: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default Highlight;

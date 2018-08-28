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
    const {marginLeft, marginTop, innerWidth, innerHeight} = this.props;
    const {startLocX, startLocY} = this.state;

    const leftBorder = xLoc < startLocX ? Math.max(xLoc, marginLeft) : startLocX;
    const rightBorder = xLoc < startLocX ? startLocX : Math.min(xLoc, innerWidth - marginLeft);

    const topBorder = yLoc < startLocY ? Math.max(yLoc, marginTop) : startLocY;
    const bottomBorder = yLoc < startLocY ? startLocY : Math.min(yLoc, innerHeight - marginTop);

    return {
      bottom: bottomBorder,
      left: leftBorder,
      right: rightBorder,
      top: topBorder
    };
  }

  _getDragArea(xLoc, yLoc) {
    const {marginLeft, marginTop, innerWidth, innerHeight} = this.props;
    const {startLocX, startLocY} = this.state;

    const leftBorder = startLocX;
    const rightBorder = Math.max(marginLeft, Math.min(xLoc, innerWidth - marginLeft));

    const topBorder = startLocY;
    const bottomBorder = Math.max(marginTop, Math.min(yLoc, innerHeight - marginTop));

    return {
      bottom: bottomBorder,
      left: leftBorder,
      right: rightBorder,
      top: topBorder
    };
  }

  onParentMouseDown(e) {
    const {onBrushStart, onDragStart, allow} = this.props;
    let Xlocation = e.nativeEvent.offsetX;
    let Ylocation = e.nativeEvent.offsetY;
    if (e.nativeEvent.type === 'touchstart') {
      Xlocation = e.nativeEvent.pageX;
      Ylocation = e.nativeEvent.pageY;
    }
    if (e.nativeEvent.button === 0) {
      this.setState({
        dragging: false,
        drawArea: {
          bottom: Ylocation,
          left: Xlocation,
          right: Xlocation,
          top: Ylocation
        },
        drawing: true,
        startLocX: Xlocation,
        startLocY: Ylocation
      });

      if (onBrushStart) {
        onBrushStart(e);
      }
    } else if (e.nativeEvent.button === 2) {
      e.preventDefault();
      this.setState({
        dragging: true,
        drawArea: {
          bottom: Ylocation,
          left: Xlocation,
          right: Xlocation,
          top: Ylocation
        },
        drawing: false,
        startLocX: Xlocation,
        startLocY: Ylocation
      });
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
    // Quickly short-circuit if the user isn't drawing in our component
    if (!this.state.drawing && !this.state.dragging) {
      return;
    }

    const {onBrushEnd, onDragEnd, marginLeft} = this.props;
    const {drawArea} = this.state;
    const xScale = getAttributeScale(this.props, 'x');
    const yScale = getAttributeScale(this.props, 'y');

    // Clear the draw area
    this.setState({
      drawing: false,
      dragging: false,
      drawArea: {top: 0, right: 0, bottom: 0, left: 0},
      startLocX: 0,
      startLocY: 0
    });

    if (this.state.drawing) {
      // Invoke the callback with null if the selected area was < 5px

      const noHorizontal = Math.abs(drawArea.right - drawArea.left) < 5;
      const noVertical = Math.abs(drawArea.top - drawArea.bottom) < 5;
      if (onBrushEnd && noHorizontal && noVertical) {
        onBrushEnd(null);
        return;
      }
      // Compute the corresponding domain drawn
      const domainArea = {
        bottom: yScale.invert(drawArea.bottom),
        left: xScale.invert(drawArea.left - marginLeft),
        right: xScale.invert(drawArea.right - marginLeft),
        top: yScale.invert(drawArea.top)
      };

      if (onBrushEnd) {
        onBrushEnd(domainArea);
      }
    } else if (this.state.dragging && onDragEnd) {
      onDragEnd();
    }
  }

  onParentMouseMove(e) {
    const {onBrush, onDrag} = this.props;
    const {drawing, dragging} = this.state;
    let xLoc = e.nativeEvent.offsetX;
    let yLoc = e.nativeEvent.offsetY;
    if (e.nativeEvent.type === 'touchmove') {
      xLoc = e.nativeEvent.pageX;
      yLoc = e.nativeEvent.pageY;
    }

    if (drawing) {
      const newDrawArea = this._getDrawArea(xLoc, yLoc);
      this.setState({drawArea: newDrawArea});

      if (onBrush) {
        onBrush(e);
      }
    } else if (dragging) {
      const newDrawArea = this._getDragArea(xLoc, yLoc);
      if (onDrag) {
        const xScale = getAttributeScale(this.props, 'x');
        const yScale = getAttributeScale(this.props, 'y');
        const domainArea = {
          bottom: yScale.invert(newDrawArea.bottom),
          left: xScale.invert(newDrawArea.left),
          right: xScale.invert(newDrawArea.right),
          top: yScale.invert(newDrawArea.top)
        };
        this.setState({
          startLocX: xLoc,
          startLocY: yLoc
        });

        if (onDrag) {
          onDrag(domainArea);
        }
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
      coverArea,
      innerWidth,
      innerHeight,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      opacity
    } = this.props;
    const {drawArea: {left, right, top, bottom}} = this.state;
    console.log(right - left)
    return (
      <g className="rv-highlight-container"
         onMouseUp={() => this.stopDrawing()}
         onMouseLeave={() => this.stopDrawing()}
         // preventDefault() so that mouse event emulation does not happen
         onTouchEnd={(e) => {
           e.preventDefault();
           this.stopDrawing();
         }}
         onTouchCancel={(e) => {
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
          x={coverArea ? 0 : Math.max(0, marginLeft)}
          y={0}
          width={(coverArea ? (marginLeft + marginRight) : 0) + innerWidth}
          height={Math.max(0, (coverArea ? (marginTop + marginBottom) : 0) + innerHeight)}
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
  onBrushStart: PropTypes.func,
  onDragStart: PropTypes.func,
  allow: PropTypes.arrayOf(PropTypes.oneOf(['x', 'y']))
};

export default Highlight;

import React from 'react';
import PropTypes from 'prop-types';

import AbstractSeries from './series/abstract-series';
import {getAttributeScale} from 'utils/scales-utils';
import {getCombinedClassName} from 'utils/styling-utils';

function getLocs(evt) {
  // const xLoc = evt.type === 'touchstart' ? evt.pageX : evt.offsetX;
  // const yLoc = evt.type === 'touchstart' ? evt.pageY : evt.offsetY;
  const xLoc = evt.offsetX ?? evt.pageX;
  const yLoc = evt.offsetY ?? evt.pageY;
  return {xLoc, yLoc};
}

class Highlight extends AbstractSeries {
  state = {
    dragging: false,
    brushArea: {top: 0, right: 0, bottom: 0, left: 0},
    brushing: false,
    startLocX: 0,
    startLocY: 0,
    dragArea: null
  };
  ref = React.createRef();
  _getDrawArea(xLoc, yLoc) {
    const {startLocX, startLocY} = this.state;
    const {
      enableX,
      enableY,
      highlightWidth,
      highlightHeight,
      innerWidth,
      innerHeight,
      marginLeft,
      marginRight,
      marginBottom,
      marginTop
    } = this.props;
    const plotHeight = innerHeight + marginTop + marginBottom;
    const plotWidth = innerWidth + marginLeft + marginRight;
    const touchWidth = highlightWidth || plotWidth;
    const touchHeight = highlightHeight || plotHeight;

    return {
      bottom: enableY ? Math.max(startLocY, yLoc) : touchHeight,
      right: enableX ? Math.max(startLocX, xLoc) : touchWidth,
      left: enableX ? Math.min(xLoc, startLocX) : 0,
      top: enableY ? Math.min(yLoc, startLocY) : 0
    };
  }

  _getDragArea(xLoc, yLoc) {
    const {enableX, enableY} = this.props;
    const {startLocX, startLocY, dragArea} = this.state;

    return {
      bottom: dragArea.bottom + (enableY ? yLoc - startLocY : 0),
      left: dragArea.left + (enableX ? xLoc - startLocX : 0),
      right: dragArea.right + (enableX ? xLoc - startLocX : 0),
      top: dragArea.top + (enableY ? yLoc - startLocY : 0)
    };
  }

  _clickedOutsideDrag(xLoc, yLoc) {
    const {enableX, enableY} = this.props;
    const {
      dragArea,
      brushArea: {left, right, top, bottom}
    } = this.state;
    const clickedOutsideDragX = dragArea && (xLoc < left || xLoc > right);
    const clickedOutsideDragY = dragArea && (yLoc < top || yLoc > bottom);
    if (enableX && enableY) {
      return clickedOutsideDragX || clickedOutsideDragY;
    }
    if (enableX) {
      return clickedOutsideDragX;
    }
    if (enableY) {
      return clickedOutsideDragY;
    }
    return true;
  }

  _convertAreaToCoordinates(brushArea) {
    // NOTE only continuous scales are supported for brushing/getting coordinates back
    const {enableX, enableY, marginLeft, marginTop} = this.props;
    const xScale = getAttributeScale(this.props, 'x');
    const yScale = getAttributeScale(this.props, 'y');

    // Ensure that users wishes are being respected about which scales are evaluated
    // this is specifically enabled to ensure brushing on mixed categorical and linear
    // charts will run as expected

    if (enableX && enableY) {
      return {
        bottom: yScale.invert(brushArea.bottom),
        left: xScale.invert(brushArea.left - marginLeft),
        right: xScale.invert(brushArea.right - marginLeft),
        top: yScale.invert(brushArea.top)
      };
    }

    if (enableY) {
      return {
        bottom: yScale.invert(brushArea.bottom - marginTop),
        top: yScale.invert(brushArea.top - marginTop)
      };
    }

    if (enableX) {
      return {
        left: xScale.invert(brushArea.left - marginLeft),
        right: xScale.invert(brushArea.right - marginLeft)
      };
    }

    return {};
  }

  _captureMouse = e => {
    console.log('capture', e.type, e.target, e);

    document.addEventListener('mouseup', this.stopBrushing, {capture: true});
    document.addEventListener('mousemove', this.onBrush, {capture: true});
    // document.body.style['pointer-events'] = 'none';

    if (this.ref.current) {
      this.ref.current.addEventListener('mouseleave', this._mouseLeave, {
        capture: true
      });
    }

    e.preventDefault();
    e.stopPropagation();
    // this.startBrushing(e);
  };

  _releaseMouse = e => {
    console.log('release', e.type, e.target, e);

    document.removeEventListener('mouseup', this.stopBrushing, {capture: true});
    document.removeEventListener('mousemove', this.onBrush, {capture: true});

    if (this.ref.current) {
      this.ref.current.removeEventListener('mouseleave', this._mouseLeave, {
        capture: true
      });
    }
    // document.body.style['pointer-events'] = 'auto';
    e.stopPropagation();
  };

  _mouseLeave = e => {
    const {toElement} = e;
    if (toElement === document.documentElement) {
      this.stopBrushing(e);
      return;
    }
    if (toElement === this.ref.current.parentNode.parentNode) {
      this.stopBrushing(e);
      return;
    }
    console.log('didnt really leave', toElement, this.ref.current.parentNode);
    // this.ref.current.
  };

  startBrushing = e => {
    // e.preventDefault();
    this._captureMouse(e);
    const {onBrushStart, onDragStart, drag} = this.props;
    const {dragArea} = this.state;
    const {xLoc, yLoc} = getLocs(e);
    console.log(
      'start',
      xLoc,
      yLoc,
      e.type,
      e.offsetX,
      e.offsetY,
      e.pageX,
      e.pageY
    );

    const startArea = (dragging, resetDrag) => {
      const emptyBrush = {
        bottom: yLoc,
        left: xLoc,
        right: xLoc,
        top: yLoc
      };
      this.setState({
        dragging,
        brushArea: dragArea && !resetDrag ? dragArea : emptyBrush,
        brushing: !dragging,
        startLocX: xLoc,
        startLocY: yLoc
      });
    };

    const clickedOutsideDrag = this._clickedOutsideDrag(xLoc, yLoc);
    if ((drag && !dragArea) || !drag || clickedOutsideDrag) {
      startArea(false, clickedOutsideDrag);

      if (onBrushStart) {
        onBrushStart(e);
      }
      return;
    }

    if (drag && dragArea) {
      startArea(true, clickedOutsideDrag);
      if (onDragStart) {
        onDragStart(e);
      }
    }
  };

  stopBrushing = e => {
    if (e.toElement === document.documentElement) {
      console.log('is document');
      // return;
    }
    console.log(
      'stop',
      e.type,
      e.target,
      e.currentTarget,
      e.toElement,
      document,
      e
    );
    this._releaseMouse(e);
    const {brushing, dragging, brushArea} = this.state;
    // Quickly short-circuit if the user isn't brushing in our component
    if (!brushing && !dragging) {
      return;
    }
    const {onBrushEnd, onDragEnd, drag} = this.props;
    const noHorizontal = Math.abs(brushArea.right - brushArea.left) < 5;
    const noVertical = Math.abs(brushArea.top - brushArea.bottom) < 5;
    // Invoke the callback with null if the selected area was < 5px
    const isNulled = noVertical || noHorizontal;
    // Clear the draw area
    this.setState({
      brushing: false,
      dragging: false,
      brushArea: drag ? brushArea : {top: 0, right: 0, bottom: 0, left: 0},
      startLocX: 0,
      startLocY: 0,
      dragArea: drag && !isNulled && brushArea
    });

    if (brushing && onBrushEnd) {
      onBrushEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
    }

    if (drag && onDragEnd) {
      onDragEnd(!isNulled ? this._convertAreaToCoordinates(brushArea) : null);
    }
  };

  onBrush = e => {
    e.preventDefault();
    e.stopPropagation();
    const {onBrush, onDrag, drag} = this.props;
    const {brushing, dragging} = this.state;
    const {xLoc, yLoc} = getLocs(e);
    // console.log('brush', xLoc, yLoc);
    if (brushing) {
      const brushArea = this._getDrawArea(xLoc, yLoc);
      // console.log('brush area', brushArea);
      this.setState({brushArea});

      if (onBrush) {
        onBrush(this._convertAreaToCoordinates(brushArea));
      }
    }

    if (drag && dragging) {
      const brushArea = this._getDragArea(xLoc, yLoc);
      this.setState({brushArea});
      if (onDrag) {
        onDrag(this._convertAreaToCoordinates(brushArea));
      }
    }
  };

  render() {
    const {
      color,
      className,
      highlightHeight,
      highlightWidth,
      highlightX,
      highlightY,
      innerWidth,
      innerHeight,
      marginLeft,
      marginRight,
      marginTop,
      marginBottom,
      opacity
    } = this.props;
    const {
      brushArea: {left, right, top, bottom}
    } = this.state;

    let leftPos = 0;
    if (highlightX) {
      const xScale = getAttributeScale(this.props, 'x');
      leftPos = xScale(highlightX);
    }

    let topPos = 0;
    if (highlightY) {
      const yScale = getAttributeScale(this.props, 'y');
      topPos = yScale(highlightY);
    }

    const plotWidth = marginLeft + marginRight + innerWidth;
    const plotHeight = marginTop + marginBottom + innerHeight;
    const touchWidth = highlightWidth || plotWidth;
    const touchHeight = highlightHeight || plotHeight;

    return (
      <g
        transform={`translate(${leftPos}, ${topPos})`}
        className={getCombinedClassName(className, 'rv-highlight-container')}
      >
        <rect
          ref={this.ref}
          className="rv-mouse-target"
          fill="black"
          opacity="0"
          x="0"
          y="0"
          width={Math.max(touchWidth, 0)}
          height={Math.max(touchHeight, 0)}
          onMouseDownCapture={e => this.startBrushing(e.nativeEvent)}
          // onMouseMoveCapture={e => this.onBrush(e)}
          // onMouseUpCapture={e => this.stopBrushing(e)}
          // onMouseLeave={e => {
          //   console.log(
          //     'mouse leave',
          //     e.target,
          //     e.currentTarget,
          //     getLocs(e.nativeEvent)
          //   );
          //   // this._releaseMouse(e);
          //   // this.stopBrushing(e);
          // }}
          // preventDefault() so that mouse event emulation does not happen
          // onTouchEnd={e => {
          //   e.preventDefault();
          //   this.stopBrushing(e);
          // }}
          // onTouchCancel={e => {
          //   e.preventDefault();
          //   this.stopBrushing(e);
          // }}
          onContextMenu={e => e.preventDefault()}
          onContextMenuCapture={e => e.preventDefault()}
        />
        <rect
          className="rv-highlight"
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={left}
          y={top}
          width={Math.min(Math.max(0, right - left), touchWidth)}
          height={Math.min(Math.max(0, bottom - top), touchHeight)}
        />
      </g>
    );
  }
}

Highlight.displayName = 'HighlightOverlay';
Highlight.defaultProps = {
  color: 'rgb(77, 182, 172)',
  className: '',
  enableX: true,
  enableY: true,
  opacity: 0.3
};

Highlight.propTypes = {
  ...AbstractSeries.propTypes,
  enableX: PropTypes.bool,
  enableY: PropTypes.bool,
  highlightHeight: PropTypes.number,
  highlightWidth: PropTypes.number,
  highlightX: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  highlightY: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onBrushStart: PropTypes.func,
  onDragStart: PropTypes.func,
  onBrush: PropTypes.func,
  onDrag: PropTypes.func,
  onBrushEnd: PropTypes.func,
  onDragEnd: PropTypes.func
};

export default Highlight;

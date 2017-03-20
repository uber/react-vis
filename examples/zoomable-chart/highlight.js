/* @flow */
import React from 'react';
import {ScaleUtils, AbstractSeries} from 'react-vis';
import window from 'global';

export default class Highlight extends AbstractSeries {

  static get requiresSVG() {
    return true;
  }

  static displayName = 'HighlightOverlay';
  static defaultProps = {
    allow: 'x',
    color: 'rgb(77, 182, 172)',
    opacity: 0.3
  };

  constructor(props) {
    super(props);
    this.state = {
      drawing: false,
      drawArea: {t: 0, r: 0, b: 0, l: 0},
      startLoc: 0
    };
    this._onMouseUp = () => this.onMouseUp();
  }

  componentDidMount() {
    window.addEventListener('mouseup', this._onMouseUp);
  }

  componentWillUnmount() {
    window.removeEventListener('mouseup', this._onMouseUp);
  }

  onParentMouseDown(e) {
    const {marginLeft, innerHeight, onMouseDown} = this.props;
    const location = e.nativeEvent.offsetX - marginLeft;

    // TODO: Eventually support drawing as a full rectangle, if desired. Currently the code supports 'x' only
    this.setState({
      drawing: true,
      drawArea: {
        t: 0,
        r: location,
        b: innerHeight,
        l: location
      },
      startLoc: location
    });

    if (onMouseDown) {
      onMouseDown(e);
    }
  }

  onMouseUp() {
    // Quickly short-circuit if the user isn't drawing in our component
    if (!this.state.drawing) {
      return;
    }

    const {onDrawEnd} = this.props;
    const {drawArea} = this.state;
    const xScale = ScaleUtils.getAttributeScale(this.props, 'x');
    const yScale = ScaleUtils.getAttributeScale(this.props, 'y');

    // Clear the draw area
    this.setState({
      drawing: false,
      drawArea: {t: 0, r: 0, b: 0, l: 0},
      startLoc: 0
    });

    // Invoke the callback with null if the selected area was < 5px
    if (Math.abs(drawArea.r - drawArea.l) < 5) {
      onDrawEnd(null);
      return;
    }

    // Compute the corresponding domain drawn
    const domainArea = {
      t: yScale.invert(drawArea.t),
      r: xScale.invert(drawArea.r),
      b: yScale.invert(drawArea.b),
      l: xScale.invert(drawArea.l)
    };

    if (onDrawEnd) {
      onDrawEnd(domainArea);
    }
  }

  onParentMouseMove(e) {
    const {innerWidth, marginLeft, onMouseMove} = this.props;
    const {drawArea, startLoc, drawing} = this.state;
    const loc = e.nativeEvent.offsetX - marginLeft;

    if (drawing) {
      let newDrawArea = {};

      // Update the left or right edge of the rectangle depending on what side of the initial click they are on
      if (loc < startLoc) {
        newDrawArea = {
          ...drawArea,
          l: Math.max(loc, 0),
          r: startLoc
        };
      } else {
        newDrawArea = {
          ...drawArea,
          r: Math.min(loc, innerWidth),
          l: startLoc
        };
      }
      this.setState({drawArea: newDrawArea});

      if (onMouseMove) {
        onMouseMove(e);
      }
    }
  }

  render() {
    const {marginLeft, marginTop, color, opacity} = this.props;
    const {drawArea: {l, r, t, b}} = this.state;

    return (
      <g transform={`translate(${marginLeft}, ${marginTop})`} style={{cursor: 'crosshair'}}>
        <rect
          pointerEvents="none"
          opacity={opacity}
          fill={color}
          x={l}
          y={t}
          width={r - l}
          height={b}
        ></rect>
      </g>
    );
  }
}

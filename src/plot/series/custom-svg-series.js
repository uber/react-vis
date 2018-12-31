// Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import PropTypes from 'prop-types';

import AbstractSeries from './abstract-series';
import Animation from 'animation';
import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';

const predefinedClassName =
  'rv-xy-plot__series rv-xy-plot__series--custom-svg-wrapper';

const DEFAULT_STYLE = {
  stroke: 'blue',
  fill: 'blue'
};

function predefinedComponents(type, size = 2, style = DEFAULT_STYLE) {
  switch (type) {
    case 'diamond':
      return (
        <polygon
          style={style}
          points={`0 0 ${size / 2} ${size / 2} 0 ${size} ${-size / 2} ${size /
            2} 0 0`}
        />
      );
    case 'star':
      const starPoints = [...new Array(5)]
        .map((c, index) => {
          const angle = index / 5 * Math.PI * 2;
          const innerAngle = angle + Math.PI / 10;
          const outerAngle = angle - Math.PI / 10;
          // ratio of inner polygon to outer polgyon
          const innerRadius = size / 2.61;
          return `
        ${Math.cos(outerAngle) * size} ${Math.sin(outerAngle) * size}
        ${Math.cos(innerAngle) * innerRadius} ${Math.sin(innerAngle) *
            innerRadius}
      `;
        })
        .join(' ');
      return (
        <polygon
          points={starPoints}
          x="0"
          y="0"
          height={size}
          width={size}
          style={style}
        />
      );
    case 'square':
      return (
        <rect
          x={`${-size / 2}`}
          y={`${-size / 2}`}
          height={size}
          width={size}
          style={style}
        />
      );
    default:
    case 'circle':
      return <circle cx="0" cy="0" r={size / 2} style={style} />;
  }
}

function getInnerComponent({
  customComponent,
  defaultType,
  positionInPixels,
  positionFunctions,
  style,
  propsSize
}) {
  const {size} = customComponent;
  const aggStyle = {...style, ...(customComponent.style || {})};
  const innerComponent = customComponent.customComponent;
  if (!innerComponent && typeof defaultType === 'string') {
    return predefinedComponents(defaultType, size || propsSize, aggStyle);
  }
  // if default component is a function
  if (!innerComponent) {
    return defaultType(customComponent, positionInPixels, aggStyle);
  }
  if (typeof innerComponent === 'string') {
    return predefinedComponents(innerComponent || defaultType, size, aggStyle);
  }
  // if inner component is a function
  return innerComponent(customComponent, positionInPixels, aggStyle);
}

class CustomSVGSeries extends AbstractSeries {
  render() {
    const {
      animation,
      className,
      customComponent,
      data,
      innerHeight,
      innerWidth,
      marginLeft,
      marginTop,
      style,
      size
    } = this.props;

    if (!data || !innerWidth || !innerHeight) {
      return null;
    }

    if (animation) {
      return (
        <Animation {...this.props} animatedProps={ANIMATED_SERIES_PROPS}>
          <CustomSVGSeries {...this.props} animation={false} />
        </Animation>
      );
    }

    const x = this._getAttributeFunctor('x');
    const y = this._getAttributeFunctor('y');
    const contents = data.map((seriesComponent, index) => {
      const positionInPixels = {
        x: x(seriesComponent),
        y: y(seriesComponent)
      };
      const innerComponent = getInnerComponent({
        customComponent: seriesComponent,
        positionInPixels,
        defaultType: customComponent,
        positionFunctions: {x, y},
        style,
        propsSize: size
      });
      return (
        <g
          className="rv-xy-plot__series--custom-svg"
          key={`rv-xy-plot__series--custom-svg-${index}`}
          transform={`translate(${positionInPixels.x},${positionInPixels.y})`}
          onMouseEnter={e => this._valueMouseOverHandler(seriesComponent, e)}
          onMouseLeave={e => this._valueMouseOutHandler(seriesComponent, e)}
        >
          {innerComponent}
        </g>
      );
    });
    return (
      <g
        className={`${predefinedClassName} ${className}`}
        transform={`translate(${marginLeft},${marginTop})`}
      >
        {contents}
      </g>
    );
  }
}

CustomSVGSeries.propTypes = {
  animation: PropTypes.bool,
  className: PropTypes.string,
  customComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  marginLeft: PropTypes.number,
  marginTop: PropTypes.number,
  style: PropTypes.object,
  size: PropTypes.number,
  onValueMouseOver: PropTypes.func,
  onValueMouseOut: PropTypes.func
};

CustomSVGSeries.defaultProps = {
  ...AbstractSeries.defaultProps,
  animation: false,
  customComponent: 'circle',
  style: {},
  size: 2
};

export default CustomSVGSeries;

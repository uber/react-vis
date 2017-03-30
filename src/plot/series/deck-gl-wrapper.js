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

import React, {PropTypes, Component} from 'react';
import DeckGL, {OrthographicViewport} from 'deck.gl';

import {ANIMATED_SERIES_PROPS} from 'utils/series-utils';
import Animation from 'animation';

class DeckGLWrapper extends Component {
  render() {
    const {
      animation,
      children,
      marginLeft,
      marginTop,
      marginBottom,
      marginRight,
      innerHeight,
      innerWidth,
      _renderKey
    } = this.props;

    if (animation) {
      // not animating, bc it's not animating its childrens props
      return (
        <DeckGLWrapper {...this.props} animation={null}>
          {children.map(child => {
            return (
              <Animation {...child.props} animatedProps={ANIMATED_SERIES_PROPS}>
                {child}
              </Animation>
            );
          })}
        </DeckGLWrapper>
      );
    }

    const width = innerWidth + marginLeft + marginRight;
    const height = innerHeight + marginTop + marginBottom;

    const glViewport = new OrthographicViewport({
      width: width || 0,
      height: height || 0,
      left: -marginLeft,
      top: -marginTop
    });
    if (!innerHeight || !innerWidth) {
      return null;
    }
    // console.log(_renderKey)
    const layers = children.reduce((res, layer) => {
      if (!layer.type.renderLayer) {
        const trueLayer = layer.props.children;
        console.log(trueLayer.props)
        return res.concat(trueLayer.type.renderLayer({...trueLayer.props, _renderKey}));
      }
      return res.concat(layer.type.renderLayer({...layer.props, _renderKey}));
    }, []);

    return (<DeckGL width={width} height={height} viewport={glViewport}
      style={{position: 'absolute', top: 0, left: 0}}
      layers={layers}/>);
  }
}

DeckGLWrapper.displayName = 'DeckGLWrapper';
DeckGLWrapper.propTypes = {
  marginLeft: PropTypes.number.isRequired,
  marginTop: PropTypes.number.isRequired,
  marginBottom: PropTypes.number.isRequired,
  marginRight: PropTypes.number.isRequired,
  innerHeight: PropTypes.number.isRequired,
  innerWidth: PropTypes.number.isRequired
};

export default DeckGLWrapper;

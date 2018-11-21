'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Copyright (c) 2016 - 2017 Uber Technologies, Inc.
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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _animation = require('../../animation');

var _animation2 = _interopRequireDefault(_animation);

var _seriesUtils = require('../../utils/series-utils');

var _d3Shape = require('d3-shape');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _scalesUtils = require('../../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var predefinedClassName = 'rv-xy-plot__series rv-xy-plot__series--arc';
var ATTRIBUTES = ['radius', 'angle'];

var defaultProps = _extends({}, _abstractSeries2.default.defaultProps, {
  center: { x: 0, y: 0 },
  arcClassName: '',
  className: '',
  style: {},
  padAngle: 0
});

/**
 * Prepare the internal representation of row for real use.
 * This is necessary because d3 insists on starting at 12 oclock and moving
 * clockwise, rather than starting at 3 oclock and moving counter clockwise
 * as one might expect from polar
 * @param {Object} row - coordinate object to be modifed
 * @return {Object} angle corrected object
 */
function modifyRow(row) {
  var radius = row.radius,
      angle = row.angle,
      angle0 = row.angle0;

  var truedAngle = -1 * angle + Math.PI / 2;
  var truedAngle0 = -1 * angle0 + Math.PI / 2;
  return _extends({}, row, {
    x: radius * Math.cos(truedAngle),
    y: radius * Math.sin(truedAngle),
    angle: truedAngle,
    angle0: truedAngle0
  });
}

var ArcSeries = function (_AbstractSeries) {
  _inherits(ArcSeries, _AbstractSeries);

  function ArcSeries(props) {
    _classCallCheck(this, ArcSeries);

    var _this = _possibleConstructorReturn(this, (ArcSeries.__proto__ || Object.getPrototypeOf(ArcSeries)).call(this, props));

    var scaleProps = _this._getAllScaleProps(props);
    _this.state = { scaleProps: scaleProps };
    return _this;
  }

  _createClass(ArcSeries, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState({ scaleProps: this._getAllScaleProps(nextProps) });
    }

    /**
     * Get the map of scales from the props.
     * @param {Object} props Props.
     * @param {Array} data Array of all data.
     * @returns {Object} Map of scales.
     * @private
     */

  }, {
    key: '_getAllScaleProps',
    value: function _getAllScaleProps(props) {
      var defaultScaleProps = this._getDefaultScaleProps(props);
      var userScaleProps = (0, _scalesUtils.extractScalePropsFromProps)(props, ATTRIBUTES);
      var missingScaleProps = (0, _scalesUtils.getMissingScaleProps)(_extends({}, defaultScaleProps, userScaleProps), props.data, ATTRIBUTES);

      return _extends({}, defaultScaleProps, userScaleProps, missingScaleProps);
    }

    /**
     * Get the list of scale-related settings that should be applied by default.
     * @param {Object} props Object of props.
     * @returns {Object} Defaults.
     * @private
     */

  }, {
    key: '_getDefaultScaleProps',
    value: function _getDefaultScaleProps(props) {
      var innerWidth = props.innerWidth,
          innerHeight = props.innerHeight;

      var radius = Math.min(innerWidth / 2, innerHeight / 2);
      return {
        radiusRange: [0, radius],
        _radiusValue: radius,
        angleType: 'literal'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          arcClassName = _props.arcClassName,
          animation = _props.animation,
          className = _props.className,
          center = _props.center,
          data = _props.data,
          disableSeries = _props.disableSeries,
          hideSeries = _props.hideSeries,
          marginLeft = _props.marginLeft,
          marginTop = _props.marginTop,
          padAngle = _props.padAngle,
          style = _props.style;


      if (!data) {
        return null;
      }

      if (animation) {
        var cloneData = data.map(function (d) {
          return _extends({}, d);
        });
        return _react2.default.createElement(
          'g',
          { className: 'rv-xy-plot__series--arc__animation-wrapper' },
          _react2.default.createElement(
            _animation2.default,
            _extends({}, this.props, {
              animatedProps: _seriesUtils.ANIMATED_SERIES_PROPS,
              data: cloneData
            }),
            _react2.default.createElement(ArcSeries, _extends({}, this.props, {
              animation: null,
              disableSeries: true,
              data: cloneData
            }))
          ),
          _react2.default.createElement(ArcSeries, _extends({}, this.props, {
            animation: null,
            hideSeries: true,
            style: { stroke: 'red' }
          }))
        );
      }

      var scaleProps = this.state.scaleProps;
      var radiusDomain = scaleProps.radiusDomain;
      // need to generate our own functors as abstract series doesnt have anythign for us

      var radius = (0, _scalesUtils.getAttributeFunctor)(scaleProps, 'radius');
      var radius0 = (0, _scalesUtils.getAttr0Functor)(scaleProps, 'radius');
      var angle = (0, _scalesUtils.getAttributeFunctor)(scaleProps, 'angle');
      var angle0 = (0, _scalesUtils.getAttr0Functor)(scaleProps, 'angle');
      // but it does have good color support!
      var fill = this._getAttributeFunctor('fill') || this._getAttributeFunctor('color');
      var stroke = this._getAttributeFunctor('stroke') || this._getAttributeFunctor('color');
      var opacity = this._getAttributeFunctor('opacity');
      var x = this._getAttributeFunctor('x');
      var y = this._getAttributeFunctor('y');

      return _react2.default.createElement(
        'g',
        {
          className: predefinedClassName + ' ' + className,
          onMouseOver: this._seriesMouseOverHandler,
          onMouseOut: this._seriesMouseOutHandler,
          onClick: this._seriesClickHandler,
          onContextMenu: this._seriesRightClickHandler,
          opacity: hideSeries ? 0 : 1,
          pointerEvents: disableSeries ? 'none' : 'all',
          transform: 'translate(' + (marginLeft + x(center)) + ',' + (marginTop + y(center)) + ')'
        },
        data.map(function (row, i) {
          var noRadius = radiusDomain[1] === radiusDomain[0];
          var arcArg = {
            innerRadius: noRadius ? 0 : radius0(row),
            outerRadius: radius(row),
            startAngle: angle0(row) || 0,
            endAngle: angle(row)
          };
          var arcedData = (0, _d3Shape.arc)().padAngle(padAngle);
          var rowStyle = row.style || {};
          var rowClassName = row.className || '';
          return _react2.default.createElement('path', {
            style: _extends({
              opacity: opacity && opacity(row),
              stroke: stroke && stroke(row),
              fill: fill && fill(row)
            }, style, rowStyle),
            onClick: function onClick(e) {
              return _this2._valueClickHandler(modifyRow(row), e);
            },
            onContextMenu: function onContextMenu(e) {
              return _this2._valueRightClickHandler(modifyRow(row), e);
            },
            onMouseOver: function onMouseOver(e) {
              return _this2._valueMouseOverHandler(modifyRow(row), e);
            },
            onMouseOut: function onMouseOut(e) {
              return _this2._valueMouseOutHandler(modifyRow(row), e);
            },
            key: i,
            className: predefinedClassName + '-path ' + arcClassName + ' ' + rowClassName,
            d: arcedData(arcArg)
          });
        })
      );
    }
  }]);

  return ArcSeries;
}(_abstractSeries2.default);

ArcSeries.propTypes = _extends({}, _abstractSeries2.default.propTypes, (0, _scalesUtils.getScalePropTypesByAttribute)('radius'), (0, _scalesUtils.getScalePropTypesByAttribute)('angle'), {
  center: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  arcClassName: _propTypes2.default.string,
  padAngle: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.number])
});
ArcSeries.defaultProps = defaultProps;
ArcSeries.displayName = 'ArcSeries';

exports.default = ArcSeries;
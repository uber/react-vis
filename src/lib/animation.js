import React from 'react';
import {interpolate} from 'd3-interpolate';
import {spring, Motion} from 'react-motion';
import PureRenderComponent from './pure-render-component';

const propTypes = {
  animatedProps: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

class Animation extends PureRenderComponent {
  constructor(props) {
    super(props);
    const data = this._extractPropsFromChild(this.props);
    const interpolator = interpolate(data, null);
    this.state = {data, interpolator};
    this._renderChildren = this._renderChildren.bind(this);
  }

  shouldComponentUpdate({children: newChildren, animatedProps}) {
    const {children} = this.props;
    const child = React.Children.only(children);
    const newChild = React.Children.only(newChildren);

    return Boolean(
      animatedProps.find(
        propName => newChild.props[propName] !== child.props[propName]
      )
    );
  }

  componentWillUpdate(props) {
    const {data} = this.state;
    const newData = this._extractPropsFromChild(props);
    const interpolator = interpolate(data, newData);
    this.setState({interpolator, data: newData});
  }

  _extractPropsFromChild({children, animatedProps}) {
    const child = React.Children.only(children);
    return animatedProps.reduce((result, animatedPropName) => {
      if (child.props.hasOwnProperty(animatedPropName)) {
        result[animatedPropName] = child.props[animatedPropName];
      }
      return result;
    }, {});
  }

  _renderChildren({i}) {
    const {children} = this.props;
    const {interpolator} = this.state;
    const child = React.Children.only(children);
    const interpolatedProps = interpolator ? interpolator(i) : interpolator;

    return React.cloneElement(
      child,
      {
        ...child.props,
        ...interpolatedProps,
        _animation: Math.random() // enforce re-rendering
      }
    );
  }

  render() {
    const defaultStyle = {i: 0};
    const style = {i: spring(1)};
    return (
      <Motion {...{defaultStyle, style, key: Math.random()}}>
        {this._renderChildren}
      </Motion>
    );
  }
}

Animation.propTypes = propTypes;
Animation.displayName = 'Animation';

export default Animation;

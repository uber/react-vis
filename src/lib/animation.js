import React from 'react';
import {interpolate} from 'd3-interpolate';
import {spring, Motion} from 'react-motion';

const propTypes = {
  animatedProps: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this._extractPropsFromChild(this.props),
      interpolator: null
    };
    this._renderChildren = this._renderChildren.bind(this);
  }

  componentWillReceiveProps(props) {
    const {data} = this.state;
    const newData = this._extractPropsFromChild(props);
    this.setState({
      interpolator: interpolate(data, newData)
    });
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
      {...child.props, ...interpolatedProps}
    );
  }

  render() {
    return (
      <Motion defaultStyle={{i: 0}} style={{i: spring(1)}}>
        {this._renderChildren}
      </Motion>
    )
  }
}

Animation.propTypes = propTypes;
Animation.displayName = 'Animation';

export default Animation;

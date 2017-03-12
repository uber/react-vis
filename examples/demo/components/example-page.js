import React, {Component} from 'react';

class ExamplePage extends Component {
  componentWillMount() {
    window.addEventListener(
      'resize',
      () => this.setState({width: window.innerWidth})
    );
  }

  render() {
    const ExampleComponent = this.props.route.content.component;
    return (
      <div className="example-page">
        <ExampleComponent />
      </div>
    );
  }
}

export default ExamplePage;

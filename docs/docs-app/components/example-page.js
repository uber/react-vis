import React, {Component} from 'react';

class ExamplePage extends Component {
  componentDidMount() {
    window.addEventListener(
      'resize',
      () => this.setState({width: window.innerWidth})
    );
  }

  render() {
    const {route} = this.props;
    const ExampleComponent = route.content.component;
    console.log(ExampleComponent)
    return (
      <div className="example-page">
        <ExampleComponent />
      </div>
    );
  }
}

export default ExamplePage;

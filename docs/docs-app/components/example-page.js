import React, {Component} from 'react';
import {convertMarkdownToReact, injectExamplesIntoHtml} from './utils';
class ExamplePage extends Component {
  componentDidMount() {
    window.addEventListener(
      'resize',
      () => this.setState({width: window.innerWidth})
    );
    this.props.loadSinglePage(this.props.route.content);
  }

  componentWillReceiveProps(nextProps) {
    const currentMarkdownAddress = this.props.route.content && this.props.route.content.markdown;
    const nextMarkdownAddress = nextProps.route.content && nextProps.route.content.markdown;
    if (nextMarkdownAddress && currentMarkdownAddress !== nextMarkdownAddress) {
      nextProps.loadSinglePage(nextProps.route.content);
    }
  }

  render() {
    const {markdownPages, route} = this.props;
    const ExampleComponent = route.content.component;

    const content = markdownPages.get(route.content.markdown, '');

    return (
      <div className="example-page">
        <ExampleComponent forExample />
        {content && <div className="markdown" ref="documentionContainer">
          {injectExamplesIntoHtml(convertMarkdownToReact(content))}
        </div>}
      </div>
    );
  }

}

export default ExamplePage;

import React, {Component} from 'react';
import {injectExamplesIntoHtml, convertMarkdownToReact, scanMarkdownForType} from './utils';

class DocumentationPage extends Component {
  componentDidMount() {
    this.props.loadSinglePage(this.props.route.content);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route.content.markdown !== this.props.route.content.markdown) {
      this.refs.documentionContainer.scrollTop = 0;
      nextProps.loadSinglePage(nextProps.route.content);
    }
  }

  render() {
    const {markdownPages, route} = this.props;
    const content = markdownPages.get(route.content.markdown, '');

    const foundClass = scanMarkdownForType(content);
    const stringClass = (foundClass && foundClass.length) ? foundClass[1] : 'documentation-page f fg';
    return (
      <div className={stringClass}>
        <div className="markdown" ref="documentionContainer">
          {injectExamplesIntoHtml(convertMarkdownToReact(content))}
        </div>
      </div>
    );
  }
}

export default DocumentationPage;

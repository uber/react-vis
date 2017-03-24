import React, {Component} from 'react';
import marked from 'marked';

import {docsRouting} from '../constants/pages';
import {showCase} from '../../../showcase/index';

const INJECTION_REG = /<!-- INJECT:"(.+)\" -->/g;

function injectExamplesIntoHtml(content) {
  return content.split(INJECTION_REG).map((__html, index) => {
    const Example = showCase[__html];
    if (!Example) {
      /* eslint-disable react/no-danger */
      return (<div
        className="markdown-body"
        key={`body-${index}`}
        dangerouslySetInnerHTML={{__html}} />);
      /* eslint-enable react/no-danger */
    }
    return (
      <div className="markdown-example" key={`example-${index}`}>
        <Example />
      </div>
    );
  });
}

class DocumentationPage extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.route.content.markdown !== this.props.route.content.markdown) {
      this.refs.documentionContainer.scrollTop = 0;
    }
  }

  render() {
    const {markdownPages, route} = this.props;

    const renderer = new marked.Renderer();
    renderer.link = (href, title, text) => {

      if (docsRouting[href]) {
        return `<a href=${docsRouting[href]} title=${title}>${text}</a>`;
      }
      return `<a href=${href} title=${title}>${text}</a>`;
    };

    const content = markdownPages.get(route.content.markdown, '');
    const __html = marked(content, {renderer});

    return (
      <div className="documentation-page f fg">
        <div className="markdown" ref="documentionContainer">
          {injectExamplesIntoHtml(__html)}
        </div>
      </div>
    );
  }
}

export default DocumentationPage;

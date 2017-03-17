import React, {Component} from 'react';
import marked from 'marked';

import {docsRouting} from '../constants/pages';

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
    /* eslint-disable react/no-danger */
    return (
      <div className="documentation-page f fg">
        <div className="markdown" ref="documentionContainer">
          <div className="markdown-body" dangerouslySetInnerHTML={{__html}} />
        </div>
      </div>
    );
    /* eslint-enable react/no-danger */
  }
}

export default DocumentationPage;

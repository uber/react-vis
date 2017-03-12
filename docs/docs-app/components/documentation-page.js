import React, {Component} from 'react';
import marked from 'marked';

class DocumentationPage extends Component {

  render() {
    const {markdownPages, route} = this.props;

    const renderer = new marked.Renderer();
    const content = markdownPages.get(route.content.markdown, '');
    const __html = marked(content, {renderer});
    return (
      <div className="documentation-page">
        <div className="markdown">
          <div className="markdown-body" dangerouslySetInnerHTML={{__html}} />
        </div>
      </div>
    );
  }
}

export default DocumentationPage;

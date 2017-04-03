import React from 'react';
import marked from 'marked';

import {docsRouting} from '../constants/pages';
import {showCase} from '../../../showcase/index';

const INJECTION_REG = /<!-- INJECT:"(.+)\" -->/g;

export function injectExamplesIntoHtml(content) {
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

export function convertMarkdownToReact(content) {
  const renderer = new marked.Renderer();
  renderer.link = (href, title, text) =>
    `<a href=${docsRouting[href] || href} title=${title}>${text}</a>`;

  return marked(content, {renderer});
}

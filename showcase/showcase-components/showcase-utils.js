import React from 'react';

import {SHOWCASE_LINKS} from '../showcase-links';

export function mapSection(section, index) {
  const {sourceLink, docsLink, comment, name, componentName} = section;
  const SectionComponent = section.component;
  const linkProps = {
    className: 'docs-link',
    target: '_blank',
    rel: 'noopener noreferrer'
  };
  const exampleLink = SHOWCASE_LINKS[componentName];
  return (
    <section key={`${name}-index`}>
      <h3>{name}</h3>
      <div className="flex">
        {sourceLink && <a {...linkProps} href={sourceLink}>> Source</a>}
        {docsLink && <a {...linkProps} href={docsLink}>> Docs</a>}
        {exampleLink && <a {...linkProps} href={exampleLink}>> View Code</a>}
        {comment && <p className="docs-comment">{comment}</p>}
      </div>
      <SectionComponent />
    </section>
  );
}

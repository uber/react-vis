import React from 'react';

import {SHOWCASE_LINKS} from '../showcase-links';

export function mapSection(section, index) {
  const {docsLink, comment, name, componentName} = section;
  const SectionComponent = section.component;
  const linkProps = {
    className: 'docs-link',
    target: '_blank',
    rel: 'noopener noreferrer'
  };
  const exampleLink = SHOWCASE_LINKS[componentName];
  return (
    <section key={`${name}-index`}>
      <div className="section-header">
        <h3 className="section-title">{name}</h3>
        <div className="flex">
          {exampleLink && (
            <a {...linkProps} href={exampleLink}>
              {' '}
              View Code
            </a>
          )}
          {docsLink && (
            <a {...linkProps} href={docsLink}>
              {' '}
              Documentation{' '}
            </a>
          )}
        </div>
      </div>
      {comment && <p className="docs-comment">{comment}</p>}
      <SectionComponent />
    </section>
  );
}

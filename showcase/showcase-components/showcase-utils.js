import React from 'react';

export function mapSection(section, index) {
  const {sourceLink, docsLink, exampleLink, comment} = section;
  const SectionComponent = section.component;
  const linkProps = {
    className: 'docs-link',
    target: '_blank',
    rel: 'noopener noreferrer'
  };
  return (
    <section key={`${section.name}-index`}>
      <h3>{section.name}</h3>
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

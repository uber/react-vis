import React from 'react';

export function mapSection(section, index) {
  const SectionComponent = section.component;
  return (
    <section key={`${section.name}-index`}>
      <h3>{section.name}</h3>
      <div className="flex">
        {section.sourceLink && <a className="docs-link" href={section.sourceLink}>> Source</a>}
        {section.docsLink && <a className="docs-link" href={section.docsLink}>> Docs</a>}
        {section.comment && <p className="docs-comment">{section.comment}</p>}
      </div>
      <SectionComponent />
    </section>
  );
}

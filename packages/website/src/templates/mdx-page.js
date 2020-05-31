import React from 'react';
import {graphql} from 'gatsby';
import {MDXRenderer} from 'gatsby-plugin-mdx';

// // note - these typographic elements are taken directly from baseui.
// // we can consider customizing them by first importing in styled/index, then
// // giving them special parameters

// import {
//   A,
//   CodeBlock,
//   H1,
//   H2,
//   H3,
//   H4,
//   H5,
//   H6,
//   InlineCode,
//   P,
//   List,
//   ListItem,
//   Pre,
//   BlockQuote,
//   Table,
//   TableHeaderCell,
//   TableBodyCell,
//   MarkdownBody
// } from '../components/styled';

// const CustomLinkWrapper = relativeLinks => {
//   const CustomLink = ({href, ...props}) => {
//     if (href.startsWith('http') || href.startsWith('#')) {
//       // TODO - we could style them differently though
//       return <A href={href} {...props} />;
//     }
//     const hrefWithoutLeadingSlash = href.startsWith('/') ? href.slice(1) : href;
//     return <A {...props} href={relativeLinks[hrefWithoutLeadingSlash]} />;
//   };
//   return CustomLink;
// };

// const CustomPre = props => {
//   // the point of this component is to distinguish styling of inline <code /> elements
//   // with code blocks (ie <pre><code>...</code></pre>).

//   const {children, ...otherProps} = props;
//   return (
//     <Pre {...otherProps}>
//       {React.Children.map(children, child => {
//         // this means a child of this <pre> element is a <code> element, or <code> element styled
//         // by Styletron
//         if (
//           child.type === 'code' ||
//           child.type.displayName === 'Styled(code)'
//         ) {
//           return <CodeBlock {...child.props} />;
//         }
//         // else we just clone the element as is
//         return React.cloneElement(child);
//       })}
//     </Pre>
//   );
// };

export const query = graphql`
  query($slug: String!) {
    mdx(fields: {slug: {eq: $slug}}) {
      body
    }
  }
`;

export default class DocTemplate extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {body} = this.props.data.mdx;
    return (
      <div>
        <MDXRenderer>{body}</MDXRenderer>
      </div>
    );
  }
}

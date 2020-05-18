import React from 'react';
import styled from 'styled-components';

function styledWithClass(elementName, globalClassName) {
  function StyledComponent({className, ...props}) {
    return React.createElement(
      elementName,
      {className: `${globalClassName} ${className}`, ...props}
    );
  }
  return styled(StyledComponent);
}
export const XYPlotInnerSvg = styledWithClass('svg', 'rv-xy-plot__inner')`
  display: block;
`;
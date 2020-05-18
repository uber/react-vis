import React from 'react';
import styled from 'styled-components';

function XYPlotInnerSvgElement({className, ...props}) {
  return <svg className={`rv-xy-plot__inner ${className}`} {...props} />;
}
export const XYPlotInnerSvg = styled(XYPlotInnerSvgElement)`
  display: block;
`;
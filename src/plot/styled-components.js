import React from 'react';
import {useStyletron} from "styletron-react";

export function XYPlotInnerSvg(props) {
  const [css] = useStyletron();
  return <svg className={`rv-xy-plot__inner ${css({display: 'block'})}`} {...props} />;
}

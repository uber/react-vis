import React from 'react';
import {LinkGraph, CircleNode, StraightConnector} from '../../';

export default function LinkGraphSimpleExample() {
  return (
    <LinkGraph width={200} height={140}>
      <CircleNode name="Gatsby" cx={60} cy={40} r={10} stroke="red"/>
      <CircleNode name="Daisy" cx={120} cy={120} r={10}/>
      <CircleNode name="Ge" cx={180} cy={100} r={10}/>
      <StraightConnector from="Gatsby" to="Daisy"/>
      <StraightConnector from="Ge" to="Gatsby"/>
    </LinkGraph>
  );
}

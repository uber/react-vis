// Copyright (c) 2016 - 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';

import {ParallelCoordinates} from 'index';
import IrisData from '../datasets/iris.json';

// {"sepal length": 5.1, "sepal width": 3.5, "petal length": 1.4, "petal width": 0.2, "species": "setosa"},

const SPECIES_COLORS = {
  setosa: '#12939A',
  virginica: '#79C7E3',
  versicolor: '#1A3177'
};

const domainStructure = Object.keys(IrisData[0])
  .filter(name => name !== 'species')
  .map(name => ({name, domain: [Infinity, -Infinity]}));

const domains = IrisData.reduce((acc, row) => {
  return acc.map(d => {
    return {
      name: d.name,
      domain: [
        Math.min(d.domain[0], row[d.name]),
        Math.max(d.domain[1], row[d.name])
      ]
    };
  });
}, domainStructure);

export default function BrushedParallelCoordinates(props) {
  return (
    <ParallelCoordinates
      animation
      brushing
      data={IrisData.map(d => ({...d, color: SPECIES_COLORS[d.species]}))}
      domains={domains}
      margin={60}
      width={600}
      height={400}
    />
  );
}

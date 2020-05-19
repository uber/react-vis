// Copyright (c) 2017 Uber Technologies, Inc.
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

import {randomNormal} from 'd3-random';
import {scaleLinear, scaleQuantize, scaleSqrt} from 'd3-scale';
import {max, range} from 'd3-array';

// create fake data
export const createData = (dataSize, barChart = true) => {
  const gen1 = randomNormal(70, 15);
  const gen2 = randomNormal(50, 8);
  const gen = i => (i % 3 ? gen1() : gen2());

  const data = new Array(dataSize).fill(0).map((d, index) => ({
    x: gen(index),
    y: barChart ? `Point-${index}` : gen(index),
    label: `Point ${index}`,
    color: '#12939A'
  }));

  if (barChart) {
    data.sort((a, b) => b.x - a.x);
  }
  return data;
};

export function filterFeatures(features, ppp) {
  return features.reduce((res, feature) => {
    if (ppp < feature.min || ppp > feature.max) {
      return res;
    }
    res[feature.name] = true;
    return res;
  }, {});
}

export function computeRadius(data, width, height) {
  const targetPPP = 2e-2;
  const radiusDomain = [2, 12];
  const r = Math.sqrt((targetPPP * width * height) / data.length);
  return Math.min(radiusDomain[1], Math.max(radiusDomain[0], r));
}

export function getPPP(w, h, data, dimensionality) {
  // what is TWOD?
  const pixels =
    dimensionality === 'TWOD' ? w * h : dimensionality === 'WIDTH' ? w : h;
  return data.length / pixels;
}

function generateDomain(data) {
  return data.reduce(
    (res, row) => ({
      xMin: Math.min(res.xMin, row.x),
      xMax: Math.max(res.xMax, row.x),
      yMin: Math.min(res.yMin, row.y),
      yMax: Math.max(res.yMax, row.y)
    }),
    {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity}
  );
}

export function transformToBinData(data, width, height) {
  const targetPPP = 5e-3;
  const binCount = ~~Math.sqrt(width * height * targetPPP);
  const domains = generateDomain(data);
  const xBin = scaleQuantize()
    .domain([domains.xMin, domains.xMax])
    .range(range(binCount));
  const yBin = scaleQuantize()
    .domain([domains.yMin, domains.yMax])
    .range(range(binCount));

  const binData = new Array(binCount * binCount).fill(0);
  data.forEach(d => {
    // compute the "address" of the bin in the binData hash
    const index = xBin(d.x) + binCount * yBin(d.y);
    binData[index]++;
  });
  const maxCount = max(binData);
  const color = scaleSqrt()
    .domain([0, maxCount])
    .range(['#fff', '#12939A']);

  return binData.map((d, index) => {
    const x = index % binCount;
    const y = ~~(index / binCount);
    return {x, y, color: color(d), count: d, maxCount};
  });
}

function transformColor(data, hovered = [], useRange = false) {
  const samplePoint = data[0];
  const color = useRange
    ? scaleLinear()
        .domain([0, samplePoint.maxCount])
        .range(['#fff', '#EF5D28'])
    : d => '#EF5D28';

  const hoveredPoints = hovered.reduce((res, row) => {
    res[useRange ? `${row.x}-${row.y}` : row.label] = true;
    return res;
  }, {});
  return data.map(row => {
    if (hoveredPoints[useRange ? `${row.x}-${row.y}` : row.label]) {
      return {...row, color: color(row.count)};
    }
    return row;
  });
}

export function manicureData(data, hoveredPoint, selectedPoints, useRange) {
  if (!hoveredPoint && selectedPoints.length === 0) {
    return data;
  }
  const concatedData = !hoveredPoint
    ? selectedPoints
    : selectedPoints.concat([hoveredPoint]);
  return transformColor(data, concatedData, useRange);
}

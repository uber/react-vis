import {randomNormal} from 'd3-random';
import {scaleLinear, scaleQuantize, scaleSqrt} from 'd3-scale';
import {max, range} from 'd3-array';

// create fake data
export function createData(dataSize, barChart = true) {
  const gen1 = randomNormal(70, 15);
  const gen2 = randomNormal(50, 8);
  const gen = (i) => i % 3 ? gen1() : gen2();
  const data = new Array(dataSize);
  let index = -1;

  while (index++ < dataSize) {
    if (barChart) {
      data[index] = {
        x: gen(index),
        y: `Point-${index}`,
        label: `Point ${index}`,
        color: '#12939A'
      };
    }
    if (!barChart) {
      data[index] = {
        x: gen(index),
        y: gen(index),
        label: `Point ${index}`,
        color: '#12939A'
      };
    }
  }
  if (barChart) {
    data.sort((a, b) => b.x - a.x);
  }
  return data;
}

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
  const r = Math.sqrt(targetPPP * width * height / data.length);
  return Math.min(radiusDomain[1], Math.max(radiusDomain[0], r));
}

export function getPPP(w, h, data, dimensionality) {
  // what is TWOD?
  const pixels = dimensionality === 'TWOD' ? w * h : dimensionality === 'WIDTH' ? w : h;
  return data.length / pixels;
}

function generateDomain(data) {
  return data.reduce((res, row) => {
    res = {
      xMin: Math.min(res.xMin, row.x),
      xMax: Math.max(res.xMax, row.x),
      yMin: Math.min(res.yMin, row.y),
      yMax: Math.max(res.yMax, row.y)
    };
    return res;
  }, {xMin: Infinity, xMax: -Infinity, yMin: Infinity, yMax: -Infinity});
}

export function transformToBinData(data, width, height) {
  const targetPPP = 5e-3;
  const binCount = ~~Math.sqrt(width * height * targetPPP);
  const domains = generateDomain(data);
  const xBin = scaleQuantize().domain([domains.xMin, domains.xMax]).range(range(binCount));
  const yBin = scaleQuantize().domain([domains.yMin, domains.yMax]).range(range(binCount));

  const binData = new Array(binCount * binCount);
  for (let i = 0; i < binData.length; i++) {
    binData[i] = 0;
  }
  data.forEach(d => {
    const index = xBin(d.x) + (binCount * yBin(d.y));
    binData[index]++;
  });
  const maxCount = max(binData);
  const color = scaleSqrt().domain([0, maxCount]).range(['#fff', '#12939A']);

  const mappedData = binData.map((d, index) => {
    const x = index % binCount;
    const y = ~~(index / binCount);
    return {x, y, color: color(d), count: d, maxCount};
  });
  return mappedData;
}

function transformColor(data, hovered = [], useRange = false) {
  const samplePoint = data[0];
  const color = useRange ?
    scaleLinear().domain([0, samplePoint.maxCount]).range(['#fff', '#EF5D28']) :
    d => '#EF5D28';

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
  const concatedData = !hoveredPoint ? selectedPoints : selectedPoints.concat([hoveredPoint]);
  return transformColor(data, concatedData, useRange);
}

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

import {
  _adjustCategoricalScale,
  getScaleObjectFromProps,
  getScalePropTypesByAttribute,
  getAttributeFunctor,
  getAttr0Functor,
  getAttributeScale,
  getAttributeValue,
  getFontColorFromBackground,
  getOptionalScaleProps,
  getXYPlotValues,
  _getSmallestDistanceIndex,
  getScaleFnFromScaleObject,
  _getScaleDistanceAndAdjustedDomain,
  extractScalePropsFromProps,
  getMissingScaleProps,
  literalScale
} from 'utils/scales-utils';

const isScaleConsistent = (scaleObject, attr) => {
  return (
    scaleObject &&
    scaleObject.range &&
    scaleObject.domain &&
    scaleObject.type &&
    scaleObject.attr === attr
  );
};

const _allData = [[{x: 1}, {x: 2}, {x: 3}, {x: 2}]];
const _xValue = 20;
const xRange = [0, 100];
const xDomain = [1, 5];
const xType = 'ordinal';
const xDistance = 10;

test('scales-utils #getScaleObjectFromProps ', () => {
  // with empty props
  const nullResult = getScaleObjectFromProps({}, 'x');
  expect(nullResult).toBe(null);
  // with empty domain
  const noRangeResult = getScaleObjectFromProps({xDomain}, 'x');
  expect(noRangeResult).toBe(null);
  // with empty range
  const noDomainResult = getScaleObjectFromProps({xRange}, 'x');
  expect(noDomainResult).toBe(null);

  // with all props
  const completeResult = getScaleObjectFromProps(
    {xRange, _allData, xDomain, xType, xDistance},
    'x'
  );
  expect(isScaleConsistent(completeResult, 'x')).toBeTruthy();
  expect(completeResult.type).toBe(xType);
  // does not mutate passed domain
  const tXDomain = [1, 5];
  const scaleObj = getScaleObjectFromProps(
    {
      xRange,
      _adjustBy: ['x'],
      _adjustWhat: [0],
      _allData,
      xDomain: tXDomain,
      xDistance
    },
    'x'
  );

  expect(scaleObj.domain).toEqual([0.5, 5.5]);
  expect(tXDomain).toEqual([1, 5]);

  // with the value that overrides props
  const valueResult = getScaleObjectFromProps({x: 10, _allData}, 'x');
  expect(isScaleConsistent(valueResult, 'x')).toBeTruthy();
  expect(valueResult.isValue).toBe(true);
});

test('scales-utils #getScalePropTypesByAttribute', () => {
  const result = Object.keys(getScalePropTypesByAttribute('size'));
  const expectedResult = [
    '_sizeValue',
    'sizeDomain',
    'getSize',
    'getSize0',
    'sizeRange',
    'sizeType',
    'sizeDistance',
    'sizeBaseValue'
  ];
  expect(result).toEqual(expectedResult);
});

test('scales-utils #getAttributeFunctor', () => {
  // without props
  let result = getAttributeFunctor({_xValue}, 'x');
  expect(result({x: Math.random()}) === _xValue).toBeTruthy();
  expect(result({})).toBe(_xValue);
  // with props
  result = getAttributeFunctor({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  expect(isFunction).toBeTruthy();
  expect(result(_allData[0][0])).toBe(xRange[0]);

  expect(result({data: {x: 10}})).toBe(225);

  // with custom accessor
  result = getAttributeFunctor({xRange, xDomain, getX: d => d.value}, 'x');
  expect(typeof result === 'function').toBeTruthy();

  expect(result({data: {x: 10, value: 1}})).toBe(0);
});

test('scales-utils #getAttr0Functor', () => {
  // without props
  let result = getAttr0Functor({}, 'x');
  expect(null).toBe(null);

  // using a literal scale to check that the fall back is working correctly
  const exNaughtData = [[{x: 1, x0: 1}, {x: 0}, {x: 3, x0: 3}, {x: 2, x0: 4}]];
  result = getAttr0Functor(
    {
      xRange,
      _allData: exNaughtData,
      xDomain,
      xType: 'literal',
      xDistance
    },
    'x'
  );
  expect(typeof result === 'function').toBeTruthy();
  expect(result(exNaughtData[0][0])).toBe(1);
  expect(result(exNaughtData[0][1])).toBe(1);

  expect(result({data: {x: 10, x0: 5}})).toBe(5);

  // with custom accessor
  result = getAttr0Functor(
    {
      xRange,
      _allData: exNaughtData,
      getX0: d => d.z,
      xDomain,
      xType: 'literal',
      xDistance
    },
    'x'
  );
  expect(typeof result === 'function').toBeTruthy();
  expect(result({data: {x: 10, x0: 5, z: 1}})).toBe(1);

  // now with a linear scale
  result = getAttr0Functor(
    {
      xRange,
      _allData: exNaughtData,
      xDomain,
      xType: 'linear',
      xDistance
    },
    'x'
  );

  expect(typeof result === 'function').toBeTruthy();
  expect(result(exNaughtData[0][0])).toBe(xRange[0]);
  expect(result(exNaughtData[0][1])).toBe(0);

  expect(result({data: {x: 10, x0: 5}})).toBe(100);
});

test('scales-utils #getAttributeScale', () => {
  // without props
  let result = getAttributeScale({}, 'x');
  expect(result === null).toBeTruthy();
  // with props
  result = getAttributeScale({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  expect(isFunction).toBeTruthy();
  expect(result(_allData[0][0].x)).toBe(xRange[0]);
});

test('scales-utils #getAttributeValue ', () => {
  // without props
  let result = getAttributeValue({_xValue}, 'x');
  expect(result === _xValue).toBeTruthy();
  // with props
  result = getAttributeValue({x: 10}, 'x');
  expect(result).toBe(10);
  // with props including a scale type
  result = getAttributeValue({opacity: 0.5, opacityType: 'literal'}, 'opacity');
  expect(result).toBe(0.5);
});

test('scales-utils #_getSmallestDistanceIndex', () => {
  const scaleObj = {type: 'linear', domain: [0, 1], range: [0, 1]};
  const runTest = arg => _getSmallestDistanceIndex(arg, scaleObj);

  expect(runTest([0, 0, 2])).toBe(1);
  expect(runTest([0, 1, 2])).toBe(1);
  expect(runTest([0, 2, 2])).toBe(2);
  expect(runTest([0, 2, 2])).toBe(2);
  expect(runTest([1, 2, 2])).toBe(2);
  expect(runTest([2, 2, 2])).toBe(1);
});

test('scales-utils #extractScalePropsFromProps', () => {
  expect(
    Object.keys(extractScalePropsFromProps({}, [])).length === 0
  ).toBeTruthy();

  const props = {
    aType: 'linear',
    aRange: [1, 2],
    _aValue: 10,
    somethingElse: [],
    bDomain: [1, 2, 3],
    getA: d => d.a
  };

  const result = extractScalePropsFromProps(props, ['a', 'b']);
  expect(
    Object.keys(result).length === 5 &&
      result.aType === props.aType &&
      result.aRange === props.aRange &&
      result._aValue === props._aValue &&
      result.bDomain === props.bDomain &&
      result.getA === props.getA
  ).toBeTruthy();
});

test('scales-utils #getMissingScaleProps', () => {
  const fakeDataInteger = [
    {x: 10, y: 10},
    {x: 15, y: 15},
    {x: 20, y: 20}
  ];
  const fakeDataIntegerDomain = [9, 21];
  const fakeDataString = [{x: 'React'}, {x: 'Vis'}];
  const fakeDataStringDomain = ['React', 'Vis'];
  const dayOne = 971136000;
  const dayTen = 972000000;
  const fakeDomain = [0, 100];
  const fakeDataUnixTime = [{x: dayOne}, {x: dayTen}];
  const paddedDayOne = dayOne - (dayTen - dayOne) * 0.1;
  const paddedDayTen = dayTen + (dayTen - dayOne) * 0.1;
  const fakePadding = 10;

  expect(Object.keys(getMissingScaleProps({}, [], [])).length).toBe(0);
  const result = getMissingScaleProps({}, _allData[0], ['x']);
  expect(
    Boolean(result.xDomain) &&
      result.xDomain.length === 2 &&
      result.xDomain[0] === 1 &&
      result.xDomain[1] === 3
  ).toBeTruthy();

  expect(
    getMissingScaleProps(
      {
        xPadding: fakePadding
      },
      fakeDataInteger,
      ['x']
    ).xDomain
  ).toEqual(fakeDataIntegerDomain);
  // need to use json stringify to peel off the functions
  expect(
    JSON.stringify(
      getMissingScaleProps(
        {
          xPadding: fakePadding,
          xDomain: fakeDomain
        },
        fakeDataInteger,
        ['x']
      )
    )
  ).toEqual('{}');
  expect(
    Object.keys(
      getMissingScaleProps(
        {
          xPadding: fakePadding,
          xDomain: fakeDomain
        },
        fakeDataInteger,
        ['x']
      )
    )
  ).toEqual(['getX', 'getX0']);
  expect(
    getMissingScaleProps(
      {
        yPadding: fakePadding
      },
      fakeDataInteger,
      ['y']
    ).yDomain
  ).toEqual(fakeDataIntegerDomain);
  expect(
    getMissingScaleProps(
      {
        xPadding: fakePadding
      },
      fakeDataString,
      ['x']
    ).xDomain
  ).toEqual(fakeDataStringDomain);
  expect(
    getMissingScaleProps(
      {
        xPadding: fakePadding
      },
      fakeDataUnixTime,
      ['x']
    ).xDomain
  ).toEqual([paddedDayOne, paddedDayTen]);
});

test('scales-utils #literalScale', () => {
  const s = literalScale(5);

  expect(s(0.5)).toBe(0.5);
  expect(s(1)).toBe(1);
  expect(s(1.5)).toBe(1.5);
  expect(s(2)).toBe(2);
  expect(s(2.5)).toBe(2.5);
  expect(s()).toBe(5);
  expect(s('2')).toBe('2');
});

test('scales-utils #getFontColorFromBackground', () => {
  expect(getFontColorFromBackground('#fff')).toBe('#222');
  expect(getFontColorFromBackground('#000')).toBe('#fff');
  expect(getFontColorFromBackground(null)).toBe(null);
});

test('scales-utils #getScaleFnFromScaleObject', () => {
  expect(getScaleFnFromScaleObject()).toBe(null);
  const linearScale = getScaleFnFromScaleObject({
    type: 'linear',
    domain: [0, 1],
    range: [1, 0]
  });

  const literalScaleWithDefaultValue = getScaleFnFromScaleObject({
    type: 'literal',
    domain: [],
    range: [5]
  });

  expect(linearScale.domain()).toEqual([0, 1]);
  expect(linearScale.range()).toEqual([1, 0]);

  expect(literalScaleWithDefaultValue()).toEqual(5);
  expect(literalScaleWithDefaultValue(2)).toEqual(2);

  const modScaleWithZero = getScaleFnFromScaleObject({
    type: 'linear',
    domain: [0, 0],
    range: [1, 0]
  });
  expect(modScaleWithZero.domain()).toEqual([-1, 0]);

  const modScale = getScaleFnFromScaleObject({
    type: 'linear',
    domain: [1, 1],
    range: [1, 0]
  });
  expect(modScale.domain()).toEqual([-1, 1]);

  const ordinalScale = getScaleFnFromScaleObject({
    type: 'ordinal',
    domain: ['a', 'b', 'c', 'd', 'e'],
    range: [20, 120]
  });

  expect(ordinalScale.invert(-10)).toBe('a');
  expect(ordinalScale.invert(25)).toBe('a');
  expect(ordinalScale.invert(40)).toBe('a');
  expect(ordinalScale.invert(60)).toBe('b');
  expect(ordinalScale.invert(80)).toBe('c');
  expect(ordinalScale.invert(100)).toBe('d');
  expect(ordinalScale.invert(115)).toBe('e');
  expect(ordinalScale.invert(130)).toBe('e');
});

function generateFakeData() {
  return new Array(100).fill(0).map((zero, i) => ({xxxx: i}));
}

test('scales-utils #_getScaleDistanceAndAdjustedDomain', () => {
  const FAKE_DATA = generateFakeData();
  const scaleObject = {
    attr: 'x',
    domain: [0, 100],
    range: [0, 1],
    type: 'linear',
    // the extra x's are here to test the accessor behaviour
    accessor: d => d.xxxx
  };
  const resultObject = _getScaleDistanceAndAdjustedDomain(
    FAKE_DATA,
    scaleObject
  );
  const expectedResults = {
    distance: 0.009900990099009799,
    domain0: -0.5,
    domainN: 100.5
  };
  expect(resultObject).toEqual(expectedResults);

  const FAKE_TIME_DATA_WITH_ONE_VALUE_AND_X0 = [
    {
      x: 1422774000000,
      x0: 1420095600000,
      y: 16
    }
  ];

  const FAKE_TIME_DATA_WITH_ONE_VALUE_AND_Y0 = [
    {
      x: 16,
      y0: 1420095600000,
      y: 1422774000000
    }
  ];

  const timeScaleObjectX = {
    attr: 'x',
    domain: [1417546800000, 1430420400000],
    range: [0, 550],
    type: 'time',
    accessor: d => d.x,
    accessor0: d => d.x0
  };
  const timeResultWithOneValueAndX0 = _getScaleDistanceAndAdjustedDomain(
    FAKE_TIME_DATA_WITH_ONE_VALUE_AND_X0,
    timeScaleObjectX
  );
  const expectedTimeResultsWithOneValueAndX0 = {
    distance: 94.72222222222223,
    domain0: 1416207600000,
    domainN: 1431759600000
  };
  expect(timeResultWithOneValueAndX0).toEqual(
    expectedTimeResultsWithOneValueAndX0
  );

  const timeScaleObjectY = {
    attr: 'y',
    domain: [1417546800000, 1430420400000],
    range: [0, 550],
    type: 'time',
    accessor: d => d.y,
    accessor0: d => d.y0
  };
  const timeResultWithOneValueAndY0 = _getScaleDistanceAndAdjustedDomain(
    FAKE_TIME_DATA_WITH_ONE_VALUE_AND_Y0,
    timeScaleObjectY
  );
  const expectedTimeResultsWithOneValueAndY0 = {
    distance: 94.72222222222223,
    domain0: 1416207600000,
    domainN: 1431759600000
  };
  expect(timeResultWithOneValueAndY0).toEqual(
    expectedTimeResultsWithOneValueAndY0
  );

  const timeResult = _getScaleDistanceAndAdjustedDomain(FAKE_DATA, {
    ...timeScaleObjectX,
    accessor: d => d.xxxx
  });
  const expectedTimeResults = {
    distance: 4.272442311048508e-8,
    domain0: 1417546799999.5,
    domainN: 1430420400000.5
  };
  expect(timeResult).toEqual(expectedTimeResults);

  const logScaleObject = {
    attr: 'x',
    domain: [-0.5, 1],
    range: [1, 10],
    type: 'log',
    accessor: d => d.xxxx
  };
  const logResult = _getScaleDistanceAndAdjustedDomain(
    FAKE_DATA,
    logScaleObject
  );
  const expectedLogResults = {distance: NaN, domain0: 0.1, domainN: 1.5};
  expect(logResult).toEqual(expectedLogResults);
});

test('scales-utils getXYPlotValues', () => {
  const XYPlotProps = {
    colorType: 'linear',
    colorRange: ['#000', '#fff'],
    colorDomain: [0, 1]
  };
  const children = [
    {props: {color: 0}},
    {props: {color: 0.5, opacity: '0.5'}},
    {props: {color: 1}}
  ];
  const result = getXYPlotValues(XYPlotProps, children);
  expect(result[2]._colorValue).toBe('rgb(255, 255, 255)');
  expect(result[1]._opacityValue).toBe('0.5');
});

test('scales-utils #_adjustCategoricalScale', () => {
  [
    {
      scale: {type: 'category', domain: ['a', 'b', 'c'], range: [0, 10]},
      distance: 10
    },
    {
      scale: {type: 'category', domain: ['a'], range: [1, 10]},
      distance: 9
    },
    {
      scale: {type: 'ordinal', domain: ['a', 'b', 'c', 'd'], range: [10, 0]},
      distance: 2.5
    },
    {
      scale: {type: 'ordinal', domain: ['a'], range: [10, 1]},
      distance: 9
    }
  ].forEach(({scale, distance}) => {
    expect(_adjustCategoricalScale(scale)).toEqual({...scale, distance});
  });
});

test('scale-utils #getOptionalScaleProps', () => {
  const foundProps = getOptionalScaleProps({node: 1, x: 2, margins: 4});
  expect(foundProps).toEqual({});

  const paddingProps = getOptionalScaleProps({
    node: 1,
    x: 2,
    margins: 4,
    coolDogExplosionPadding: 10
  });
  expect(paddingProps).toEqual({coolDogExplosionPadding: 10});
});

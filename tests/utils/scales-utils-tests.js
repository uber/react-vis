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

import test from 'tape';
import {
  _adjustCategoricalScale,
  getScaleObjectFromProps,
  getScalePropTypesByAttribute,
  getAttributeFunctor,
  getAttr0Functor,
  getAttributeScale,
  getAttributeValue,
  getFontColorFromBackground,
  _getSmallestDistanceIndex,
  getScaleFnFromScaleObject,
  _getScaleDistanceAndAdjustedDomain,
  extractScalePropsFromProps,
  getMissingScaleProps,
  literalScale
} from 'utils/scales-utils';

const isScaleConsistent = (scaleObject, attr) => {
  return scaleObject && scaleObject.range && scaleObject.domain &&
    scaleObject.type && scaleObject.attr === attr;
};

const _allData = [[{x: 1}, {x: 2}, {x: 3}, {x: 2}]];
const _xValue = 20;
const xRange = [0, 100];
const xDomain = [1, 5];
const xType = 'ordinal';
const xDistance = 10;

test('scales-utils #getScaleObjectFromProps ', t => {
  // with empty props
  const nullResult = getScaleObjectFromProps({}, 'x');
  t.equal(nullResult, null, 'Should return null if no props available.');
  // with empty domain
  const noRangeResult = getScaleObjectFromProps({xDomain}, 'x');
  t.equal(noRangeResult, null, 'Should be null if no domain is passed');
  // with empty range
  const noDomainResult = getScaleObjectFromProps({xRange}, 'x');
  t.equal(noDomainResult, null, 'Should be null if no range is passed');

  // with all props
  const completeResult = getScaleObjectFromProps({xRange, _allData, xDomain, xType, xDistance}, 'x');
  t.ok(isScaleConsistent(completeResult, 'x'), 'Should be a consistent scale');
  t.equal(completeResult.type, xType, 'Should have same type that was passed by detault');
  // does not mutate passed domain
  const tXDomain = [1, 5];
  const scaleObj = getScaleObjectFromProps({
    xRange,
    _adjustBy: ['x'],
    _adjustWhat: [0],
    _allData,
    xDomain: tXDomain, xDistance
  }, 'x');

  t.deepEqual(scaleObj.domain, [0.5, 5.5], 'Correct adjustment of domain');
  t.deepEqual(tXDomain, [1, 5], 'original domain object should contain the same values');

  // with the value that overrides props
  const valueResult = getScaleObjectFromProps({x: 10, _allData}, 'x');
  t.ok(isScaleConsistent(valueResult, 'x'), 'Should be a consistent scale');
  t.equal(valueResult.isValue, true, 'Should have isValue = true');
  t.end();
});

test('scales-utils #getScalePropTypesByAttribute', t => {
  const result = Object.keys(getScalePropTypesByAttribute('size'));
  const expectedResult = ['_sizeValue', 'sizeDomain', 'sizeRange', 'sizeType', 'sizeDistance', 'sizeBaseValue'];
  t.deepEqual(result, expectedResult, 'should find the correct scale prop attributes');
  t.end();
});

test('scales-utils #getAttributeFunctor', t => {
  // without props
  let result = getAttributeFunctor({_xValue}, 'x');
  t.ok(
    result({x: Math.random()}) === _xValue,
    `No props: Fallback value ${_xValue} should be returned by the produced functor`
  );
  t.equal(result({}), _xValue,
    'value from the props is used as default value if no argument passed to functor'
  );
  // with props
  result = getAttributeFunctor({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  t.ok(isFunction, 'Result should be a function');
  t.equal(result(_allData[0][0]), xRange[0], 'Function should reflect values properly');

  t.equal(result({data: {x: 10}}), 225, 'should find the correct transformed value');
  t.end();
});

test('scales-utils #getAttr0Functor', t => {
  // without props
  let result = getAttr0Functor({}, 'x');
  t.equal(null, null, 'should get null when given no props');

  // using a literal scale to check that the fall back is working correctly
  const exNaughtData = [[{x: 1, x0: 1}, {x: 0}, {x: 3, x0: 3}, {x: 2, x0: 4}]];
  result = getAttr0Functor({
    xRange,
    _allData: exNaughtData,
    xDomain,
    xType: 'literal',
    xDistance
  }, 'x');
  t.ok(typeof result === 'function', 'Result should be a function');
  t.equal(result(exNaughtData[0][0]), 1, 'Function should reflect values properly');
  t.equal(result(exNaughtData[0][1]), 1, 'Function should fallback to base value properly');

  t.equal(result({data: {x: 10, x0: 5}}), 5, 'should find the correct transformed value');

  // now with a linear scale
  result = getAttr0Functor({
    xRange,
    _allData: exNaughtData,
    xDomain,
    xType: 'linear',
    xDistance
  }, 'x');

  t.ok(typeof result === 'function', 'Result should be a function');
  t.equal(result(exNaughtData[0][0]), xRange[0], 'Function should reflect values properly');
  t.equal(result(exNaughtData[0][1]), 0, 'Function should fallback to base value properly');

  t.equal(result({data: {x: 10, x0: 5}}), 100, 'should find the correct transformed value');
  t.end();
});

test('scales-utils #getAttributeScale', t => {
  // without props
  let result = getAttributeScale({}, 'x');
  t.ok(result === null, 'No props: Result should be null');
  // with props
  result = getAttributeScale({xRange, xDomain}, 'x');
  const isFunction = typeof result === 'function';
  t.ok(isFunction, 'Result should be a function');
  t.equal(result(_allData[0][0].x), xRange[0], 'Result scale is valid');

  t.end();
});

test('scales-utils #getAttributeValue ', t => {
  // without props
  let result = getAttributeValue({_xValue}, 'x');
  t.ok(result === _xValue, 'No Props: Fallback value should be returned');
  // with props
  result = getAttributeValue({x: 10}, 'x');
  t.equal(result, 10, 'The value should be returned');
  // with props including a scale type
  result = getAttributeValue({opacity: 0.5, opacityType: 'literal'}, 'opacity');
  t.equal(result, 0.5, 'The value should be returned');
  t.end();
});

test('scales-utils #_getSmallestDistanceIndex', t => {
  const scaleObj = {type: 'linear', domain: [0, 1], range: [0, 1]};
  const runTest = arg => _getSmallestDistanceIndex(arg, scaleObj);

  t.equal(runTest([0, 0, 2]), 1);
  t.equal(runTest([0, 1, 2]), 1);
  t.equal(runTest([0, 2, 2]), 2);
  t.equal(runTest([0, 2, 2]), 2);
  t.equal(runTest([1, 2, 2]), 2);
  t.equal(runTest([2, 2, 2]), 1);
  t.end();
});

test('scales-utils #extractScalePropsFromProps', t => {

  t.ok(
    Object.keys(extractScalePropsFromProps({}, [])).length === 0,
    'Should return empty object on empty values'
  );

  const props = {
    aType: 'linear',
    aRange: [1, 2],
    _aValue: 10,
    somethingElse: [],
    bDomain: [1, 2, 3]
  };

  const result = extractScalePropsFromProps(props, ['a', 'b']);

  t.ok(Object.keys(result).length === 4 && result.aType === props.aType &&
    result.aRange === props.aRange && result._aValue === props._aValue &&
    result.bDomain === props.bDomain,
    'Should return valid object');
  t.end();
});

test('scales-utils #getMissingScaleProps', t => {
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
  const paddedDayOne = (dayOne - ((dayTen - dayOne) * 0.1));
  const paddedDayTen = (dayTen + ((dayTen - dayOne) * 0.1));
  const fakePadding = 10;

  t.ok(Object.keys(getMissingScaleProps({}, [], [])).length === 0,
    'Should return empty result on empty arguments');
  const result = getMissingScaleProps({}, _allData[0], ['x']);
  t.ok(Boolean(result.xDomain) && result.xDomain.length === 2 &&
    result.xDomain[0] === 1 && result.xDomain[1] === 3,
    'Should return a valid object');

  t.deepEqual(
    getMissingScaleProps({
      xPadding: fakePadding
    }, fakeDataInteger, ['x']).xDomain,
    fakeDataIntegerDomain,
    'should pad number xDomain'
  );
  t.deepEqual(
    getMissingScaleProps({
      xPadding: fakePadding,
      xDomain: fakeDomain
    }, fakeDataInteger, ['x']),
    {},
    'should not pad if xDomain is already supplied'
  );
  t.deepEqual(
    getMissingScaleProps({
      yPadding: fakePadding
    }, fakeDataInteger, ['y']).yDomain,
    fakeDataIntegerDomain,
    'should pad number yDomain'
  );
  t.deepEqual(
    getMissingScaleProps({
      xPadding: fakePadding
    }, fakeDataString, ['x']).xDomain,
    fakeDataStringDomain,
    'should not pad non-number domain'
  );
  t.deepEqual(
    getMissingScaleProps({
      xPadding: fakePadding
    }, fakeDataUnixTime, ['x']).xDomain,
    [paddedDayOne, paddedDayTen],
    'should pad unix time xDomain'
  );
  t.end();
});

test('scales-utils #literalScale', t => {
  const s = literalScale(5);

  t.equal(s(0.5), 0.5, 'acts as the identity');
  t.equal(s(1), 1, 'acts as the identity');
  t.equal(s(1.5), 1.5, 'acts as the identity');
  t.equal(s(2), 2, 'acts as the identity');
  t.equal(s(2.5), 2.5, 'acts as the identity');
  t.equal(s(), 5, 'accepts a default value');
  t.equal(s('2'), '2', 'does NOT coerce input to a number');

  t.end();
});

test('scales-utils #getFontColorFromBackground', t => {
  t.equal(getFontColorFromBackground('#fff'), '#222', 'should find correct color');
  t.equal(getFontColorFromBackground('#000'), '#fff', 'should find correct color');
  t.equal(getFontColorFromBackground(null), null, 'sensible default');

  t.end();
});

test('scales-utils #getScaleFnFromScaleObject', t => {
  t.equal(getScaleFnFromScaleObject(), null, 'should recieve null for undefined');
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

  t.deepEqual(linearScale.domain(), [0, 1], 'should set the domain correctly');
  t.deepEqual(linearScale.range(), [1, 0], 'should set the range correctly');

  t.deepEqual(literalScaleWithDefaultValue(), 5, 'literal scale should handle default values');
  t.deepEqual(literalScaleWithDefaultValue(2), 2, 'literal scale should work as such with argument');

  const modScaleWithZero = getScaleFnFromScaleObject({type: 'linear', domain: [0, 0], range: [1, 0]});
  t.deepEqual(modScaleWithZero.domain(), [-1, 0], 'should build a generic domain about zero if the domain is closed');

  const modScale = getScaleFnFromScaleObject({type: 'linear', domain: [1, 1], range: [1, 0]});
  t.deepEqual(modScale.domain(), [-1, 1], 'should build a generic domain that reflects about zero');
  t.end();
});

function generateFakeData() {
  return new Array(100).fill(0).map((zero, i) => ({x: i}));
}

test('scales-utils #_getScaleDistanceAndAdjustedDomain', t => {
  const FAKE_DATA = generateFakeData();
  const scaleObject = {
    attr: 'x',
    domain: [0, 100],
    range: [0, 1],
    type: 'linear'
  };
  const resultObject = _getScaleDistanceAndAdjustedDomain(FAKE_DATA, scaleObject);
  const expectedResults = {distance: 0.009900990099009799, domain0: -0.5, domainN: 100.5};
  t.deepEqual(resultObject, expectedResults, 'should fine reasonable results');

  const logScaleObject = {
    attr: 'x',
    domain: [-0.5, 1],
    range: [1, 10],
    type: 'log'
  };
  const logResult = _getScaleDistanceAndAdjustedDomain(FAKE_DATA, logScaleObject);
  const expectedLogResults = {distance: Infinity, domain0: 0.1, domainN: 1.5};
  t.deepEqual(logResult, expectedLogResults, 'should fine reasonable results');

  t.end();
});

test('scales-utils #_adjustCategoricalScale', t => {
  [{
    scale: {type: 'category', domain: ['a', 'b', 'c'], range: [0, 10]},
    distance: 10
  }, {
    scale: {type: 'category', domain: ['a'], range: [1, 10]},
    distance: 9
  }, {
    scale: {type: 'ordinal', domain: ['a', 'b', 'c', 'd'], range: [10, 0]},
    distance: 2.5
  }, {
    scale: {type: 'ordinal', domain: ['a'], range: [10, 1]},
    distance: 9
  }].forEach(({scale, distance}) => {
    t.deepEqual(_adjustCategoricalScale(scale), {...scale, distance}, 'should correctly adjust a categorical scale');
  });
  t.end();
});

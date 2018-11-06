'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

var DISCRETE_COLOR_RANGE = exports.DISCRETE_COLOR_RANGE = ['#12939A', '#79C7E3', '#1A3177', '#FF9833', '#EF5D28'];

var EXTENDED_DISCRETE_COLOR_RANGE = exports.EXTENDED_DISCRETE_COLOR_RANGE = ['#19CDD7', '#DDB27C', '#88572C', '#FF991F', '#F15C17', '#223F9A', '#DA70BF', '#125C77', '#4DC19C', '#776E57', '#12939A', '#17B8BE', '#F6D18A', '#B7885E', '#FFCB99', '#F89570', '#829AE3', '#E79FD5', '#1E96BE', '#89DAC1', '#B3AD9E'];

var CONTINUOUS_COLOR_RANGE = exports.CONTINUOUS_COLOR_RANGE = ['#EF5D28', '#FF9833'];

var SIZE_RANGE = exports.SIZE_RANGE = [1, 10];

var OPACITY_RANGE = exports.OPACITY_RANGE = [0.1, 1];
var OPACITY_TYPE = exports.OPACITY_TYPE = 'literal';
var DEFAULT_OPACITY = exports.DEFAULT_OPACITY = 1;

var DEFAULT_SIZE = exports.DEFAULT_SIZE = 5;

var DEFAULT_COLOR = exports.DEFAULT_COLOR = DISCRETE_COLOR_RANGE[0];

var DEFAULT_TICK_SIZE = exports.DEFAULT_TICK_SIZE = 7;
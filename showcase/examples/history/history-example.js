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
import {
  XYPlot,
  XAxis,
  YAxis,
  LineMarkSeries,
  makeWidthFlexible,
  LabelSeries
} from 'index';

import {EXTENDED_DISCRETE_COLOR_RANGE} from 'theme';

import HistoryLog from './history.json';

const blobbedHistry = HistoryLog.reduce((acc, row) => {
  if (!acc[row.email]) {
    acc[row.email] = [];
  }
  acc[row.email].push(row);
  return acc;
}, {});

const commitsByAuthor = Object.keys(blobbedHistry).map((email, index) => {
  return blobbedHistry[email].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }).reduce((acc, commit) => {
    const x = new Date(commit.date).getTime();
    if (!x) {
      return acc;
    }
    const previousLog = acc[acc.length - 1];
    acc.push({
      x,
      y: (previousLog ? previousLog.y : 0) + 1,
      commiter: commit.author,
      rotation: 30
    });
    return acc;
  }, []);
}).filter(commits => commits.length > 0);

const lines = commitsByAuthor.map((commits, index) => {
  return (
    <LineMarkSeries
      data={commits}
      key={index}
      color={EXTENDED_DISCRETE_COLOR_RANGE[index % EXTENDED_DISCRETE_COLOR_RANGE.length]}
      />
  );
});

const authors = commitsByAuthor.map(commits => {
  const lastCommit = commits[commits.length - 1];
  return {
    ...lastCommit,
    label: lastCommit.commiter.toUpperCase(),
    style: {
      fontSize: '8'
    }
  };
});

const FlexibleXYPlot = makeWidthFlexible(XYPlot);

export default class HistoryExample extends React.Component {
  render() {
    return (
      <div className="history-example">
        <div className="chart">
          <FlexibleXYPlot
            animation
            margin={50}
            yType="log"
            xType="time"
            height={500}>
            <XAxis />
            <YAxis tickFormat={t => t}/>
            {lines}
            <LabelSeries data={authors} />
          </FlexibleXYPlot>
        </div>
      </div>
    );
  }
}

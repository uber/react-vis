// Copyright (c) 2016 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import window from 'global/window';
import document from 'global/document';
import {isReactDOMSupported} from '../../src/utils/react-utils';

import SimpleRadialChartExample from './views/simple-radial-chart-example';
import DonutChartExampleExample from './views/donut-chart-example';
import CustomRadiusRadialChartExample from './views/custom-radius-radial-chart-example';
import '../main.scss';
import '../../src/styles/radial-chart.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {width: window.innerWidth};
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
  }

  render() {
    return (
      <article id="radial-charts">
        <h1>Radial Chart</h1>
        <section>
          <h3>Simple Radial Chart</h3>
          <SimpleRadialChartExample />
        </section>
        <section>
          <h3>Simple Donut Chart</h3>
          <DonutChartExampleExample />
        </section>
        <section>
          <h3>Custom Radius</h3>
          <CustomRadiusRadialChartExample />
        </section>
      </article>
    );
  }
}

// Cannot render to body anymore: react is throwing warnings. React.render()
// was deprecated in 0.15.0
//
// The following code is boilerplate the make the examples work with React
// 0.14.0 and 0.15.0. Do not use it in your app.
//
// When using >= 0.15.0, render with ReactDOM.render(). Otherwise, use React.render()

const el = document.createElement('div');

const render = isReactDOMSupported() ?
  ReactDOM.render :
  React.render; // eslint-disable-line react/no-deprecated

document.body.appendChild(el);

render(<App />, el);

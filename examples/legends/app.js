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

import ContinuousColorLegendExample from './views/continuous-color-example';
import HorizontalDiscreteColorLegendExample from './views/horizontal-discrete-color-example';
import VerticalDiscreteColorLegendExample from './views/vertical-discrete-color-example';
import SearchableDiscreteColorLegendExample from './views/searchable-discrete-color-example';
import ContinuousSizeLegendExample from './views/continuous-size-example';
import '../main.scss';
import '../../src/styles/legends.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {width: window.innerWidth};
    window.addEventListener('resize', () => this.setState({width: window.innerWidth}));
  }

  render() {
    return (
      <article id="legends">
        <h1>Legends</h1>
        <h2>Discrete color legend</h2>
        <section>
          <h3>Vertical legend</h3>
          <VerticalDiscreteColorLegendExample />
        </section>
        <section>
          <h3>Horizontal legend</h3>
          <HorizontalDiscreteColorLegendExample />
        </section>
        <section>
          <h3>Discrete color legend with search</h3>
          <SearchableDiscreteColorLegendExample />
        </section>
        <h2>Continuous color legend</h2>
        <section>
          <h3>Default legend</h3>
          <ContinuousColorLegendExample />
        </section>
        <h2>Continuous size legend</h2>
        <section>
          <h3>Default legend</h3>
          <ContinuousSizeLegendExample />
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

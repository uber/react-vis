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

import React, {Component} from 'react';
import PropTypes from 'prop-types';

const focusEvents = (eventType = '') => ([
  `${eventType}Blur`,
  `${eventType}Focus`
]);

const keyEvents = (eventType = '') => ([
  `${eventType}KeyDown`,
  `${eventType}KeyPress`,
  `${eventType}KeyUp`
]);

const nonMouseEvents = (eventType = '') => ([
  ...focusEvents(eventType),
  ...keyEvents(eventType)
]);

const mouseEvents = (eventType = '') => ([
  `${eventType}Click`,
  `${eventType}MouseEnter`,
  `${eventType}MouseLeave`,
  `${eventType}MouseOut`,
  `${eventType}MouseOver`
]);

const interactiveEvents = (eventType = '') => ([
  ...focusEvents(eventType),
  ...keyEvents(eventType),
  ...mouseEvents(eventType)
]);

const prependOn = s => `on${s}`;

const propTypeReduction = (accumulator, current) => {
  accumulator[current] = PropTypes.func;
  return accumulator;
};

export const events = interactiveEvents();
export const eventProps = events.map(prependOn);
export const eventPropTypes = eventProps.reduce(propTypeReduction, {});

export const seriesEvents = interactiveEvents('Series');
export const seriesEventProps = seriesEvents.map(prependOn);
export const seriesEventPropTypes = seriesEventProps.reduce(propTypeReduction, {});

export const valueEvents = interactiveEvents('Value');
export const valueEventProps = valueEvents.map(prependOn);
export const valueEventPropTypes = valueEventProps.reduce(propTypeReduction, {});

export const focusableHOC = (eventPropNames = nonMouseEvents().map(prependOn)) =>
  WrappedComponent =>
    class FocusableWrapper extends Component {
      render() {
        const focusable = eventPropNames.some(propName => this.props[propName]);
        return <WrappedComponent {...this.props} {...{focusable}} />;
      }
    };

export const Focusable = focusableHOC();
export const SeriesFocusable = focusableHOC(nonMouseEvents('Series').map(prependOn));
export const ValueFocusable = focusableHOC(nonMouseEvents('Value').map(prependOn));

const passThroughReduction = props =>
  (accumulator, current) => {
    accumulator[current] = props[current];
    return accumulator;
  };

const handlerReduction = (eventType = '', props, d) =>
  (accumulator, current) => {
    const eventName = current.replace(eventType, '');
    accumulator[eventName] = event => props[current](d, event);
    return accumulator;
  };

export const eventHandlerPassthrough = props =>
  eventProps
  .filter(e => props[e])
  .reduce(passThroughReduction(props), {});

export const eventHandlers = props =>
  eventProps
  .filter(e => props[e])
  .reduce(handlerReduction('', props), {});

export const seriesEventHandlerPassThrough = props =>
  seriesEventProps
  .filter(e => props[e])
  .reduce(passThroughReduction(props), {});

export const seriesEventHandlers = props =>
  seriesEventProps
  .filter(e => props[e])
  .reduce(handlerReduction('Series', props), {});

export const valueEventHandlerPassThrough = props =>
  valueEventProps
  .filter(e => props[e])
  .reduce(passThroughReduction(props), {});

export const valueEventHandlers = (props, d) =>
  valueEventProps
  .filter(e => props[e])
  .reduce(handlerReduction('Value', props, d), {});

export default {
  eventHandlerPassthrough,
  eventHandlers,
  eventProps,
  eventPropTypes,
  events,
  Focusable,
  seriesEventHandlerPassThrough,
  seriesEventHandlers,
  seriesEventProps,
  seriesEventPropTypes,
  seriesEvents,
  SeriesFocusable,
  valueEventHandlerPassThrough,
  valueEventHandlers,
  valueEventProps,
  valueEventPropTypes,
  valueEvents,
  ValueFocusable
};

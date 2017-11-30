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

const [major, minor] = React.version.split('.');
const versionHigherThanThirteen = Number(minor) > 13 || Number(major) > 13;

export const isReactDOMSupported = () => versionHigherThanThirteen;

/**
 * Support React 0.13 and greater where refs are React components, not DOM
 * nodes.
 * @param {*} ref React's ref.
 * @returns {Element} DOM element.
 */
export const getDOMNode = ref => {
  if (!isReactDOMSupported()) {
    return ref && ref.getDOMNode();
  }
  return ref;
};

const USED_MESSAGES = {};
const HIDDEN_PROCESSES = {
  test: true,
  production: true
};

/**
 * Warn the user about something
 * @param {String} message - the message to be shown
 * @param {Boolean} onlyShowMessageOnce - whether or not we allow the
 - message to be show multiple times
 */
export function warning(message, onlyShowMessageOnce = false) {
  /* eslint-disable no-undef, no-process-env */
  if (process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */
  if (!onlyShowMessageOnce || !USED_MESSAGES[message]) {
    /* eslint-disable no-console */
    console.warn(message);
    /* eslint-enable no-console */
    USED_MESSAGES[message] = true;
  }
}

/**
 * Convience wrapper for warning
 * @param {String} message - the message to be shown
 */
export function warnOnce(message) {
  warning(message, true);
}

/**
 * Safely returns list of CSS from a CSS Style Sheet.
 * @param {CSSStyleSheet} styleSheet  - CSS style sheet
 * @returns {CSSRuleList} list of CSS rules
 */
function getCSSRules(styleSheet) {
  // Without this check accessing styleSheet.cssRules throws SecurityErrror in Firefox
  // See: https://github.com/uber/react-vis/issues/650
  if (
    styleSheet.ownerNode.tagName === 'STYLE' ||
    (styleSheet.ownerNode.tagName === 'LINK' &&
      styleSheet.ownerNode.href &&
      styleSheet.ownerNode.href.startsWith(document.location.origin))
  ) {
    try {
      return styleSheet.rules || styleSheet.cssRules;
    } catch (err) {
      return [];
    }
  }
  return [];
}

// special tag for using to check if the style file has been imported
// represented the md5 hash of the phrase "react-vis is cool"
const MAGIC_CSS_RULE = '.react-vis-magic-css-import-rule';
export function checkIfStyleSheetIsImported() {
  /* eslint-disable no-undef, no-process-env */
  if (process && HIDDEN_PROCESSES[process.env.NODE_ENV]) {
    return;
  }
  /* eslint-enable no-undef, no-process-env */

  const foundImportTag = [...document.styleSheets].some(styleSheet => {
    const CSSRulesList = getCSSRules(styleSheet);
    return [...CSSRulesList].some(selector => {
      return selector.selectorText === MAGIC_CSS_RULE;
    });
  });

  if (!foundImportTag) {
    /* eslint-disable max-len */
    warnOnce(
      'REACT-VIS: The style sheet for react-vis has not been imported, checkout https://uber.github.io/react-vis/documentation/general-principles/style for more details.'
    );
    /* eslint-enable max-len */
  }
}

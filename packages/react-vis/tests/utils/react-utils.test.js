import {isReactDOMSupported} from 'utils/react-utils';

describe('react-utils', () => {
  test('isReactDOMSupported', () => {
    expect(isReactDOMSupported()).toBeTruthy();
  });
});

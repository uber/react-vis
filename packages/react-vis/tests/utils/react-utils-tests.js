import {isReactDOMSupported} from 'utils/react-utils';

test('react-utils #isReactDOMSupported', () => {
  expect(isReactDOMSupported()).toBeTruthy();
});

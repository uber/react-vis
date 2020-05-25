import {isReactDOMSupported} from 'utils/react-utils';
import test from 'tape';

test('react-utils #isReactDOMSupported', t => {
  t.ok(isReactDOMSupported(), 'the app is built in a minimum of version 13');
  t.end();
});

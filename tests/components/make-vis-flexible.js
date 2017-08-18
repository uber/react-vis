import test from 'tape';
import {makeWidthFlexible} from 'make-vis-flexible';

test('makeWidthFlexible: displayName given', t => {
  function ChildComponent() {}
  ChildComponent.displayName = 'ChildComponentWithDisplayName';
  const FlexibleComponent = makeWidthFlexible(ChildComponent);
  t.equal(FlexibleComponent.displayName, 'FlexibleChildComponentWithDisplayName', 'should use component display name');
  t.end();
});

test('makeWidthFlexible: displayName not given', t => {
  function ChildComponent() {}
  const FlexibleComponent = makeWidthFlexible(ChildComponent);
  t.equal(FlexibleComponent.displayName, 'FlexibleChildComponent', 'should default to component name');
  t.end();
});


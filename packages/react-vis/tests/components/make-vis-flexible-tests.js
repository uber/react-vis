import {makeWidthFlexible} from 'make-vis-flexible';

test('makeWidthFlexible: displayName given', () => {
  function ChildComponent() {}
  ChildComponent.displayName = 'ChildComponentWithDisplayName';
  const FlexibleComponent = makeWidthFlexible(ChildComponent);
  expect(FlexibleComponent.displayName).toBe(
    'FlexibleChildComponentWithDisplayName'
  );
});

test('makeWidthFlexible: displayName not given', () => {
  function ChildComponent() {}
  const FlexibleComponent = makeWidthFlexible(ChildComponent);
  expect(FlexibleComponent.displayName).toBe('FlexibleChildComponent');
});

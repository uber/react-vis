import {makeWidthFlexible} from '~/make-vis-flexible';

describe('makeWidthFlexible', () => {
  test('displayName given', () => {
    function ChildComponent() {}
    ChildComponent.displayName = 'ChildComponentWithDisplayName';
    const FlexibleComponent = makeWidthFlexible(ChildComponent);
    expect(FlexibleComponent.displayName).toBe(
      'FlexibleChildComponentWithDisplayName'
    );
  });

  test('displayName not given', () => {
    function ChildComponent() {}
    const FlexibleComponent = makeWidthFlexible(ChildComponent);
    expect(FlexibleComponent.displayName).toBe('FlexibleChildComponent');
  });
});

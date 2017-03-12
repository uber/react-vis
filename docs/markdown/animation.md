# Animation

`react-vis` animates its components by default. You can override this behavior by passing `animation` property to the components. Animation property can have one of the following values:

- `true` The child components **will be** animated with the default settings. This is a default value.
- `false` The child components **will not be** animated.
- `Object` The child components **will be** animated with the given settings.

Currently animation object has only one property — `duration` (length of animation in milliseconds).

Animations in `react-vis` are made by both CSS and, in case if animations in a given area are not supported, by JS.

## Animation

Animation makes your charts feel physical, it makes them feel alive, shoot it makes them feel l33t. `react-vis` offers a simple portal into the [react-motion](https://github.com/chenglou/react-motion) animation system by exposing a simple animation prop on most components! This prop accepts three types of values:

*Booleans*: if true is present then `react-vis` will use the `no-wobble` preset (see below)

*Strings*: react-motion offers several different motion presets that cover most use cases. To access them set your animation prop to one of [noWobble, gentle, wobbly, stiff].

<!-- INJECT:"AnimationExample" -->

*Objects*: react-motion expects an object formatting like `{damping: NUMBER, stiffness: NUMBER}`, and if you want to give us an object like that, we will hand it direct to react-motion. You can also pass an object with `{nonAnimatedProps: ['foo', 'bar']}` to prevent those props from being interpolated by d3-interpolator.

<!-- INJECT:"TreemapExample" -->

The above example has `animation: {damping: 9, stiffness: 300}`!

**NOTE** In Jsx the presence of the animation prop is enough to trigger an animation, eg

```javascript
<MarkSeries
  data={nodes}
  animation
  colorType={'category'}
  stroke={'#ddd'}
  strokeWidth={2}
  colorRange={colors}
  />
```

Will be treated as true. If you want to include the animation prop but not have animation be engaged, you need to use animation={null}!

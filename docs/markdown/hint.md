## Hint

`Hint` is a simple component that shows tooltips inside the chart. Hint places itself to the place which is set by your data.
In case if custom representation of is needed, the component is also able to wrap custom JSX. Here is a short example:

```jsx
<Hint value={myValue}>
  <div style={{background: 'black'}}>
    <h3>Value of hint</h3>
    <p>{myValue.x}</p>
  </div>
</Hint>
```

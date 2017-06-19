## Hint

`Hint` is a simple component that shows tooltips inside the chart. `Hint` places itself to the place which is set by your data. In case a custom representation is needed, the component is also able to wrap custom JSX. Here is a short example:

```jsx
<Hint value={myValue}>
  <div style={{background: 'black'}}>
    <h3>Value of hint</h3>
    <p>{myValue.x}</p>
  </div>
</Hint>
```

### Style (optional)
Type: `Object`
You can pass a style object to your Hint component to apply your own styles. See [style](style.md)
```jsx
<Hint value={value} style={{fontSize: 14}}/>
```

Style is a composite component, and individual parts of it can receive different parts.
The different parts are: content, row, title, value. To style a specific part, you can pass an object to the property with that name.
```jsx
<Hint value={value} style={{
  fontSize: 14,
  text: {
    display: 'none'
  },
  value: {
    color: 'red'
  }
}}/>
```

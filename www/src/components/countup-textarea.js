import React from 'react'

function CountupTextarea({
  maxLength,
  defaultValue = '',
  onChange = () => {},
  wrapperClassName,
  ...rest
}) {
  const [length, setLength] = React.useState(defaultValue.length)
  function handleChange(e) {
    setLength(e.target.value.length)
    onChange(e)
  }
  // this allows us to increase the opacity exponensially as they near the maxLength
  const level = Math.pow(length, 6) / Math.pow(maxLength, 6)
  return (
    <div>
      <textarea
        maxLength={maxLength}
        defaultValue={defaultValue}
        onChange={handleChange}
        {...rest}
      />
      <div
        style={{
          opacity: level,
          fontSize: 12,
          color: level > 0.3 ? 'red' : null,
          fontWeight: level > 0.5 ? 'bold' : null,
        }}
      >
        <span>
          {length} / {maxLength}
        </span>
        <span>{length >= maxLength ? ' please be more brief' : null}</span>
      </div>
    </div>
  )
}

export default CountupTextarea

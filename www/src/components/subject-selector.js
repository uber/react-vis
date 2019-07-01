import React from 'react'

function SubjectSelector({
  options,
  noSelectionUi,
  onChange = () => {},
  ...rest
}) {
  const [value, setValue] = React.useState(
    rest.defaultValue || Object.keys(options)[0],
  )
  function handleChange(e) {
    setValue(e.target.selectedOptions[0].value)
    onChange(e)
  }
  return (
    <>
      <select {...rest} onChange={handleChange}>
        {Object.keys(options).map(key => (
          <option key={key} value={key}>
            {options[key].display}
          </option>
        ))}
      </select>
      {options[value] ? options[value].ui : noSelectionUi}
    </>
  )
}

export default SubjectSelector

# Table

Table is a very simple component to show tables.

Note: currently no event listeners and no formatters are supported in the table (to be implemented). The "infinite scroll" and nested headers functionality is _not_ provided as well: please use exising solutions for this.

## Usage

Import the `table` component:
```jsx
import {Table} from 'react-vis';
```

Add following code to your render function:
```jsx
<Table
  height={300}
  width={400}
  data={[
    [1, 2, 3, 4, 5],
    ['one', 'two', 'three', 'four', 'five']
  ]}
  header={
    ['h1', 'h2', 'h3', 'h4', 'h5']
  } />
```

### API Reference

#### width
Type: `number`  
Default: `null`  
Width of the table.

#### height
Type: `number`  
Height of the component. The height should be passed.

#### header
Type: `Array`  
Array of titles for the table header.

#### data
Type: `Array`  
Array of rows. Each row is an array as well. Each value can be a primitive or a React component. In case if the component is passed no formatting is applied.

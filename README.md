# instyled
Generate React components that automatically switch styles in response to prop changes.

## Quick Start

```javascript
import instyled from 'instyled'

const SomeComponent = instyled(d => {
  d({ color: 'red' }) // default style
  d(['hover'], { color: 'blue' })
  d(['deactivated'], { color: 'gray' })
  d(['hover', 'deactivated'], { color: 'lightgray' })
})
```
This will give you a new component `SomeComponent` that accepts properties `hover` and `deactivated`. It will automatically switch to the specified styling for a given combination of "truthy" property values.

So
```javascript
<SomeComponent/>
// -> <div style="color:red;"></div>

<SomeComponent deactivated={true} />
// -> <div style="color:gray;"></div>

<SomeComponent hover={true} />
// -> <div style="color:blue;"></div>

<SomeComponent hover={true} deactivated={true} />
// -> <div style="color:lightgray;"></div>
```

```instyled``` will figure out which style to apply for a given combination

## Input Transforms
Maybe the default API seems overly verbose to you. API's are hard to get right, but don't worry, you're covered. ```instyled``` comes with two built-in input transformers and makes it pretty easy to write your own.

Each of these will give you the same results as the first example above.

### Specify styles with a hierarchical map
```javascript
import { instyledWithTransform, hierarchical } from 'instyled'

const instyled = instyledWithTransform(hierarchical)

const SomeComponent = instyled({
  color: 'red',
  hover: {
    color: 'blue'
  },
  deactivated: {
    color: 'gray',
    hover: {
      color: 'lightgray'
    }
  }
})
```

### Specify styles with a flat map
```javascript
import { instyledWithTransform, flatKeyed } from 'instyled'

const instyled = instyledWithTransform(flatKeyed)

const SomeComponent = instyled({
  $base: { color: 'red' },
  hover: { color: 'blue' },
  deactivated: { color: 'gray' },
  'deactivated_hover': { color: 'grayer' }
})
```

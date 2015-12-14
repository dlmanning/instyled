import instyled, { instyledWithTransform, hierarchical, flatKeyed } from '../src'
import React from 'react'
import { renderToStaticMarkup as render } from 'react-dom/server'

// const style = {
//   display: 'flex',
//   color: 'black',
//   hover: {
//     color: 'orange'
//   },
//   disabled: {
//     color: 'grey',
//     active: {
//       color: 'yellow',
//       blah: 1
//     }
//   },
//   active: {
//     color: 'red',
//     disabled: {
//       color: 'blue'
//     }
//   }
// }

// const style = {
//   hover: { color: 'orange' },
//   disabled: { color: 'grey' },
//   'disabled_active': { color: 'peach'},
//   'hover_active': { color: 'blue' }
// }

// console.log(hierarchical(style))

const styleDefinitionFn = d => {
  d({ display: 'flex', color: 'black' })
  d(['hover'], { color: 'blue' })
  d(['active'], { color: 'red'})
  d(['active', 'disabled'], { color: 'yellow'})
  d(['disabled'], { color: 'grey'})
}


// const Component = instyledWithTransform(flatKeyed)(style, {
//   component: 'div'
// })

const Component = instyled(styleDefinitionFn, { component: 'div'})

const output = render(
  <Component className="steve" hover>
    <h1>Hello World</h1>
  </Component>
)

console.log(output)

// plugins need to return a function that, given a function d,
// returns a function that calls d once per state mapping.

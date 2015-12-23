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

const style = {
  $base: { display: 'flex', color: 'black', width: '90%'},
  hover: { color: 'orange' },
  disabled: { color: 'grey' },
  'disabled_active': { color: 'peach'},
  'hover_active': { color: 'blue' }
}

// console.log(hierarchical(style))
//
// const styleDefinitionFn = d => {
//   d({ display: 'flex', color: 'black' })
//   d(['hover', 'active'], { color: 'blue' }).maybe(['disabled', 'active'])
//   d(['active'], { color: 'red' }).maybe(['disabled'])
//   d(['disabled'], { color: 'grey' })
// }

const Component = instyledWithTransform(flatKeyed)(style, {
  component: 'div',
  staticProps: { name: 'steve' }
})

// const Component = instyled(styleDefinitionFn, { component: 'div'})

const output = render(
  <Component hover mergeStyle={{width: '100%'}}>
    <h1>Hello World</h1>
  </Component>
)

// export const powerSet = a =>
//   Array.from(a).reduce((powerSet, el) =>
//     powerSet.concat(
//       powerSet.map(subset =>
//         new Set(subset).add(el)
//       )
//     ),
//     [new Set()]
//   )
//

console.log(output)

// plugins need to return a function that, given a function d,
// returns a function that calls d once per state mapping.

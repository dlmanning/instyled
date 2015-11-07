import instyled from '../src'
import React from 'react'
import { renderToStaticMarkup as render } from 'react-dom/server'

const style = {
  display: 'flex',
  color: 'black',
  hover: {
    color: 'blue'
  },
  active: {
    color: 'red',
    disabled: {
      color: 'blue'
    }
  },
  disabled: {
    color: 'grey',
    active: {
      color: 'yellow',
      blah: 1
    }
  }
}

const Component = instyled(style)

const output = render(<Component disabled={true}></Component>)

console.log(output)

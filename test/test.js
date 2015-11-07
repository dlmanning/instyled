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

const output = render(<Component disabled><h1>Hello World</h1><h1>Hello O'World</h1></Component>)

console.log(output)

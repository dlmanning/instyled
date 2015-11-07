import React, { Component } from 'react'
import makeStylePicker from './make-style-picker'

const ComponentFactory = (styles, name, tag = 'div') => {
  const stylePicker = makeStylePicker(styles)

  const component = props => {
    const { children, ...etc } = props
    const style = stylePicker(etc)

    return React.createElement(tag, { style }, children)
  }

  if (name != null && typeof name === 'string') {
    name = name[0].toUpperCase() + name.slice(1)
    component.displayName = name
  }

  return component
}

export default ComponentFactory

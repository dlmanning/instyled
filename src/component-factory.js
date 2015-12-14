import React from 'react'
import createGetStyleForProps from './get-style-for-props'

const identity = _ => _

export const instyledWithTransform = (inputTransform) =>
  (styleDefinitions, { component = 'div', name = 'instyled' } = {}) => {
    const getStyleForProps =
      createGetStyleForProps(inputTransform(styleDefinitions))

    const Wrapper = props => {
      const { children, ...etc } = props
      const style = getStyleForProps(etc)

      return React.createElement(component, { style, ...etc }, children)
    }

    if (name != null && typeof name === 'string') {
      name = name[0].toUpperCase() + name.slice(1)
      Wrapper.displayName = name
    }

    return Wrapper
  }

export const instyled = instyledWithTransform(identity)

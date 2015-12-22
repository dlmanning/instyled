import React from 'react'
import makeGetStyleForProps from './makeGetStyleForStates'

const identity = _ => _

export const instyledWithTransform = inputTransform =>
  (styleDefinitions, { component = 'div', name = 'instyled', staticProps = {} } = {}) => {
    const getStyleForProps =
      makeGetStyleForProps(inputTransform(styleDefinitions))

    const Wrapper = props => {
      const { children, mergeStyle, ...etc } = props
      const style = getStyleForProps(etc)

      if (mergeStyle != null) {
        Object.assign(style, mergeStyle)
      }

      return React.createElement(
        component,
        { ...staticProps, style, ...etc },
        children
      )
    }

    if (name != null && typeof name === 'string') {
      name = name[0].toUpperCase() + name.slice(1)
      Wrapper.displayName = name
    }

    return Wrapper
  }

export const instyled = instyledWithTransform(identity)

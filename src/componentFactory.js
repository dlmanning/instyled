import React from 'react'
import factory from './factory'

const identity = _ => _

export const instyledWithTransform = factory(React.createElement)

export const instyled = instyledWithTransform(identity)

import invariant from 'invariant'
import reduce from 'universal-reduce'
import { instyled, instyledWithTransform } from './componentFactory'
import { hierarchical, flatKeyed, defaultsOnly } from './transforms'

export { instyledWithTransform, hierarchical, flatKeyed }

export default (styleDefinitions, options) => {
  const typeOfArg = typeof styleDefinitions
  invariant(
    typeOfArg === 'function' || typeOfArg === 'object',
    'instyled requires a definition function'
  )

  if (typeOfArg === 'object') {
    if (isOnlyDefaultStyle(styleDefinitions)) {
      return instyledWithTransform(defaultsOnly)(styleDefinitions, options)
    }

    console.trace(deprecationWarning)
    return instyledWithTransform(hierarchical)(styleDefinitions, options)
  }

  return instyled(styleDefinitions, options)
}

export const isOnlyDefaultStyle = style =>
  reduce(style, (isDefaultStyle, value) =>
    typeof value === 'string' || typeof value === 'number'
      ? true
      : reduce.reduced(false)
  , true)

const deprecationWarning =
  'Passing a hierarchical object directly to instyled is deprecated and will ' +
  'be removed in the next update. Please switch to using ' +
  'instyledWithTransform(hierarchical) or pass a definition function.'

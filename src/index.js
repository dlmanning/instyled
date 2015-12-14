import invariant from 'invariant'
import { instyled, instyledWithTransform } from './component-factory'
import { hierarchical, flatKeyed } from './transforms'

export { instyledWithTransform, hierarchical, flatKeyed }

export default styleDefinitions => {
  const typeOfArg = typeof styleDefinitions
  invariant(
    typeOfArg === 'function' || typeOfArg === 'object',
    'instyled requires a definition function'
  )

  if (typeOfArg === 'object') {
    console.warn(deprecationWarning)
    return instyledWithTransform(hierarchical)(styleDefinitions)
  } else {
    return instyled(styleDefinitions)
  }
}

const deprecationWarning =
  'Passing a hierarchical object directly to instyled is deprecated and will ' +
  'be removed in the next update. Please switch to using ' +
  'instyledWithTransform(hierarchical) or pass a definition function.'
 

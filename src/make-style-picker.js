import reduce from 'universal-reduce'
import makeStyleMap from './make-style-map'

export default styles => {
  const { states, map } = reduce(styles, makeStyleMap)

  return activeStates => {
    const index = reduce(activeStates, (accum, value, key) => {
      if (value != null) {
        const indexOfCurrentState = states.indexOf(key)
        accum = indexOfCurrentState !== -1
          ? accum |= 1 << indexOfCurrentState
          : accum
      }
      return accum
    }, 0)

    return map[index] || map[0]
  }
}

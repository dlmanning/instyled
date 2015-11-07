import reduce from 'universal-reduce'

const initialValues = () => (
  {
    states: [],
    mask: 0,
    map: {}
  }
)

const makeStyleMap = (accum = initialValues(), value, key) => {
  const typeOfValue = typeof value

  if (Array.isArray(value) ||
      typeOfValue !== 'number' &&
      typeOfValue !== 'string' &&
      typeOfValue !== 'object') {
    throw new Error('Invalid property type for ' + key)
  }

  const { states, map } = accum
  let { mask } = accum

  if (typeOfValue === 'object') {
    if (states.indexOf(key) === -1) {
      states.push(key)
    }
    mask |= (1 << states.indexOf(key))
    reduce(value, makeStyleMap, { states, mask, map })
  } else {
    map[mask] = map[mask] || {}
    map[mask][key] = value
  }

  return accum
}

export default makeStyleMap

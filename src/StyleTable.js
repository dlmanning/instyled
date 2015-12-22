import reduce from 'universal-reduce'

export default function (statesToStyles) {
  return new StyleTable(statesToStyles)
}

class StyleTable {
  constructor (statesToStyles) {
    let largestBit = 1
    const bitMap = new Map()
    const styleTable =
      statesToStyles.reduce((styleTable, [ states, style ]) =>
        styleTable.set(getMaskForStates(states), style),
      new Map())

    function getMaskForStates (states) {
      return reduce(states, (mask, state) => mask + getBitForState(state), 0)
    }

    function getBitForState (state) {
      if (bitMap.has(state)) {
        return bitMap.get(state)
      } else {
        largestBit <<= 1

        bitMap.set(state, largestBit)
        return largestBit
      }
    }

    Object.assign(this, { bitMap, styleTable })
  }

  lookup (states) {
    return this.styleTable.get(
      reduce(states, (mask, state) =>
        this.bitMap.has(state)
          ? mask + this.bitMap.get(state)
          : mask
      , 0)
    )
  }
}

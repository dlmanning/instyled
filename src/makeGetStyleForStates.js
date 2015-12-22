import reduce from 'universal-reduce'
import StyleTable from './StyleTable'
import { union, difference, powerSet } from './utils'

const Private = new WeakMap()

export default fn => {
  const definitions = []

  const define = (states, styles) => {
    if (styles == null) {
      styles = states
      states = []
    }

    const d = new Definition(states, styles)
    definitions.push(d)
    return d
  }

  fn(define)

  const styleTable = StyleTable(
    definitions.reduce((accum, definition) => {
      const { states, style } = Private.get(definition)
      return accum.concat(
        states.map(stateSet => [ stateSet, style ])
      )
    }, [])
  )

  return props => {
    const activeStates =
      reduce(props, (states, value, propName) =>
        value ? states.add(propName) : states,
        new Set()
      )

    return styleTable.lookup(activeStates)
  }
}

class Definition {
  constructor (states, style) {
    const privy = {
      style,
      states: [ new Set(states) ],
      get () {
        return { states: this.states, style: this.style }
      }
    }

    Private.set(this, privy)
  }

  maybe (...args) {
    this.optional(...args)
  }

  optional (states) {
    const privy = Private.get(this)
    const optionals = new Set(states)

    const required = difference(privy.states[0], optionals)

    privy.states = powerSet(optionals)
      .map(subset => union(required, subset))

    return this
  }
}

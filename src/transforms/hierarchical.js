import reduce from 'universal-reduce'
import invariant from 'invariant'

/*

input: {
  ...defaults,
  state1: {
    ...state1,
    state2: {
      ...state1&state2
    }
  },
  state2: {
    ...state2
  }
}

output: d => {
  d({...defaults})
  d(['state1'], {...state1})
  d(['state2'], {...state2})
  d(['state1', 'state2'], {...state1&state2})
}

*/

export default styleRoot => {
  invariant(
    typeof styleRoot === 'object' && !Array.isArray(styleRoot),
    'expected an object'
  )

  const stack = []
  const todo = [{ node: styleRoot }]

  while (todo.length > 0) {
    const { name = [], node } = todo.pop()

    const style = reduce(node, (style, value, key) => {
      const typeOfValue = typeof value
      if (typeOfValue === 'string' || typeOfValue === 'number') {
        style[key] = value
      } else if (typeOfValue === 'object' && !Array.isArray(value)) {
        todo.push({ name: name.concat(key), node: value })
      } else {
        // error
      }

      return style
    }, {})

    stack.push(name.length > 0 ? [ name, style ] : [ style ])
  }

  return d => {
    stack.forEach(item => {
      d(...item)
    })
  }
}

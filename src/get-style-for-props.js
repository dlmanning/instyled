import reduce from 'universal-reduce'
import invariant from 'invariant'

export default fn => {
  invariant(
    typeof fn === 'function',
    'requires a function'
  )

  const internal = {
    recognizedStates: [],
    recognizedStateMasks: new Map(),
    statesToStyle: new Map()
  }

  fn(d(internal))

  reduce(internal.recognizedStates, (map, key, idx) =>
    map.set(key, 1 << idx),
  internal.recognizedStateMasks)

  return getStyleForProps(internal)
}

// export for unit testing only
export const d = ({ recognizedStates, statesToStyle }) =>
  (states, style) => {
    invariant(
      (Array.isArray(states) && style != null && typeof style === 'object') ||
      (typeof states === 'object' && style == null),
      'invalid definition call'
    )

    let mask = 0
    if (style == null) {
      statesToStyle.set(mask, states)
      return
    }

    for (const state of states) {
      const index = recognizedStates.indexOf(state)
      mask |= index > -1
        ? 1 << index
        : 1 << recognizedStates.push(state) - 1
    }

    statesToStyle.set(mask, style)
  }

/* ----------------------------------------------------------------------------
   input: props from react component
   output: {
     style: chosen based on state props on input,
     instyledStates: {
       props recognized as representing known states
     },
     ...unrecognizedProps
   }

   exported for unit testing only
---------------------------------------------------------------------------- */
export const getStyleForProps = ({ recognizedStateMasks, statesToStyle }) =>
  props => {
    const stateMask = reduce(props, (sum, value, key) =>
      recognizedStateMasks.has(key) && value
        ? sum + recognizedStateMasks.get(key)
        : sum
    , 0)

    const style = statesToStyle.has(stateMask)
      ? statesToStyle.get(stateMask)
      : statesToStyle.get(0)

    return Object.assign({}, style)
  }

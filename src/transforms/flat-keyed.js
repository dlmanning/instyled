import reduce from 'universal-reduce'
import invariant from 'invariant'

export default styles => {
  invariant(
    typeof styles === 'object' && !Array.isArray(styles),
    'expected an object'
  )

  const stack = reduce(styles, (stack, value, key) => {
    stack.push([key.split('_'), value])
    return stack
  }, [])

  return d => {
    stack.forEach(item => {
      d(...item)
    })
  }
}

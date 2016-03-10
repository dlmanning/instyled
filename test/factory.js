import create from 'bel/create'
import factory from '../src/factory'
import { flatKeyed } from '../src/transforms'

const instyled = factory(create())(flatKeyed)

// console.log(instyled(
//   { hover: {'background-color': 'blue'}})({ hover: true }))

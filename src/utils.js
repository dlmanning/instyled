export const powerSet = a =>
  Array.from(a).reduce((powerSet, el) =>
    powerSet.concat(
      powerSet.map(subset =>
        new Set(subset).add(el)
      )
    ),
    [new Set()]
  )

export const union = (a, b) =>
  new Set([...a, ...b])

export const difference = (a, b) => new Set(
  Array.from(a)
    .filter(el => !b.has(el))
)

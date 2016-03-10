import makeGetStyleForProps from './makeGetStyleForStates'

export default createElement => inputTransform =>
  (styleDefinitions, { component = 'div', name = 'instyled', staticProps = {} } = {}) => {
    const getStyleForProps =
      makeGetStyleForProps(inputTransform(styleDefinitions))

    const Wrapper = props => {
      const { children, mergeStyle, ...etc } = props
      let style = getStyleForProps(etc)

      if (mergeStyle != null) {
        style = Object.assign({}, style, mergeStyle)
      }

      return createElement(
        component,
        { ...staticProps, style, ...etc },
        children
      )
    }

    if (name != null && typeof name === 'string') {
      name = name[0].toUpperCase() + name.slice(1)
      Wrapper.displayName = name
    }

    return Wrapper
  }

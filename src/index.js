import React, { Component, useContext } from 'react'
import { Provider } from 'react-redux'
import { store } from 'store'
import { createStore } from 'redux'
import reducers from './reducers'
import ScreenCapture from 'components/ScreenCapture'

import ScreenCapture from './context/ScreenCapture'

import Webchat from './containers/App'

// https://github.com/babel/babel-loader/issues/401
// if (!global._babelPolyfill) {
//   require('@babel/polyfill')
// }

export default class CaiWebchat extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(reducers)
  }

  render() {
    const context = useContext(ScreenContext)

    return (
      <Provider store={this.store}>
        <Webchat {...this.props} />
        <ScreenCapture on={context.on} controlCaptue={context.controlCaptue} />
      </Provider>
    )
  }
}

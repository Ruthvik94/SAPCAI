import React, { Component } from 'react'
import NavBar from './NavBar/index'
import Editor from './Editor/index'
import PropTypes from 'prop-types'

import { sendImage } from '../../middlewares/api'

import './style.scss'

class Cropper extends Component {
  state = {
    show: '',
    canvasData: null,
    cropBoxData: null,
    croppedData: null,
    cropper: null,

    downloadable: typeof document.createElement('a').download !== 'undefined',

    cropped: false,
    cropping: false,
    loaded: true,
    name: 'test.png',
    previousUrl: '',
    type: 'image/png',
    url: '',
  }

  constructor(props) {
    super(props)
    // this.refs.editor = React.createRef()
    this.editor = React.createRef()
  }

  componentWillUpdate() {
    this.editor = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.state.url) {
      this.setState({ url: nextProps.url })
    }
  }

  change = action => {
    const { current: editor } = this.editor
    const { url } = this.state

    switch (action) {
      case 'crop':
        editor.crop()
        break

      case 'clear':
        editor.clear()
        break

      case 'restore':
        editor.restore()
        break

      case 'remove':
        editor.reset()
        break

      case 'close':
        this.updateState({
          canvasData: null,
          cropBoxData: null,
          croppedData: null,
          cropper: null,
          cropped: false,
          cropping: false,

          previousUrl: '',
          url: '',
        })

        const { handleVisible } = this.props
        handleVisible()
        break

      case 'mail':
        sendImage({ url: url })
      default:
    }
  }

  updateState = state => {
    this.setState(state)
  }

  render() {
    const data = { ...this.state }
    const { visible } = this.props

    if (!visible) return null

    return (
      <div className="app body">
        <header className="header">
          <span className="title">Edit</span>
          <NavBar data={data} change={this.change.bind(this)} />
        </header>
        <main className="main">
          <Editor ref={this.editor} data={data} update={this.updateState.bind(this)} />
        </main>
      </div>
    )
  }
}

Cropper.propTypes = {
  data: PropTypes.object,
  change: PropTypes.func,
  ref: PropTypes.object,
  update: PropTypes.func,
}

export default Cropper

import React, { Component } from 'react'
import NavBar from './NavBar/index'
import Editor from './Editor/index'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { addBotMessage } from 'actions/messages'
/* import { sendEmail } from 'middlewares/api'
import Config from 'config/body.json' */

import './style.scss'

@connect(
  state => ({
    messages: state.messages,
  }),
  {
    addBotMessage,
  },
)
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
    name: 'issue.png',
    previousUrl: '',
    type: 'image/png',
    url: '',

    mailIndex: '',

    messages: this.props.messages,
  }

  constructor(props) {
    super(props)
    this.editor = React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    const { messages } = props
    if (state.url === '' || state.url === undefined) {
      return {
        url: props.url,
        messages,
      }
    }
    return { messages }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { url, canvasData, cropBoxData, croppedData, cropped, cropping } = this.state
    const {
      url: nextUrl,
      canvasData: nextCanvasD,
      cropBoxData: nextCropBoxD,
      croppedData: nextCroppedD,
      cropped: nextCropped,
      cropping: nextCropping,
    } = nextState

    if (nextProps.url !== this.state.url) {
      return true
    }

    if (
      url !== nextUrl ||
      canvasData !== nextCanvasD ||
      cropBoxData !== nextCropBoxD ||
      croppedData ||
      nextCroppedD ||
      cropped !== nextCropped ||
      cropping !== nextCropping
    ) {
      return true
    }

    return false
  }

  change = async action => {
    const { current: editor } = this.editor
    const { url, messages } = this.state
    const { handleVisible, addBotMessage } = this.props

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

        handleVisible()
        break

      case 'attach':
        const quickReply = {
          type: 'quickReplies',
          markdown: true,
          content: {
            title: '**Do you want to Submit Ticket**',
            buttons: [
              { value: 'SendMail', title: 'Yes', url: url },
              { value: 'DontSendMail', title: 'No' },
            ],
          },
        }

        const data = {
          type: 'picture',
          content: url,
          error: false,
        }

        const lastMessage = messages[messages.length - 1]
        const lastMessageAttachment = lastMessage.attachment

        const check =
          lastMessage && lastMessageAttachment.type === 'text'
            ? lastMessageAttachment.content.includes('Please take a snapshot')
            : false

        this.updateState(addBotMessage([data]), '', true)
        handleVisible()
        if (check) {
          this.updateState(addBotMessage([quickReply]), '', true)
        }
        break
      default:
    }
  }

  updateState = (state, mailIndex, whetherBotMessage) => {
    if (whetherBotMessage) {
      this.setState(prevState => {
        return {
          canvasData: null,
          cropBoxData: null,
          croppedData: null,
          cropper: null,
          cropped: false,
          cropping: false,

          previousUrl: '',
          url: '',

          mailIndex,

          messages: [...prevState.messages, state],
        }
      })
    } else {
      this.setState(state)
    }
  }

  render() {
    const data = { ...this.state }
    const { visible } = this.props

    if (!visible) return null

    return (
      <div className="caiCropper cropperBody">
        <header className="cropperHeader">
          <span className="cropperTitle">Edit</span>
          <NavBar data={data} change={this.change.bind(this)} />
        </header>
        <main className="cropperMain">
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

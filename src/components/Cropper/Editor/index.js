import React, { Component } from 'react'
import Cropper from 'cropperjs'

import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons'
import { faCrop } from '@fortawesome/free-solid-svg-icons'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faRedo } from '@fortawesome/free-solid-svg-icons'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'

class Editor extends Component {
  constructor(props) {
    super(props)
    // this.refs.image = React.createRef()
    this.image = React.createRef()
  }

  componentWillUpdate() {
    this.image = React.createRef()
  }

  start = () => {
    const { data, update } = this.props

    if (data.cropped || this.cropper) {
      return
    }

    this.cropper = new Cropper(this.image.current, {
      autoCrop: false,
      dragMode: 'move',
      background: false,

      ready: () => {
        if (data.croppedData) {
          this.cropper
            .crop()
            .setData(data.croppedData)
            .setCanvasData(data.canvasData)
            .setCropBoxData(data.cropBoxData)

          update({
            croppedData: null,
            canvasData: null,
            cropBoxData: null,
          })
        }
      },

      crop: ({ detail }) => {
        if (detail.width > 0 && detail.height > 0 && !data.cropping) {
          update({
            cropping: true,
          })
        }
      },
    })
  }

  stop = () => {
    if (this.cropper) {
      this.cropper.destroy()
      this.cropper = null
    }
  }

  crop = () => {
    const { cropper } = this
    const { data, update } = this.props

    if (data.cropping) {
      data.croppedData = cropper.getData()
      data.canvasData = cropper.getCanvasData()
      data.cropBoxData = cropper.getCropBoxData()
      update({
        cropped: true,
        cropping: false,
        previousUrl: data.url,
        url: cropper
          .getCroppedCanvas(
            data.type === 'image/png'
              ? {}
              : {
                  fillColor: '#fff',
                },
          )
          .toDataURL(data.type),
      })
      this.stop()
    }
  }

  clear = () => {
    const { data, update } = this.props
    if (data.cropping) {
      this.cropper.clear()
      update({
        cropping: false,
      })
    }
  }

  restore = () => {
    const { data, update } = this.props
    if (data.cropped) {
      update({
        cropped: false,
        previousUrl: '',
        url: data.previousUrl,
      })
    }
  }

  reset = () => {
    const { update } = this.props
    this.stop()
    update({
      cropped: false,
      cropping: false,
      loaded: false,
      name: '',
      previousUrl: '',
      type: '',
      url: '',
    })
  }

  onClick = ({ target }) => {
    const { cropper } = this
    const action =
      target.getAttribute('data-action') ||
      target.parentElement.getAttribute('data-action') ||
      target.parentElement.parentElement.getAttribute('data-action') ||
      target.parentElement.parentElement.parentElement.getAttribute('data-action')

    switch (action) {
      case 'move':
      case 'crop':
        cropper.setDragMode(action)
        break
      case 'zoom-in':
        cropper.zoom(0.1)
        break

      case 'zoom-out':
        cropper.zoom(-0.1)
        break

      case 'rotate-left':
        cropper.rotate(-90)
        break

      case 'rotate-right':
        cropper.rotate(90)
        break

      case 'flip-horizontal':
        cropper.scaleX(-cropper.getData().scaleX || -1)
        break

      case 'flip-vertical':
        cropper.scaleY(-cropper.getData().scaleY || -1)
        break
      default:
    }
  }

  render() {
    const { data } = this.props

    return (
      <div className="editor">
        <div className="canvas" dblclick={this.dblclick}>
          <img
            ref={this.image}
            alt={data.name}
            src={data.url}
            onLoadStart={this.start.bind(this)}
            onLoad={this.start.bind(this)}
          />
        </div>

        <div className="toolbar" onClick={this.onClick.bind(this)}>
          <button className="toolbar__button" data-action="move" title="Move (M)">
            <span>
              <FontAwesomeIcon icon={faArrowsAlt} />
              {/* <img src="https://img.icons8.com/dotty/80/000000/move.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="crop" title="Crop (C)">
            <span>
              <FontAwesomeIcon icon={faCrop} />
              {/* <img src="https://img.icons8.com/metro/26/000000/crop.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="zoom-in" title="Zoom In (I)">
            <span>
              <FontAwesomeIcon icon={faSearchPlus} />
              {/* <img src="https://img.icons8.com/carbon-copy/100/000000/zoom-in.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="zoom-out" title="Zoom Out (O)">
            <span>
              <FontAwesomeIcon icon={faSearchMinus} />
              {/* <img src="https://img.icons8.com/metro/26/000000/zoom-out.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="rotate-left" title="Rotate Left (L)">
            <span>
              <FontAwesomeIcon icon={faUndo} />
              {/* <img src="https://img.icons8.com/material-sharp/24/000000/undo.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="rotate-right" title="Rotate Right (R)">
            <span>
              <FontAwesomeIcon icon={faRedo} />
              {/* <img src="https://img.icons8.com/material-sharp/24/000000/redo.png" /> */}
            </span>
          </button>
          <button
            className="toolbar__button"
            data-action="flip-horizontal"
            title="Flip Horizontal (H)"
          >
            <span>
              <FontAwesomeIcon icon={faArrowsAltH} />
              {/* <img src="https://img.icons8.com/metro/26/000000/horizontal-line.png" /> */}
            </span>
          </button>
          <button className="toolbar__button" data-action="flip-vertical" title="Flip Vertical (V)">
            <span>
              <FontAwesomeIcon icon={faArrowsAltV} />
              {/* <img src="https://img.icons8.com/ios-filled/50/000000/thick-vertical-line.png" /> */}
            </span>
          </button>
        </div>
      </div>
    )
  }
}

export default Editor

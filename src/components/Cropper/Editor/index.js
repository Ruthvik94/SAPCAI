import React, { Component } from 'react'
import Cropper from 'cropperjs'

import './style.scss'

class Editor extends Component {
  constructor(props) {
    super(props)
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
      <div className="cropperEditor">
        <div className="cropperCanvas" dblclick={this.dblclick}>
          <img
            ref={this.image}
            alt={data.name}
            src={data.url}
            onLoadStart={this.start.bind(this)}
            onLoad={this.start.bind(this)}
          />
        </div>

        <div className="cropperToolbar" onClick={this.onClick.bind(this)}>
          <button className="cropperToolbar__button" data-action="move" title="Move (M)">
            <span>
              <i className="fa fa-arrows-alt" aria-hidden="true"></i>
            </span>
          </button>
          <button className="cropperToolbar__button" data-action="crop" title="Crop (C)">
            <span>
              <i className="fa fa-crop" aria-hidden="true"></i>
            </span>
          </button>
          <button className="cropperToolbar__button" data-action="zoom-in" title="Zoom In (I)">
            <span>
              <i className="fa fa-search-plus" aria-hidden="true"></i>
            </span>
          </button>
          <button className="cropperToolbar__button" data-action="zoom-out" title="Zoom Out (O)">
            <span>
              <i className="fa fa-search-minus" aria-hidden="true"></i>
            </span>
          </button>
          <button
            className="cropperToolbar__button"
            data-action="rotate-left"
            title="Rotate Left (L)"
          >
            <span>
              <i className="fa fa-undo" aria-hidden="true"></i>
            </span>
          </button>
          <button
            className="cropperToolbar__button"
            data-action="rotate-right"
            title="Rotate Right (R)"
          >
            <span>
              <i className="fa fa-repeat" aria-hidden="true"></i>
            </span>
          </button>
          <button
            className="cropperToolbar__button"
            data-action="flip-horizontal"
            title="Flip Horizontal (H)"
          >
            <span>
              <i className="fa fa-arrows-h" aria-hidden="true"></i>
            </span>
          </button>
          <button
            className="cropperToolbar__button"
            data-action="flip-vertical"
            title="Flip Vertical (V)"
          >
            <span>
              <i className="fa fa-arrows-v" aria-hidden="true"></i>
            </span>
          </button>
        </div>
      </div>
    )
  }
}

export default Editor

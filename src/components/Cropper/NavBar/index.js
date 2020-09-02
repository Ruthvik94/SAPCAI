import React, { Component } from 'react'
import './style.scss'

class NavBar extends Component {
  onClick = ({ target }) => {
    const action =
      target.getAttribute('data-action') ||
      target.parentElement.getAttribute('data-action') ||
      target.parentElement.parentElement.getAttribute('data-action') ||
      target.parentElement.parentElement.parentElement.getAttribute('data-action')

    if (action) {
      this.props.change(action)
    }
  }

  render() {
    const { data } = this.props
    return (
      <div className="cropperNavbar">
        <nav className="cropperNav" onClick={this.onClick.bind(this)}>
          {data.loaded && (
            <button
              type="button"
              className="cropperNav__button"
              data-action="attach"
              title="Attach to Incident"
            >
              <i className="fa fa-paperclip" aria-hidden="true"></i>
            </button>
          )}
          {data.cropped && (
            <button
              type="button"
              className="cropperNav__button"
              data-action="restore"
              title="Undo (Ctrl + Z)"
            >
              <i className="fa fa-undo" aria-hidden="true"></i>
            </button>
          )}
          {data.cropping && (
            <button
              type="button"
              className="cropperNav__button cropperNav__button--danger"
              data-action="clear"
              title="Cancel (Esc)"
            >
              <i className="fa fa-ban" aria-hidden="true"></i>
            </button>
          )}
          {data.cropping && (
            <button
              type="button"
              className="cropperNav__button cropperNav__button--success"
              data-action="crop"
              title="OK (Enter)"
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          )}
          {data.downloadable && data.loaded && (
            <a
              className="cropperNav__button cropperNav__button--success"
              title="Download"
              download={data.name}
              href={data.url}
            >
              <i className="fa fa-download" aria-hidden="true"></i>
            </a>
          )}
          <button type="button" className="cropperNav__button" data-action="close" title="Close">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
          </button>
        </nav>
      </div>
    )
  }
}

export default NavBar

import React, { Component } from 'react'
import './style.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faBan } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

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
      <div className="navbar">
        <nav className="nav" onClick={this.onClick.bind(this)}>
          {data.loaded && (
            <button type="button" className="nav__button" data-action="mail" title="Send Mail">
              <FontAwesomeIcon icon={faEnvelope} />
              {/* <img src="https://img.icons8.com/material-sharp/24/000000/upload-mail.png" /> */}
            </button>
          )}
          {data.cropped && (
            <button
              type="button"
              className="nav__button"
              data-action="restore"
              title="Undo (Ctrl + Z)"
            >
              <FontAwesomeIcon icon={faUndo} />
              {/* <img src="https://img.icons8.com/material-sharp/24/000000/undo.png" /> */}
            </button>
          )}
          {data.cropping && (
            <button
              type="button"
              className="nav__button nav__button--danger"
              data-action="clear"
              title="Cancel (Esc)"
            >
              <FontAwesomeIcon icon={faBan} />
              {/* <img src="https://img.icons8.com/android/24/000000/cancel.png" /> */}
            </button>
          )}
          {data.cropping && (
            <button
              type="button"
              className="nav__button nav__button--success"
              data-action="crop"
              title="OK (Enter)"
            >
              <FontAwesomeIcon icon={faCheck} />
              {/* <img src="https://img.icons8.com/material-outlined/24/000000/checked-2.png" /> */}
            </button>
          )}
          {data.downloadable && data.loaded && (
            <a
              className="nav__button nav__button--success"
              title="Download"
              download={data.name}
              href={data.url}
            >
              <FontAwesomeIcon icon={faDownload} />
              {/* <img src="https://img.icons8.com/android/24/000000/download.png" /> */}
            </a>
          )}
          <button type="button" className="nav__button" data-action="close" title="Close">
            <FontAwesomeIcon icon={faTimesCircle} />
            {/* <img src="https://img.icons8.com/material-sharp/24/000000/close-window.png" /> */}
          </button>
        </nav>
      </div>
    )
  }
}

export default NavBar

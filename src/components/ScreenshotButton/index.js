import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ScreenContext from '../../context/ScreenCapture'

import './style.scss'

const ScreenShotButton = ({ preferences, value }) => {
  const [capture, startCapture] = useState(false)
  return (
    <React.Fragment>
      <ScreenContext.Provider value={{ on: capture, controlCapture: startCapture }} />
      <div className="RecastScreenShotButtonContainer CaiScreenShotButtonContainer">
        <div className="RecastScreenShotButton CaiScreenShotButton">
          <svg
            onClick={() => {
              startCapture(true)
            }}
            style={{
              width: 23,
              fill: value ? preferences.accentColor : preferences.botMessageColor,
            }}
            viewBox="0 0 24 24"
          >
            <path d="M 0 2 L 0 22 L 24 22 L 24 2 Z M 2 4 L 22 4 L 22 20 L 2 20 Z M 17 7 C 15.894531 7 15 7.894531 15 9 C 15 10.105469 15.894531 11 17 11 C 18.105469 11 19 10.105469 19 9 C 19 7.894531 18.105469 7 17 7 Z M 7.875 9.78125 L 4 12.53125 L 4 18 L 20 18 L 20 14.84375 L 15.9375 12.375 L 12.53125 13.90625 Z" />
          </svg>
        </div>
      </div>
    </React.Fragment>
  )
}

ScreenShotButton.propTypes = {
  preferences: PropTypes.object,
  value: PropTypes.string,
}

export default ScreenShotButton

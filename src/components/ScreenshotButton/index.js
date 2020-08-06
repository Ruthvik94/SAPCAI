import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import domtoimage from 'dom-to-image'

import Loader from 'react-loader-spinner'
import ScreenContext from 'context/ScreenContext'

import './style.scss'

const onCaptureScreenShot = (context, setLoad) => {
  // var node = document.body
  var node = document.getElementById('canvas')

  domtoimage
    .toPng(node)
    .then(function(dataUrl) {
      // console.log(dataUrl);
      setLoad(false)
      context.setCapture(dataUrl)
    })
    .catch(function(error) {
      console.error('oops, something went wrong!', error)
    })
}

const ScreenShotButton = ({ preferences, value }) => {
  const context = useContext(ScreenContext)
  const [load, setLoad] = useState(false)
  return (
    <React.Fragment>
      {!load ? (
        <div className="RecastScreenShotButtonContainer CaiScreenShotButtonContainer">
          <div className="RecastScreenShotButton CaiScreenShotButton">
            <svg
              onClick={() => {
                setLoad(true)
                onCaptureScreenShot(context, setLoad)
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
      ) : (
        <Loader type="Rings" color="#00BFFF" height={40} width={40} visible={load} />
      )}
    </React.Fragment>
  )
}

ScreenShotButton.propTypes = {
  preferences: PropTypes.object,
  value: PropTypes.string,
}

export default ScreenShotButton

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import domtoimage from 'dom-to-image'
import Loader from 'react-loader-spinner'
import Dropdown from 'react-bootstrap/Dropdown'

import ScreenContext from 'context/ScreenContext'

import Plus from 'components/svgs/plus'
import Picture from 'components/svgs/picture'
import Information from 'components/svgs/information'
import './style.scss'

const onCaptureScreenShot = (context, setLoad, botMessage) => {
  // var node = document.body
  var node = document.getElementById('canvas')

  domtoimage
    .toPng(node)
    .then(function(dataUrl) {
      // console.log(dataUrl);
      setLoad(false)
      context.setCapture(dataUrl, botMessage)
    })
    .catch(function(error) {
      console.error('oops, something went wrong!', error)
    })
}

const ScreenShotButton = ({ preferences, value, sendMessage, updateStateWithBotMessage }) => {
  const context = useContext(ScreenContext)
  const [load, setLoad] = useState(false)
  return (
    <React.Fragment>
      {!load ? (
        <div className="RecastScreenShotButtonContainer CaiScreenShotButtonContainer">
          <div className="RecastScreenShotButton CaiScreenShotButton">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                style={{ height: '-webkit-fill-available', paddingTop: '1px', width: '20px' }}
              >
                <Plus />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  style={{ padding: '0.75rem' }}
                  onClick={() => {
                    setLoad(true)
                    onCaptureScreenShot(context, setLoad, updateStateWithBotMessage)
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      paddingRight: '0.3rem',
                    }}
                  >
                    <Picture preferences={preferences} value={value} />
                  </span>
                  Screenshot
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  style={{ padding: '0.75rem' }}
                  onClick={() => {
                    sendMessage('Report an Incident')
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      verticalAlign: 'middle',
                      paddingRight: '0.3rem',
                    }}
                  >
                    <Information preferences={preferences} value={value} />
                  </span>
                  Report Incident
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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

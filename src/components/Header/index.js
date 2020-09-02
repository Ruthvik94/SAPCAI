import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import domtoimage from 'dom-to-image'

import ScreenContext from 'context/ScreenContext'

import Picture from 'components/svgs/picture'
import Information from 'components/svgs/information'
import './style.scss'

const onCaptureScreenShot = (context, setLoad) => {
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

const Header = ({ closeWebchat, preferences, logoStyle, readOnlyMode, sendMessage }) => {
  const context = useContext(ScreenContext)
  const [load, setLoad] = useState(false)

  if (readOnlyMode) {
    return null
  }
  return (
    <div
      className="RecastAppHeader CaiAppHeader"
      style={{
        color: preferences.complementaryColor,
        backgroundColor: preferences.accentColor,
      }}
    >
      {/* <img className='RecastAppHeader--logo CaiAppHeader--logo' src={preferences.headerLogo} style={logoStyle} /> */}

      <div className="RecastAppHeader--title CaiAppHeader--title" style={{ paddingLeft: '1rem' }}>
        {preferences.headerTitle}
      </div>

      {!load ? (
        <div
          className="RecastAppHeader--btn CaiAppHeader--btnA"
          onClick={() => {
            setLoad(true)
            onCaptureScreenShot(context, setLoad)
          }}
        >
          <Picture color={'#ffffff'} />
          <span className="tooltiptext" style={{ right: '7rem' }}>
            Snapshot {/* Screenshot */}
          </span>
        </div>
      ) : (
        <Loader type="TailSpin" color="#00BFFF" height={40} width={40} visible={load} />
      )}

      <div
        className="RecastAppHeader--btn CaiAppHeader--btnA"
        onClick={() =>
          sendMessage({
            type: 'text',
            content: 'Report an Incident',
          })
        }
      >
        <Information color={'#ffffff'} />
        <span className="tooltiptext" style={{ right: '4.5rem' }}>
          Report Incident
        </span>
      </div>

      <div className="RecastAppHeader--btn CaiAppHeader--btn" onClick={closeWebchat}>
        <img src="https://cdn.cai.tools.sap/webchat/close.svg" />
      </div>
    </div>
  )
}

Header.propTypes = {
  closeWebchat: PropTypes.func,
  preferences: PropTypes.object,
  logoStyle: PropTypes.object,
  readOnlyMode: PropTypes.bool,
}

export default Header

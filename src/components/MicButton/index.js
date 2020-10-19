import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Microphone from 'components/svgs/microphone'
import MicrophoneMuted from 'components/svgs/microphoneMuted'

import InputContext from 'context/InputContext'

import './style.scss'

const MicButton = ({ preferences, sendMessage }) => {
  const { setStreaming, showStreaming, speech } = useContext(InputContext)

  useEffect(() => {
    if (showStreaming) {
      speech.start()

      speech.onresult = event => {
        // Get a transcript of what was said.
        const transcript = event.results[0][0].transcript
        if (transcript !== null) {
          speech.abort()
          sendMessage(transcript)

          setStreaming()
        }
      }

      speech.onerror = event => {
        if (event.error == 'no-speech') {
          console.log('No speech was detected. Try again.')
        }
      }
    }
  }, [showStreaming])

  return (
    <div className="RecastMicButtonContainer CaiMicButtonContainer">
      <div className="RecastMicButton CaiMicButton" onClick={setStreaming}>
        {showStreaming ? (
          <Microphone preferences={preferences} />
        ) : (
          <MicrophoneMuted preferences={preferences} />
        )}
      </div>
    </div>
  )
}

MicButton.propTypes = {
  preferences: PropTypes.object,
  value: PropTypes.string,
}

export default MicButton

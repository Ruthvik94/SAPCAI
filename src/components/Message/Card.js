import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { sanitizeUrl } from '@braintree/sanitize-url'
import Viewer from 'react-viewer'

import { truncate, safeArrayOfItem } from 'helpers'

import Button from 'components/Button'

const Card = ({ content, sendMessage, onImageLoaded, readOnlyMode }) => {
  const [visible, setVisible] = useState(false)

  const { title, subtitle, imageUrl, buttons } = content

  // if (imageUrl && sanitizeUrl(imageUrl) === 'about:blank') {
  //   return null
  // }
  // https://sapjira.wdf.sap.corp/browse/SAPMLCONV-6296
  // Need to check if buttons is null before rendering the button html.
  return (
    <div className={'RecastAppCard CaiAppCard'}>
      {imageUrl && (
        <React.Fragment>
          <img
            src={imageUrl}
            onLoad={onImageLoaded}
            className="RecastAppCard--img CaiAppCard--img"
            style={{ cursor: 'pointer' }}
            onClick={() => setVisible(true)}
          />
          <Viewer
            visible={visible}
            onClose={() => {
              setVisible(false)
            }}
            downloadable="true"
            downloadInNewWindow="true"
            downloadUrl={imageUrl}
            changeable="false"
            zIndex="100"
            images={[{ src: imageUrl }]}
          />
        </React.Fragment>
      )}

      <div className="RecastAppCard--text CaiAppCard--text">
        <p className="RecastAppCard--text-title CaiAppCard--text-title">{truncate(title, 80)}</p>
        {subtitle && <p className="Card--text-subtitle">{subtitle}</p>}
      </div>

      {buttons && buttons.length ? (
        <div className="RecastAppCard--button-container CaiAppCard--button-container">
          {safeArrayOfItem(buttons)
            .slice(0, 3)
            .map((b, i) => (
              <Button key={i} button={b} sendMessage={sendMessage} readOnlyMode={readOnlyMode} />
            ))}
        </div>
      ) : null}
    </div>
  )
}

Card.propTypes = {
  content: PropTypes.object,
  sendMessage: PropTypes.func,
  onImageLoaded: PropTypes.func,
  readOnlyMode: PropTypes.bool,
}

export default Card

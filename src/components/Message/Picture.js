import React, { useState } from 'react'
import PropTypes from 'prop-types'
// import { sanitizeUrl } from '@braintree/sanitize-url'
import Viewer from 'react-viewer'

import './style.scss'

const Picture = ({ content, onImageLoaded }) => {
  const [visible, setVisible] = useState(false)

  /* 
    //commenting to allow base64 url to be processed
    if (content && sanitizeUrl(content) === 'about:blank') {
      return null
    } 
  */
  return (
    <React.Fragment>
      <img
        onLoad={onImageLoaded}
        src={content}
        className={'RecastAppPicture CaiAppPicture'}
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
        downloadUrl={content}
        changeable="false"
        zIndex="5000"
        images={[{ src: content }]}
      />
    </React.Fragment>
  )
}

Picture.propTypes = {
  content: PropTypes.string,
  onImageLoaded: PropTypes.func,
}

export default Picture

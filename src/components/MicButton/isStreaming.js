import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style.scss'

class IsStreaming extends Component {
  render() {
    const { image, onImageLoaded } = this.props

    return (
      <div className="RecastAppMessage CaiAppMessage bot">
        <img className="RecastAppMessage--logo CaiAppMessage--logo visible" src={image} />
        <img src="components/MicButton/resources/audioStream.gif" onLoad={onImageLoaded} />
      </div>
    )
  }
}

IsStreaming.propTypes = {
  image: PropTypes.string,
  onImageLoaded: PropTypes.func,
}

export default IsStreaming

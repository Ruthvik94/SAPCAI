import React from 'react'

const ScreenContext = React.createContext()
ScreenContext.displayName = 'ScreenContext'

export const ScreenProvider = ScreenContext.Provider

export const ScreenConsumer = ScreenContext.Consumer

export default ScreenContext

/* {
    on: false,
    controlCaptue: () => {},
  } */

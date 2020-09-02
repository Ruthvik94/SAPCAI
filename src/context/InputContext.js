import React from 'react'

const InputContext = React.createContext()
InputContext.displayName = 'InputContext'

export const InputProvider = InputContext.Provider

export const InputConsumer = InputContext.Consumer

export default InputContext

import 'regenerator-runtime/runtime'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import SpeechService from './service/speechToText'
import { getConverted } from 'middlewares/api'

import { getChannelPreferences } from 'actions/channel'
import App from 'containers/App'

const idChatDiv = 'cai-webchat-div'

if (!document.getElementById(idChatDiv)) {
  const element = document.createElement('div')
  element.id = idChatDiv
  document.body.appendChild(element)
}

const root = document.getElementById(idChatDiv)

const script = document.currentScript || document.getElementById('cai-webchat')

const channelId = script.getAttribute('channelId')
const token = script.getAttribute('token')
const lang = window.webchatMethods.getMemory().memory.language
const user = window.webchatMethods.getMemory().memory.userName

const speech = SpeechService(lang)

const welcomeMessage = `Welcome Aboard ${user}! This is Genie - How may I help you?`

const readOnly = false
if (root && channelId && token) {
  getChannelPreferences(channelId, token).then(preferences => {
    async function changePrefs() {
      // const message = await getConverted(preferences.welcomeMessage, lang)
      const message = await getConverted(welcomeMessage, lang)
      preferences.welcomeMessage = message.data[0]

      const header = await getConverted(preferences.headerTitle, lang)
      preferences.headerTitle = header.data[0]

      ReactDOM.render(
        <Provider store={store}>
          <App
            token={token}
            channelId={channelId}
            preferences={preferences}
            readOnlyMode={readOnly}
            speech={speech}
          />
        </Provider>,
        root,
      )
    }
    changePrefs()
  })
}

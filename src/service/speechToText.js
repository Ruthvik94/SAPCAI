const instantiateSpeechService = language => {
  try {
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    var recognition = new SpeechRecognition()

    recognition.continuous = true
    recognition.lang = language

    return recognition
  } catch (e) {
    console.error(e)
    recognition.abort()
  }
}

export default instantiateSpeechService

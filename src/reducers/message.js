const reducers = {
  contentUpdate(state, payload) {
    const newState = { ...state }
    newState.content      = payload
    newState.charCount    = payload.length
    newState.messageCount = Math.ceil(payload.length / 75)
    return newState
  },

  sendMessage(state, payload) {
    const newState = { ...state }
    newState.sending = true
    return newState
  }
}

export default reducers

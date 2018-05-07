const reducers = {
  initialize(state, payload) {
    const newState = { ...state }
    newState.initialized = true
    return newState
  }
}

export default reducers

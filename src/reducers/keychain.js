const reducers = {
  initialize(state, payload, balanceSats) {
    const newState = { ...state }
    const txCostPerMessage = 10000
    const satsToMbtcs = 100000
    newState.initialized = true
    newState.balance = parseInt(balanceSats / satsToMbtcs * 100) / 100
    newState.messagesBalance = Math.floor(balanceSats / txCostPerMessage)
    return newState
  }
}

export default reducers

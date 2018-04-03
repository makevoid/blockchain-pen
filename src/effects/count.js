const effects = {
  // handle state changes with impure functions.
  // use async/await for async actions
  async incrementAsync(payload, rootState) {
    await new Promise(resolve => setTimeout(resolve, 600))
    this.increment(payload)
  }
}

export default effects

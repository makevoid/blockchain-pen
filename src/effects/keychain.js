const effects = {
  async initializeAsync(payload, rootState) {
    await new Promise(resolve => setTimeout(resolve, 600))
    this.initialize(payload)
  }
}

export default effects

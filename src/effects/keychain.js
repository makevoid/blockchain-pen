const effects = {
  async initializeAsync(payload, rootState) {
    const { keychain } = rootState.keychain
    const { address } = keychain
    const balanceSats = await keychain.balance()
    this.initialize(payload, balanceSats)
  }
}

export default effects

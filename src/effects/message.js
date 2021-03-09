

const effects = {
  async sendMessageAsync(payload, rootState) {
    const { message } = rootState
    const { content } = message
    const { keychain } = rootState.keychain
    const { address } = keychain

    const to = address
    const value = 0.00001 // bitcoin
    const tx = await keychain.send({ to, value })
    console.log("tx:", tx)

    await new Promise(resolve => setTimeout(resolve, 600))
    console.log("Sending message:", content)
    this.sendMessage(content)
  }
}

export default effects

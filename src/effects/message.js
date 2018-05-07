const effects = {
  async sendMessageAsync(payload, rootState) {
    await new Promise(resolve => setTimeout(resolve, 600))
    const content = rootState.message.content
    console.log("Sending message:", content)
    this.sendMessage(content)
  }
}

export default effects

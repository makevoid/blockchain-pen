import React, { Component } from 'react'
import { connect } from 'react-redux'
import Counters from './Counters'

class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.textareaKeyUp  = this.textareaKeyUp.bind(this)
    this.submitForm     = this.submitForm.bind(this)
  }

  textareaKeyUp(evt) {
    const content = evt.target.value
    this.props.contentUpdate(content)
  }

  submitForm() {
    this.props.sendMessage()
  }

  render() {
    return (
      <div className="media-content">
        <div className="field">
          <p className="control">
            <textarea onKeyUp={this.textareaKeyUp} className="textarea" placeholder="Write a message, paste an hash or paste a json payload...">{ this.props.content }</textarea>
          </p>
        </div>
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <a onClick={this.submitForm} className="button is-primary is-medium">Write</a>
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <Counters />
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

const mapState = state => ({
  content: state.content,
})

const mapDispatch = dispatch => ({
  sendMessage:    ()        => dispatch.message.sendMessageAsync(),
  contentUpdate:  (content) => dispatch.message.contentUpdate(content),
})

export default connect(mapState, mapDispatch)(MessageForm)

import React, { Component } from 'react'
import Info from './Info'
import SenderIdentity from './SenderIdentity'
import MessageForm from './MessageForm'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="container">

          <div className="columns">
            <div className="column has-text-right">
              <Info />
            </div>
          </div>
          <div className="s20"></div>

          <article className="media">
            <SenderIdentity />
            <MessageForm />
          </article>

        </div>
      </div>
    );
  }
}

export default Home

import React, { Component } from 'react'
import Info from './Info'
import AddressIdenticon from './AddressIdenticon'
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

          <article className="media">
            <AddressIdenticon />
            <MessageForm />
          </article>

        </div>
      </div>
    );
  }
}

export default Home

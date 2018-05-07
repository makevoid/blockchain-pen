import React, { Component } from 'react'
import Info from './Info'
import AddressIdenticon from './AddressIdenticon'
import Counters from './Counters'

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
            <div className="media-content">
              <div className="field">
                <p className="control">
                  <textarea className="textarea" placeholder="Write a message, paste an hash or paste a json payload..."></textarea>
                </p>
              </div>
              <nav className="level">
                <div className="level-left">
                  <div className="level-item">
                    <a className="button is-primary is-medium">Write</a>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <Counters />
                  </div>
                </div>
              </nav>
            </div>
          </article>

        </div>
      </div>
    );
  }
}

export default Home

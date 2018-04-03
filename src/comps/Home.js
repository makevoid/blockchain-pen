import React, { Component } from 'react'
import Figure from './Figure'

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="container">

          <div className="columns">
            <div className="column has-text-right">
              <div>Bitcon Address: 1address</div>
              <div>x messages</div>
            </div>
          </div>

          <article className="media">
            <Figure address="1abc" />
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
                    0 / 75 chars - 1 message - x mbtc
                    { // 76 chars - 2 message - x mbtc
                    }
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

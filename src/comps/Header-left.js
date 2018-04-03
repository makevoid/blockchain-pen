import React from 'react'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns">
              <div className="column is-narrow">
                <img className="logo" src="/img/stylus.png" />
              </div>
              <div className="column titles">
                <h1 className="title">
                  Blockchain Pen
                </h1>
                <h2 className="subtitle">
                  write permanent messages on the blockchain
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header

import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css"

const Header = () => {
  return (
    <div className="Header">
      <section className="hero">
        <div className="hero-body">
          <div className="container has-text-centered">
          <Link to="/">
            <img alt="Blockchain Pen (logo)" className="logo" src="/img/stylus.png" />
            <h1 className="title">
              Blockchain Pen
            </h1></Link>
            <h2 className="subtitle is-6">
              write permanent messages on the blockchain
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header

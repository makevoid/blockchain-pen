import React from 'react';
import { connect } from 'react-redux'
import identicons from 'identicons'
import './Figure.css';

const Identicon = props => {
  const options = { width: 200, size: 3 }
  const svgData = identicons.generateSVGDataURIString('1address', options)

  return (
    <div className="Identicon">
      <img src={svgData} />
    </div>
  )
}

const Figure = props => (
  <div className="Figure">
    <Identicon />
    <p className="has-text-centered">1adaaadress</p>
  </div>
)

export default Figure

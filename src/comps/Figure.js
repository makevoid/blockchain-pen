import React from 'react';
import identicons from 'identicons'
import './Figure.css';

const Identicon = props => {
  const options = { width: 200, size: 3 }
  const svgData = identicons.generateSVGDataURIString(props.address, options)

  return (
    <div className="Identicon">
      <img src={svgData} alt=""/>
    </div>
  )
}

const Figure = props => (
  <div className="Figure">
    <Identicon address={props.address} />
    <p className="has-text-centered">{ props.address }</p>
  </div>
)

export default Figure

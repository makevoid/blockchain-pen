import React from 'react';
import identicons from 'identicons'

const Identicon = props => {
  const options = { width: 200, size: 3 }
  const svgData = identicons.generateSVGDataURIString(props.address, options)

  return (
    <div className="Identicon">
      <img src={svgData} alt=""/>
    </div>
  )
}

export default Identicon

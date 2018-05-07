import React from 'react';
import Identicon from './Identicon';
import './Figure.css';

const Figure = props => (
  <div className="Figure">
    <Identicon address={props.address} />
    <p className="has-text-centered">{ props.address }</p>
  </div>
)

export default Figure

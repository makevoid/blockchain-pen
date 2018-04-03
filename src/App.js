import React, { Component } from 'react';
import './App.css';
import Header from './comps/Header';
import PropTypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <section className="section">
          <div className="container">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]).isRequired
}

export default App;

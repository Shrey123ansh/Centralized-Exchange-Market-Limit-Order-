import React from 'react'

import PropTypes from 'prop-types'


const Navbar = (props) => {
  return (
    <div className="component3-container">
      <span className="component3-text">{props.text}</span>
      <span className="component3-text1">{props.text1}</span>
    </div>
  )
}

Navbar.defaultProps = {
  text: 'LIMIT ORDER',
  text1: 'MARKET ORDER',
}

Navbar.propTypes = {
  text: PropTypes.string,
  text1: PropTypes.string,
}

export default Navbar

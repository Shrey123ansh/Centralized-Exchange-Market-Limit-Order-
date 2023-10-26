import React from 'react'

import PropTypes from 'prop-types'


const OrderForm = (props) => {
  return (
    <div className="component5-container">
      <div className="component5-container1">
        <span className="component5-text">Order Form</span>
      </div>
      <div className="component5-container2">
        <span className="component5-text1">Select an asset:</span>
      </div>
      <select autoFocus autoComplete="on" onChange={props.onSelectionChange}
            value={props.offer.asset} className="component5-select">
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
        <option value="MATIC">MATIC</option>
        <option value="Google">Google</option>
      </select>
      <div className="component5-container3">
        <span className="component5-text2">Limit Price:</span>
      </div>
      <input
         name="price"
         type="text"
         placeholder="Enter a limit price"
         onChange={props.onTextChange}
         value={props.offer.price}
        className="component5-textinput input"
      />
      <div className="component5-container4">
        <span className="component5-text3">Quantity:</span>
      </div>
      <input
        name="quantity"
        type="text"
        placeholder="Enter an order amount"
        onChange={props.onTextChange}
        value={props.offer.quantity}
        className="component5-textinput1 input"
      />
      <div className="component5-container5">
        <button className="component5-button button" onClick={props.onBuyOffer}>
        BUY
        </button>
        <button className="component5-button1 button" onClick={props.onSellOffer}>
        SELL
        </button>
        
      </div>
    </div>
  )
}

export default OrderForm

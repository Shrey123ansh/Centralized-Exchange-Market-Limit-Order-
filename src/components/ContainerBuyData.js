import React from 'react'

const Component4 = (props) => {
  const sortedOrders = props.orders.slice().sort((a, b) => b.price - a.price);

  return (
    <div>
      {sortedOrders.map((order) =>  (
        <li className="component4-container">
      <div className="component4-container1">
        <span className="component4-text">{order?.selectedUserId}</span>
      </div>
      <div className="component4-container2">
        <span className="component4-text1">{order?.price}</span>
      </div>
      <div className="component4-container3">
        <span className="component4-text2">{order?.quantity}</span>
      </div>
    </li>
      ))}  
    </div>
  )
}

export default Component4

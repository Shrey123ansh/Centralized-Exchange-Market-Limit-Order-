import React from 'react'

const ContainerSellData = (props) => {
  const sortedOrders = props.orders.slice().sort((a, b) => b.price - a.price);

  return (
    <div>
    {sortedOrders.map((order) =>  (
    <li className="component4-container">
      <div className="container-container1">
        <span className="container-text">{order?.selectedUserId}</span>
      </div>
      <div className="container-container2">
        <span className="container-text1">{order?.price}</span>
      </div>
      <div className="container-container3">
        <span className="container-text2">{order?.quantity}</span>
      </div>
    </li>
  ))}  
  </div>
  );

}


export default ContainerSellData

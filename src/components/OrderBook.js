import React from 'react'

import ContainerSellData from './ContainerSellData'
import ContainerBuyData from './ContainerBuyData'

const OrderBook = (props) => {
  
  return (
    <div className="component2-container">
      <div className="component2-container01">
        <div className="component2-container02">
          <span className="component2-text">USER-ID</span>
        </div>
        <div className="component2-container03">
          <span className="component2-text1">PRICE</span>
        </div>
        <div className="component2-container04">
          <span className="component2-text2">QUANTITY</span>
        </div>
      </div>
      <div className="component2-container05">
        <span className="component2-text3">SELL</span>
        <div className="component2-container06"></div>
      </div>
      <div className="component2-container07">
        <ContainerSellData orders ={props.sellorders}/>
      </div>
      <div className="component2-container08"></div>
      <div className="component2-container09">
        <ContainerBuyData orders ={props.buyorders}></ContainerBuyData>
      </div>
      <div className="component2-container10">
        <span className="component2-text4">BUY</span>
        <div className="component2-container11"></div>
      </div>
    </div>
  )
}

export default OrderBook

import React,{useState,useEffect} from 'react'

const ActiveUserComponent = (props) => {

  const [usdBalance, setUsdBalance] = useState(props.userbalanceUSD);
  const [googleBalance, setGoogleBalance] = useState(props.userbalanceBTC);
   
  return (
    <div className="component1-container">
      <div className="component1-container1">
        <span className="component1-text">USER-{props.userid}</span>
      </div>
      <div className="component1-container2">
        <div className="component1-container3">
          <span className="component1-text1">
            <span className="component1-text2">USD</span>
            <span>: </span>
          </span>
          <span className="component1-text4">${props.userbalanceUSD}</span>
        </div>
        <div className="component1-container4">
          <span className="component1-text5">GOOGLE</span>
          <span>: </span>
          <span className="component1-text6">{props.userbalanceBTC}</span>
        </div>
      </div>
    </div>
  )
}


export default ActiveUserComponent

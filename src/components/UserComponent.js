import React,{useState,useEffect} from 'react'


const UserComponent = (props) => {
  const [usdBalance, setUsdBalance] = useState(props.userbalanceUSD);
  const [googleBalance, setGoogleBalance] = useState(props.userbalanceBTC);

  return (
    <div className="app-component-container">
      <div className="app-component-container1">
        <span className="app-component-text">USER-{props.userid}</span>
    </div>
      <div className="app-component-container2">
        <div className="app-component-container3">
          <span className="app-component-text1">
            <span className="app-component-text2">USD</span>
            <span>: </span>
          </span>
          <span className="app-component-text4">${props.userbalanceUSD}</span>
        </div>
        <div className="app-component-container4">
          <span className="app-component-text5">
            <span className="app-component-text6">GOOGLE</span>
            <span>: </span>
          </span>
          <span className="app-component-text8">{props.userbalanceBTC}</span>
        </div>
      </div>
    </div>
  )
}


export default UserComponent

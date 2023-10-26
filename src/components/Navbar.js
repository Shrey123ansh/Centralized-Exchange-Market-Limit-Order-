import React from 'react'


const Navbar = ({ activeTab, onTabClick }) => {
  return (
    <>
        {activeTab=== "LIMIT ORDER"?(
        <div className="component3-container">
        <button className="component3-text" onClick={() => onTabClick('LIMIT ORDER')}>LIMIT ORDER</button>
        <button className="component3-text1" onClick={() => onTabClick('MARKET ORDER')}>MARKET ORDER</button>
        </div>
        ):(
          <div className="component3-container">
          <button className="component3-text1" onClick={() => onTabClick('LIMIT ORDER')}>LIMIT ORDER</button>
          <button className="component3-text" onClick={() => onTabClick('MARKET ORDER')}>MARKET ORDER</button>
          </div>
      )}
      </>
  )
}

export default Navbar

import React, { useEffect, useState, useContext } from "react";
import userList from "../userList.json";

import { Helmet } from "react-helmet";

import Navbar from "../components/Navbar";
import UserComponent from "../components/UserComponent";
import ActiveUserComponent from "../components/ActiveUserComponent";
import LimitOrderForm from "../components/LimitOrderForm";
import MarketOrderForm from "../components/MarketOrderForm";
import OrderBook from "../components/OrderBook";
import "./home.css";

import { ExchangeContext } from "../Context/ExchangeContext";

const Home = (props) => {
  const {
    offer,
    error,
    selectedUserId,
    handleBuyOffer,
    handleSellOffer,
    handleTextChange,
    handleSelectionChange,
    selectUser,
    order,
    bids,
    asks,
  } = useContext(ExchangeContext);

  const [activeTab, setActiveTab] = useState("LIMIT ORDER");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Centralized Exchange</title>
        <meta property="og:title" content="Bumpy Nutty Meerkat" />
      </Helmet>
      <div className="home-container01">
        <span className="home-text">Stock/Crypto Centralized Exchange</span>
        <div className="home-container02"></div>
      </div>
      <Navbar activeTab={activeTab} onTabClick={handleTabClick} />
      <ul className="home-container03">
        {userList.map((user) => (
          <li key={user.id}>
            <button onClick={() => selectUser(user.id)}>
              {selectedUserId === user.id ? (
                <ActiveUserComponent
                  userid={user.id}
                  userbalanceUSD={user.balances.USD}
                  userbalanceBTC={user.balances.GOOGLE}
                />
              ) : (
                <UserComponent
                  userid={user.id}
                  userbalanceUSD={user.balances.USD}
                  userbalanceBTC={user.balances.GOOGLE}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="home-container09">
        {activeTab === "LIMIT ORDER" && (
          <LimitOrderForm
            offer={offer}
            error={error}
            onBuyOffer={handleBuyOffer}
            onSellOffer={handleSellOffer}
            onTextChange={handleTextChange}
            onSelectionChange={handleSelectionChange}
          ></LimitOrderForm>
        )}
        {activeTab === "MARKET ORDER" && (
          <MarketOrderForm
            offer={offer}
            error={error}
            onBuyOffer={handleBuyOffer}
            onSellOffer={handleSellOffer}
            onTextChange={handleTextChange}
            onSelectionChange={handleSelectionChange}
          ></MarketOrderForm>
        )}
        <OrderBook buyorders={bids} sellorders={asks}></OrderBook>
      </div>
    </div>
  );
};

export default Home;

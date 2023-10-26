import React, { useState, useEffect, useRef } from "react";
import userList from "../userList.json";

export const ExchangeContext = React.createContext();

export const ExchangeProvider = ({ children }) => {
  //CREATE ACCOUNT
  // const [error, setError] = useState({});
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(userList[0].id);
  const [offer, setOffer] = useState({
    id: 0,
    asset: "BTC",
    price: 0,
    quantity: 0,
  });

  const [side, setSide] = useState("bid");
  const [quantity, setQuantity] = useState("");
  const [userId, setUserId] = useState("");
  const [quote, setQuote] = useState(0);
  const [error, setError] = useState(null);

  function handleBuyOffer(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    let filledQuantity = order("bid", offer.price, offer.quantity);

    let userId = selectedUserId;
    const updatedOffer = {
      ...offer,
      id: userId, // Corrected placement of id
      quantity: filledQuantity,
    };
    setOffer(updatedOffer);
  }

  function handleSellOffer(event) {
    event.preventDefault();
    if (!isFormValid()) return;

    let filledQuantity = order("ask", offer.price, offer.quantity);

    let userId = selectedUserId;
    const updatedOffer = {
      ...offer,
      id: userId, // Corrected placement of id
      quantity: filledQuantity,
    };
    setOffer(updatedOffer);
  }

  const handleCalculateQuote = (side, quantity) => {
    let remainingQuantity = quantity;
    if (side === "bid") {
      for (let i = asks.length - 1; i >= 0; i--) {
        setAsks((prevAsks) => {
          const newAsks = [...prevAsks];
          newAsks[i].quantity -= remainingQuantity;
          return newAsks;
        });
        flipBalance(
          asks[i].selectedUserId,
          userId,
          Number(remainingQuantity),
          asks[i].price
        );
      }
    } else {
      for (let i = bids.length - 1; i >= 0; i--) {
        setBids((prevBids) => {
          const newBids = [...prevBids];
          newBids[i].quantity -= remainingQuantity;
          return newBids;
        });
        flipBalance(
          selectedUserId,
          Number(bids[i].selectedUserId),
          Number(remainingQuantity),
          bids[i].price
        );
      }
    }
  };

  const order = (side, price, quantity) => {
    const remainingQty = fillOrders(side, price, quantity, selectedUserId);
    if (remainingQty === 0) {
      return;
    }
    if (side === "bid") {
      setBids((prevBids) => [
        ...prevBids,
        {
          selectedUserId,
          price,
          quantity: remainingQty,
        },
      ]);
    } else {
      setAsks((prevAsks) => [
        ...prevAsks,
        {
          selectedUserId,
          price,
          quantity: remainingQty,
        },
      ]);
    }
    const filledQuantity = quantity - remainingQty;
    return filledQuantity;
  };

  function fillOrders(side, price, quantity, userId) {
    // console.log(asks);
    // console.log(bids);
    let remainingQuantity = quantity;
    if (side === "bid") {
      for (let i = asks.length - 1; i >= 0; i--) {
        if (asks[i].price > price) {
          continue;
        }
        if (asks[i].quantity > remainingQuantity) {
          setAsks((prevAsks) => {
            const newAsks = [...prevAsks];
            newAsks[i].quantity -= remainingQuantity;
            return newAsks;
          });
          flipBalance(
            asks[i].selectedUserId,
            userId,
            Number(remainingQuantity),
            asks[i].price
          );
          return 0;
        } else {
          remainingQuantity -= asks[i].quantity;
          flipBalance(
            asks[i].selectedUserId,
            userId,
            Number(asks[i].quantity),
            asks[i].price
          );
          setAsks((prevAsks) => {
            const newAsks = [...prevAsks];
            newAsks.splice(i, 1);
            return newAsks;
          });
        }
      }
    } else {
      // Update bids similarly
      for (let i = bids.length - 1; i >= 0; i--) {
        if (bids[i].price < price) {
          continue;
        }
        if (bids[i].quantity > remainingQuantity) {
          setBids((prevBids) => {
            const newBids = [...prevBids];
            newBids[i].quantity -= remainingQuantity;
            return newBids;
          });
          flipBalance(
            selectedUserId,
            Number(bids[i].selectedUserId),
            Number(remainingQuantity),
            price
          );
          return 0;
        } else {
          remainingQuantity -= bids[i].quantity;
          console.log("hello", 1);

          flipBalance(
            selectedUserId,
            Number(bids[i].selectedUserId),
            Number(bids[i].quantity),
            price
          );
          console.log("hello", 3);
          setBids((prevBids) => {
            const newBids = [...prevBids];
            newBids.splice(i, 1);
            return newBids;
          });
        }
      }
    }
    return remainingQuantity;
  }

  function flipBalance(userId1, userId2, quantity, price) {
    let user1 = userList.find((x) => x.id === userId1);
    let user2 = userList.find((x) => x.id === userId2);
    if (!user1 || !user2) {
      return;
    }
    user1.balances.GOOGLE -= quantity;
    user2.balances.GOOGLE += quantity;
    user1.balances.USD += quantity * price;
    user2.balances.USD -= quantity * price;
  }

  function handleTextChange({ target }) {
    const updatedOffer = {
      ...offer,
      [target.name]: target.value,
    };
    setOffer(updatedOffer);
  }

  function handleSelectionChange(event) {
    const updatedOffer = {
      ...offer,
      asset: event.target.value,
    };
    setOffer(updatedOffer);
  }

  function isFormValid() {
    const _error = {};
    if (offer.asset === "") _error.price = "Asset cannot be empty!";
    if (offer.price <= 0)
      _error.price = "Limit Price cannot be less than zero!";
    if (offer.quantity <= 0)
      _error.quantity = "Order Amount cannot be less than zero!";
    setError(_error);
    return Object.keys(_error).length === 0; // form is valid if the errors object has not properties
  }

  const selectUser = (userId) => {
    setSelectedUserId(userId);
  };

  // const findBestAskPrice = () => {
  //   // Simulate the functionality of findBestAskPrice
  //   // Replace this with your actual logic to fetch best ask price
  //   const asks = [...]; // Replace with your array of asks
  //   return Math.min(...asks.map((ask) => ask.price));
  // };

  // const findBestBidPrice = () => {
  //   // Simulate the functionality of findBestBidPrice
  //   // Replace this with your actual logic to fetch best bid price
  //   const bids = [...]; // Replace with your array of bids
  //   return Math.max(...bids.map((bid) => bid.price));
  // };

  // const handleCalculateQuote = () => {
  //   if (side === 'bid') {
  //     const bestAskPrice = findBestAskPrice();
  //     setQuote(bestAskPrice * quantity);
  //   } else if (side === 'ask') {
  //     const bestBidPrice = findBestBidPrice();
  //     setQuote(bestBidPrice * quantity);
  //   } else {
  //     setError("Invalid 'side' parameter. Please use 'bid' or 'ask'.");
  //     setQuote(0);
  //   }
  // };

  return (
    <ExchangeContext.Provider
      value={{
        offer,
        error,
        selectedUserId,
        handleBuyOffer,
        handleSellOffer,
        handleTextChange,
        handleSelectionChange,
        order,
        selectUser,
        handleCalculateQuote,
        bids,
        asks,
      }}
    >
      {children}
    </ExchangeContext.Provider>
  );
};

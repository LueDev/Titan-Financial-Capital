import React, { useState, useEffect } from "react";

function Deposit({ account, handleAccountChange }) {

  const [deposit, setDeposit] = useState({
    name: "Deposit",
    timestamp: "",
    amount: 0,
    updated_balance: account.balance,
  });

  function handleEventChange(event) {
    const { name, value } = event.target;

    setDeposit((prevObj) => ({
      ...prevObj,
      [name]: value,
      timestamp: "",
      updated_balance: updatedBalance
    }));

      setBank((prevObj) => ({
      ...prevObj,
      balance: updatedBalance,
      transactions: [...account.transactions, newTransaction ]
    }));
  }
  const [bank, setBank] = useState(account)
  const updatedBalance = account.balance + parseFloat(deposit.amount)
  const newTransaction = {
    id: account.transactions.length + 1,
    name: deposit.name,
    timestamp: new Date().toISOString(),
    amount: parseFloat(deposit.amount),
    updated_balance: updatedBalance,
  };
  const updatedTransactions = [...account.transactions, newTransaction]

  useEffect(() => {
    console.log("- - - - - DEPOSIT AMOUNT CHANGED - - - - ")
    console.log("Deposit -- Account balance from Event Change: ", updatedBalance)
    console.log("Transactions: ", updatedTransactions)
    console.log("Deposit Event Change: ", deposit)
    console.log("bank: ", bank)

  // Since the balance is delayd. This will solidify the correct balance towards the bank state
  setBank((prevObj) => ({
    ...prevObj,
    balance: updatedBalance,
    transactions: updatedTransactions
  }));

  }, [deposit]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("- - - - - SUBMITTED - - - - -")

    if (deposit.amount > 0) {
      setTimeout(() => {
        handleAccountChange(updatedTransactions, updatedBalance)
  
          const configObj = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bank),
          };
        const post = async () => {
          fetch('http://localhost:4000/bank_account', configObj)
          .then(res => res.json())
          .then(data => console.log(data))}
          post()
  
        setDeposit((prevObj) => ({
          ...prevObj,
          amount: 0,
        }));
      },500)
    }
  };

  return (
    <div className="Withdraw">
      <div className="Withdraw-Header">
        <h1>How much would you like to Deposit?</h1>
      </div>
      <div className="Withdraw-form">
        <form onSubmit={handleSubmit}>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            placeholder="amount"
            value={deposit.amount}
            onChange={handleEventChange}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Deposit;

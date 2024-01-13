import React, { useState, useEffect } from "react";

function Withdrawal({ account, setAccount, handleAccountChange }) {
 
  const [withdrawal, setWithdrawal] = useState({
    name: "Withdrawal",
    timestamp: "",
    amount: 0,
    updated_balance: account.balance,
  });

  function handleEventChange(event) {
    const { name, value } = event.target;

    setWithdrawal((prevObj) => ({
      ...prevObj,
      [name]: value,
      timestamp: new Date().toISOString(),
      updated_balance: updatedBalance
    }));

    setBank((prevObj) => ({
      ...prevObj,
      balance: updatedBalance,
      transactions: [...account.transactions, newTransaction ]
    }));
  }

  const [bank, setBank] = useState(account)
  const updatedBalance = account.balance - parseFloat(withdrawal.amount)
  const newTransaction = {
    id: account.transactions.length + 1,
    name: withdrawal.name,
    timestamp: new Date().toISOString(),
    amount: -parseFloat(withdrawal.amount),
    updated_balance: updatedBalance,
  };
  const updatedTransactions = [...account.transactions, newTransaction]

  useEffect(() => {
    console.log("- - - - - DEPOSIT AMOUNT CHANGED - - - - ")
    console.log("Deposit -- Account balance from Event Change: ", updatedBalance)
    console.log("Transactions: ", updatedTransactions)
    console.log("Deposit Event Change: ", withdrawal)
    console.log("bank: ", bank)

  // Since the balance is delayd. This will solidify the correct balance towards the bank state
  setBank((prevObj) => ({
    ...prevObj,
    balance: updatedBalance,
    transactions: updatedTransactions
  }));

  }, [withdrawal]); 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("- - - - - SUBMITTED - - - - -")

    if (withdrawal.amount > 0) {
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
  
        setWithdrawal((prevObj) => ({
          ...prevObj,
          amount: 0,
        }));
      },500)
    }
  };
  return (
    <div className="Withdraw">
      <div class="Withdraw-Header">
        <h1>How much would you like to withdraw?</h1>
      </div>
      <div class="Withdraw-form">
        <form>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
            placeholder="amount"
            value={withdrawal.amount}
            onChange={handleEventChange}
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Withdrawal;

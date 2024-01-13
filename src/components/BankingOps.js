// import React, { useState, useEffect } from "react";
// import { useOutletContext } from "react-router-dom";
import Withdrawal from "../components/Withdrawal";
import Deposit from "../components/Deposit"

function BankingOps({account, setAccount}) {

//   const bankAccount = useOutletContext()

  function handleAccountChange (updatedTransactions, updatedBalance) {

    setAccount((prevAccount) => ({
      ...prevAccount,
      transactions: updatedTransactions,
      balance: updatedBalance,
    }));

    return account
  }

  if (!account) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="BankingOps-page">
      <div className="withdrawal">
        <div className="withdraw-pics"></div>
        <h1>Withdraw</h1>
        <Withdrawal account={account} setAccount={setAccount} handleAccountChange={handleAccountChange}/>
      </div>
      <div class="deposit">
        <div className="deposit-pics"></div>
        <h1>Deposit</h1>
        <Deposit account={account} setAccount={setAccount} handleAccountChange={handleAccountChange}/>
      </div>
    </div>
  );
}

export default BankingOps;

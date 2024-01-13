import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import BankingOps from "../components/BankingOps";

function Banking() {
  const bankAccount = useOutletContext();

  if (!bankAccount) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Banking-page">
      <h1>Banking Page</h1>
      <h1>Balance: {bankAccount.bankAccount.balance}</h1>
      <BankingOps
        account={bankAccount.bankAccount}
        setAccount={bankAccount.setBankAccount}
      />
    </div>
  );
}

export default Banking;

import React from "react";
import { useOutletContext } from "react-router-dom";
import BankingOps from "../components/BankingOps";

function Banking() {
  const bankAccount = useOutletContext();

  if (!bankAccount) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Banking-page">
      <div className="Banking-page-header">
        <h1>Banking</h1>
      </div>
      <h1>Balance: {bankAccount.bankAccount.balance}</h1>
      <BankingOps
        account={bankAccount.bankAccount}
        setAccount={bankAccount.setBankAccount}
      />
    </div>
  );
}

export default Banking;

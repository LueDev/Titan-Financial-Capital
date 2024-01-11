import React, { useState, useEffect } from "react";
import Withdrawal from "../components/Withdrawal";

function Banking() {
  const [bankAccount, setBankAccount] = useState({
    id: "",
    owner: "",
    starting_balance: 0,
    balance: 0,
    transactions: [],
  });

  useEffect(() => {
    fetch("http://localhost:4000/bank_account")
      .then((res) => res.json())
      .then((data) => setBankAccount(data));
  }, []);

  if (!bankAccount) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="Payments-page">
      <h1>Banking Page</h1>
      {/*form for paying a bill*/}
      <h2>Working on deposits/withdrawals/payments forms/components here</h2>
      {/* <PaymentForm transactions={bankAccount.transactions}/> */}
      {console.log(bankAccount)}
      <div className="withdrawal">
        <div className="withdraw-pics"></div>
        <h1>Withdraw</h1>
        <Withdrawal />
        {/* component below */}
      </div>
      <div class="deposit">
        <div className="deposit-pics"></div>
        <h1>Deposit</h1>
        {/* component below*/}
      </div>
    </div>
  );
}

export default Banking;

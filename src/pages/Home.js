import React, { useEffect, useState } from "react";
import BankAccountDetails from "../components/BankAccountDetails";
import BankAccountCard from "../components/BankAccountCard";
import "../index.css";
function Home() {
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
    <div className="Home">
      <h1>Welcome, {bankAccount.owner}</h1>
      <h1>Accounts</h1>
        <BankAccountCard bankAccount={bankAccount} />
      {/* <BankAccountDetails transactions={bankAccount.transactions}/> */}
    </div>
  );
}

export default Home;

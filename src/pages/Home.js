// import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BankAccountCard from "../components/BankAccountCard";
import "../index.css";

function Home() {

const bankAccount = useOutletContext()  

  if (!bankAccount) {
    return <h1>Loading...</h1>;
  }
  

  return (
    <div className="Home">
      {/* <h1>Welcome, {bankAccount.bankAccount.owner}</h1> */}
      <h1>Accounts</h1>
        <BankAccountCard bankAccount={bankAccount.bankAccount} />
    </div>
  );
}

export default Home;

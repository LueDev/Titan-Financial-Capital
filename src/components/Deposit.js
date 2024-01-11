import React, { useState } from "react";
import { format, getYear, startOfMonth, endOfMonth } from 'date-fns';

function Withdrawal() {
  
  const [deposit, setDeposit] = useState({
    name: "Withdrawal",
    timestamp: format(new Date(),'MM/dd/yyyy'),
    amount: 0,
    updated_balance: 0,
  });


  function handleEventChange(event){

    const { name, value } = event.target;
    
    setDeposit((prevObj) => ({
      ...prevObj,
      [name]: value,
    }));

    console.log(deposit)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Withdraw Submit has been called");
  };

  return (
    <div className="Withdraw">
      <div class="Withdraw-Header">
        <h1>Payment Form</h1>
      </div>
      <div class="Withdraw-form">
        <form onSubmit={handleSubmit}>
          <input id="amount" type="number" placeholder="amount" value={deposit.amount} onChange={handleEventChange} />
          
        </form>
      </div>
    </div>
  );
}

export default Withdrawal;

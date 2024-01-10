import React, {useState,useEffect} from 'react'
import PaymentForm from '../components/PaymentForm';

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
    <div className='Payments-page'>
      <h1>Banking Page</h1>
      {/*form for paying a bill*/}
      <h2>Working on deposits/withdrawals/payments forms/components here</h2>
      {/* <PaymentForm transactions={bankAccount.transactions}/> */}
      
    </div>
  )
}

export default Banking

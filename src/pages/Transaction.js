import React from 'react'
import NavBar from '../components/NavBar'
import {useParams, useOutletContext} from "react-router-dom"
import "../index.css"

function Transaction() {

    const context = useOutletContext();
    const params = useParams();
    const {id, name, timestamp, amount, updated_balance} = params;
    console.log("PARAMS: ", params)

  return (
    <div className="transaction-specific">
      <h1>Transaction {id} </h1>
      <h1>{name} </h1>
      <h2>{new Date(timestamp).toLocaleString()}</h2>
      <div className={amount > 0 
        ? "transaction-amount-positive"
        : "transaction-amount-negative"}>
            {amount > 0 
            ? <h1>${Number(amount)}</h1>
            : <h1> -${Math.abs(amount)}</h1>}
        </div>
      <h1>Balance: {updated_balance}</h1>

    </div>
  )
}

export default Transaction

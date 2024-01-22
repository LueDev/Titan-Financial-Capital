import React from "react";
import { Link } from "react-router-dom"
import "../index.css";

function TransactionCard({ transaction }) {
  const { id, timestamp, amount } = transaction;

  return (
    <li>
      <div className="transaction-card">
        <div className="transaction-name">
          <h3>{transaction.name}</h3>
        </div>
        <div className={transaction.amount > 0 
        ? "transaction-amount-positive"
        : "transaction-amount-negative"}>
            {transaction.amount > 0 
            ? `$${Number(transaction.amount)}`
            : `-$${Math.abs(transaction.amount)}`}
        </div>
        <div className="transaction-date">
        {new Date(transaction.timestamp).toLocaleString()}
        </div>
        <div className="transaction-updated-balance">
        {transaction.updated_balance > 0 
            ? `Balance: $${transaction.updated_balance}`
            : `Balance: -$${Math.abs(transaction.updated_balance)}`}
        </div>
        <Link to={`/transaction/${transaction.id}/${transaction.name}/${transaction.timestamp}/${transaction.amount}/${transaction.updated_balance}`}> More info </Link>
      </div>
    </li>
  );
}

export default TransactionCard;

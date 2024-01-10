import React, { useEffect, useState } from "react";
import "../index.css";
import TransactionCard from "./TransactionCard";
import BankAccountDetails from "./BankAccountDetails";

const BankAccountCard = ({ bankAccount }) => {
  const [expanded, setExpanded] = useState(false);
  const [sortTransactions, setSortTransactions] = useState([]);

  useEffect(() => {
    let reversedTransactions = [...bankAccount.transactions];
    setSortTransactions((prev) => [...reversedTransactions.reverse()]);
  }, [expanded]);
  return (
    <div
      className={
        expanded === true ? "bank-account-card-expanded" : "bank-account-card"
      }
      onClick={expanded === false ? () => setExpanded(true) : () => ""}
    >
      <div className="bank-account-card_card-header">
        <h3>{bankAccount.account_Type}</h3>
        <div className="bank-account-card_card-content">
          <p
            className={
              bankAccount.balance > 0
                ? "bank-account-card_balance-number"
                : "bank-account-card_balance-number_negative"
            }
            onClick={() => setExpanded(false)}
          >
            {bankAccount.balance > 0
              ? `$${bankAccount.balance}`
              : `- $${Math.abs(bankAccount.balance)}`}
          </p>
        </div>
      </div>
      {expanded && (
        <div className="transaction">
          <div className="transaction-header">
            <h4
              onClick={() =>
                setSortTransactions((prev) => [...sortTransactions.reverse()])
              }
            >
              Transactions
            </h4>
          </div>
          <div className="transaction-list">
            <ul className="transaction-ul">
              <div class="transaction-ul-list">
                {sortTransactions.map((transaction) => (
                  
                  <TransactionCard transaction={transaction} />
                ))}
              </div>
              <div class="transaction-charts">
                <BankAccountDetails transactions={bankAccount.transactions} />
              </div>
              {/* <BankAccountDetails transactions={bankAccount.transactions} /> */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccountCard;

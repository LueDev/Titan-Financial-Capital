import { useState } from "react";
import Withdrawal from "../components/Withdrawal";
import Deposit from "../components/Deposit";
import ImageCarousel from "../components/ImageCarousel";
import "../index.css";

function BankingOps({ account, setAccount }) {
  const [bankingSelection, setBankingSelection] = useState("Withdraw");

  function handleAccountChange(updatedTransactions, updatedBalance) {
    setAccount((prevAccount) => ({
      ...prevAccount,
      transactions: updatedTransactions,
      balance: updatedBalance,
    }));

    return account;
  }

  if (!account) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="BankingOps-page">
      <div className="banking-carousel">
        <ImageCarousel />
      </div>
      <div class="banking">
        <div class="banking-selection">
          <div class="banking-selection-buttons">
            <button onClick={(e) => setBankingSelection("Withdraw")}>
              Withdraw
            </button>
            <button onClick={(e) => setBankingSelection("Deposit")}>
              Deposit
            </button>
          </div>
          {bankingSelection === "Withdraw" ? (
            <div className="withdrawal">
              <h1>Withdraw</h1>
              <Withdrawal
                account={account}
                setAccount={setAccount}
                handleAccountChange={handleAccountChange}
              />
            </div>
          ) : (
            <div class="deposit">
              <h1>Deposit</h1>
              <Deposit
                account={account}
                setAccount={setAccount}
                handleAccountChange={handleAccountChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BankingOps;

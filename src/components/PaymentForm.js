import React, { useState } from "react";

function PaymentForm() {
  const [payment, setPayment] = useState({
    name: "",
    timestamp: "",
    amount: 0,
    updated_balance: 0,
  });

  return (
    <div className="Payment-Form-Top">
      <div class="Payment-Form_Header">
        <h1>Payment Form</h1>
      </div>
    </div>
  );
}

export default PaymentForm;

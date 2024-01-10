import React, { useState } from 'react';
import DailyFinancialChart from './DailyTransactionChart';
import MonthlyFinancialChart from './MonthlyFinancialChart';
import YearlyFinancialChart from './YearlyFinancialChart';

const BankAccountDetails = ({ transactions }) => {
  const [activeChart, setActiveChart] = useState('daily');

  const renderChart = () => {
    switch (activeChart) {
      case 'daily':
        return <DailyFinancialChart transactions={transactions} />;
      case 'monthly':
        return <MonthlyFinancialChart transactions={transactions} />;
      case 'yearly':
        return <YearlyFinancialChart transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <div className='BankAccountDetails'>
      <h2>Transaction Breakdown</h2>
      <button onClick={() => setActiveChart('daily')}>Daily Chart</button>
      <button onClick={() => setActiveChart('monthly')}>Monthly Chart</button>
      <button onClick={() => setActiveChart('yearly')}>Yearly Chart</button>
      {renderChart()}
    </div>
  );
};

export default BankAccountDetails;

import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart, registerables } from 'chart.js/auto';
import { format, getYear, startOfMonth, endOfMonth } from 'date-fns';

// Register necessary plugins
Chart.register(...registerables);

const MonthlyFinancialChart = ({ transactions }) => {
  const [chart, setChart] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [aggregatedData, setAggregatedData] = useState({
    labels: [],
    data: [],
    balanceData: [],
    minLoss: 0,
    maxIncome: 0,
  });

  useEffect(() => {
    // Recalculate aggregated data whenever selected date changes
    const data = aggregateData(transactions);
    setAggregatedData(data);
  }, [transactions, selectedDate]);

  useEffect(() => {
    // Check if there's an existing chart
    if (chart) {
      // Destroy the existing chart
      chart.destroy();
    }

    if (aggregatedData.labels.length > 0) {
      const ctx = document.getElementById('monthlyFinancialChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: aggregatedData.labels,
          datasets: [
            {
              label: 'Monthly Transactions',
              data: aggregatedData.data,
              backgroundColor: aggregatedData.data.map((amount) =>
                amount >= 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'
              ),
              borderColor: aggregatedData.data.map((amount) =>
                amount >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'
              ),
              borderWidth: 1,
            },
            {
              type: 'line',
              label: 'Balance',
              data: aggregatedData.balanceData,
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              beginAtZero: true,
              suggestedMin: aggregatedData.minLoss,
              suggestedMax: aggregatedData.maxIncome,
              title: {
                display: true,
                text: 'Transaction Amount',
              },
              ticks: {
                callback: (value) => `$${value}`,
              },
            },
          },
        },
      });

      setChart(newChart);
    }
  }, [transactions, aggregatedData]);

  const aggregateData = (data) => {
    const result = data.reduce(
      (result, transaction) => {
        const date = new Date(transaction.timestamp);
        const formattedMonth = format(date, 'MM/yyyy');

        // Check if the transaction is in the selected year
        if (getYear(date) === getYear(selectedDate)) {
          const existingIndex = result.labels.findIndex((label) => label === formattedMonth);

          if (existingIndex !== -1) {
            result.data[existingIndex] += transaction.amount;
          } else {
            result.labels.push(formattedMonth);
            result.data.push(transaction.amount);
          }

          // Update the maximum income and minimum loss
          if (transaction.amount >= 0) {
            result.maxIncome = Math.max(result.maxIncome, transaction.amount);
          } else {
            result.minLoss = Math.min(result.minLoss, transaction.amount);
          }
        }

        return result;
      },
      { labels: [], data: [], balanceData: [], minLoss: 0, maxIncome: 0 }
    );

    // Calculate the cumulative balance for each month
    result.labels.forEach((label, index) => {
      const transactionsForMonth = data.filter((transaction) => {
        const date = new Date(transaction.timestamp);
        return format(date, 'MM/yyyy') === label;
      });

      const cumulativeBalance = transactionsForMonth.reduce((sum, transaction) => sum + transaction.amount, 0);
      const lastBalance = result.balanceData[index - 1] || 0;
      result.balanceData.push(lastBalance + cumulativeBalance);
    });

    return result;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className='financialChart'>
      <DatePicker
        className="financialChart__datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <canvas id="monthlyFinancialChart" width="1100" height="400"/>
    </div>
  );
};

export default MonthlyFinancialChart;

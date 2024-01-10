import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Chart, registerables } from 'chart.js/auto';
import { format, getYear } from 'date-fns';

// Register necessary plugins
Chart.register(...registerables);

const YearlyFinancialChart = ({ transactions }) => {
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
  }, [selectedDate]);

  useEffect(() => {
    // Check if there's an existing chart
    if (chart) {
      // Destroy the existing chart
      chart.destroy();
    }

    if (aggregatedData.labels.length > 0) {
      const ctx = document.getElementById('yearlyFinancialChart').getContext('2d');
      const newChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: aggregatedData.labels,
          datasets: [
            {
              label: 'Yearly Transactions',
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
                text: 'Year',
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
            },
          },
        },
      });

      setChart(newChart);
    }
  }, [aggregatedData]);

  const aggregateData = (data) => {
    const result = data.reduce(
      (result, transaction) => {
        const date = new Date(transaction.timestamp);
        const formattedYear = format(date, 'yyyy');

        const existingIndex = result.labels.findIndex((label) => label === formattedYear);

        if (existingIndex !== -1) {
          result.data[existingIndex] = result.data[existingIndex] + transaction.amount;
        } else {
          result.labels.push(formattedYear);
          result.data.push(transaction.amount);
        }

        // Update the maximum income and minimum loss
        if (transaction.amount >= 0) {
          result.maxIncome = Math.max(result.maxIncome, transaction.amount);
        } else {
          result.minLoss = Math.min(result.minLoss, transaction.amount);
        }

        return result;
      },
      { labels: [], data: [], balanceData: [], minLoss: 0, maxIncome: 0 }
    );

    // Calculate the cumulative balance for each year
    result.labels.forEach((label, index) => {
      const transactionsForYear = data.filter((transaction) => {
        const date = new Date(transaction.timestamp);
        return getYear(date) === parseInt(label);
      });

      const cumulativeBalance = transactionsForYear.reduce((sum, transaction) => sum + transaction.amount, 0);
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
        dateFormat="yyyy"
        showYearPicker
      />
      <canvas id="yearlyFinancialChart" width="1100" height="400"></canvas>
    </div>
  );
};

export default YearlyFinancialChart;

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Chart, registerables } from "chart.js/auto";
import { format } from "date-fns";

// Register necessary plugins
Chart.register(...registerables);

const DailyTransactionChart = ({ transactions }) => {
  const [chart, setChart] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Check if there's an existing chart
    if (chart) {
      // Destroy the existing chart
      chart.destroy();
    }

    if (transactions.length > 0) {
      const aggregatedData = aggregateData(transactions);

      const ctx = document.getElementById("financialChart").getContext("2d");
      const newChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: aggregatedData.labels,
          datasets: [
            {
              label: "Daily Transactions",
              data: aggregatedData.data,
              backgroundColor: aggregatedData.data.map((amount) =>
                amount >= 0
                  ? "rgba(75, 192, 192, 0.2)"
                  : "rgba(255, 99, 132, 0.2)"
              ),
              borderColor: aggregatedData.data.map((amount) =>
                amount >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
              ),
              borderWidth: 1,
              yAxisID: "transactions",
            },
            {
              label: "Balance",
              data: aggregatedData.balanceData,
              type: "line",
              fill: false,
              borderColor: "rgba(255, 206, 86, 1)",
              borderWidth: 2,
              yAxisID: "balance",
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            transactions: {
              type: "linear",
              position: "left",
              title: {
                display: true,
                text: "Transaction Amount",
              },
            },
            balance: {
              type: "linear",
              position: "right",
              title: {
                display: true,
                text: "Balance",
              },
              ticks: {
                callback: (value) => `$${value}`,
              },
            },
          },
        },
      });

      setChart((prevChart) => newChart);
    }
  }, [transactions, selectedDate]);

  const aggregateData = (data) => {
    // Sort transactions by timestamp before processing
    // This solved a bug where the correct sum of transactions was inaccurate 
    // because timestamps for non-consecutive transactions threw off the calc
    const sortedTransactions = data.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
    const aggregatedByDay = sortedTransactions.reduce(
      (result, transaction) => {
        const date = new Date(transaction.timestamp);
        const formattedDate = format(date, 'MM/dd/yyyy');
  
        // Check if the transaction is in the selected month
        if (date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear()) {
          const existingDateIndex = result.labels.indexOf(formattedDate);
  
          if (existingDateIndex !== -1) {
            // If date exists, update existing values
            result.data[existingDateIndex] += transaction.amount;
            result.balanceData[existingDateIndex] += transaction.amount;
          } else {
            // If date doesn't exist, add a new entry
            result.labels.push(formattedDate);
            result.data.push(transaction.amount);
            const previousBalance = result.balanceData.length > 0 ? result.balanceData[result.balanceData.length - 1] : 0;
            result.balanceData.push(previousBalance + transaction.amount);
          }
        }
  
        return result;
      },
      { labels: [], data: [], balanceData: [] }
    );
  
    return aggregatedByDay;
  };
  

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="financialChart">
      <DatePicker
        className="financialChart__datePicker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <canvas id="financialChart" width="1000" height="400"></canvas>
    </div>
  );
};

export default DailyTransactionChart;

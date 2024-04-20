import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Bar } from 'react-chartjs-2';

const Investment = () => {
  const [stockName, setStockName] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Investments',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });

  const handleBuyOrSell = (action) => {
    const newTransaction = {
      stockName,
      amount: action === 'buy' ? parseInt(amount) : -parseInt(amount),
      date: new Date().toLocaleDateString()
    };
    setTransactions([...transactions, newTransaction]);
    updateChartData(newTransaction);
    setStockName('');
    setAmount('');
  };

  const updateChartData = (newTransaction) => {
    const labels = transactions.map(transaction => transaction.stockName);
    const uniqueLabels = [...new Set(labels)]; // Get unique stock names
    const data = uniqueLabels.map(label => {
      const sum = transactions.reduce((acc, curr) => {
        if (curr.stockName === label) {
          return acc + curr.amount;
        }
        return acc;
      }, 0);
      return sum;
    });
    setChartData({
      labels: uniqueLabels,
      datasets: [{
        ...chartData.datasets[0],
        data
      }]
    });
  };

  return (
    <div>
      <div>
        <TextField
          label="Name of Stock"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={() => handleBuyOrSell('buy')}>
          Buy
        </Button>
        <Button variant="contained" color="secondary" onClick={() => handleBuyOrSell('sell')}>
          Sell
        </Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Investment;

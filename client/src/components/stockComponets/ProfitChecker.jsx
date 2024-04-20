import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';

const ProfitChecker = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');
  const [investedPrice, setInvestedPrice] = useState('');
  const [todayPrice, setTodayPrice] = useState(null);
  const [investmentDatePrice, setInvestmentDatePrice] = useState(null);
  const [profitOrLoss, setProfitOrLoss] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchStockPrices();
  }, []); // Fetch data on component mount

  const fetchStockPrices = async () => {
    try {
      const todayResponse = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=demo`);
      const todayData = todayResponse.data['Time Series (Daily)'];
      const todayPrice = parseFloat(todayData[Object.keys(todayData)[0]]['4. close']);

      const investmentDateResponse = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=demo`);
      const investmentDateData = investmentDateResponse.data['Time Series (Daily)'];
      const investmentDatePrice = parseFloat(investmentDateData[investmentDate]['4. close']);

      setTodayPrice(todayPrice);
      setInvestmentDatePrice(investmentDatePrice);

      // Calculate profit or loss
      const profitOrLoss = todayPrice - investmentDatePrice;
      setProfitOrLoss(profitOrLoss);

      // Prepare data for chart
      const chartData = Object.keys(investmentDateData).map((date, index) => ({
        id: index, // Add unique id property
        date,
        price: parseFloat(investmentDateData[date]['4. close'])
      }));
      setChartData(chartData);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 }
  ];

  return (
    <div>
      <TextField
        label="Stock Symbol"
        value={stockSymbol}
        onChange={(e) => setStockSymbol(e.target.value)}
      />
      <br />
      <TextField
        label="Investment Date"
        type="date"
        value={investmentDate}
        onChange={(e) => setInvestmentDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <br />
      <TextField
        label="Invested Price"
        type="number"
        value={investedPrice}
        onChange={(e) => setInvestedPrice(e.target.value)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={fetchStockPrices}>
        Check Profit/Loss
      </Button>
      <br />
      {profitOrLoss !== null && (
        <div>
          <p>Today's Price: {todayPrice}</p>
          <p>Investment Date Price: {investmentDatePrice}</p>
          <p>Profit/Loss: {profitOrLoss}</p>
        </div>
      )}
      {chartData.length > 0 && (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={chartData} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ProfitChecker;

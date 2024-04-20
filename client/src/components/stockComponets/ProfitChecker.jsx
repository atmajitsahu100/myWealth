import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { DataGrid } from '@material-ui/data-grid';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ProfitChecker = () => {
  const [stockSymbol, setStockSymbol] = useState('');
  const [investmentDate, setInvestmentDate] = useState('');
  const [investedPrice, setInvestedPrice] = useState('');
  const [todayPrice, setTodayPrice] = useState(null);
  const [investmentDatePrice, setInvestmentDatePrice] = useState(null);
  const [profitOrLoss, setProfitOrLoss] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);


  useEffect(() => {
    // Fetch data on component mount
    fetchStockPrices();
  }, []); 

  const fetchStockPrices = async () => {
    try {
      const investmentDateResponse = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&apikey=demo`);
      const investmentDateData = investmentDateResponse.data['Time Series (Daily)'];
      const todayData = investmentDateResponse.data['Time Series (Daily)'];
      const todayPrice = parseFloat(investmentDateResponse.data['Time Series (Daily)'][Object.keys(todayData)[0]]['4. close']);
      const investmentDatePrice = parseFloat(investmentDateData[investmentDate]['4. close']);      

      setTodayPrice(todayPrice);
      setInvestmentDatePrice(investmentDatePrice);

      if(investmentDateData){
        console.log("before",investmentDateResponse)
        const dataPointsArray = [];

        for (var key in investmentDateResponse.data['Time Series (Daily)']) {
          dataPointsArray.push({
            x: new Date(key),
            y: parseFloat(investmentDateResponse.data['Time Series (Daily)'][key]['4. close'])
          });
        }
    
        setDataPoints(dataPointsArray);
        console.log(dataPointsArray)
      }

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

  const options = {
    theme: 'light2',
    zoomEnabled: true,
    title: {
      text: `profit and loss of ${stockSymbol}`
    },
    data: [{
      type: 'spline',
      xValueFormatString: 'MMM YYYY',
      yValueFormatString: '#,##0.00',
      dataPoints: dataPoints // Use chartData for rendering graph
    }]
  };

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
          {/* Render CanvasJSChart with options */}
          <CanvasJSChart options={options} />
          {/* Render DataGrid */}
          <DataGrid rows={chartData} columns={columns} />
        </div>
      )}
    </div>
  );
};

export default ProfitChecker;

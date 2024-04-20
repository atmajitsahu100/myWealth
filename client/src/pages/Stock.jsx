import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Stock = () => {
  const [dataPoints, setDataPoints] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo')
      .then(response => response.json())
      .then(data => {
        const dataPointsArray = [];
        for (var key in data['Time Series (Daily)']) {
          dataPointsArray.push({
            x: new Date(key),
            y: parseFloat(data['Time Series (Daily)'][key]['4. close'])
          });
        }
        setDataPoints(dataPointsArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const options = {
    theme: 'light2',
    zoomEnabled: true,
    title: {
      text: 'Nifty 50 Index'
    },
    data: [{
      type: 'spline',
      xValueFormatString: 'MMM YYYY',
      yValueFormatString: '#,##0.00',
      dataPoints: dataPoints
    }]
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default Stock;

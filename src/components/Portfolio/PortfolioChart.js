import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import './portfolio.css'



const PortfolioChart = (props) => {
  const labels = props.labels
  const prices = props.prices
  const [chartData, setChartData] = useState()

  const [isMobile, setMobile] = useState(window.innerWidth < 768);

  const updateMedia = () => {
    setMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  const chart = () => {
    setChartData({
      labels: labels,
      datasets: [
        {
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#c5b358',
          borderColor: '#c5b358',
          borderWidth: 3,
          data: prices,
          yAxisID: 'price1'
        },
      ]
    })
  }
  useEffect(() => {
    chart()
  }, [props])

  return (
    <div>
      {chartData && <Line
        data={chartData}
        options={{
          title:{
            display:false,
            text:' ',
            fontSize:20
          },
          legend:{
              display: false
          },
          layout: {
              padding: {
                  left: 20,
                  right: 20,
                  top: 20,
                  bottom: 20
              }
          },
          elements: {
              point: {
                  radius: 0
              }
          },
          scales:
          {
              yAxes: [{
                display : isMobile ? false : true,
                position: 'right',
                id: 'price1',
              }],
              xAxes: [{
                  display : false
              
          }]
          },
              tooltips: {
                  mode: 'nearest',
                  intersect: false
              },
              hover: {
                  mode: 'index',
                  intersect: false
              }
        }}
      />}
    </div>
  )
}

export default PortfolioChart
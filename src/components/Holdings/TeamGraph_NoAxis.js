
import React, {useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import './TeamCard.css'
import moment from 'moment'



const TeamGraph = (props) => {
  const labelArr = props.labels
  const pricesArr = props.prices
  const show = props.show ? props.show : true

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
      labels: labelArr,
      datasets: [
        {
          fill: false,
          lineTension: 0.5,
          backgroundColor: '#c5b358',
          borderColor: '#c5b358',
          borderWidth: 3,
          data: pricesArr,
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
      <Line
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
                display : false,
                position: 'right',
                id: 'price1',
              }],
              xAxes: [{
                  display : false
              
          }]
          }, 
          //tooltips: {
          //    mode: 'nearest',
          //    intersect: false
          // },
          // hover: {
          //    mode: 'index',
          //    intersect: false
          //}
        }}
      />
    </div>
  )
}

export default TeamGraph


import React, {useEffect, useState} from "react";

import {getAggregatedCandlestickData} from "../../services/weatherApis";

import ApexChartComponent from "../apexChart/apexChart.jsx";

const WeatherChartComponent = () => {
  const [candlestickData, setCandlestickData] = useState([]);

  useEffect(() => {
    getAggregatedCandlestickData().then((response) => {
      setCandlestickData(response.data.map((d) => {
        return {
          x: new Date(d.hour).getTime(),
          y: [d.temperature.open, d.temperature.high, d.temperature.low, d.temperature.close],
        };
      }));
  });
  }, []);



  return (
    <>
        <ApexChartComponent data={candlestickData}/>
    </>

  )
};

export default WeatherChartComponent;
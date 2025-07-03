import React, { useState } from "react";
import Chart from "react-apexcharts";

const ApexChartComponent = ({ data }) => {
  const options = {
    plotOptions: {
        candlestick: {
          wick: {
            useFillColor: true,
          },
          barWidth: 1,
        }
      },
      stroke: {
        width: 1,  // thinner borders on candlesticks
      },
    chart: {
        type: "candlestick",
        toolbar: {
          show: true,
        },
      },
    title: {
      text: `Candlestick Chart`,
      align: "center",
    },
    xaxis: { type: "datetime", labels: { format: "HH:mm" }, style: {
        fontSize: "10px",
      }, },
    yaxis: { title: { text: "Temperature (°C)" }, tooltip: { enabled: true } },
    tooltip: { x: { format: "dd MMM HH:mm" } },
  };

  const series = [{ data: data }];

  return (
    <div>
      <Chart options={options} series={series} type="candlestick"   height={400} width={600} />
    </div>
  );
};

export default ApexChartComponent;

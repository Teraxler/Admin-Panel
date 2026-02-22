import React, { useState } from "react";
import Chart from "react-apexcharts";

const ColumnChart = () => {
  const [series, setSeries] = useState([
    {
      name: "Sales",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 75, 120, 88],
    },
  ]);

  const [options, setOptions] = useState({
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadius: 5,
        borderRadiusApplication: "end",
        color: "#0057fc",
      },
    },
    colors: ["#0057fc"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `$${val}K`;
        },
      },
    },
  });
  return <Chart type="bar" options={options} series={series} height={250} />;
};

export default ColumnChart;

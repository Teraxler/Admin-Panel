"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Skeleton } from "@/components/ui";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center h-55.75">
      <Skeleton className="rounded-full bg-transparent border-7 border-gray-200 w-45 h-45 p-1.25">
        <Skeleton className="rounded-full bg-transparent border-7 border-gray-200" />
      </Skeleton>
    </div>
  ),
});

const CircularGaugeChart = ({ series = [65, 35] }) => {
  const [options, setOptions] = useState({
    colors: ["#0057fc"],
    // colors: ["#00c950", "#0057fc"],

    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: "66%",
        },

        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#6c757d",
            fontSize: "13px",
          },
          value: {
            color: "#000",
            fontWeight: "600",
            fontSize: "30px",
            show: true,
          },
        },
      },
    },

    stroke: {
      color: "#0057fcd",
      lineCap: "round",
    },
    labels: ["Delivered", "In Progress"],
  });

  return (
    <div>
      <Chart type="radialBar" options={options} series={series} height={220} />
    </div>
  );
};

export default CircularGaugeChart;

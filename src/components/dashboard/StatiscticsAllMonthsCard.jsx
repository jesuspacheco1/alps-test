import React from "react";
import Chart from "react-apexcharts";
import { formatIndicator } from "../../utility/utils";

const StatiscticsAllMonthsCard = ({
  series,
  labels,
  average,
  indicator,
  ...props
}) => {
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: "line",
      dropShadow: {
        enabled: true,
        top: 18,
        left: 2,
        blur: 5,
        opacity: 0.2,
      },
      offsetX: -10,
    },
    stroke: {
      curve: "smooth",
      width: 4,
    },
    grid: {
      borderColor: "#ebe9f1",
      padding: {
        top: -20,
        bottom: 5,
        left: 20,
      },
    },
    legend: {
      show: false,
    },
    colors: ["#215eb4"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        inverseColors: false,
        gradientToColors: ["#19437d"],
        shadeIntensity: 1,
        type: "horizontal",
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100, 100, 100],
      },
    },
    labels: labels,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        offsetY: 5,
        style: {
          colors: "#b9b9c3",
          fontSize: "0.857rem",
          fontFamily: "Montserrat",
        },
      },
      tooltip: {
        enabled: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      tickPlacement: "on",
    },
    yaxis: {
      tickAmount: 5,
      labels: {
        style: {
          colors: "#b9b9c3",
          fontSize: "0.857rem",
          fontFamily: "Montserrat",
        },
        formatter(val) {
          return formatIndicator(val, indicator);
        },
      },
    },
    tooltip: {
      x: { show: false },
    },
  };

  return (
    <div className="card all-months-card" {...props}>
      <div className="card-header">
        <p>
          Promedio: <b>{formatIndicator(average, indicator)}</b>
        </p>
      </div>
      <div className="card-body">
        <Chart options={options} series={series} type="line" />
      </div>
    </div>
  );
};

export default StatiscticsAllMonthsCard;

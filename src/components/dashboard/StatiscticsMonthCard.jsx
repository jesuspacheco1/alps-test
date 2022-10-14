import React from "react";
import Chart from "react-apexcharts";
import { formatIndicator } from "../../utility/utils";

const StatiscticsMonthCard = ({
  title,
  average,
  series = [],
  labels = [],
  diff = null,
  indicator,
  ...props
}) => {
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    colors: ["#19437d"],
    labels: labels,
    stroke: {
      curve: "smooth",
      width: 2.5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.9,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 80, 100],
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        formatter(val) {
          return formatIndicator(val, indicator);
        },
      },
    },
    tooltip: {
      x: {
        show: true,
      },
    },
  };

  return (
    <div className="month-card card" {...props}>
      <div className="card-body">
        <h6>{title}</h6>
        <h2>{formatIndicator(average, indicator)}</h2>
        {!!(diff !== null) &&
          (diff === 0 ? (
            <span>=</span>
          ) : (
            <span className={diff < 0 ? "red" : "green"}>
              {`${diff > 0 ? "+" : ""}${Math.round(diff * 100) / 100}%`}
            </span>
          ))}
      </div>
      <div className="card-chart">
        <Chart options={options} series={series} type="area" height={100} />
      </div>
    </div>
  );
};

export default StatiscticsMonthCard;

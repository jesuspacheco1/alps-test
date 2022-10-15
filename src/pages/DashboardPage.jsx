import moment from "moment";
import React, { useEffect, useState } from "react";
import StatiscticsAllMonthsCard from "../components/dashboard/StatiscticsAllMonthsCard";
import StatiscticsMonthCard from "../components/dashboard/StatiscticsMonthCard";
import { groupDataByMonth, groupDataByWeek } from "../utility/utils";

const DashboardPage = ({ obj, indicator, year }) => {
  const [data, setData] = useState({
    total_avg: 0,
    months: [],
  });

  const formatData = (data) => {
    let formattedData = groupDataByMonth(data.serie);

    formattedData = formattedData.map((item) => ({
      diff_with_prev: item.diff_with_prev,
      name: item.name,
      short_name: item.short_name,
      num: item.num,
      total_month_avg: item.total_month_avg,
      weeks: groupDataByWeek(item.data),
    }));

    formattedData = {
      total_avg:
        formattedData.reduce((a, b) => a + b.total_month_avg, 0) /
        formattedData.length,
      months: formattedData,
    };

    return formattedData;
  };

  useEffect(() => {
    if (!obj) return;
    setData(formatData(obj));
  }, [obj]);

  return (
    <div className="dashboard-container">
      <div>
        {data.months.slice(0, 6).map((item, idx) => (
          <StatiscticsMonthCard
            key={idx}
            title={item.name}
            average={item.total_month_avg}
            style={{ gridArea: `card-${idx + 1}` }}
            labels={
              !!indicator.mensual
                ? [
                    "01/04",
                    moment(`${year}-${item.num}-01`)
                      .endOf("month")
                      .format("DD/MM"),
                  ]
                : item.weeks.map((w) => w.name)
            }
            diff={item.diff_with_prev}
            indicator={indicator}
            series={[
              {
                name: "Promedio",
                data: !!indicator.mensual
                  ? Array(2).fill(Math.round(item.total_month_avg * 100) / 100)
                  : item.weeks.map(
                      (w) => Math.round(w.total_week_avg * 100) / 100
                    ),
              },
            ]}
          />
        ))}
      </div>
      <div>
        <StatiscticsAllMonthsCard
          style={{ gridArea: "chart" }}
          average={
            !!data.total_avg ? Math.round(data.total_avg * 100) / 100 : 0
          }
          labels={data.months.map((item) => item.short_name).reverse()}
          indicator={indicator}
          series={[
            {
              name: "Promedio",
              data: data.months.map((m) => m.total_month_avg).reverse(),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardPage;

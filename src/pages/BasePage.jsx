import React, { useState } from "react";
import moment from "moment";
import Sidebar from "../components/common/Sidebar";
import Filters from "../components/common/Filters";
import Header from "../components/common/Header";
import { getIndicatorData, IndicatorItems } from "../utility/utils";
import { useEffect } from "react";
import { toast } from "react-toastify";

const defaultData = {
  serie: [],
};

const BasePage = ({ Component, title, selected }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState(defaultData);
  const [year, setYear] = useState(moment().format("YYYY"));
  const [indicator, setIndicator] = useState(IndicatorItems[0]);
  const [openSidebar, setOpenSidebar] = useState(true);

  useEffect(() => {
    (async () => {
      setIsFetching(true);
      const data = await getIndicatorData(indicator.value, year);
      if (!data) {
        setData(defaultData);
        setIsFetching(false);
        return;
      }

      if (!data.serie.length) {
        toast.info("Sin información para mostrar");
      }

      setData({
        ...data,
        serie: data?.serie.filter(
          (item) =>
            moment(item.fecha.split("T")[0]) <= moment(moment(), "YYYY-MM-DD")
        ),
      });

      setTimeout(() => setIsFetching(false), 2000);
    })();
  }, [indicator, year]);

  return (
    <div className="admin-container">
      {isFetching && <div className="loading-bar" />}
      <Sidebar open={openSidebar} />
      <Header
        titlePage={title}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <div className="content">
        <div className="divider" />
        <Filters
          year={year}
          setYear={setYear}
          indicator={indicator}
          setIndicator={setIndicator}
        />
        <Component obj={data} indicator={indicator} year={year} />
      </div>
    </div>
  );
};

export default BasePage;

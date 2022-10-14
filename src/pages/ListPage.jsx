import React, { useState } from "react";
import { useEffect } from "react";
import TableList from "../components/list/TableList";
import { getDiffWithPrevDate } from "../utility/utils";

const ListPage = ({ obj, indicator }) => {
  const [data, setData] = useState([]);

  const formatData = (data) => {
    let formattedData = data.serie.map((item, idx) => ({
      ...item,
      fecha: item.fecha.split("T")[0],
      diff_with_prev: getDiffWithPrevDate(
        data.serie[idx + 1]?.valor,
        item.valor
      ),
      id: idx + 1,
    }));
    return formattedData;
  };

  useEffect(() => {
    if (!obj) return;
    setData(formatData(obj));
  }, [obj]);

  return (
    <div>
      <TableList rows={data} indicator={indicator} />
    </div>
  );
};

export default ListPage;

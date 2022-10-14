import React from "react";
import { IndicatorItems, getLastFiveYearsOptions } from "../../utility/utils";
import SelectOptions from "./SelectOptions";

const Filters = ({ year, setYear, indicator, setIndicator }) => {
  const yearsOptions = getLastFiveYearsOptions();

  return (
    <div className="filters">
      <div className="filter-item">
        <SelectOptions
          label="Indicador"
          onChange={setIndicator}
          selected={indicator}
          items={IndicatorItems}
        />
      </div>
      <div className="filter-item">
        <SelectOptions
          label="Año"
          onChange={(op) => setYear(op.value)}
          selected={yearsOptions.find((y) => y.value === parseInt(year))}
          items={yearsOptions}
        />
      </div>
    </div>
  );
};

export default Filters;

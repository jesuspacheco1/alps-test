import React from "react";
import Select from "react-select";
import { selectThemeColors } from "../../utility/utils";

const SelectOptions = ({ selected, label, onChange, items }) => {
  return (
    <div>
      <label className="select-label">{label}</label>
      <Select
        placeholder={label}
        className="select_container"
        classNamePrefix="select"
        value={selected}
        isSearchable={true}
        name={label}
        options={items}
        theme={selectThemeColors}
        inputProps={{
          autoComplete: "off",
          autoCorrect: "off",
          spellCheck: "off",
        }}
        onChange={onChange}
        noOptionsMessage={() => "Sin opciones"}
        styles={{
          menu: (styles) => ({
            ...styles,
          }),
        }}
      />
    </div>
  );
};

export default SelectOptions;

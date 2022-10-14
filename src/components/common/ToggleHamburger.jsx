import React from "react";

const ToggleHamburger = ({ status, onClick }) => {
  return (
    <button
      className={`toggle-hamburger${status ? " closed" : ""}`}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default ToggleHamburger;

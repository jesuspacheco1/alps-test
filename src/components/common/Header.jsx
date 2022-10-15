import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { setLogOut } from "../../utility/utils";

const Header = ({ openSidebar, setOpenSidebar, titlePage }) => {
  return (
    <div className="header">
      <div className="header-content">
        <button
          className="toggle-hamburger"
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h2>{titlePage}</h2>
      </div>
      <div className="header-menu">
        <FontAwesomeIcon
          icon={faRightFromBracket}
          onClick={setLogOut}
          className="logOut"
        />
      </div>
    </div>
  );
};

export default Header;

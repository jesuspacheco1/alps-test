import { faChartLine, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/logo-indicador.svg";

const Sidebar = ({ open }) => {
  const path = window.location.pathname;

  return (
    <div className={`sidebar${!open ? " collapsed" : ""}`}>
      <div className="sidebar-header">{<Logo />}</div>
      <div className="sidebar-content">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link
              to="/dashboard"
              className={path === "/dashboard" ? "active" : ""}
            >
              <FontAwesomeIcon icon={faChartLine} />
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/list" className={path === "/list" ? "active" : ""}>
              <FontAwesomeIcon icon={faTable} />
              <span>Lista</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Sidebar.defaultProps = {
  open: true,
};

export default Sidebar;

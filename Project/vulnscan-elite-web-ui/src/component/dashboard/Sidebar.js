import React from "react";
import { AiTwotoneSecurityScan } from "react-icons/ai"; /*scans icon*/
import { RiScanLine } from "react-icons/ri";
import { RiDashboardLine } from "react-icons/ri";
import { GiTargetArrows } from "react-icons/gi";
import { RiSkull2Line } from "react-icons/ri";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";

import { BsMenuButtonWideFill, BsFillGearFill } from "react-icons/bs";

const Sidebar = ({ openSidebarToggle, OpenSidebar }) => {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <AiTwotoneSecurityScan className="icon_header" /> New SCAN
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <a href="">
            <RiDashboardLine className="icon" /> Dashboard
          </a>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/scanns">
            <RiScanLine className="icon" /> Scans
          </Link>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <GiTargetArrows className="icon" /> Targets
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <RiSkull2Line className="icon" /> Risks
          </a>
        </li>

        <li className="sidebar-list-item">
          <a href="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Settings
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <CiLogout className="icon" /> Logout
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;

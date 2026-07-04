import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const itemStyle = ({ isActive }) =>
    `flex items-center gap-4 py-3.5 px-4 md:px-8 md:min-w-64 cursor-pointer text-gray-700 font-medium 
    transition-all duration-300 ease-in-out border-b border-white hover:bg-gray-50
    hover:shadow-sm hover:translate-x-0.5 hover:text-primary
    ${isActive
      ? "bg-primary/10 text-primary border-r-4 border-primary shadow-inner"
      : ""}`;

  return (
    <div className="min-h-screen bg-white border-r border-gray-100 sticky top-0 shadow-lg">
      <div className="pt-4 pb-8 space-y-1">
        {aToken && (
          <nav>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-8 py-2 mb-2 hidden md:block">ADMIN</h3>
            <ul>
              <NavLink to="/admin-dashboard" className={itemStyle}>
                <img src={assets.home_icon} className="w-5" alt="Dashboard Icon" loading="lazy" />
                <p className="hidden md:block">Dashboard</p>
              </NavLink>

              <NavLink to="/all-appointments" className={itemStyle}>
                <img src={assets.appointment_icon} className="w-5" alt="Appointments Icon" loading="lazy" />
                <p className="hidden md:block">Appointments</p>
              </NavLink>

              <NavLink to="/add-doctor" className={itemStyle}>
                <img src={assets.add_icon} className="w-5" alt="Add Doctor Icon" loading="lazy" />
                <p className="hidden md:block">Add Doctor</p>
              </NavLink>

              <NavLink to="/doctor-list" className={itemStyle}>
                <img src={assets.people_icon} className="w-5" alt="Doctors List Icon" loading="lazy" />
                <p className="hidden md:block">Doctors List</p>
              </NavLink>
            </ul>
          </nav>
        )}

        {dToken && (
          <nav>
            <h3 className="text-xs font-semibold uppercase text-gray-400 px-8 py-2 mb-2 hidden md:block">DOCTOR</h3>
            <ul>
              <NavLink to="/doctor-dashboard" className={itemStyle}>
                <img src={assets.home_icon} className="w-5" alt="Dashboard Icon" loading="lazy" />
                <p className="hidden md:block">Dashboard</p>
              </NavLink>

              <NavLink to="/doctor-appointments" className={itemStyle}>
                <img src={assets.appointment_icon} className="w-5" alt="Appointments Icon" loading="lazy" />
                <p className="hidden md:block">Appointments</p>
              </NavLink>

              <NavLink to="/doctor-profile" className={itemStyle}>
                <img src={assets.people_icon} className="w-5" alt="Profile Icon" loading="lazy" />
                <p className="hidden md:block">Profile</p>
              </NavLink>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
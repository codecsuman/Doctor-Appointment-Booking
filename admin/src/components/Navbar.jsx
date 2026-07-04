import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    setAToken("");
    setDToken("");

    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");

    navigate("/login", { replace: true });
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-10 flex justify-between items-center py-4 px-8 bg-white shadow-lg border-b">

      <div className="flex items-center gap-3">
        <img
          src={assets.logo || assets.admin_logo}
          className="w-36 cursor-pointer transition-opacity duration-300 hover:opacity-80"
          alt="Logo"
          onClick={() =>
            navigate(
              aToken
                ? "/admin-dashboard"
                : "/doctor-dashboard"
            )
          }
        />
        <p className={`px-4 py-1 rounded-full text-sm font-medium border
          ${aToken
            ? "bg-blue-100 text-blue-700 border-blue-300"
            : "bg-green-100 text-green-700 border-green-300"
          }
        `}>
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {(aToken || dToken) && (
        <button
          onClick={logout}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md 
                     transition-all duration-300 ease-in-out
                     hover:bg-red-700 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
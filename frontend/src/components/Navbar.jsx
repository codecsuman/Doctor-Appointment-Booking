import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

// Define the light blue color using a custom style
const lightBlue = "rgb(104, 199, 228)";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/login");
  };

  // Shared classes (no dynamic bg color here — that's handled via inline style)
  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-base rounded-xl transition duration-300 flex items-center gap-2
     font-bold
     text-gray-950
     border-2 border-purple-600
     shadow-md shadow-purple-200

     ${isActive
      ? `border-purple-800 shadow-lg shadow-purple-500/50`
      : `hover:bg-cyan-500 hover:shadow-lg hover:shadow-cyan-500/50`
    }`;

  // Dynamic background color handled separately since Tailwind can't
  // generate bg-[${lightBlue}] from a runtime template string.
  const navLinkStyle = ({ isActive }) => ({
    backgroundColor: isActive ? undefined : lightBlue,
  });

  return (
    // Navbar container (no border, slight shadow)
    <div className="flex items-center justify-between py-4 mb-5 
        rounded-xl px-4 sm:px-8 md:px-12 shadow-sm">

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu - Increased Space (gap-6) */}
      <ul className="md:flex items-center gap-6 hidden">
        <NavLink to="/" className={navLinkClass} style={navLinkStyle}>
          HOME
        </NavLink>
        <NavLink to="/doctors" className={navLinkClass} style={navLinkStyle}>
          ALL DOCTORS
        </NavLink>
        <NavLink to="/about" className={navLinkClass} style={navLinkStyle}>
          ABOUT
        </NavLink>
        <NavLink to="/contact" className={navLinkClass} style={navLinkStyle}>
          CONTACT
        </NavLink>
      </ul>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Logged In Dropdown */}
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-blue-900"
              src={userData.image || assets.default_profile}
              alt="Profile"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = assets.default_profile;
              }}
            />
            <img
              className="w-3"
              src={assets.dropdown_icon}
              alt=""
              aria-label="Open profile menu"
            />

            <div
              className="absolute top-0 right-0 pt-14 hidden group-hover:block z-20"
            >
              <div className="min-w-48 bg-white rounded-lg shadow-xl border px-4 py-3 flex flex-col gap-3 text-gray-700">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-blue-600 cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="hover:text-red-500 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Login Button
          <button
            onClick={() => navigate("/login")}
            style={{ backgroundColor: lightBlue }}
            className="text-gray-950 px-8 py-2 text-base rounded-full hidden md:block
              font-bold hover:bg-cyan-500 transition duration-300 shadow-lg hover:shadow-xl
              border-2 border-purple-600 hover:border-purple-800"
          >
            Create account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-7 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
          aria-label="Open menu"
        />

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${showMenu ? "fixed w-full" : "w-0 h-0"
            } right-0 top-0 bottom-0 bg-white z-20 transition-all overflow-hidden`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b">
            <img src={assets.logo} className="w-36" alt="Logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7 cursor-pointer"
              alt=""
              aria-label="Close menu"
            />
          </div>

          <ul className="flex flex-col items-center gap-4 mt-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>
          </ul>

          {!token && (
            <button
              onClick={() => {
                navigate("/login");
                setShowMenu(false);
              }}
              style={{ backgroundColor: lightBlue }}
              className="mt-8 text-gray-950 px-8 py-3 rounded-full font-bold border-2 border-purple-600"
            >
              Create account
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
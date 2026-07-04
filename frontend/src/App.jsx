import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        pauseOnHover
        pauseOnFocusLoss
        draggable
        closeOnClick
        theme="light"
      />

      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:speciality" element={<Doctors />} />

            <Route
              path="/appointment/:docId"
              element={<Appointment />}
            />

            <Route
              path="/my-appointments"
              element={<MyAppointments />}
            />

            <Route
              path="/my-profile"
              element={<MyProfile />}
            />

            <Route path="/verify" element={<Verify />} />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="flex h-[60vh] items-center justify-center text-2xl font-semibold">
                  404 | Page Not Found
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default App;
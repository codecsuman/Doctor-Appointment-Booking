import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { setAToken } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // backendUrl already ends with /api
      const url =
        state === "Admin"
          ? `${backendUrl}/admin/login`
          : `${backendUrl}/doctor/login`;

      const { data } = await axios.post(url, {
        email,
        password,
      });

      if (data.success) {
        if (state === "Admin") {
          setAToken(data.token);
          localStorage.setItem("aToken", data.token);
        } else {
          setDToken(data.token);
          localStorage.setItem("dToken", data.token);
        }

        toast.success(`${state} Login Successful`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Network Error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-xl shadow-lg w-[380px]"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          {state} <span className="text-primary font-normal">Login</span>
        </h1>

        <div className="mb-4">
          <label className="text-sm font-medium">Email</label>

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-3 rounded-lg mt-1"
          />
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium">Password</label>

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-3 rounded-lg mt-1"
          />
        </div>

        <button
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold"
          type="submit"
        >
          Login
        </button>

        {state === "Admin" ? (
          <p className="text-center mt-5">
            Login as Doctor?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setState("Doctor");
                setEmail("");
                setPassword("");
              }}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p className="text-center mt-5">
            Login as Admin?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => {
                setState("Admin");
                setEmail("");
                setPassword("");
              }}
            >
              Click Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
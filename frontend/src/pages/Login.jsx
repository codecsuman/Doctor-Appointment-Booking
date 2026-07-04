import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    token,
    setToken,
    userData,
    axiosInstance,
    loadUserProfile,
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const endpoint =
        state === "Sign Up"
          ? "/user/register"
          : "/user/login";

      const body =
        state === "Sign Up"
          ? {
              name,
              email,
              password,
            }
          : {
              email,
              password,
            };

      const { data } = await axiosInstance.post(
        endpoint,
        body
      );

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);

      await loadUserProfile();

      toast.success(
        state === "Sign Up"
          ? "Account created successfully."
          : "Login successful."
      );

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && userData) {
      navigate("/");
    }
  }, [token, userData, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2">
          {state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </h1>

        <p className="text-gray-500 mb-6">
          {state === "Sign Up"
            ? "Create your account to continue."
            : "Welcome back."}
        </p>

        {state === "Sign Up" && (
          <input
            className="w-full border rounded-lg p-3 mb-4"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
        )}

        <input
          className="w-full border rounded-lg p-3 mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          className="w-full border rounded-lg p-3 mb-6"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          minLength={8}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : state === "Sign Up"
            ? "Create Account"
            : "Login"}
        </button>

        <p className="text-center mt-5">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}

          <span
            onClick={() =>
              setState(
                state === "Sign Up"
                  ? "Login"
                  : "Sign Up"
              )
            }
            className="text-blue-600 font-semibold cursor-pointer ml-2"
          >
            {state === "Sign Up"
              ? "Login"
              : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
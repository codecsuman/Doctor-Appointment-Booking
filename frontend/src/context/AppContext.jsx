import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL ||
    "http://localhost:4000/api";

  const [token, setToken] = useState(
    localStorage.getItem("token") || ""
  );

  const [doctors, setDoctors] = useState([]);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!token;

  // ============================
  // Axios Instance
  // ============================
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: backendUrl,
      timeout: 15000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, [backendUrl]);

  // ============================
  // Axios Interceptors
  // ============================
  useEffect(() => {
    const requestInterceptor =
      axiosInstance.interceptors.request.use(
        (config) => {
          if (token) {
            config.headers.token = token;
          }

          return config;
        },
        (error) => Promise.reject(error)
      );

    const responseInterceptor =
      axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error.response?.status === 401) {
            logout();
          }

          return Promise.reject(error);
        }
      );

    return () => {
      axiosInstance.interceptors.request.eject(
        requestInterceptor
      );

      axiosInstance.interceptors.response.eject(
        responseInterceptor
      );
    };
  }, [axiosInstance, token]);

  // ============================
  // Error Handler
  // ============================
  const handleApiError = useCallback((error) => {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
        "Something went wrong"
    );
  }, []);

  // ============================
  // Logout
  // ============================
  const logout = useCallback(() => {
    setToken("");
    setUserData(null);
    setAppointments([]);

    localStorage.removeItem("token");
  }, []);

  // ============================
  // Doctors
  // ============================
  const getDoctorsData = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axiosInstance.get(
        "/doctor/list"
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, handleApiError]);

  // ============================
  // User Profile
  // ============================
  const loadUserProfile = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axiosInstance.get(
        "/user/get-profile"
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [axiosInstance, token, handleApiError]);

  // ============================
  // User Appointments
  // ============================
  const loadAppointments = useCallback(async () => {
    if (!token) return;

    try {
      const { data } = await axiosInstance.get(
        "/user/appointments"
      );

      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleApiError(error);
    }
  }, [axiosInstance, token, handleApiError]);

  // ============================
  // Initial Load
  // ============================
  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  // ============================
  // Token Change
  // ============================
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      loadUserProfile();
      loadAppointments();
    } else {
      localStorage.removeItem("token");
      setUserData(null);
      setAppointments([]);
    }
  }, [token, loadUserProfile, loadAppointments]);

  // ============================
  // Context Value
  // ============================
  const value = useMemo(
    () => ({
      currency,
      backendUrl,

      token,
      setToken,
      logout,
      isAuthenticated,

      doctors,
      userData,
      setUserData,
      appointments,

      loading,

      axiosInstance,

      getDoctorsData,
      loadUserProfile,
      loadAppointments,
    }),
    [
      currency,
      backendUrl,
      token,
      doctors,
      userData,
      appointments,
      loading,
      axiosInstance,
      getDoctorsData,
      loadUserProfile,
      loadAppointments,
      logout,
      isAuthenticated,
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
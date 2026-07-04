import { createContext, useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [aToken, setAToken] = useState(localStorage.getItem("aToken") || "");
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Sync aToken with localStorage
    useEffect(() => {
        if (aToken) {
            localStorage.setItem("aToken", aToken);
        } else {
            localStorage.removeItem("aToken");
        }
    }, [aToken]);

    // Clear data on logout
    useEffect(() => {
        if (!aToken) {
            setDoctors([]);
            setAppointments([]);
            setDashData(null);
        }
    }, [aToken]);

    // Axios Instance
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: backendUrl,
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }, [backendUrl]);

    // Automatically attach Admin Token
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use((config) => {
            if (aToken) {
                config.headers.atoken = aToken;
            }
            return config;
        });

        return () => {
            axiosInstance.interceptors.request.eject(interceptor);
        };
    }, [axiosInstance, aToken]);

    const handleApiError = (e, message) => {
        console.error(e);
        toast.error(e.response?.data?.message || message || "Something went wrong");
    };

    const getAllDoctors = useCallback(async () => {
        if (!aToken) return;

        setIsLoading(true);

        try {
            const { data } = await axiosInstance.get("/admin/all-doctors");

            if (data.success) {
                setDoctors(data.doctors);
            }
        } catch (e) {
            handleApiError(e, "Failed to fetch doctors");
        } finally {
            setIsLoading(false);
        }

    }, [axiosInstance, aToken]);

    const changeAvailability = useCallback(async (docId) => {

        try {
            const { data } = await axiosInstance.post(
                "/admin/change-availability",
                { docId }
            );

            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }

        } catch (e) {
            handleApiError(e, "Failed to change availability");
        }

    }, [axiosInstance, getAllDoctors]);

    const getAllAppointments = useCallback(async () => {

        if (!aToken) return;

        setIsLoading(true);

        try {
            const { data } = await axiosInstance.get("/admin/appointments");

            if (data.success) {
                setAppointments([...data.appointments].reverse());
            }

        } catch (e) {
            handleApiError(e, "Failed to load appointments");
        } finally {
            setIsLoading(false);
        }

    }, [axiosInstance, aToken]);

    const cancelAppointment = useCallback(async (appointmentId) => {

        try {
            const { data } = await axiosInstance.post(
                "/admin/cancel-appointment",
                { appointmentId }
            );

            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
            }

        } catch (e) {
            handleApiError(e, "Failed to cancel appointment");
        }

    }, [axiosInstance, getAllAppointments]);

    const getDashData = useCallback(async () => {

        if (!aToken) return;

        setIsLoading(true);

        try {
            const { data } = await axiosInstance.get("/admin/dashboard");

            if (data.success) {
                setDashData(data.dashData);
            }

        } catch (e) {
            handleApiError(e, "Failed to load dashboard");
        } finally {
            setIsLoading(false);
        }

    }, [axiosInstance, aToken]);

    const value = {
        backendUrl,

        axiosInstance,

        aToken,
        setAToken,

        doctors,
        appointments,
        dashData,

        isLoading,

        getAllDoctors,
        getAllAppointments,
        getDashData,
        changeAvailability,
        cancelAppointment,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Sync dToken with localStorage
    useEffect(() => {
        if (dToken) {
            localStorage.setItem("dToken", dToken);
        } else {
            localStorage.removeItem("dToken");
        }
    }, [dToken]);

    // Clear state on logout
    useEffect(() => {
        if (!dToken) {
            setAppointments([]);
            setDashData(null);
            setProfileData(null);
        }
    }, [dToken]);

    // Axios instance
    const axiosInstance = useMemo(() => {
        return axios.create({
            baseURL: backendUrl,
            timeout: 10000,
        });
    }, [backendUrl]);

    // Automatically attach Doctor Token
    useEffect(() => {
        const interceptor = axiosInstance.interceptors.request.use((config) => {
            if (dToken) {
                config.headers.dtoken = dToken;
            }
            return config;
        });

        return () => {
            axiosInstance.interceptors.request.eject(interceptor);
        };
    }, [axiosInstance, dToken]);

    const handleApiError = useCallback((e, customMessage = "An unknown error occurred.") => {
        console.error("Doctor API Error:", e);
        const message = e.response?.data?.message || e.message || customMessage;
        toast.error(message);
    }, []);

    const getDashData = useCallback(async () => {
        if (!dToken) return;
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.get("/doctor/dashboard");
            if (data.success) setDashData(data.dashData);
        } catch (e) {
            handleApiError(e, "Failed to load dashboard statistics.");
        } finally {
            setIsLoading(false);
        }
    }, [axiosInstance, dToken, handleApiError]);

    const getAppointments = useCallback(async () => {
        if (!dToken) return;
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.get("/doctor/appointments");
            if (data.success) setAppointments([...data.appointments].reverse());
        } catch (e) {
            handleApiError(e, "Failed to fetch appointment list.");
        } finally {
            setIsLoading(false);
        }
    }, [axiosInstance, dToken, handleApiError]);

    const getProfileData = useCallback(async () => {
        if (!dToken) return;
        setIsLoading(true);
        try {
            const { data } = await axiosInstance.get("/doctor/profile");
            if (data.success) setProfileData(data.profileData);
        } catch (e) {
            handleApiError(e, "Failed to fetch doctor profile.");
        } finally {
            setIsLoading(false);
        }
    }, [axiosInstance, dToken, handleApiError]);

    const cancelAppointment = useCallback(async (id) => {
        try {
            const { data } = await axiosInstance.post(
                "/doctor/cancel-appointment",
                { appointmentId: id }
            );
            if (data.success) {
                toast.success("Appointment cancelled successfully.");
                await getAppointments();
                await getDashData();
            }
        } catch (e) {
            handleApiError(e, "Failed to cancel appointment.");
        }
    }, [axiosInstance, getAppointments, getDashData, handleApiError]);

    const completeAppointment = useCallback(async (id) => {
        try {
            const { data } = await axiosInstance.post(
                "/doctor/complete-appointment",
                { appointmentId: id }
            );
            if (data.success) {
                toast.success("Appointment marked as complete!");
                await getAppointments();
                await getDashData();
            }
        } catch (e) {
            handleApiError(e, "Failed to complete appointment.");
        }
    }, [axiosInstance, getAppointments, getDashData, handleApiError]);

    const contextValue = useMemo(() => ({
        dToken,
        setDToken,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        isLoading,
    }), [
        dToken,
        appointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        dashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        isLoading,
    ]);

    return (
        <DoctorContext.Provider value={contextValue}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;
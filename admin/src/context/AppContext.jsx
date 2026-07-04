import { createContext, useMemo, useCallback } from "react";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY || "₹";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const MONTHS = useMemo(() => ([
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ]), []);

    const slotDateFormat = useCallback((slotDate) => {
        const [day, monthStr, year] = slotDate.split("_");
        const monthIndex = parseInt(monthStr, 10);

        if (monthIndex < 1 || monthIndex > 12) {
            console.error("Invalid month index:", monthStr);
            return slotDate;
        }

        return `${day} ${MONTHS[monthIndex - 1]} ${year}`;
    }, [MONTHS]);

    const calculateAge = useCallback((dob) => {
        const today = new Date();
        const birthDate = new Date(dob);

        if (isNaN(birthDate)) {
            console.error("Invalid Date of Birth provided:", dob);
            return 0;
        }

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }, []);

    const contextValue = useMemo(() => ({
        backendUrl,
        currency,
        slotDateFormat,
        calculateAge,
    }), [backendUrl, currency, slotDateFormat, calculateAge]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
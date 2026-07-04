import axios from "axios";
import React, { useContext, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Verify = () => {
    const [searchParams] = useSearchParams();

    const success = searchParams.get("success");
    const appointmentId = searchParams.get("appointmentId");

    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();
    const hasVerified = useRef(false);

    const verifyStripe = async () => {
        try {
            // ✅ FIXED: Removed /api/ prefix — backendUrl already contains /api
            const { data } = await axios.post(
                backendUrl + "/user/verifyStripe",
                { success, appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message || "Payment verified successfully! 🎉");
            } else {
                toast.error(data.message || "Payment verification failed.");
            }

            setTimeout(() => {
                navigate("/my-appointments");
            }, 1500);

        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred during verification."
            );
            setTimeout(() => {
                navigate("/my-appointments");
            }, 1500);
        }
    };

    useEffect(() => {
        if (token && appointmentId && success !== null && !hasVerified.current) {
            hasVerified.current = true;
            verifyStripe();
        }
    }, [token, appointmentId, success]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-2xl max-w-md w-full">

                <div className="w-16 h-16 border-[6px] border-gray-200 border-t-primary rounded-full animate-spin mb-6"></div>

                <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">
                    Verifying Payment...
                </h1>
                <p className="text-sm text-gray-500 text-center">
                    Please wait while we confirm your appointment details. Do not close this window.
                </p>
            </div>
        </div>
    );
};

export default Verify;
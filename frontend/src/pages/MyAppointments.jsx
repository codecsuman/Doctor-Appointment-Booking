import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const MyAppointments = () => {
    const { backendUrl, token, currency } = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [payment, setPayment] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [payLoading, setPayLoading] = useState(false);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    const slotDateFormat = (slotDate) => {
        const d = slotDate.split("_");
        const monthIndex = Number(d[1]) - 1;
        const monthName = months[monthIndex] || "";
        return `${d[0]} ${monthName} ${d[2]}`;
    };

    const getUserAppointments = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(
                backendUrl + "/user/appointments",
                { headers: { token } }
            );
            if (data.success) setAppointments([...data.appointments].reverse());
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to load appointments."
            );
        } finally {
            setIsLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        if (!window.confirm("Are you sure you want to cancel this appointment?")) {
            return;
        }
        try {
            const { data } = await axios.post(
                backendUrl + "/user/cancel-appointment",
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success("Appointment successfully cancelled.");
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Error cancelling appointment."
            );
        }
    };

    // ✅ DUMMY RAZORPAY — instant success, no popup
    const appointmentRazorpay = async (appointmentId) => {
        setPayLoading(true);
        try {
            const { data } = await axios.post(
                backendUrl + "/user/payment-razorpay",
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success("Payment Successful 🎉");
                setPayment("");
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Payment failed"
            );
        } finally {
            setPayLoading(false);
        }
    };

    // ✅ DUMMY STRIPE — instant success, no redirect
    const appointmentStripe = async (appointmentId) => {
        setPayLoading(true);
        try {
            const { data } = await axios.post(
                backendUrl + "/user/payment-stripe",
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success("Payment Successful 🎉");
                setPayment("");
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Payment failed"
            );
        } finally {
            setPayLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        } else {
            navigate("/login");
        }
    }, [token, navigate]);

    const SkeletonCard = () => (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 animate-pulse">
            <div className="w-full sm:w-1/4 flex-shrink-0">
                <div className="aspect-video sm:aspect-square bg-gray-200 rounded-lg"></div>
            </div>
            <div className="flex-1 space-y-3">
                <div className="w-3/4 h-6 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/4 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="sm:w-1/4 flex flex-col gap-3">
                <div className="h-10 bg-gray-200 rounded-lg"></div>
                <div className="h-10 bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    );

    if (isLoading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>
                <div className="flex flex-col gap-6">
                    {Array(3).fill(0).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            </div>
        );
    }

    if (appointments.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>
                <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100">
                    <p className="text-6xl mb-4">📅</p>
                    <p className="text-xl font-semibold text-gray-600">You haven't booked any appointments yet.</p>
                    <button
                        onClick={() => navigate("/doctors")}
                        className="mt-6 bg-primary text-white py-2 px-6 rounded-full font-medium hover:brightness-110 transition-all shadow-md"
                    >
                        Book Your First Appointment
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Appointments</h1>

            <div className="flex flex-col gap-6">
                {appointments.map((item) => {
                    let statusText = "Upcoming";
                    let statusClasses = "bg-blue-500 text-white";

                    if (item.cancelled) {
                        statusText = "Cancelled";
                        statusClasses = "bg-red-100 text-red-600 border border-red-300";
                    } else if (item.isCompleted) {
                        statusText = "Completed";
                        statusClasses = "bg-green-100 text-green-600 border border-green-300";
                    } else if (item.payment) {
                        statusText = "Confirmed & Paid";
                        statusClasses = "bg-emerald-500 text-white";
                    }

                    return (
                        <div
                            key={item._id}
                            className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.005]"
                        >
                            <div className="w-full sm:w-1/4 flex-shrink-0 relative p-2 bg-white rounded-lg shadow-xl border border-gray-200">
                                <div className="relative aspect-video sm:aspect-square overflow-hidden rounded-md">
                                    <img
                                        className="w-full h-full object-cover"
                                        src={item.docData.image}
                                        alt={`Dr. ${item.docData.name}`}
                                        loading="lazy"
                                    />
                                </div>
                                <span className={`absolute top-4 right-4 z-10 px-3 py-1 text-xs font-semibold rounded-full ${statusClasses}`}>
                                    {statusText}
                                </span>
                            </div>

                            <div className="flex-1 text-sm text-gray-600">
                                <p className="text-2xl text-gray-900 font-extrabold mb-1">
                                    Dr. {item.docData.name}
                                </p>
                                <p className="text-primary font-semibold mb-2">{item.docData.speciality}</p>

                                <div className="flex items-center gap-2 text-base font-medium text-gray-700 mt-3">
                                    <span className="text-lg">📅</span>
                                    <p>
                                        <span className="font-bold">{slotDateFormat(item.slotDate)}</span> at {item.slotTime}
                                    </p>
                                </div>

                                <div className="mt-3 text-sm text-gray-500">
                                    <p className="font-semibold text-gray-700">Clinic Address:</p>
                                    <p>{item.docData.address.line1}</p>
                                    <p>{item.docData.address.line2}</p>
                                </div>

                                <p className="text-lg font-extrabold text-gray-800 mt-4">
                                    Fee: <span className="text-primary ml-1">{currency}{item.docData.fees}</span>
                                </p>
                            </div>

                            <div className="sm:w-1/4 flex flex-col gap-3 justify-end text-sm text-center pt-4 sm:pt-0">
                                {!item.cancelled && !item.isCompleted ? (
                                    <>
                                        {!item.payment && payment !== item._id && (
                                            <button
                                                onClick={() => setPayment(item._id)}
                                                className="bg-primary text-white font-bold py-2 rounded-lg shadow-md hover:brightness-110 transition-all"
                                            >
                                                Proceed to Payment
                                            </button>
                                        )}

                                        {payment === item._id && (
                                            <>
                                                <p className="text-xs font-medium text-gray-500">Choose Payment Method</p>
                                                <button
                                                    onClick={() => appointmentStripe(item._id)}
                                                    disabled={payLoading}
                                                    className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <img className="max-w-16 h-5" src={assets.stripe_logo} alt="Pay with Stripe" />
                                                </button>

                                                <button
                                                    onClick={() => appointmentRazorpay(item._id)}
                                                    disabled={payLoading}
                                                    className="py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    <img className="max-w-20 h-5" src={assets.razorpay_logo} alt="Pay with Razorpay" />
                                                </button>

                                                <button
                                                    onClick={() => setPayment("")}
                                                    className="text-xs text-gray-500 hover:text-red-500 mt-1"
                                                >
                                                    Cancel Payment Selection
                                                </button>
                                            </>
                                        )}

                                        {payment !== item._id && (
                                            <button
                                                onClick={() => cancelAppointment(item._id)}
                                                className="py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-all mt-2"
                                            >
                                                Cancel Appointment
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button
                                        className={`py-2 rounded-lg font-bold shadow-md cursor-default 
                                        ${item.isCompleted ? "bg-green-500 text-white" : "bg-red-500/10 text-red-700 border border-red-200"}`}
                                    >
                                        {item.isCompleted ? "Appointment Finished" : "Status: Cancelled"}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyAppointments;
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    isLoading,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">All Appointments</h2>

      <div className="bg-white border rounded shadow-md overflow-x-auto">
        <div className="hidden md:grid grid-cols-[0.4fr_2fr_1fr_1fr_2fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700 bg-gray-100">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p className="text-lg font-medium">No appointments found.</p>
            <p className="text-sm text-gray-400 mt-1">New bookings will appear here.</p>
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[0.4fr_2fr_1fr_1fr_2fr_1fr_1fr] 
                         items-center text-sm text-gray-700 py-3 px-6 border-b hover:bg-gray-50 transition-colors"
            >
              <p>{appointments.indexOf(item) + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item?.userData?.image || assets.default_user}
                  onError={(e) => {
                    e.currentTarget.src = assets.default_user;
                  }}
                  className="w-8 h-8 rounded-full object-cover"
                  alt="Patient"
                  loading="lazy"
                />
                <p className="font-medium">{item?.userData?.name || "Unknown Patient"}</p>
              </div>

              <span className={`px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                item.payment
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}>
                {item.payment ? "Online" : "Cash"}
              </span>

              <p className="text-gray-500">
                {item?.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
              </p>

              <div>
                <p className="font-mono text-xs">{slotDateFormat(item.slotDate)}</p>
                <p className="text-xs text-gray-400">{item.slotTime}</p>
              </div>

              <p className="font-bold text-green-600">
                {currency}{Number(item.amount).toLocaleString()}
              </p>

              {item.cancelled ? (
                <span className="text-red-500 text-xs font-bold bg-red-100 p-1 rounded text-center flex items-center justify-center gap-1">
                  <span>❌</span> Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-green-600 text-xs font-bold bg-green-100 p-1 rounded text-center flex items-center justify-center gap-1">
                  <span>✅</span> Completed
                </span>
              ) : (
                <div className="flex gap-2 justify-center">
                  <img
                    src={assets.cancel_icon}
                    className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    onClick={() => {
                      if (window.confirm("Cancel this appointment?")) {
                        cancelAppointment(item._id);
                      }
                    }}
                    title="Cancel Appointment"
                    alt="Cancel"
                  />
                  <img
                    src={assets.tick_icon}
                    className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
                    onClick={() => {
                      if (window.confirm("Mark this appointment as completed?")) {
                        completeAppointment(item._id);
                      }
                    }}
                    title="Complete Appointment"
                    alt="Complete"
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorAppointments;
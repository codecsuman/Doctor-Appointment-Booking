
import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    getDashData,
    isLoading,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);

  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken, getDashData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!dashData) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-500 text-lg">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* === KPI Cards Section === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Earnings Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border">
          <img src={assets.earning_icon} className="w-12 h-12" alt="Earnings icon" loading="lazy" />
          <div>
            <h3 className="text-2xl font-bold text-green-700">
              {currency}{Number(dashData.earnings || 0).toLocaleString()}
            </h3>
            <p className="text-gray-500 text-sm">Total Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border">
          <img src={assets.appointments_icon} className="w-12 h-12" alt="Appointments icon" loading="lazy" />
          <div>
            <h3 className="text-2xl font-bold text-blue-600">{dashData.appointments}</h3>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border">
          <img src={assets.patients_icon} className="w-12 h-12" alt="Patients icon" loading="lazy" />
          <div>
            <h3 className="text-2xl font-bold text-red-600">{dashData.patients}</h3>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* === Latest Bookings Section === */}
      <div className="mt-8 bg-white border rounded-lg shadow-lg max-w-2xl">
        <div className="flex items-center gap-2 p-4 border-b">
          <img src={assets.list_icon} className="w-6 h-6" alt="List icon" loading="lazy" />
          <p className="font-bold text-lg text-gray-800">Latest Bookings</p>
        </div>

        {dashData.latestAppointments.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            <p className="text-lg font-medium">No recent appointments.</p>
            <p className="text-sm text-gray-400 mt-1">New bookings will appear here.</p>
          </div>
        ) : (
          dashData.latestAppointments.slice(0, 5).map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              <img
                src={item?.userData?.image || assets.default_user}
                onError={(e) => {
                  e.currentTarget.src = assets.default_user;
                }}
                className="w-10 h-10 rounded-full object-cover mr-4"
                alt="Patient profile"
                loading="lazy"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item?.userData?.name || "Unknown Patient"}</p>
                <div>
                  <p className="font-semibold text-xs text-gray-600">Booking</p>
                  <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {item.cancelled ? (
                <span className="text-red-500 text-xs font-bold bg-red-100 p-1 rounded flex items-center gap-1">
                  <span>❌</span> Cancelled
                </span>
              ) : item.isCompleted ? (
                <span className="text-green-600 text-xs font-bold bg-green-100 p-1 rounded flex items-center gap-1">
                  <span>✅</span> Completed
                </span>
              ) : (
                <div className="flex gap-2">
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

export default DoctorDashboard;
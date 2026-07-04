import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData, isLoading } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken, getDashData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!dashData) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <p className="text-gray-500 text-lg">Failed to load dashboard data.</p>
      </div>
    );
  }

  return (
    <div className="m-5">
      {/* === KPI Cards Section === */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Doctors Card */}
        <div className="flex items-center gap-3 bg-white p-4 rounded shadow-md hover:shadow-xl hover:scale-105 transition-all">
          <img src={assets.doctor_icon} className="w-14" alt="Doctor icon" loading="lazy" />
          <div>
            <p className="text-xl font-semibold">{Number(dashData.doctors).toLocaleString()}</p>
            <p className="text-gray-500">Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-3 bg-white p-4 rounded shadow-md hover:shadow-xl hover:scale-105 transition-all">
          <img src={assets.appointments_icon} className="w-14" alt="Appointments icon" loading="lazy" />
          <div>
            <p className="text-xl font-semibold">{Number(dashData.appointments).toLocaleString()}</p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-3 bg-white p-4 rounded shadow-md hover:shadow-xl hover:scale-105 transition-all">
          <img src={assets.patients_icon} className="w-14" alt="Patients icon" loading="lazy" />
          <div>
            <p className="text-xl font-semibold">{Number(dashData.patients).toLocaleString()}</p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* === Latest Bookings Section === */}
      <div className="bg-white mt-10 max-w-2xl mx-auto md:mx-0 border rounded shadow-lg">
        <div className="flex items-center gap-2 px-4 py-4 border-b">
          <img src={assets.list_icon} className="w-6 h-6" alt="List icon" loading="lazy" />
          <p className="font-bold text-lg text-gray-800">Latest Bookings</p>
        </div>

        <div className="divide-y divide-gray-200">
          {dashData.latestAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg font-medium">No recent appointments</p>
              <p className="text-sm text-gray-400 mt-1">New bookings will appear here.</p>
            </div>
          ) : (
            dashData.latestAppointments.slice(0, 5).map((item) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-50 transition-colors"
                key={item._id}
              >
                <img
                  src={item?.docData?.image || assets.default_doctor}
                  onError={(e) => {
                    e.target.src = assets.default_doctor;
                  }}
                  className="w-10 h-10 rounded-full object-cover border"
                  alt="Doctor profile"
                  loading="lazy"
                />

                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-800">{item?.docData?.name || "Unknown Doctor"}</p>
                  <div>
                    <p className="font-semibold text-xs text-gray-600">Booking</p>
                    <p className="text-xs text-gray-500">{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-bold bg-red-100 p-1 rounded flex items-center gap-1">
                    <span>❌</span> Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-bold bg-green-100 p-1 rounded flex items-center gap-1">
                    <span>✅</span> Completed
                  </p>
                ) : (
                  <img
                    onClick={() => {
                      if (window.confirm("Cancel this appointment?")) {
                        cancelAppointment(item._id);
                      }
                    }}
                    src={assets.cancel_icon}
                    className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                    alt="Cancel appointment"
                    title="Cancel Appointment"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useEffect, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    isLoading,
    cancelAppointment,
    getAllAppointments,
  } = useContext(AdminContext);

  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center h-96">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto">
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 px-6 border-b font-medium text-gray-700 bg-gray-100 sticky top-0 z-10">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            <p className="text-lg font-medium">No appointments found.</p>
            <p className="text-sm text-gray-400 mt-1">Appointments will appear here once patients book them.</p>
          </div>
        ) : (
          appointments.map((item) => (
            <div
              key={item._id}
              className="flex flex-wrap justify-between max-sm:gap-2 
                sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]
                items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            >
              <p className="max-sm:hidden">{appointments.indexOf(item) + 1}</p>

              <div className="flex items-center gap-2">
                <img
                  src={item?.userData?.image || assets.default_user}
                  onError={(e) => {
                    e.target.src = assets.default_user;
                  }}
                  className="w-8 h-8 object-cover rounded-full"
                  alt="user"
                  loading="lazy"
                />
                <p className="font-medium text-gray-700">
                  {item?.userData?.name || "Unknown User"}
                </p>
              </div>

              <p className="max-sm:hidden">
                {item?.userData?.dob
                  ? calculateAge(item.userData.dob)
                  : "N/A"}
              </p>

              <div>
                <p className="font-mono">{item.slotDate ? slotDateFormat(item.slotDate) : "N/A"}</p>
                <p className="text-xs text-gray-400">{item.slotTime}</p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={item?.docData?.image || assets.default_doctor}
                  onError={(e) => {
                    e.target.src = assets.default_doctor;
                  }}
                  className="w-8 h-8 object-cover rounded-full bg-gray-200"
                  alt="doctor"
                  loading="lazy"
                />
                <p className="font-medium text-gray-700">
                  {item?.docData?.name || "Unknown Doctor"}
                </p>
              </div>

              <p className="font-semibold text-green-600">
                {currency}
                {Number(item.amount).toLocaleString()}
              </p>

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
                  className="w-6 h-6 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
                  src={assets.cancel_icon}
                  alt="cancel"
                  title="Cancel Appointment"
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
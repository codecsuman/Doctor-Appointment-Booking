import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorsList = () => {
  const { doctors, changeAvailability, aToken, getAllDoctors, isLoading } =
    useContext(AdminContext);

  const { currency } = useContext(AppContext);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken, getAllDoctors]);

  const handleAvailabilityChange = async (item) => {
    if (updatingId) return;
    if (!window.confirm(`Change availability of ${item.name}?`)) return;

    setUpdatingId(item._id);
    await changeAvailability(item._id);
    setUpdatingId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-y-auto">
      <h1 className="text-xl font-bold mb-5 text-gray-800">All Doctors</h1>

      {doctors.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No doctors found.</p>
          <p className="text-sm text-gray-400 mt-1">Add doctors to see them here.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 pt-5">
          {doctors.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl w-60 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-full h-40 flex items-center justify-center bg-[#EAEFFF] group-hover:bg-blue-100 transition-all duration-300">
                <img
                  src={item.image || assets.default_doctor}
                  onError={(e) => {
                    e.currentTarget.src = assets.default_doctor;
                  }}
                  className="w-full h-full object-cover"
                  alt={`${item.name} profile`}
                  loading="lazy"
                />
              </div>

              <div className="p-4 bg-white">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600 mb-1">{item.speciality}</p>
                <p className="text-xs text-gray-500 mb-1">{item.degree}</p>
                <p className="text-xs text-gray-500 mb-2">Exp: {item.experience}</p>
                <p className="font-semibold text-primary text-sm mb-3">
                  {currency}{Number(item.fees).toLocaleString()}
                </p>

                <div className="flex items-center gap-2 mt-2 text-sm">
                  <input
                    type="checkbox"
                    checked={item.available}
                    onChange={() => handleAvailabilityChange(item)}
                    disabled={updatingId === item._id}
                    aria-label={`Toggle availability for ${item.name}`}
                    className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary disabled:opacity-50"
                  />
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, currency } = useContext(AppContext);

    const handleDoctorNavigation = (id) => {
        navigate(`/appointment/${id}`);
        window.scrollTo(0, 0);
    };

    const handleViewAllDoctors = () => {
        navigate("/doctors");
        window.scrollTo(0, 0);
    };

    if (!doctors?.length) return null;

    return (
        <div className="flex flex-col items-center gap-6 my-16 text-gray-800">
            <h1 className="text-3xl font-extrabold border-b-4 border-primary/50 pb-1 text-center">
                Top <span className="text-primary">Doctors</span> to Book
            </h1>

            <p className="sm:w-2/3 text-center text-base text-gray-600">
                Meet our most trusted and highly-rated medical professionals, ready to provide exceptional care.
            </p>

            <div className="container mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-8 px-4 sm:px-0">
                {doctors.slice(0, 8).map((item) => (
                    <button
                        key={item._id}
                        onClick={() => handleDoctorNavigation(item._id)}
                        className="group text-left bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 cursor-pointer hover:shadow-2xl hover:scale-[1.02] hover:border-primary transition-all duration-300"
                    >
                        <div className="w-full aspect-square bg-gradient-to-b from-[#EAEFFF] to-white flex items-center justify-center overflow-hidden relative">
                            <img
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                                src={item.image}
                                alt={item.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        </div>

                        <div className="p-4">
                            <p
                                className={`flex items-center gap-2 text-sm font-medium mb-1 ${
                                    item.available ? "text-green-600" : "text-red-500"
                                }`}
                            >
                                <span
                                    className={`w-2 h-2 rounded-full ${
                                        item.available ? "bg-green-600" : "bg-red-500"
                                    }`}
                                />
                                {item.available ? "Available" : "Not Available"}
                            </p>

                            <p className="text-xl font-bold text-gray-900 truncate">
                                {item.name}
                            </p>
                            <p className="text-sm text-primary font-semibold mt-0.5">
                                {item.speciality}
                            </p>

                            <div className="mt-3 flex justify-between items-center border-t pt-2">
                                <p className="text-base font-bold text-gray-700">
                                    {currency}
                                    {item.fees}
                                    <span className="text-xs font-normal text-gray-500 ml-1">
                                        Fee
                                    </span>
                                </p>

                                <span className="text-xs font-semibold text-gray-600 bg-gray-100 py-1 px-2 rounded-full">
                                    {item.experience}
                                </span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <button
                onClick={handleViewAllDoctors}
                className="mt-8 bg-primary text-white font-bold px-10 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
                View All Doctors
            </button>
        </div>
    );
};

export default TopDoctors;

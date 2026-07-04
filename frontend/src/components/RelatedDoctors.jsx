import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate();
    const { doctors, currency } = useContext(AppContext);

    const relDoc = useMemo(() => {
        if (!doctors?.length || !speciality) return [];

        return doctors
            .filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            )
            .slice(0, 4);
    }, [doctors, speciality, docId]);

    const handleDoctorClick = (id) => {
        navigate(`/appointment/${id}`);
        window.scrollTo(0, 0);
    };

    const handleViewAll = () => {
        navigate("/doctors");
        window.scrollTo(0, 0);
    };

    if (relDoc.length === 0) return null;

    return (
        <div className="flex flex-col items-center gap-4 my-16 text-gray-800">
            <h1 className="text-3xl font-extrabold border-b-4 border-primary/50 pb-1 text-center">
                More <span className="text-primary">{speciality}</span> Specialists
            </h1>

            <p className="sm:w-2/3 text-center text-base text-gray-600">
                Didn&apos;t find what you needed? Browse through other highly-rated doctors in the same field.
            </p>

            <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
                {relDoc.map((item) => (
                    <button
                        key={item._id}
                        onClick={() => handleDoctorClick(item._id)}
                        className="text-left bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                    >
                        <img
                            loading="lazy"
                            className="bg-[#EAEFFF] w-full h-40 object-cover"
                            src={item.image}
                            alt={item.name}
                        />

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
                onClick={handleViewAll}
                className="mt-8 bg-primary text-white font-bold px-10 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300"
            >
                View All Doctors
            </button>
        </div>
    );
};

export default RelatedDoctors;

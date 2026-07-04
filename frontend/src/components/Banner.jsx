import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Banner = () => {
    const navigate = useNavigate();
    const { token } = useContext(AppContext);

    const handleClick = () => {
        navigate(token ? "/doctors" : "/login");
        window.scrollTo(0, 0);
    };

    return (
        <div className="flex bg-primary rounded-2xl overflow-hidden shadow-2xl shadow-primary/40">
            <div className="flex-1 py-10 sm:py-16 md:py-24 lg:py-28 pl-6 sm:pl-10 md:pl-14 lg:pl-16 pr-6 md:pr-0">
                <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                    <p>Book Your Next Appointment</p>
                    <p className="mt-4 font-light">With 100+ Trusted Doctors</p>
                </div>

                <button
                    onClick={handleClick}
                    aria-label="Create your account"
                    className="bg-white text-base text-gray-700 font-bold px-10 py-3 rounded-full mt-8 shadow-xl shadow-black/20 hover:scale-105 hover:shadow-2xl active:scale-95 transition-all duration-300"
                >
                    Create Your Account Now
                </button>
            </div>

            <div className="hidden md:block md:w-1/2 lg:w-[450px] relative">
                <img
                    className="w-full absolute bottom-0 right-0 max-w-lg object-contain translate-y-1"
                    src={assets.appointment_img}
                    alt="Doctor holding a clipboard, ready for appointment"
                />
            </div>
        </div>
    );
};

export default Banner;

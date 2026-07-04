import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
    const { dToken, profileData, setProfileData, getProfileData, isLoading } =
        useContext(DoctorContext);

    const { currency, backendUrl } = useContext(AppContext);

    const [isEdit, setIsEdit] = useState(false);
    const [saving, setSaving] = useState(false);

    const updateProfile = async () => {
        if (
            !profileData.address?.line1 ||
            !profileData.address?.line2
        ) {
            toast.error("Address is required");
            return;
        }

        setSaving(true);
        try {
            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available,
            };

            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-profile",
                updateData,
                { headers: { dtoken: dToken } }
            );

            if (data.success) {
                toast.success("Profile Updated");
                setIsEdit(false);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to update profile."
            );
            console.error("Profile Update Error:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        setIsEdit(false);
        getProfileData();
    };

    useEffect(() => {
        if (dToken) {
            getProfileData();
        }
    }, [dToken, getProfileData]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-gray-500 text-lg">Failed to load profile.</p>
            </div>
        );
    }

    return (
        <div className="m-5">
            <div className="flex flex-col gap-5 max-w-4xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-5">
                    <img
                        className="bg-primary/80 w-full sm:max-w-64 h-64 object-cover rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                        src={profileData.image || assets.default_doctor}
                        onError={(e) => {
                            e.currentTarget.src = assets.default_doctor;
                        }}
                        alt={`${profileData.name}'s profile`}
                        loading="lazy"
                    />

                    <div className="flex-1 bg-white border rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                        <p className="text-3xl font-bold text-gray-800">
                            {profileData.name}
                        </p>

                        <div className="flex items-center gap-2 mt-1 text-gray-600 mb-4">
                            <p>
                                {profileData.degree} - {profileData.speciality}
                            </p>
                            <span className="py-0.5 px-3 border border-gray-400 text-xs rounded-full font-medium bg-gray-100">
                                {profileData.experience} Years Exp.
                            </span>
                        </div>

                        <div className="mt-4 border-t pt-4">
                            <p className="font-semibold text-lg text-gray-700">About Me:</p>
                            {isEdit ? (
                                <textarea
                                    rows={6}
                                    className="w-full border p-2 mt-1 rounded focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                    value={profileData.about}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            about: e.target.value,
                                        }))
                                    }
                                />
                            ) : (
                                <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">
                                    {profileData.about || "No description added yet."}
                                </p>
                            )}
                        </div>

                        <p className="mt-4 text-gray-700 font-semibold">
                            Appointment Fee:{" "}
                            {isEdit ? (
                                <span className="inline-flex items-center">
                                    {currency}
                                    <input
                                        type="number"
                                        min={100}
                                        step={100}
                                        className="border p-1 ml-1 w-24 rounded focus:ring-2 focus:ring-primary outline-none"
                                        value={profileData.fees}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                fees: e.target.value,
                                            }))
                                        }
                                    />
                                </span>
                            ) : (
                                <span className="text-gray-900 font-bold">
                                    {currency}{Number(profileData.fees).toLocaleString()}
                                </span>
                            )}
                        </p>

                        <div className="mt-4 text-gray-700">
                            <p className="font-semibold">Clinic Address:</p>
                            {isEdit ? (
                                <div className="mt-1 space-y-2">
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Address Line 1"
                                        value={profileData.address?.line1 || ""}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line1: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                    <input
                                        type="text"
                                        className="border p-2 w-full rounded focus:ring-2 focus:ring-primary outline-none"
                                        placeholder="Address Line 2 (City, State, Zip)"
                                        value={profileData.address?.line2 || ""}
                                        onChange={(e) =>
                                            setProfileData((prev) => ({
                                                ...prev,
                                                address: {
                                                    ...prev.address,
                                                    line2: e.target.value,
                                                },
                                            }))
                                        }
                                    />
                                </div>
                            ) : (
                                <p className="text-sm mt-1 text-gray-600">
                                    {profileData.address?.line1 || "Not provided"}
                                    <br />
                                    {profileData.address?.line2 || ""}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mt-4 text-gray-700 font-semibold">
                            <p>Availability Status:</p>
                            <input
                                type="checkbox"
                                checked={profileData.available}
                                onChange={() =>
                                    isEdit &&
                                    setProfileData((prev) => ({
                                        ...prev,
                                        available: !prev.available,
                                    }))
                                }
                                disabled={!isEdit}
                                className={`w-4 h-4 rounded ${isEdit ? 'cursor-pointer' : 'cursor-default opacity-50'}`}
                            />
                            <div className={`px-3 py-1 rounded-full text-white text-sm ${
                                profileData.available ? "bg-green-500" : "bg-red-500"
                            }`}>
                                {profileData.available ? "Available" : "Unavailable"}
                            </div>
                        </div>

                        {isEdit ? (
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-2 border border-gray-400 text-gray-700 font-semibold rounded-full 
                                                hover:bg-gray-100 transition duration-300 shadow-md"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateProfile}
                                    disabled={saving}
                                    className="px-6 py-2 bg-primary text-white font-semibold rounded-full 
                                                hover:brightness-110 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="px-6 py-2 mt-6 border border-primary text-primary font-semibold rounded-full 
                                            hover:bg-primary/10 transition duration-300 shadow-md"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorProfile;
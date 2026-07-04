import React, { useContext, useState, useMemo, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(null);
    const [saving, setSaving] = useState(false);

    const { userData, setUserData, loadUserProfile, axiosInstance } =
        useContext(AppContext);

    const handleAddressChange = (key, value) => {
        setUserData((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [key]: value,
            },
        }));
    };

    const handleFieldChange = (key, value) => {
        setUserData((prev) => ({ ...prev, [key]: value }));
    };

    const updateUserProfileData = async () => {
        setSaving(true);
        try {
            const formData = new FormData();

            formData.append("name", userData.name);
            formData.append("phone", userData.phone);
            formData.append("address", JSON.stringify(userData.address));
            formData.append("gender", userData.gender);
            formData.append("dob", userData.dob);

            if (image) formData.append("image", image);

            const { data } = await axiosInstance.post(
                "/user/update-profile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success("Profile updated successfully! 🎉");
                await loadUserProfile();
                setIsEdit(false);
                setImage(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to save profile. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const inputStyle =
        "w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary bg-white transition duration-200 text-gray-700";
    const labelStyle = "block text-sm font-medium text-gray-600 mb-1";
    const displayTextStyle = "text-gray-800 font-medium";

    // Image preview with memory cleanup
    const preview = useMemo(() => {
        return image ? URL.createObjectURL(image) : (userData?.image || assets.profile_pic);
    }, [image, userData?.image]);

    useEffect(() => {
        return () => {
            if (image && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, image]);

    if (!userData || !userData.address) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl border border-gray-100 transition-all duration-300">

                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
                    My Profile
                </h1>

                {/* Profile Image & Name Section */}
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-6 border-b pb-6 mb-6">

                    {isEdit ? (
                        <label htmlFor="image" className="group relative block cursor-pointer mb-4 sm:mb-0">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/50 group-hover:border-primary transition-all duration-300">
                                <img
                                    className="w-full h-full object-cover group-hover:opacity-70 transition-opacity duration-300"
                                    src={preview}
                                    alt="Profile"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full">
                                    <img className="w-8" src={assets.upload_icon} alt="Upload" />
                                </div>
                            </div>
                            <input
                                type="file"
                                id="image"
                                hidden
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file && file.size > 5 * 1024 * 1024) {
                                        toast.error("Maximum image size is 5MB");
                                        return;
                                    }
                                    setImage(file);
                                }}
                                accept="image/*"
                            />
                        </label>
                    ) : (
                        <img
                            className="w-32 h-32 object-cover rounded-full border-4 border-primary/10 shadow-lg mb-4 sm:mb-0"
                            src={userData.image || assets.profile_pic}
                            onError={(e) => {
                                e.currentTarget.src = assets.profile_pic;
                            }}
                            alt="Profile Image"
                            loading="lazy"
                        />
                    )}

                    <div className="text-center sm:text-left flex flex-col justify-center">
                        {isEdit ? (
                            <input
                                className="text-3xl font-extrabold text-gray-900 bg-gray-50 max-w-full p-2 rounded focus:ring-primary focus:border-primary border border-gray-200"
                                type="text"
                                value={userData.name}
                                onChange={(e) => handleFieldChange("name", e.target.value)}
                            />
                        ) : (
                            <p className="text-4xl font-extrabold text-gray-900">
                                {userData.name}
                            </p>
                        )}
                        <p className="text-gray-500 mt-1">{userData.email}</p>
                    </div>
                </div>

                {/* --- CONTACT INFORMATION --- */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-primary border-b border-primary/50 pb-2 mb-4">
                        CONTACT INFORMATION
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

                        <div>
                            <p className={labelStyle}>Phone:</p>
                            {isEdit ? (
                                <input
                                    className={inputStyle}
                                    type="text"
                                    value={userData.phone}
                                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                                />
                            ) : (
                                <p className={displayTextStyle}>{userData.phone || "N/A"}</p>
                            )}
                        </div>

                        <div>
                            <p className={labelStyle}>Email (Read-Only):</p>
                            <p className="text-blue-600 italic">{userData.email}</p>
                        </div>

                        <div className="sm:col-span-2">
                            <p className={labelStyle}>Address Line 1:</p>
                            {isEdit ? (
                                <input
                                    className={inputStyle}
                                    type="text"
                                    value={userData.address?.line1 || ""}
                                    onChange={(e) => handleAddressChange("line1", e.target.value)}
                                />
                            ) : (
                                <p className={displayTextStyle}>{userData.address?.line1 || "N/A"}</p>
                            )}
                        </div>

                        <div className="sm:col-span-2">
                            <p className={labelStyle}>Address Line 2 (City/Zip):</p>
                            {isEdit ? (
                                <input
                                    className={inputStyle}
                                    type="text"
                                    value={userData.address?.line2 || ""}
                                    onChange={(e) => handleAddressChange("line2", e.target.value)}
                                />
                            ) : (
                                <p className={displayTextStyle}>{userData.address?.line2 || "N/A"}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- BASIC INFORMATION --- */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-primary border-b border-primary/50 pb-2 mb-4">
                        BASIC INFORMATION
                    </h2>

                    <div className="grid grid-cols-2 gap-6 text-sm">

                        <div>
                            <p className={labelStyle}>Gender:</p>
                            {isEdit ? (
                                <select
                                    className={inputStyle}
                                    value={userData.gender}
                                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                                >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <p className={displayTextStyle}>{userData.gender || "Not Selected"}</p>
                            )}
                        </div>

                        <div>
                            <p className={labelStyle}>Birthday:</p>
                            {isEdit ? (
                                <input
                                    className={inputStyle}
                                    type="date"
                                    value={userData.dob}
                                    onChange={(e) => handleFieldChange("dob", e.target.value)}
                                />
                            ) : (
                                <p className={displayTextStyle}>{userData.dob || "N/A"}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- ACTION BUTTONS (EDIT / SAVE) --- */}
                <div className="mt-8 flex justify-end">
                    {isEdit ? (
                        <div className="flex gap-4">
                            <button
                                onClick={() => {
                                    setIsEdit(false);
                                    loadUserProfile();
                                    setImage(null);
                                }}
                                className="px-8 py-3 rounded-full border border-gray-400 text-gray-600 font-bold hover:bg-gray-100 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={updateUserProfileData}
                                disabled={saving}
                                className="bg-primary px-8 py-3 rounded-full text-white font-bold shadow-lg hover:brightness-110 hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setIsEdit(true)}
                            className="bg-white border border-primary px-8 py-3 rounded-full text-primary font-bold shadow-md hover:bg-primary hover:text-white transition-all"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
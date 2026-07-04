import React, { useContext, useState, useMemo, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const InputField = ({ label, type = "text", value, onChange, placeholder, required = true, minLength }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            required={required}
            minLength={minLength}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 
                       focus:ring-2 focus:ring-primary focus:border-primary outline-none"
        />
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <select
            value={value}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm transition-all duration-200 
                       focus:ring-2 focus:ring-primary focus:border-primary outline-none appearance-none cursor-pointer"
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [experience, setExperience] = useState("1 Year");
    const [fees, setFees] = useState("");
    const [about, setAbout] = useState("");
    const [speciality, setSpeciality] = useState("General physician");
    const [degree, setDegree] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { backendUrl } = useContext(AppContext);
    const { aToken, axiosInstance, getAllDoctors } = useContext(AdminContext);

    const experienceOptions = Array.from({ length: 10 }, (_, i) => `${i + 1} Year`);
    const specialityOptions = [
        "General physician", "Gynecologist", "Dermatologist",
        "Pediatricians", "Neurologist", "Gastroenterologist"
    ];

    const preview = useMemo(() => {
        return docImg ? URL.createObjectURL(docImg) : (assets.upload_area || "");
    }, [docImg]);

    useEffect(() => {
        return () => {
            if (docImg && preview.startsWith("blob:")) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview, docImg]);

    const resetForm = () => {
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error("Maximum image size is 5MB");
            return;
        }
        setDocImg(file);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!docImg) return toast.error("Please upload doctor image.");
        if (isSubmitting) return;

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            return toast.error("Invalid email address");
        }

        if (password.length < 8) {
            return toast.error("Password must contain at least 8 characters");
        }

        if (Number(fees) <= 0) {
            return toast.error("Invalid consultation fee");
        }

        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("image", docImg);
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("experience", experience);
            formData.append("fees", Number(fees));
            formData.append("about", about);
            formData.append("speciality", speciality);
            formData.append("degree", degree);
            formData.append(
                "address",
                JSON.stringify({ line1: address1, line2: address2 })
            );

            const { data } = await axiosInstance.post(
                "/admin/add-doctor",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (data.success) {
                toast.success("Doctor Added Successfully");
                await getAllDoctors();
                resetForm();
            } else {
                toast.error(data.message || "Failed to add doctor.");
            }
        } catch (error) {
            console.error("Add Doctor Error:", error);
            toast.error(
                error.response?.data?.message ||
                "Unable to add doctor. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-8 w-full max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Doctor</h1>

            <form onSubmit={onSubmitHandler} className="bg-white rounded-xl shadow-2xl p-6 md:p-10">

                <div className="mb-10 p-5 border-2 border-dashed border-gray-200 rounded-xl hover:border-primary transition-colors duration-300">
                    <label htmlFor="doctor-image" className="flex items-center gap-6 cursor-pointer">
                        <img
                            src={preview}
                            alt="Doctor Upload Preview"
                            className="w-20 h-20 object-cover rounded-full shadow-lg transition-transform duration-300 hover:scale-105 bg-gray-50 border-2 border-white"
                            loading="lazy"
                        />
                        <div className="text-gray-600">
                            <p className="font-semibold text-lg text-primary">Click to Upload Doctor Picture</p>
                            <p className="text-sm">PNG, JPG, or GIF accepted (Max 5MB)</p>
                        </div>
                    </label>
                    <input
                        id="doctor-image"
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">

                    <div className="space-y-6">
                        <InputField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <InputField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            minLength={8}
                        />
                        <SelectField
                            label="Experience"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            options={experienceOptions}
                        />
                        <InputField
                            label="Fees (per session)"
                            type="number"
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            placeholder="e.g., 500"
                        />
                    </div>

                    <div className="space-y-6">
                        <SelectField
                            label="Speciality"
                            value={speciality}
                            onChange={(e) => setSpeciality(e.target.value)}
                            options={specialityOptions}
                        />
                        <InputField label="Degree / Qualifications" value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="e.g., MBBS, MD, FRCS" />

                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Clinic Address</label>
                            <input
                                type="text"
                                value={address1}
                                required
                                onChange={(e) => setAddress1(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                                placeholder="Address Line 1 (Street, Building)"
                            />
                            <input
                                type="text"
                                value={address2}
                                required
                                onChange={(e) => setAddress2(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none mt-2"
                                placeholder="Address Line 2 (City, State, Zip)"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <label htmlFor="about-doctor" className="text-sm font-semibold text-gray-700 mb-2 block">About Doctor</label>
                    <textarea
                        id="about-doctor"
                        rows={5}
                        required
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="w-full p-4 border border-gray-300 rounded-lg shadow-sm transition-all duration-200 
                                   focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                        placeholder="Provide a detailed professional summary of the doctor, including areas of expertise and notable achievements."
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white font-bold mt-8 px-12 py-3 rounded-xl shadow-lg 
                               transition-all duration-300 ease-in-out w-full md:w-auto 
                               hover:brightness-110 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="inline-block animate-spin mr-2">⏳</span>
                            Adding Doctor...
                        </>
                    ) : (
                        "Add Doctor"
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddDoctor;
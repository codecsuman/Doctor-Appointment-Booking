import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

// =======================================
// Admin Login
// =======================================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        role: "admin",
        email: process.env.ADMIN_EMAIL,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("loginAdmin:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Appointments
// =======================================
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("appointmentsAdmin:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Cancel Appointment
// =======================================
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    appointment.cancelled = true;
    await appointment.save();

    return res.status(200).json({
      success: true,
      message: "Appointment Cancelled Successfully",
    });
  } catch (error) {
    console.error("appointmentCancel:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Add Doctor
// =======================================
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    // Validate fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Doctor image is required",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate password
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    // Check existing doctor
    const doctorExists = await doctorModel.findOne({ email });

    if (doctorExists) {
      return res.status(409).json({
        success: false,
        message: "Doctor already exists",
      });
    }

    // Parse address safely
    let parsedAddress;

    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid address format",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
      folder: "doctors",
    });

    const doctor = new doctorModel({
      name,
      email,
      image: uploadResult.secure_url,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: parsedAddress,
      available: true,
      date: Date.now(),
    });

    await doctor.save();

    return res.status(201).json({
      success: true,
      message: "Doctor Added Successfully",
    });
  } catch (error) {
    console.error("addDoctor:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Doctors
// =======================================
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select("-password")
      .sort({ date: -1 });

    return res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("allDoctors:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Admin Dashboard
// =======================================
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel
      .find({})
      .sort({ date: -1 });

    const dashData = {
      doctors: doctors.length,
      patients: users.length,
      appointments: appointments.length,
      latestAppointments: appointments.slice(0, 5),
    };

    return res.status(200).json({
      success: true,
      dashData,
    });
  } catch (error) {
    console.error("adminDashboard:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
};
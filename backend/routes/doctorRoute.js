import express from "express";

import {
  loginDoctor,
  appointmentsDoctor,
  appointmentCancel,
  appointmentComplete,
  doctorList,
  doctorDashboard,
  doctorProfile,
  updateDoctorProfile,
  changeAvailablity,
} from "../controllers/doctorController.js";

import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

// ===================================
// Public Routes
// ===================================

// Doctor Login
doctorRouter.post("/login", loginDoctor);

// Public Doctor List
doctorRouter.get("/list", doctorList);

// ===================================
// Protected Routes
// ===================================

// Dashboard
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);

// Appointments
doctorRouter.get(
  "/appointments",
  authDoctor,
  appointmentsDoctor
);

doctorRouter.post(
  "/cancel-appointment",
  authDoctor,
  appointmentCancel
);

doctorRouter.post(
  "/complete-appointment",
  authDoctor,
  appointmentComplete
);

// Profile
doctorRouter.get(
  "/profile",
  authDoctor,
  doctorProfile
);

doctorRouter.post(
  "/update-profile",
  authDoctor,
  updateDoctorProfile
);

// Availability
doctorRouter.post(
  "/change-availability",
  authDoctor,
  changeAvailablity
);

export default doctorRouter;
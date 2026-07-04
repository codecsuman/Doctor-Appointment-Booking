import express from "express";

import {
  loginAdmin,
  appointmentsAdmin,
  appointmentCancel,
  addDoctor,
  allDoctors,
  adminDashboard,
} from "../controllers/adminController.js";

import { changeAvailablity } from "../controllers/doctorController.js";

import authAdmin from "../middleware/authAdmin.js";
import upload from "../middleware/multer.js";

const adminRouter = express.Router();

// ==============================
// Public Routes
// ==============================
adminRouter.post("/login", loginAdmin);

// ==============================
// Protected Routes
// ==============================

// Dashboard
adminRouter.get("/dashboard", authAdmin, adminDashboard);

// Doctor Management
adminRouter.post(
  "/add-doctor",
  authAdmin,
  upload.single("image"),
  addDoctor
);

adminRouter.get("/all-doctors", authAdmin, allDoctors);

adminRouter.post(
  "/change-availability",
  authAdmin,
  changeAvailablity
);

// Appointment Management
adminRouter.get(
  "/appointments",
  authAdmin,
  appointmentsAdmin
);

adminRouter.post(
  "/cancel-appointment",
  authAdmin,
  appointmentCancel
);

export default adminRouter;
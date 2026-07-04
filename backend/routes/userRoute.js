import express from "express";

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
  paymentStripe,
  verifyStripe,
} from "../controllers/userController.js";

import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router();

// ======================================
// Authentication
// ======================================
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// ======================================
// User Profile
// ======================================
userRouter.get(
  "/get-profile",
  authUser,
  getProfile
);

userRouter.post(
  "/update-profile",
  authUser,
  upload.single("image"),
  updateProfile
);

// ======================================
// Appointments
// ======================================
userRouter.post(
  "/book-appointment",
  authUser,
  bookAppointment
);

userRouter.get(
  "/appointments",
  authUser,
  listAppointment
);

userRouter.post(
  "/cancel-appointment",
  authUser,
  cancelAppointment
);

// ======================================
// Razorpay Payment
// ======================================
userRouter.post(
  "/payment-razorpay",
  authUser,
  paymentRazorpay
);

userRouter.post(
  "/verifyRazorpay",
  authUser,
  verifyRazorpay
);

// ======================================
// Stripe Payment
// ======================================
userRouter.post(
  "/payment-stripe",
  authUser,
  paymentStripe
);

userRouter.post(
  "/verifyStripe",
  authUser,
  verifyStripe
);

export default userRouter;
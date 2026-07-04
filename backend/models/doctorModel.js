import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    image: {
      type: String,
      required: true,
    },

    speciality: {
      type: String,
      required: true,
      trim: true,
    },

    degree: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: String,
      required: true,
      trim: true,
    },

    about: {
      type: String,
      required: true,
      trim: true,
    },

    available: {
      type: Boolean,
      default: true,
    },

    fees: {
      type: Number,
      required: true,
      min: 0,
    },

    slots_booked: {
      type: Object,
      default: {},
    },

    address: {
      type: Object,
      required: true,
    },

    date: {
      type: Number,
      default: Date.now,
    },
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    docId: {
      type: String,
      required: true,
      index: true,
    },

    slotDate: {
      type: String,
      required: true,
      trim: true,
    },

    slotTime: {
      type: String,
      required: true,
      trim: true,
    },

    userData: {
      type: Object,
      required: true,
    },

    docData: {
      type: Object,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    date: {
      type: Number,
      default: Date.now,
      index: true,
    },

    cancelled: {
      type: Boolean,
      default: false,
    },

    payment: {
      type: Boolean,
      default: false,
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const appointmentModel =
  mongoose.models.appointment ||
  mongoose.model("appointment", appointmentSchema);

export default appointmentModel;
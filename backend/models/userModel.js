import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture.png",
    },

    phone: {
      type: String,
      default: "0000000000",
      trim: true,
    },

    address: {
      type: Object,
      default: {
        line1: "",
        line2: "",
      },
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other", "Not Selected"],
      default: "Not Selected",
    },

    dob: {
      type: String,
      default: "Not Selected",
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// Remove password when converting to JSON
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const userModel =
  mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
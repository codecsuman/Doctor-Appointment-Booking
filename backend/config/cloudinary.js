import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = () => {
  try {
    const {
      CLOUDINARY_NAME,
      CLOUDINARY_API_KEY,
      CLOUDINARY_SECRET_KEY,
    } = process.env;

    // Validate environment variables
    if (
      !CLOUDINARY_NAME ||
      !CLOUDINARY_API_KEY ||
      !CLOUDINARY_SECRET_KEY
    ) {
      throw new Error(
        "Cloudinary environment variables are missing."
      );
    }

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_SECRET_KEY,
      secure: true,
    });

    console.log("☁️ Cloudinary Connected Successfully");
  } catch (error) {
    console.error("❌ Cloudinary Connection Failed");
    console.error(error.message);

    // Stop the server in production if Cloudinary is required
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectCloudinary;
import jwt from "jsonwebtoken";

const authDoctor = (req, res, next) => {
  try {
    const token =
      req.headers.dtoken ||
      req.headers.token ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid doctor token.",
      });
    }

    req.docId = decoded.id;
    req.doctor = decoded;

    next();
  } catch (error) {
    console.error("AuthDoctor Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

export default authDoctor;
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) throw new ApiError(401, "No token provided");

    const token = authHeader.split(" ")[1];
    if (!token) throw new ApiError(401, "Invalid token format");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    next(new ApiError(403, "Unauthorized or invalid token"));
  }
};

export const isAdmin = (req, res, next) => {
  if (req.role !== "admin") {
    return next(new ApiError(403, "Admins only"));
  }
  next();
};
//BSGB5821LUDCC6BCJFQUAQNW

import User from "../models/user-models.js"
import ApiError from "../utils/ApiError.js"
import APIResponse from "../utils/APIResponse.js"

//generate the otp 
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()
export const sendOtp = async (req, res) => {
  const { phone } = req.body;
  if (!phone) throw new ApiError(400, "Phone number is required")

  // Find or create user
  let user = await User.findOne({ phone });
  if (!user) user = await User.create({ phone });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins
  await user.save();

  console.log(`OTP for ${phone}: ${otp}`); // For dev/testing only

  res.status(200).json(new APIResponse(200, null, "OTP sent successfully"));
}



export const verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) throw new ApiError(400, "Phone and OTP are required");

  const user = await User.findOne({ phone });
  if (!user) throw new ApiError(404, "User not found");

  if (user.otp !== otp) throw new ApiError(400, "Invalid OTP");
  if (user.otpExpiresAt < new Date()) throw new ApiError(400, "OTP expired");

  // OTP is valid → generate token (JWT) if needed
  // clear OTP
  user.otp = null;
  user.otpExpiresAt = null;
  await user.save();

  res.status(200).json(new APIResponse(200, { userId: user._id }, "Logged in successfully"));
}

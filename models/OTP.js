import mongoose from "mongoose";
import User from "./User";

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true
    },
    for: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);
export default OTP;
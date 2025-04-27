import React, { useState } from "react";
import axios from "axios";

const Auth = ({ onVerify }) => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");

    const sendOtp = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/send-otp/", { email });
            setStep(2);
            setError("");
        } catch (err) {
            setError("Failed to send OTP");
        }
    };

    const verifyOtp = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/verify-otp/", { email, otp });
            setError("");
            onVerify();
        } catch (err) {
            setError("Invalid OTP");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>{step === 1 ? "Enter Email" : "Enter OTP"}</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "10px", width: "300px" }}
                disabled={step === 2}
            />
            {step === 2 && (
                <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{ padding: "10px", width: "300px", marginTop: "10px" }}
                />
            )}
            <button onClick={step === 1 ? sendOtp : verifyOtp} style={{ marginTop: "10px", padding: "10px 20px" }}>
                {step === 1 ? "Send OTP" : "Verify OTP"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default Auth;

import React, { useState } from "react";
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const [step, setStep] = useState('email');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");

    const getEmailErrorMessage = () => {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === "") {
            return "Email is required";
        } else if (!emailPattern.test(email)) {
            return "Please enter a valid email address";
        } else {
            return "";
        };
    };

    const getPasswordErrorMessage = () => {
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!token) {
            return "Token can't be empty";
        } else if (
            password &&
            passwordPattern.test(password) &&
            password.trim().length >= 8
        ) {
            return "";
        } else {
            return "Password need to be 8 or longer and should have a number, a capital and a small letter.";
        }
    };

    const submitEmail = (e) => {
        e.preventDefault();

        if (step == "password") {
            const url = `http://localhost:4000/user/reset-password`;
            axios
                .post(url, {
                    token,
                    password,
                })
                .then((response) => {
                    const customerId = response.data.customerId;
                    alert("Password was reset successfully.");
                    localStorage.setItem(`customerId`, customerId);
                    window.location.href = '/';
                })
                .catch((error) => {
                    console.error(error);
                    alert("Invalid Token.");
                });
        } else {
            const url = `http://localhost:4000/user/request-token`;
            axios.post(url, {
                email
            })
                .then(() => {
                    alert("Reset token was sent to your email.");
                    setStep('password');
                })
                .catch(() => {
                    alert("Failed to get a token.");
                });
        };
    };

    const emailAlertMsg = getEmailErrorMessage();
    const passwordAlertMessage = getPasswordErrorMessage();

    return <div>
        <form onSubmit={(e) => submitEmail(e)} className="forgot-password-form">
            <h2>Forgot Password</h2>
            {step == 'email' && <div>
                <label>Email:</label>
                <input
                    type="email"
                    autoFocus
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button disabled={emailAlertMsg} type="submit">
                    Request token
                </button>
                {emailAlertMsg && <p style={{ color: 'red' }}>
                    {emailAlertMsg}
                </p>}
            </div>}

            {step == 'password' && <div>
                <label>New Password:</label>
                <input
                    type="password"
                    placeholder="Enter new password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label>Token:</label>
                <input
                    type="text"
                    placeholder="Enter your token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                />

                <button disabled={passwordAlertMessage} type="submit">
                    Reset Password
                </button>
                {passwordAlertMessage && <p style={{ color: 'red' }}>
                    {passwordAlertMessage}
                </p>}
            </div>}
        </form>
    </div>
};

export default ForgotPassword;

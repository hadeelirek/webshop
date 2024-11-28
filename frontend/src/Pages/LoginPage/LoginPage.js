import React, { useState } from "react";
import { NavBar } from '../../Pages';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const getErrorMessage = () => {
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email.trim() === "") {
            return "Email is required";
        } else if (!emailPattern.test(email)) {
            return "Please enter a valid email address";
        } else if (password.trim().length < 4) {
            return "Password must be at least 4 characters long";
        } else {
            return "";
        };
    };

    const signIn = (e) => {
        e.preventDefault();

        const url = `http://localhost:4000/user/signin`;
        axios
            .post(url, {
                email: email,
                pw: password,
            })
            .then((response) => {
                const customerId = response.data.customerId;
                localStorage.setItem(`customerId`, customerId);
                window.location.href = '/';
            })
            .catch((error) => {
                let msg = error?.response?.data?.e;
                alert(msg || "something went wrong");
            });
    };

    const alertMsg = getErrorMessage();

    return <div>
        <NavBar />
        <form onSubmit={(e) => signIn(e)} className="sign-in-form">
            <h2>Sign In</h2>
            <div>
                <input
                    type="email"
                    autoFocus
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button disabled={alertMsg} type="submit" className="continue-button">
                    Continue
                </button>
                {alertMsg && <p style={{ color: 'red' }}>
                    {alertMsg}
                </p>}
            </div>
            <button type="button" className="forgotPassword-button">
                <a href="/forgot-password">
                    Forgot password?
                </a>
            </button>
        </form>
    </div>
};

export default LoginPage;

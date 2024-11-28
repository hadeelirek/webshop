import React, { useState, useEffect } from "react";
import axios from 'axios';
import { NavBar } from '../../Pages';
import './UpdateAccount.css';

const UpdateAccount = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

    const getErrorMessage = () => {
        // Regex pattern for the address
        let addressPattern = /^(?:\d{1,5}\s[\w\s]+(?:\s[A-Za-z]+)?,\s[A-Za-z\s]+,\s[A-Za-z]{2}\s\d{5}(?:-\d{4})?)$/;

        // Regex patterns for email 
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // regex pattern for the  password
        let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;


        // Validate name
        if (name.trim() === "" || !isNaN(parseFloat(name))) {
            return "Name can't be empty or a number";
        } else if (name.trim().length < 2 || name.trim().length > 50) {
            return "Name must be between 2 and 50 characters long";
        }

        // Validate email
        if (email.trim() === "") {
            return "Email is required";
        } else if (!emailPattern.test(email)) {
            return "Please enter a valid email address";
        }

        // Validate address
        if (address.trim() === "" || !addressPattern.test(address)) {
            return "Address must be in a valid format including street address, city, state/province, and ZIP/postal code.";
        }

        // Validate password
        if (!passwordPattern.test(password) || password.trim().length < 8) {
            return "Password must be at least 8 characters long and include a mix of uppercase letters, lowercase letters, and numbers";
        }

        return "";
    };

    const alertMsg = getErrorMessage();
    const savedUserId = localStorage.getItem("customerId");

    const updateAccount = (e) => {
        e.preventDefault();
        const url = `http://localhost:4000/user/update`;
        axios.post(url, {
            userName: name,
            email: email,
            address: address,
            pw: password,
            customerId: savedUserId,
        })
            .then(() => {
                alert("Account updated successfully");
            })
            .catch((error) => {
                console.error(error);
                alert("Failed to update account!");
            });
    };

    useEffect(() => {
        const url = `http://localhost:4000/user/info`;
        axios.post(url, {
            customerId: savedUserId,
        })
            .then((response) => {
                const customer = response.data.customer;
                setName(customer.name);
                setEmail(customer.email);
                setAddress(customer.address);
                setPassword(customer.password);
            })
            .catch((error) => {
                let msg = error?.response?.data?.e;
                alert(msg || "something went wrong");
            });
    }, []);

    return (<div>
        <NavBar />
        <form onSubmit={(e) => updateAccount(e)} className="update-account-form">
            <h2>Your Account</h2>
            <div >
                <input type="text" autoFocus placeholder="Enter your name" required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div >
                <input type="email" placeholder="Enter your email" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <input type="text" placeholder="Enter your address" required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <p className="addressRequirements">Please include<br /> your street address,<br />
                    city, state/province,<br /> and ZIP/postal<br />
                    code.
                </p>
            </div>
            <div>
                <div >
                    <input type="password" placeholder="Enter New Password" required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="continue-button"
                        disabled={alertMsg}
                    >
                        Update Account
                    </button>
                    {alertMsg && <p style={{ color: 'red' }}>
                        {alertMsg}
                    </p>}
                </div>
            </div>
        </form>
    </div>);
};

export default UpdateAccount;

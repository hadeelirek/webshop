import React from "react";
import logoImage from '../../images/logo.PNG';
import fruitsImage from '../../images/fruits.jpg';
import './NavBar.css';

const NavBar = () => {
    const isLoggedIn = localStorage.getItem('customerId');

    return <div>
        <div className="title-container">
            <img src={logoImage} alt="shopLogo" className="logo" />
            <div className="user-options-container">
                {!isLoggedIn && <button className="user-action-button">
                    <a href="/login">
                        Sign In
                    </a>
                </button>}
                {!isLoggedIn && <button className="user-action-button">
                    <a href="/signup">
                        Sign Up
                    </a>
                </button>}
                {isLoggedIn && <button className="user-action-button" onClick={() => {
                    localStorage.removeItem('customerId');
                    window.location.href = '/';
                }}>
                    Sign out
                </button>}

                <button className="user-action-button">
                    <a href="/">
                        Shop
                    </a>
                </button>

                {isLoggedIn && <button className="user-action-button">
                    <a href="/vouchers">
                        Vouchers
                    </a>
                </button>}
                <button className="user-action-button">
                    <a href="/about-us">
                        About Us
                    </a>
                </button>

                {isLoggedIn && <button className="user-action-button">
                    <a href="/history">
                        History
                    </a>
                </button>}
                {isLoggedIn && <button className="user-action-button">
                    <a href="/manage-account">
                        Account
                    </a>
                </button>}
            </div>
        </div>
        <div className="fruit-image-container">
            <img id="fruitImage" src={fruitsImage} alt="Fruits" />
        </div>
    </div>
};

export default NavBar;

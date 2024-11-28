import React from "react";
import { NavBar } from '../../Pages';
import aboutUsImg from '../../images/aboutUS.png';
import "./AboutUs.css";

const AboutUs = () => {
    return <div>
        <NavBar />
        <div className="aboutUs">
            <img src={aboutUsImg} alt="about us" className="AboutUsImg" />
            <div className="aboutUsText">
                <p><strong>Welcome to Green & Delightful Mart!</strong><br />
                    <br />
                    At Green & Delightful Mart, we are dedicated to bringing the farm-fresh experience to your shopping cart.
                    Established on November 20, 2024, Our
                    Online store is designed to offer you a handpicked selected selection of high-quality fruits, vegetables and
                    snacks that will brighten your meals and your day.
                    <br /><br />
                    Created with care by Hadeel, our mission. Is to provide a delightful shopping experience where freshness and
                    variety are our top priorities. We believe in supporting local farms and ensuring that every product you
                    receive is as fresh as possible.
                    <br /><br />
                    Thank you for choosing Green & Delightful Mart.
                    We look forward to serving you and enhancing your grocery shopping experience with our carefully chosen
                    produce and snacks.
                </p>
            </div>
        </div>

    </div>
};

export default AboutUs;

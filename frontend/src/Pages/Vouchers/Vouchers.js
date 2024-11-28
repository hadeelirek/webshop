import React from "react";
import { NavBar } from '../../Pages';
import './Vouchers.css';

const Vouchers = () => {
    return (<div>
        <NavBar />
        <div className="voucher-cards">
            <div className="voucher-card">
                <h2>$1 Off Your Purchase</h2>
                <p>Use this voucher to get a $1 discount on your next purchase.</p>
                <div className="voucher-code">CODE01</div>
            </div>

            <div className="voucher-card">
                <h2>2$ OFF Your Purchase</h2>
                <p>Use this voucher to get a $2 discount on your next purchase.</p>
                <div className="voucher-code">CODE02</div>
            </div>
        </div>
    </div>);
};

export default Vouchers;

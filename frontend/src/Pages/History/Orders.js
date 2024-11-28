import React, { useState, useEffect } from "react";
import historyImg from '../../images/history.png';
import { NavBar } from '../../Pages';
import OrderCard from "./OrderCard";
import axios from 'axios';
import './Orders.css';

const History = () => {
    const [orders, setOrders] = useState([]);

    const getOrders = (savedUserId) => {
        const url = "http://localhost:4000/order/history";
        axios
            .post(url, {
                customerId: savedUserId,
            })
            .then((response) => {
                const { orders } = response.data;
                setOrders(orders)
            })
            .catch((error) => {
                alert('failed to fetch History')
                console.error(error);
            })
    };

    useEffect(() => {
        const savedUserId = localStorage.getItem("customerId");
        if (savedUserId) {
            getOrders(savedUserId);
        }
    }, []);

    return (
        <div>
            <NavBar />
            <div className="title-container">
                <h1 className="headerContainer">
                    <img src={historyImg} alt="history" className="historyIcon" />
                    <span>Order History</span>
                </h1>
            </div>
            <div className="history-cards">
                {orders.length > 0 ? (
                    orders.map((order, index) => {
                        return <OrderCard key={index} order={order} />
                    })
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default History;

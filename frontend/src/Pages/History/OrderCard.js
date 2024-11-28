import React from "react";

const OrderCard = (props) => {
    const { order } = props;
    const { createdAt, discount, items, totalPrice } = order;
    let quantity = 0;
    items.forEach(i => quantity += i.quantity);

    return (
        <div className="history-card">
            <p className="date">
                Order date: {new Date(createdAt).toLocaleDateString("en-US")}
            </p>
            <p className="quantity">Items count: {quantity}</p>
            <p className="order-price">Total price: ${totalPrice}</p>
            <p className="discount">Discount: ${discount}</p>
        </div>
    );
};

export default OrderCard;

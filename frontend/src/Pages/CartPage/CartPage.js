import React, { useState, useEffect } from "react";
import { NavBar } from '../../Pages';
import cartIcon from '../../images/cartPlace.png';
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
    const [carts, setCarts] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const [voucher, setVoucher] = useState({
        amount: 0,
        voucherId: null,
    });
    const [voucherCode, setVoucherCode] = useState();
    const savedUserId = localStorage.getItem('customerId');

    const removeFromCart = (itemId) => {
        const url = `http://localhost:4000/cart/remove-cart`
        axios.delete(url, { data: { itemId } })
            .then(() => {
                getUserCarts();
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getUserCarts = async () => {
        const url = `http://localhost:4000/cart/get-user-carts`;
        return axios
            .post(url, {
                customerId: savedUserId,
            })
            .then((response) => {
                setCarts(response.data.carts);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    function calculateTotal() {
        let totalQuantity = 0;
        let totalPrice = 0;

        carts.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * parseFloat(item.attachedProduct.price);
        });

        return {
            totalItems: totalQuantity,
            totalPrice: totalPrice.toFixed(2),
        };
    };

    const { totalPrice, totalItems } = calculateTotal();

    const applyVoucher = () => {
        if (voucherCode) {
            const url = `http://localhost:4000/cart/check-voucher`;
            return axios
                .post(url, {
                    voucherCode
                })
                .then((response) => {
                    const { voucherId, amount } = response.data;
                    setVoucher({
                        amount,
                        voucherId,
                    });
                })
                .catch((error) => {
                    console.error(error);
                    alert(error?.response?.data?.e);
                });
        };
    };

    const checkout = () => {
        if (totalPrice > 0) {
            if (window.confirm("Click 'OK' to confirm your checkout.")) {
                const url = `http://localhost:4000/cart/checkout`;
                return axios
                    .post(url, {
                        customerId: savedUserId,
                        voucherId: voucher.voucherId,
                    })
                    .then(() => {
                        setConfirmed(true);
                        setCarts([]);
                    })
                    .catch((error) => {
                        console.error(error);
                        alert("Check out failed");
                    });
            };
        };
    };

    useEffect(() => {
        getUserCarts();
    }, []);

    return <div>
        <NavBar />
        <h1 className="cartTitle">Cart</h1>
        <img src={cartIcon} alt="cartIcon" className="cartIconInCartPlace" />
        <div className="cart-items">
            {carts.map(cart => {
                const {
                    CartItemId,
                    quantity,
                    attachedProduct,
                    attachedVariant,
                } = cart;

                const {
                    Image,
                    title,
                    subTitle,
                    // description,
                    price,
                } = attachedProduct;

                const totalPrice = quantity * parseFloat(price);
                const variant = attachedVariant?.title;

                return <div key={CartItemId} className="cartCard">
                    <div className="cartHeader">
                        <img src={Image} />
                        <div className="cartSubHeader">
                            <h2 className="cartSubtitle">{title}</h2>
                            <p>{subTitle}</p>
                            <button
                                type="button"
                                onClick={() => removeFromCart(CartItemId)}
                                className="removeItemBtn"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <div className="cartBody">
                        <p>
                            Quantity: {quantity} {variant ? "(" + variant + ")" : ""}
                        </p>
                        <p className="price">
                            Price: ${price}
                        </p>
                        <p className="total-price">
                            Total Price: ${totalPrice.toFixed(2)}
                        </p>
                    </div>
                </div>
            })}
        </div>

        {confirmed && <div>
            <h2 className="cartSubtitle">Thanks for your order</h2>
            <button className="continueShoppingBtn">
                <a href="/">
                    Continue Shopping
                </a>
            </button>
        </div>}

        <div className="free-delivery-message">
            <p>🎉 Enjoy free delivery on all orders! 🎉</p>
        </div>

        {!confirmed && <div className="footer">
            <div className="totalCartPrice">
                Total price: $<span className="total-cart-price">
                    {totalPrice}
                </span>
            </div>
            <div className="totalCartPrice">
                Total items count: <span className="total-cart-price">
                    {totalItems}
                </span>
            </div>
            {voucher.amount ? <div className="afterVoucherPrice">
                Voucher: $<span className="voucher-price">
                    {voucher.amount}
                </span>
                <br />
                Total price after discount: $<span className="total-full-price">
                    {(totalPrice - voucher.amount).toFixed(2)}
                </span>
            </div> : <div className="voucher-container">
                <input
                    type="text"
                    autofocus
                    className="voucherCode"
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                    className="useVoucherBtn"
                    type="button"
                    disabled={!voucherCode}
                    onClick={() => applyVoucher()}
                >
                    Use Voucher
                </button>
            </div>}

            <button className="continueShoppingBtn">
                <a href="/">Continue Shopping</a>
            </button>
            <button
                className="checkoutBtn"
                type="button"
                onClick={() => checkout()}
            >
                Check Out
            </button>
        </div>}
    </div>
};

export default CartPage;

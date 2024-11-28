import React from "react";
import infoIcon from '../../../images/info.png';
import './ProductCard.css';

const ProductCard = (props) => {
    const {
        product,
        matchingVariants,
        variantsStore,
        setVariantsStore,
        quantityStore,
        setQuantityStore,
        isLoggedIn,
        addToCart,
    } = props;

    var {
        ProductId,
        Image,
        title,
        subTitle,
        description,
        price,
        stock,
    } = product;

    const adjustQuantity = (action, ProductId, stock) => {
        const isAdd = action == "add";
        const currentQuantity = quantityStore[ProductId] || 0;
        let newValue = 0;

        if (isAdd) {
            if (currentQuantity < stock) {
                newValue = currentQuantity + 1;
            };
        } else {
            if (currentQuantity > 0) {
                newValue = currentQuantity - 1;
            };
        };

        setQuantityStore({
            ...quantityStore,
            [ProductId]: newValue,
        });
    };

    return <div className="productCard">
        <div>
            <img className="ForSaleImage" src={Image} alt={title} />
        </div>
        <div className="card-header">
            <div className="card-title">
                <h2 className="productName">{title}</h2>
                <h3 className="productSubTitle">{subTitle}</h3>
                {matchingVariants.length > 0 && <div>
                    <label>Variant:</label>
                    <select
                        value={variantsStore[ProductId] || ""}
                        onChange={(e) => {
                            setVariantsStore({
                                ...variantsStore,
                                [ProductId]: e.target.value,
                            })
                        }}
                        className="variant-dropdown"
                    >
                        <option value="" disabled>Select</option>
                        {matchingVariants.map(v => {
                            return <option key={v.VariantId} value={v.VariantId}>
                                {v.title}
                            </option>
                        })}
                    </select>
                </div>}
            </div>
            <div className="card-actions">
                <div className="price">
                    ${price}
                </div>

                <div className="card-buttons">
                    <button
                        type="button"
                        onClick={() => adjustQuantity('remove', ProductId, stock)}
                        className="deductItem"
                        disabled={
                            !quantityStore[ProductId] ||
                            quantityStore[ProductId] < 1
                        }
                    >-</button>
                    <span id="quantityPlaceP${ProductId}" className="productQuantity">
                        {quantityStore[ProductId] || 0}
                    </span>
                    <button
                        type="button"
                        onClick={() => adjustQuantity('add', ProductId, stock)}
                        className="plusItem"
                        disabled={
                            quantityStore[ProductId] &&
                            quantityStore[ProductId] >= stock
                        }
                    >+</button>
                </div>
                <button
                    onClick={() => addToCart(ProductId)}
                    className="add-to-cart-button"
                    disabled={
                        (matchingVariants.length > 0 && !variantsStore[ProductId])
                        || !quantityStore[ProductId]
                        || !isLoggedIn
                    }
                >
                    Add to Cart
                </button>
            </div>
        </div>

        <div className="productDescription">
            <img src={infoIcon} />
            <p>{description}</p>
        </div>
    </div>
};

export default ProductCard;

import React from "react";

import mostOrderedImg from "../../images/mostOrdered.jpg";
import fruitsImg from "../../images/FruitCategory.webp";
import vegiImg from "../../images/vegetables.jpg";
import snacksImg from "../../images/Snacks.jpg";

const Categories = (props) => {
    const { setFilter } = props;

    return (
        <div className="choosingCategoryByImg">
            <div onClick={() => setFilter({
                type: "category", info: "recommended",
            })}>
                <img className="mainCatImg" src={mostOrderedImg} alt="Recommended" />
                <h2>Recommended</h2>
            </div>
            <div onClick={() => setFilter({
                type: "category", info: "fruits",
            })}>
                <img className="mainCatImg" src={fruitsImg} alt="Fruits" />
                <h2>Fruits</h2>
            </div>
            <div onClick={() => setFilter({
                type: "category", info: "vegetables",
            })}>
                <img className="mainCatImg" src={vegiImg} alt="Vegetables" />
                <h2>Vegetables</h2>
            </div>
            <div onClick={() => setFilter({
                type: "category", info: "snacks",
            })}>
                <img className="mainCatImg" src={snacksImg} alt="Snacks" />
                <h2>Snacks</h2>
            </div>
        </div>
    );
};

export default Categories;









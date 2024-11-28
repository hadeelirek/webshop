import React, { useState, useEffect } from "react";
import { NavBar } from '../../Pages';
import ProductCard from "./ProductCard/ProductCard";
import SearchBar from "./SearchBar";
import Categories from "./Categories";
import './ProductsPage.css';
import cartIcon from "../../images/cart.jpg";
import leavesImg from "../../images/leaves.jpg";
import axios from 'axios';

const CategoriesMap = [
    {
        name: "Recommended",
        id: 0,
        title: "Recommended",
        titleId: "recommended",
    },
    {
        name: "Fruits",
        id: 1,
        title: "Fruits",
        titleId: "fruits",
    },
    {
        name: "Vegetables",
        id: 2,
        title: "Vegetables",
        titleId: "vegetables",
    },
    {
        name: "Snacks",
        id: 3,
        title: "Snacks & Drinks",
        titleId: "snacks",
    },
];

const ProductsPage = () => {
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({
        type: "all", info: "",
    });
    const [products, setProducts] = useState([]);
    const [variants, setVariants] = useState([]);
    const [variantsStore, setVariantsStore] = useState({});
    const [quantityStore, setQuantityStore] = useState({});
    const isLoggedIn = localStorage.getItem('customerId');

    const triggerSearch = (e) => {
        if (e) {
            e.preventDefault();
        };
        setFilter({
            type: "search", info: search,
        });
    };

    const addToCart = (ProductId) => {
        const currentQuantity = quantityStore[ProductId];
        const currentVariant = variantsStore[ProductId];

        if (currentQuantity) {
            const url = `http://localhost:4000/product/add-to-cart`;
            return axios
                .post(url, {
                    customerId: localStorage.getItem("customerId"),
                    quantity: currentQuantity,
                    ProductId,
                    variantId: Number(currentVariant),
                })
                .then((response) => {
                    const { newNumberOfItems } = response.data;
                    setCartItemsCount(newNumberOfItems);
                    setQuantityStore({
                        ...quantityStore,
                        [ProductId]: 0,
                    });
                    window.scrollTo(0, 0);
                })
                .catch((error) => {
                    console.error(error);
                });

        };
    };

    const getCartsQuantity = () => {
        if (!isLoggedIn) return;
        const url = `http://localhost:4000/product/get-carts-quantity`;
        return axios
            .post(url, {
                customerId: isLoggedIn
            })
            .then((response) => {
                const { newNumberOfItems } = response.data;
                setCartItemsCount(newNumberOfItems);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const loadCategory = async (catId) => {
        const url = `http://localhost:4000/product/get-category`;
        return axios
            .post(url, { catId })
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        let promises = CategoriesMap.map(cat => {
            return loadCategory(cat.id);
        });

        Promise.all(promises).then(results => {
            const catProducts = [];
            const vars = results[0]?.variants;
            results.map((r, i) => {
                catProducts.push({
                    type: CategoriesMap[i].titleId,
                    items: r.products,
                })
            });
            setProducts(catProducts);
            setVariants(vars);
        }).catch(error => {
            alert('Failed to load products.')
            console.error(error);
        });

        getCartsQuantity();
    }, []);

    return <div>
        <NavBar />

        <div className="main-options-container">
            <SearchBar
                triggerSearch={triggerSearch}
                search={search}
                setSearch={setSearch}
                setFilter={setFilter}
            />

            <div>
                {isLoggedIn && <a href="/cart" className="cartLink">
                    <img src={cartIcon} className="cartImage" alt="cart" />
                    <span className="numberOfItems">
                        <span>{cartItemsCount || 0}</span>
                    </span>
                </a>}
            </div>
        </div>

        {filter.type !== "search" && <Categories setFilter={setFilter} />}

        <div className="mainContainer">
            {products.map((pc, i) => {
                const { type, items } = pc;
                if (filter.type == "category" && filter.info !== type) return;
                const searchedItems = filter.type == "search" ? items.filter(i => i.title.toLowerCase().includes(filter.info.toLowerCase()) || i.subTitle.toLowerCase().includes(filter.info.toLowerCase())) : items;
                if (filter.type == "search" && searchedItems.length == 0) return;

                const title = CategoriesMap.find(c => c.titleId == type)?.title;
                return <div className="categories" key={i}>
                    <div className={`CategoryName ${type}Img`}>
                        <h2>{title}</h2>
                    </div>
                    <div className="category">
                        {searchedItems.map((item, i) => {
                            const matchingVariants = variants.filter(v => v.ProductId == item.ProductId);
                            return <ProductCard
                                key={i}
                                product={item}
                                matchingVariants={matchingVariants}
                                variantsStore={variantsStore}
                                setVariantsStore={setVariantsStore}
                                quantityStore={quantityStore}
                                setQuantityStore={setQuantityStore}
                                isLoggedIn={isLoggedIn}
                                addToCart={addToCart}
                            />
                        })}
                    </div>
                </div>
            })}
        </div>

        <br /><br />
        <div className="backToTop" onClick={() => window.scrollTo(0, 0)}>
            <img className="backToTopImg" src={leavesImg} alt="Back to Top" />
            <div className="backToTopText">Back to Top</div>
        </div>
    </div>
};

export default ProductsPage;

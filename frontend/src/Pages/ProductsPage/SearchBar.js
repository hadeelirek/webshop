import React from "react";
import searchIcon from "../../images/searchIcon.PNG";

const SearchBar = (props) => {
    const {
        triggerSearch,
        search,
        setSearch,
        setFilter,
    } = props;

    return <div className="sub-options-container">
        <form onSubmit={(e) => triggerSearch(e)} className="search-bar-wrapper">
            <input
                className="search-bar"
                type="text"
                autoFocus
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <img
                src={searchIcon} alt="Search Icon"
                className="search-icon"
            />
        </form>
        {search && <button
            className="clearSearchBtn"
            type="button"
            onClick={() => {
                setSearch("");
                setFilter({
                    type: "all", info: "",
                });
            }}>
            Clear Search
        </button>}
    </div>
};

export default SearchBar;

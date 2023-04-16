import { useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
    const serachInputRef = useRef();

    return (
        <>
            <form className={classes["search"]}>
                <input
                    type="text"
                    className={classes["search__input"]}
                    placeholder="Search"
                    ref={serachInputRef}
                    onChange={() =>
                        props.onChangeQuery(serachInputRef.current.value)
                    }
                />
                <FontAwesomeIcon
                    className={classes["search__icon"]}
                    icon={faSearch}
                    color="black"
                />
            </form>
        </>
    );
};

export default SearchBar;

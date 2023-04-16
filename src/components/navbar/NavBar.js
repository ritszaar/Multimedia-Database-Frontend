import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faA,
    faHome,
    faSearch,
    faUpload,
    faEnvelope,
    faDeleteLeft,
    faRemove,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./NavBar.module.css";

const NavBar = () => {
    let navbarEndContent = (
        <div className={classes["nav-btn__group"]}>
            Dummy
        </div>
    );

    return (
        <header className={classes["header"]}>
            <div className={classes["logo"]}>
                <FontAwesomeIcon icon={faA} className={classes["logo__icon"]} />
            </div>
            <nav className={classes["primary-navigation"]}>
                <ul className={classes["primary-navigation__list"]}>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon icon={faHome} size="lg"/>
                            &nbsp; Home
                        </NavLink>
                    </li>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/search"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon icon={faSearch} size="lg"/>
                            &nbsp; Search
                        </NavLink>
                    </li>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/upload"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon icon={faUpload} size="lg"/>
                            &nbsp; Upload
                        </NavLink>
                    </li>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/delete"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon icon={faRemove} size="lg"/>
                            &nbsp; Delete
                        </NavLink>
                    </li>
                    <li className={classes["primary-navigation__list-item"]}>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? classes["active"] : undefined
                            }
                            end
                        >
                            <FontAwesomeIcon icon={faEnvelope} size="lg"/>
                            &nbsp; Contact Us
                        </NavLink>
                    </li>
                </ul>
            </nav>
            {navbarEndContent}
        </header>
    );
};

export default NavBar;

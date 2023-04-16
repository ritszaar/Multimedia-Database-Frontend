import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMedkit,
    faTree,
    faUserNurse,
    faMoneyBill,
    faFileText,
    faImage,
    faFilePdf,
    faMusic,
    faVideo,
} from "@fortawesome/free-solid-svg-icons";
import classes from "./Features.module.css";

const Features = () => {
    return (
        <section className={classes["section-features"]}>
            <ul className={classes["features__list"]}>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faFileText}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Text
                    </h3>
                    <p className={classes["feature-box__text"]}>

                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faFilePdf}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        PDF
                    </h3>
                    <p className={classes["feature-box__text"]}>

                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faImage}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Image
                    </h3>
                    <p className={classes["feature-box__text"]}>

                    </p>
                </li>
                <li className={classes["feature-box"]}>
                    <FontAwesomeIcon
                        icon={faVideo}
                        className={classes["feature-box__icon"]}
                    ></FontAwesomeIcon>
                    <h3
                        className={`${classes["heading-tertiary"]} ${classes["u-margin-bottom-small"]}`}
                    >
                        Video
                    </h3>
                    <p className={classes["feature-box__text"]}>
                    </p>
                </li>
            </ul>
        </section>
    );
};

export default Features;

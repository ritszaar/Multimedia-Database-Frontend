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
                        Our hospital has the latest test and treatments
                        facilities. We have state of art operating theatres,
                        surgical equipments and ample supply of essential as
                        well as special purpose medicines.
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
                        Andromeda Hospital is surrounded by nature. It provides
                        a calming environment that can help reduce stress.
                        Patients have access to natural light, fresh air and
                        greenery, paving the way for shorter hospital stays and
                        less medication.
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
                        Our staff are dedicated to your service. Two emergency
                        doctors are availble 24x7. Trained nurses will take care
                        of your needs. Cleaning and disinfection is done
                        regularly to maintain a hygenic environment.
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
                        Services at Andromeda are low-cost and cheap.
                        Preventative care, immunizations, or routine check-ups
                        are affordable. We also accept EMI as well.
                    </p>
                </li>
            </ul>
        </section>
    );
};

export default Features;

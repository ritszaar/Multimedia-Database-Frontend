import classes from "./LoadingSpinnerRed.module.css";

const LoadingSpinnerRed = () => {
    return (
        <div className={classes["spinner-container"]}>
            <div className={classes["loading-spinner"]}></div>
        </div>
    );
}

export default LoadingSpinnerRed;

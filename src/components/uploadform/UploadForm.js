import { wait } from "@testing-library/user-event/dist/utils";
import { useState } from "react";
import useInput from "../../hooks/use-input";
import FormCard from "../formcard/FormCard";
import LoadingSpinnerRed from "../loadingspinner/LoadingSpinnerRed";
import ResponseModal from "../responsemodal/ResponseModal";
import classes from "./UploadForm.module.css";

const isNotEmpty = (value) => value.trim() !== "";

const UploadForm = () => {
    const [multimediaType, setMulmediaType] = useState("text");
    const [titleExists, setTitleExists] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
    };

    const showModalHandler = (title, message) => {
        resetTitle();
        resetCreator();
        resetSource();
        resetFile();
        setMulmediaType("text");
        setTitleExists(false);
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    };

    const {
        value: title,
        isValid: titleIsValid,
        hasError: titleInputHasError,
        valueChangeHandler: titleChangeHandler,
        inputBlurHandler: titleInputBlurHandler,
        reset: resetTitle,
    } = useInput(isNotEmpty);

    const {
        value: creator,
        isValid: creatorIsValid,
        hasError: creatorInputHasError,
        valueChangeHandler: creatorChangeHandler,
        inputBlurHandler: creatorInputBlurHandler,
        reset: resetCreator,
    } = useInput(isNotEmpty);

    const {
        value: source,
        isValid: sourceIsValid,
        hasError: sourceInputHasError,
        valueChangeHandler: sourceChangeHandler,
        inputBlurHandler: sourceInputBlurHandler,
        reset: resetSource,
    } = useInput(isNotEmpty);

    const {
        value: file,
        isValid: fileIsValid,
        hasError: fileInputHasError,
        valueChangeHandler: fileChangeHandler,
        inputBlurHandler: fileInputBlurHandler,
        reset: resetFile,
    } = useInput(isNotEmpty);

    let formIsValid = false;
    if (
        titleIsValid &&
        !titleExists &&
        creatorIsValid &&
        sourceIsValid &&
        fileIsValid
    ) {
        formIsValid = true;
    }

    const normalClasses = classes["input__field"];
    const errorClasses = classes["input__error"];

    const titleInputClasses = titleInputHasError ? errorClasses : normalClasses;
    const creatorInputClasses = creatorInputHasError
        ? errorClasses
        : normalClasses;
    const sourceInputClasses = sourceInputHasError
        ? errorClasses
        : normalClasses;
    const fileInputClasses = fileInputHasError ? errorClasses : normalClasses;

    const titleErrorMessage = titleExists
        ? "File already exists in databse."
        : titleInputHasError
        ? "Title cannot be empty."
        : null;
    const creatorErrorMessage = creatorInputHasError
        ? "Creator must not be empty."
        : null;
    const sourceErrorMessage = sourceInputHasError
        ? "Source must not be empty."
        : null;

    const fileErrorMessage = sourceInputHasError
        ? `Please choose a multimedia file.`
        : null;

    const multimediaTypeChangeHandler = (newMultimediaType) => {
        setMulmediaType(newMultimediaType);
        setTitleExists(false);
    };

    let acceptType = "text/plain";
    if (multimediaType === "pdf") {
        acceptType = "application/pdf";
    } else if (multimediaType === "image") {
        acceptType = "image/jpeg";
    } else if (multimediaType === "video") {
        acceptType = "video/mp4";
    }

    let extension = "txt";
    if (multimediaType === "pdf") {
        extension = "pdf";
    } else if (multimediaType === "image") {
        extension = "jpg";
    } else if (multimediaType === "video") {
        extension = "mp4";
    }

    const responseHandler = (data) => {
        setWaitingForResponse(false);
        if (data.hasError) {
            if (data.error === "File exists") {
                resetFile();
                setTitleExists(true);
            } else {
                console.error(data.error);
            }
        } else {
            showModalHandler(
                "Upload Multimedia",
                `Successfully added the file "${title}.${extension}" to the database.`
            );
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (formIsValid) {
            const fileInput = document.getElementById("file");
            const formData = new FormData();
            console.log(fileInput.files[0].name);
            formData.append("file", fileInput.files[0]);
            formData.append("title", title);
            formData.append("creator", creator);
            formData.append("source", source);

            const url = `http://localhost:8000/${multimediaType}/`;
            setWaitingForResponse(true);
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => responseHandler(data))
                .catch((error) => console.error(error));
        }
    };

    const masterMultimediaTypeChangeHandler = (newMultimediaType) => {
        multimediaTypeChangeHandler(newMultimediaType);
        setTitleExists(false);
    };

    const radioButtons = (
        <div className={classes["radio-btn__container"]}>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => masterMultimediaTypeChangeHandler("text")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                multimediaType === "text"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Text</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => masterMultimediaTypeChangeHandler("pdf")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                multimediaType === "pdf"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>PDF</div>
                </li>
            </ul>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => masterMultimediaTypeChangeHandler("image")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                multimediaType === "image"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Image</div>
                </li>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => masterMultimediaTypeChangeHandler("video")}
                >
                    <span className={classes["radio-btn__indicator"]}>
                        <span
                            className={`${classes["inner"]} ${
                                multimediaType === "video"
                                    ? classes["active"]
                                    : ""
                            }`}
                        ></span>
                    </span>
                    <div>Video</div>
                </li>
            </ul>
        </div>
    );

    const masterTitleChangeHandler = (event) => {
        titleChangeHandler(event);
        setTitleExists(false);
    };

    return (
        <>
            {modalOn && (
                <ResponseModal
                    onConfirm={hideModalHandler}
                    title={modalTitle}
                    message={modalMessage}
                />
            )}
            {waitingForResponse && <LoadingSpinnerRed />}
            {!waitingForResponse && <FormCard>
                <form
                    className={`${classes["form"]}`}
                    autoComplete="off"
                    onSubmit={submitHandler}
                >
                    <h1 className={classes["form__title"]}>
                        Upload Multimedia
                    </h1>
                    {radioButtons}
                    <div className={`${classes["form__inputs"]}`}>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <input
                                className={titleInputClasses}
                                id="title"
                                type="text"
                                value={title}
                                name="title"
                                onChange={masterTitleChangeHandler}
                                onBlur={titleInputBlurHandler}
                            />
                            {titleErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {titleErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="creator"
                            >
                                Creator
                            </label>
                            <input
                                className={creatorInputClasses}
                                id="creator"
                                type="text"
                                value={creator}
                                name="creator"
                                onChange={creatorChangeHandler}
                                onBlur={creatorInputBlurHandler}
                            />
                            {creatorErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {creatorErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="source"
                            >
                                Source
                            </label>
                            <input
                                className={sourceInputClasses}
                                id="source"
                                type="text"
                                value={source}
                                name="source"
                                onChange={sourceChangeHandler}
                                onBlur={sourceInputBlurHandler}
                            />
                            {sourceErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {sourceErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                        <div className={classes["input"]}>
                            <label
                                className={`${classes["input__label"]}`}
                                htmlFor="file"
                            >
                                File
                            </label>
                            <div>
                                <input
                                    className={`${fileInputClasses} ${classes["file-input"]}`}
                                    id="file"
                                    type="file"
                                    accept={acceptType}
                                    value={file}
                                    name="file"
                                    onChange={fileChangeHandler}
                                    onBlur={fileInputBlurHandler}
                                />
                            </div>
                            {fileErrorMessage ? (
                                <p className={classes["input__message"]}>
                                    {fileErrorMessage}
                                </p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </div>
                    </div>
                    <div className={`${classes["form__btn-group"]}`}>
                        <button
                            className={`${classes["form__btn"]}`}
                            // disabled={!formIsValid}
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </FormCard>}
        </>
    );
};

export default UploadForm;

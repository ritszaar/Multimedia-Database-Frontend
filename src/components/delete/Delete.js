import { useEffect, useState, useCallback } from "react";
import DocumentList from "../document/DocumentList";
import SearchBar from "../searchbar/SearchBar";
import classes from "./Delete.module.css";

const queryMatch = (patientName, queryString) => {
    if (queryString.trim() !== "") {
        return patientName.toLowerCase().includes(queryString.toLowerCase());
    }
    return true;
};

const Delete = () => {
    const [documents, setDocuments] = useState(null);
    const [flicker, setFlicker] = useState(true);
    const [multimediaType, setMulmediaType] = useState("text");
    const [query, setQuery] = useState("");

    const documentPreviewsResponseHandler = useCallback((data) => {
        if (data.hasError) {
            console.error(data.error);
        } else {
            console.log(data.documents);
            setDocuments(data.documents);
        }
    }, []);

    const documentPreviewsHandler = useCallback(async () => {
        window.scroll(0, 0);
        const url = `http://localhost:8000/${multimediaType}s/`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => documentPreviewsResponseHandler(data))
            .catch((error) => console.log(error));
    }, [multimediaType, documentPreviewsResponseHandler]);

    useEffect(() => {
        documentPreviewsHandler();
    }, [flicker, multimediaType]);

    const reloadHandler = () => {
        setFlicker(prev => !prev);
    }

    const multimediaTypeChangeHandler = (newMultimediaType) => {
        setMulmediaType(newMultimediaType);
    };

    const radioButtons = (
        <div className={classes["radio-btn__container"]}>
            <ul className={classes["radio-btn__group"]}>
                <li
                    className={classes["radio-btn"]}
                    onClick={() => multimediaTypeChangeHandler("text")}
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
                    onClick={() => multimediaTypeChangeHandler("pdf")}
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
                <li
                    className={classes["radio-btn"]}
                    onClick={() => multimediaTypeChangeHandler("image")}
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
                    onClick={() => multimediaTypeChangeHandler("video")}
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

    const queryChangeHandler = (newQuery) => {
        setQuery(newQuery);
    };

    return (
        <div className={classes["search"]}>
            {radioButtons}
            <SearchBar onChangeQuery={queryChangeHandler} />
            {!documents && <div className={classes["placeholder-content"]}>Loading...</div>}
            {documents &&
                documents.filter((document) =>
                    queryMatch(document.title, query.slice())
                ).length === 0 && <div className={classes["placeholder-content"]}>No results found.</div>}
            {documents &&
                documents.filter((document) =>
                    queryMatch(document.title, query.slice())
                ).length > 0 && (
                    <DocumentList
                        documents={documents.filter((document) =>
                            queryMatch(document.title, query.slice())
                        )}
                        multimediaType={multimediaType}
                        type="Delete"
                        onReload={reloadHandler}
                    />
                )}
        </div>
    );
};

export default Delete;

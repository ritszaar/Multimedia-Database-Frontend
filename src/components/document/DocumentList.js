import { useState } from "react";
import ResponseModal from "../responsemodal/ResponseModal";
import DocumentCard from "./DocumentCard";
import classes from "./DocumentList.module.css";

const DocumentList = (props) => {
    const [modalOn, setModalOn] = useState(false);
    const [modalTitle, setModalTitle] = useState(null);
    const [modalMessage, setModalMessage] = useState(null);

    const hideModalHandler = () => {
        setModalOn(false);
        if (props.type === "Delete") {
            props.onReload();
        }
    }

    const showModalHandler = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setModalOn(true);
    }

    return (
        <div className={classes["documentlist__container"]}>
            {modalOn && <ResponseModal onConfirm={hideModalHandler} title={modalTitle} message={modalMessage}/>}
            <ul className={classes["documentlist"]}>
                {props.documents.map((item, index) => {
                    return (
                        <li key={index}>
                            <DocumentCard
                                title={item.title}
                                creator={item.creator}
                                source={item.source}
                                preview={item.preview}
                                type={props.type}
                                multimediaType={props.multimediaType}
                                showModalHandler={showModalHandler}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DocumentList;

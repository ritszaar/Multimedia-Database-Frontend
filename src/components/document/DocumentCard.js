import classes from "./DocumentCard.module.css";

const DocumentCard = (props) => {
    let extension = "txt";
    if (props.multimediaType === "pdf") {
        extension = "pdf";
    } else if (props.multimediaType === "image") {
        extension = "jpg";
    } else if (props.multimediaType === "video") {
        extension = "mp4";
    }

    const viewNavHandler = () => {
        const url = `http://localhost:8000/${
            props.multimediaType
        }?title=${encodeURIComponent(props.title)}`;

        fetch(url, {
            method: "GET",
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${props.title}.${extension}`;
                a.click();
                URL.revokeObjectURL(url);
            })
            .catch((error) => console.error(error));
    };

    const deleteResponseHandler = (data) => {
        if (data.hasError) {
            console.error(data.error);
        } else {
            props.showModalHandler(
                "Delete Multimedia",
                `Successfully deleted the file "${props.title}.${extension}" from the database.`
            );
        }
    };

    const deleteNavHandler = () => {
        const url = `http://localhost:8000/${
            props.multimediaType
        }?title=${encodeURIComponent(props.title)}`;

        fetch(url, {
            method: "DELETE",
        })
            .then((response) => deleteResponseHandler(response.json()))
            .catch((error) => console.error(error));
    };

    return (
        <div className={classes["document"]}>
            <div className={classes["cover__container"]}>
                <img
                    src={`data:image/jpeg;base64,${props.preview}`}
                    alt={props.title}
                    className={classes["cover"]}
                />
                <div className={classes["shadow"]}>
                    <div className={classes["shadow-btn__group"]}>
                        <button
                            className={classes["shadow-btn"]}
                            onClick={
                                props.type === "View"
                                    ? viewNavHandler
                                    : deleteNavHandler
                            }
                        >
                            {props.type}
                        </button>
                    </div>
                </div>
            </div>
            <div className={classes["document__metadata"]}>
                <h2 className={classes["name"]}>{props.title}</h2>
                <h3 className={classes["creator"]}>{props.creator}</h3>
            </div>
        </div>
    );
};

export default DocumentCard;

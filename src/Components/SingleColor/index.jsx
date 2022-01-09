
import { useState, useEffect } from "react";
import { rgbToHex } from "../../Utility/helpers";

import styles from "./SingleColor.module.scss";

const SingleColor = ({ rgb, type }) => {

    const [text, setText] = useState(false);

    const handleCopy = () => {
        navigator.clipboard
            .writeText(rgbToHex(...rgb))
            .then((response) => setText(true));
    };

    useEffect(() => {
        if (text) {
            const timer = setTimeout(() => {
                setText(false);
            }, 2000);
            return () => clearTimeout(timer);
        }

    }, [text]);

    return (
        <div
            onClick={handleCopy}
            className={`${styles.color_wrapper} ${type}`}
            style={{ backgroundColor: `${rgbToHex(...rgb)}` }}>
            <h5>{rgbToHex(...rgb)}</h5>
            {
                text && <p>Color Copy!</p>
            }
        </div>
    );
};

export default SingleColor;
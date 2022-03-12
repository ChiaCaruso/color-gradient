import { useState, useEffect } from 'react';
import Values from "values.js";
import { v4 as uuidv4 } from 'uuid';

import SingleColor from '../SingleColor';

import styles from "./ColorGradient.module.scss";

const ColorGradient = () => {

    const [isError, setIsError] = useState(false);

    const [colorSelect, setColorSelect] = useState([]);
    const [colorInput, setColorInput] = useState({
        color: "",
        tot: 10,
    });


    const handleSubmit = (e) => {
        e.preventDefault();

        if (colorInput.color && colorInput.tot) {
            const { color, tot } = colorInput;
            try {
                setColorSelect(
                    new Values(color).all(Math.round((100 / parseInt(tot, 10)) * 2))
                );
                setColorInput({
                    color: "",
                    tot: 10,
                });
            } catch (error) {
                setIsError(true);
            }

        }
    }

    const handleChange = (e) => {
        setIsError(false);

        const { name, value } = e.target;
        setColorInput({ ...colorInput, [name]: value });
    }

    useEffect(() => {
        setColorInput({ ...colorInput, color: '#bee6c3' });
        setColorSelect(
            new Values('#bee6c3').all(Math.round((100 / parseInt(colorInput.tot, 10)) * 2))
        );
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_wrapper}>
                    <input
                        type="text"
                        value={colorInput.color}
                        onChange={handleChange}
                        name="color"
                        id="color"
                        maxLength={7}
                        className={styles.input}
                    />
                    <input
                        type="number"
                        value={colorInput.tot}
                        onChange={handleChange}
                        name="tot"
                        id="tot"
                        max={100}
                        min={5}
                        step={5}
                        className={styles.input}
                    />
                </div>
                <button className={`${styles.btn} ${styles.btn_select}`} type="submit">Create</button>
            </form>
            <section className={styles.section_wrapper}>
                {isError ? (
                    <h4 className={styles.text_center}>No colors found</h4>
                ) : !isError && colorSelect ? (
                    colorSelect.map((el) =>
                        <SingleColor key={uuidv4()} {...el} />)
                ) : (
                    <h4>Loading...</h4>
                )}

            </section>

        </>
    )
}

export default ColorGradient;
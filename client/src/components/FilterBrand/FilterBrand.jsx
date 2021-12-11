import { useSelector, useDispatch } from "react-redux";
import { useState, /* useEffect */ } from "react";
import { setFilterBrands } from "../../redux/actions/index.js";
import { setPage } from "../../redux/actions/index.js";
import styles from "./FilterBrand.module.css";

export default function FilterBrand() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.brands);
    let [value, setValue] = useState("");

    if (data) {
        let brandSet = new Set(data);
        var brands = [...brandSet];
    }

    function onChangeHandler(e) {
        
        if (e.target.value) {
            setValue(e.target.value[0].toUpperCase() + e.target.value.slice(1));
        } else {
            setValue(e.target.value);
        }
        dispatch(setFilterBrands(e.target.value));
        dispatch(setPage(0));
    }

    return (
        <div className={`${styles.drop}`}>
            <button className={`${!value && brands ? styles.menu : styles.menu_active}`}>{value && brands ? value : "Brand"}</button>
            <div className={`${styles.select}`}>
                <button className={`${styles.btn}`} value="" onClick={onChangeHandler}>
                    All Brands
                </button>
                {brands &&
                    brands.map((elem, index) => {
                        return (
                            <button className={`${styles.btn}`} key={elem + index} value={elem} onClick={onChangeHandler}>
                                {elem}
                            </button>
                        );
                    })}
            </div>
        </div>
    );
}

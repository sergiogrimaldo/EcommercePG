import { /* useEffect, */ useState } from "react";
import { deleteAllRepited, splitAll, deleteWord, findGrid, filter } from "./colors";

const FilterColor = ({ data }) => {
    const [value, setValue] = useState("");
    let clean = [],
        shoes = [];

    if (data) {
        let array = splitAll(data);
        clean = deleteAllRepited(array);
        shoes = filter(array, value);
        shoes.forEach((e) => {
            //console.log(e.id);
        }); // esto es para traer las zapatillas que coinciden con el filtro por id
    }

    const onChangeHandler = (e) => {
        setValue(e.target.value);
    };
    return (
        <div>
            <select onChange={onChangeHandler}>
                <option value="All">---Filter Color---</option>
                {clean ? (
                    clean.map(
                        (elem, index) =>
                            !deleteWord.includes(elem) && (
                                <option
                                    key={elem + index}
                                    value={elem}
                                    style={{
                                        backgroundColor: findGrid(elem),
                                    }}
                                >
                                    {elem[0].toUpperCase() + elem.slice(1)}
                                </option>
                            )
                    )
                ) : (
                    <option></option>
                )}
            </select>
        </div>
    );
};

export default FilterColor;

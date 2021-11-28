import { findGrid } from "./colors";
import { deleteWord } from "./colors";
import { splitAll } from "./colors";
import { deleteAllRepited } from "./colors";
import { useState } from "react";
import { filter } from "./colors";

const FilterColor = ({ data }) => {
  const [value, setValue] = useState("");
  let clean = [], shoes = [];
  if (data) {
  
  let array = splitAll(data);
  //console.log(array);
  clean = deleteAllRepited(array);
  shoes = filter(array, value);

  shoes.forEach((e) => {
    console.log(e._id);
  }); // esto es para traer las zapatillas que coinciden con el filtro por id
  }

  const onChangeHandler = (e) => {
    setValue(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <select onChange={onChangeHandler}>
        <option value="">---Filter Color---</option>
<<<<<<< HEAD
        {clean.map(
=======
        {clean ? (
          clean.map(
>>>>>>> 03dd0f498a5710aebd717a258219a698962eded4
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
              ))
	          ) : (
		          <option></option>
         )}
      </select>
    </div>
  );
};

export default FilterColor;

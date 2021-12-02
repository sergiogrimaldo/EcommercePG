import {useState} from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../redux/actions/index.js';
import styles from './Detail.module.css';
import { addToCart, update } from "../../redux/actions";
import { onlyThreeColorGrid } from "../FilterColor/colors.js";


export default function Detail({ id }) {
	const dispatch = useDispatch();
	const details = useSelector(state => state.shoeDetails);
	const [shoeOnHover, setShoeOnHover] = useState("");
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState("");
    const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState("");
	
	var shoes = useSelector((state) => state.shoes);
	let found,
	foundFromAll,
	allColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
	restOfColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id, false); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
    if (shoeOnHover) {
		found = shoeOnHoverImg.find((el) => el.id === shoeOnHover);
        foundFromAll = shoes.find((el) => el.id === shoeOnHover);
    }
	
	useEffect(() => {
		dispatch(getShoeDetails(id));
	}, [dispatch]);
	
	return (
		<div>
			<div className={styles.bkg}>
        	<div className={styles.container}>
            <br/>
			<h1>{details && details.shoeName}</h1>
			<img className={`${styles.img_detail}`} src={details && details.thumbnail} alt='Not found' />
			<h2 className={styles.stock}>Stock: {details && details.stock} un</h2>
			<h2 className={styles.color}>Color: {details && details.colorway}</h2>
			<h3 className={styles.price}>Price: u$d XX</h3>
			<div className={`${styles.description}`}>Product Description: {details && details.description}</div>
			<div>
			<input
                        type="button"
                        onClick={() => {
                            dispatch(addToCart({ image: details.thumbnail, name: details.shoeName, price: details.retailPrice, cuantity: 1 }));
                            dispatch(update());
                        }}
                        value="Add to Cart"
                    />
                    <input type="button" value="Buy Now" />
			</div>
			</div>
			</div>
		</div>
	);
}

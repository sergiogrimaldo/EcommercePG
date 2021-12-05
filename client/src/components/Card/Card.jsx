/* import { useState } from 'react'; */
import s from './Card.module.css';
/* import { useSelector } from 'react-redux';
import { addToCart, update } from '../../redux/actions'; */
import Review from '../Review/Review.jsx';
/* import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/index.js';
import { openBuyDetailsModal } from '../../redux/actions/index.js';
import { onlyThreeColorGrid } from '../FilterColor/colors.js'; */
import { Link } from 'react-router-dom';
import DeleteShoe from '../DeleteShoe/DeleteShoe.jsx';

export default function Card({ shoe }) {
	/* const dispatch = useDispatch();
	const [shoeOnHover, setShoeOnHover] = useState('');
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState('');
	const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState('');
	const [plusOrMinus, setPlusOrMinus] = useState('+');
	var shoes = useSelector(state => state.shoes); */
	/* let found,
		foundFromAll,
		allColors = onlyThreeColorGrid(shoes, shoe.silhoutte, shoe.id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
		restOfColors = onlyThreeColorGrid(shoes, shoe.silhoutte, shoe.id, false); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
	if (shoeOnHover) {
		found = shoeOnHoverImg.find(el => el.id === shoeOnHover);
		foundFromAll = shoes.find(el => el.id === shoeOnHover);
	} */

	let rating = Math.floor(Math.random() * 5) + 0;

	return (
		<div className={s.card__father}>
			<DeleteShoe id={shoe.id} />
			<Link to={`/shoe/${shoe.id}`}>
				<div
					className={s.card}
					//onMouseLeave={() => {
					//setRestOfShoeOnHoverImg('');
					//setPlusOrMinus('+');
					//}}
				>
					<div className={s.icon}>
						<img src={shoe.thumbnail} alt='lol' className={s.img} />
						<h1> {shoe.shoeName} </h1>{' '}
					</div>{' '}
					<Review rating={rating} shoe={shoe} currentComponent='Card' />
				</div>{' '}
			</Link>
		</div>
	);
}

/* import { useState } from 'react'; */
import s from './Card.module.css';
import { useSelector } from 'react-redux';
import { addToCart, update, } from '../../redux/actions';
import Review from '../Review/Review.jsx';
import { useDispatch } from 'react-redux';
/*
import { openModal } from '../../redux/actions/index.js';
import { openBuyDetailsModal } from '../../redux/actions/index.js';
import { onlyThreeColorGrid } from '../FilterColor/colors.js'; */
import { Link } from 'react-router-dom';
import DeleteShoe from '../DeleteShoe/DeleteShoe.jsx';

export default function Card({ shoe }) {
	console.log(shoe)
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user)
	/* 
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

	const handleClick = function () {
		dispatch(addToCart({ id: shoe.id, image: shoe.thumbnail, name: shoe.shoeName, price: shoe.retailPrice, stock:shoe.stock, cuantity: 1 }));
		dispatch(update());
	};

	return (
		<div className={s.card__father} style={{ position: 'relative' }}>
			<Link to={`/shoe/${shoe.id}`}>
				<div
					className={s.card}
					//onMouseLeave={() => {
					//setRestOfShoeOnHoverImg('');
					//setPlusOrMinus('+');
					//}}
				>
					<div className={s.icon} style={{ position: 'relative' }}>
						<img src={shoe.thumbnail} alt='lol' className={s.img} />
						<h3> {shoe.shoeName} </h3> <h2> US$ {shoe?.retailPrice} </h2>
						<Review rating={rating} shoe={shoe} currentComponent='Card' />
					
					</div>{' '}
				</div>{' '}
			</Link>
			<div style={{position:'absolute',top:70,right:70,zIndex:50}}>
			{user && user.role == 2 && <DeleteShoe id={shoe.id} />}
						</div>
			<button className={s.button} style={{ zIndex: 30, borderRadius: 10, position: 'absolute', bottom: 65, left: '38.%', zIndex: 10, padding: 5, border: '1px solid black' }} onClick={() => handleClick()}>
				🛒 add to cart
			</button>
		</div>
	);
}

/* import { useState } from 'react'; */
import s from './Card.module.css';
import { useSelector } from 'react-redux';
import { addToCart, update, addToWishList, openModal, deleteFromWishList, getWishList } from '../../redux/actions';
import Review from '../Review/Review.jsx';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
/*
import { openModal } from '../../redux/actions/index.js';
import { openBuyDetailsModal } from '../../redux/actions/index.js';
import { onlyThreeColorGrid } from '../FilterColor/colors.js'; */
import { Link } from 'react-router-dom';
import DeleteShoe from '../DeleteShoe/DeleteShoe.jsx';
import EditButton from '../EditShoe/EditButton.jsx';

export default function Card({ shoe }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	const page = useSelector(state => state.currentPage);
	const [buySize, setBuySize] = useState('');

	const [icon, setIcon] = useState(farHeart);

	let rating = Math.floor(Math.random() * 5) + 0;

	useEffect(() => {
		// dispatch(update());
		if (wishlist?.shoes?.some(wishlistShoe => wishlistShoe.id == shoe.id)) {
			setIcon(faHeart);
		} else {
			setIcon(farHeart);
		}
	}, [wishlist, wishlist?.shoes, page]);

	const handleAddFav = async e => {
		e.preventDefault();
		if (!user.email) {
			dispatch(openModal('login'));
		} else {
			await dispatch(addToWishList({ email: user.email, shoeId: shoe.id }));
			await dispatch(getWishList({ email: user.email }));
		}
	};

	const handleDeleteFav = async e => {
		e.preventDefault();
		if (!user.email) {
			dispatch(openModal('login'));
		} else {
			await dispatch(deleteFromWishList({ email: user.email, shoeId: shoe.id }));
			await dispatch(getWishList({ email: user.email }));
		}
	};

	const handleClick = function () {

		//console.log(e)
		if (parseInt(buySize) > 0 && buySize != ''){
			dispatch(addToCart({ id: shoe.id, image: shoe.thumbnail, name: shoe.shoeName, price: shoe.retailPrice, stock: shoe.stock, cuantity: 1, size: buySize }));
			dispatch(update());

		}else{
			alert("Pick a size");

		}
	};

	return (
		<div className={s.card__father} style={{ position: 'relative' }}>
			<Link to={`/shoe/${shoe.id}`}>
			
				<div className={s.card}>
					<div className={s.icon} style={{ position: 'relative' }}>
						<img src={shoe.thumbnail} alt='lol' className={s.img} />
						<h3> {shoe.shoeName} </h3> {shoe.stock > 0 && <h2> US$ {shoe?.retailPrice} </h2>}
						<Review rating={rating} shoe={shoe} currentComponent='Card' />
					</div>{' '}
				</div>

			</Link>
			<div style={{ position: 'absolute', top: 50, left: 45, zIndex: 1, display: 'flex' }}>{user && user.role == 2 && <EditButton id={shoe.id} />}</div>
			<div style={{ position: 'absolute', top: 50, right: 50, zIndex: 1, display: 'flex' }}>{user && user.role == 2 && <DeleteShoe id={shoe.id} />}</div>
			<div style={{ cursor: 'pointer', border: 'none', position: 'relative', left: 75, zIndex: 20, bottom: 70 }} className={`${s.social}`}>
				{/*boton*/}

				{!user.email && (
					<button>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='lg' color='red' icon={icon} onClick={e => handleDeleteFav(e)} />
					</button>
				)}

				{user.email && wishlist && wishlist.shoes && wishlist.shoes.some(wishlistShoe => wishlistShoe.id == shoe.id) && (
					<button>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='lg' color='red' icon={icon} onClick={e => handleDeleteFav(e)} />
					</button>
				)}
				{user.email && wishlist && wishlist.shoes && !wishlist.shoes.some(wishlistShoe => wishlistShoe.id == shoe.id) && (
					<button>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='lg' color='red' icon={icon} onClick={e => handleAddFav(e)} />
					</button>
				)}
			</div>
			<div style={{ position: 'relative' }}>
				{shoe.stock > 0 && (
					<select onChange={e => setBuySize(e.target.value || '')} style={{ position: 'absolute', bottom: 100, right: 150, zIndex: 20 }}>
						<option select> Select Size</option>
						{Object.keys(shoe.AvailableSizes)
							.filter(elem => elem !== 0)
							.filter(elem => elem !== 'id')
							.sort((a, b) => Number(a.includes(',') ? a.replace(',', '.') : a) - Number(b.includes(',') ? b.replace(',', '.') : b))
							.map(size => (
								<option style={{ display: 'flex' }} value={size}>
									{size.includes(',') ? size.replace(',', '.') : size}
								</option>
							))}
					</select>
				)}
			</div>
			<div>
				{shoe.stock > 0 ? (
					<button
						className={s.button}
			
						onClick={() => handleClick()}>
						🛒 add to cart
					</button>
				) : (
					<button
						className={s.btnstock}
						>
						Out of stock
					</button>
				)}
			</div>
			
		</div>
	);
}

// {
// 	Object.keys(shoe.availableSizes)
// 		.filter(elem => elem !== 0)
// 		.filter(elem => elem !== 'id')
// 		.sort((a, b) => Number(a.includes(',') ? a.replace(',', '.') : a) - Number(b.includes(',') ? b.replace(',', '.') : b))
// 		.map(elem => <option value={elem}>{elem.includes(',') ? elem.replace(',', '.') : elem}</option>);
// }

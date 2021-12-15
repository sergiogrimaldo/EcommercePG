import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../redux/actions/index.js';
import { getReviews } from '../../redux/actions/index.js';
import s from './Detail.module.css';
import Review from '../Review/Review.jsx';
import Reviews from '../Review/Reviews.jsx';
import { addToCart, update, openModal, getWishList, addToWishList, deleteFromWishList } from '../../redux/actions';
import { onlyThreeColorGrid } from '../FilterColor/colors.js';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

export default function Detail({ id }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	const details = useSelector(state => state.shoeDetails);
	const reviews = useSelector(state => state.reviews);
	const [shoeOnHover, setShoeOnHover] = useState('');
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState('');
	const [icon, setIcon] = useState(farHeart);
	/* const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState('');
	const [plusOrMinus, setPlusOrMinus] = useState('+'); */
	const shoes = useSelector(state => state.shoes);
	const reviewsFromUser = useSelector(state => state.reviewsFromUser);
	if (details && shoes) {
		var found,
			/* foundFromAll, */
			allColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id); //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
		/* restOfColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id, true); */ //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
	}
	if (shoeOnHover) {
		found = shoeOnHoverImg.find(el => el.id === shoeOnHover);
		/* foundFromAll = shoes.find(el => el.id === shoeOnHover); */
	}

	//reviews && console.log(reviews);
	let rating = Math.floor(Math.random() * 5) + 0;

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (wishlist?.shoes?.some(wishlistShoe => wishlistShoe.id == details.id)) {
			setIcon(faHeart);
		} else {
			setIcon(farHeart);
		}
	}, [wishlist, wishlist?.shoes]);

	useEffect(async () => {
		await dispatch(getShoeDetails(id));
		await dispatch(getReviews());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, JSON.stringify(reviews), JSON.stringify(reviewsFromUser), id]);
	function onClickHandler(e) {
		console.log(e.target.value);
	}
	//details && console.log(details)
	const handleAddFav = async e => {
		e.preventDefault();
		if (!user.email) {
			dispatch(openModal('login'));
		} else {
			await dispatch(addToWishList({ email: user.email, shoeId: details.id }));
			await dispatch(getWishList({ email: user.email }));
		}
	};

	const handleDeleteFav = async e => {
		e.preventDefault();
		if (!user.email) {
			dispatch(openModal('login'));
		} else {
			await dispatch(deleteFromWishList({ email: user.email, shoeId: details.id }));
			await dispatch(getWishList({ email: user.email }));
		}
	};
	return (
		<div>
			{/* <div className={s.backdiv}>
				<button className={s.back} onClick={() => history.push('/catalogue')}>
					Back
				</button>
			</div> */}

			<div className={`${s.macro}`}>
				<div className={`${s.title}`} style={{display: 'flex', alignItems: 'center', alignContent:'center', justifyContent: 'center'}}>
				<h1 style={{marginRight: 15}}>{details && details.shoeName}</h1>
				
				{!user.email && (
					<button  style={{backgroundColor: 'rgba(0,0,0,0)', border:'none'}}>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='3x' color='red' icon={icon} onClick={e => handleDeleteFav(e)} />
					</button>
				)}

				{user.email && wishlist && wishlist.shoes && wishlist.shoes.some(wishlistShoe => wishlistShoe.id == details.id) && (
					<button  style={{backgroundColor: 'rgba(0,0,0,0)', border:'none'}}>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='3x' color='red' icon={icon} onClick={e => handleDeleteFav(e)} />
					</button>
				)}
				{user.email && wishlist && wishlist.shoes && !wishlist.shoes.some(wishlistShoe => wishlistShoe.id == details.id) && (
					<button style={{backgroundColor: 'rgba(0,0,0,0)', border:'none'}}>
						<FontAwesomeIcon style={{ cursor: 'pointer', border: 'none', lineHeight: '60' }} size='3x' color='red' icon={icon} onClick={e => handleAddFav(e)} />
					</button>
				)}
				</div>
				<div className={`${s.divvy_one}`}>
					<div className={`${s.shoe_cont}`}>
						<img className={`${s.img_detail}`} src={found && found.thumbnail ? found.thumbnail : details && details.thumbnail} alt='Not found' />
						<Review rating={rating} shoe={details} currentComponent='Detail' />
						<h2 className={`${details && details.stock ? s.instock : s.outstock}`}>{details && details.stock ? 'In Stock' : 'Out Of Stock'} </h2>
						<h2>Available Sizes</h2>
						<div className={`${s.size}`}>
							{details &&
								Object.entries(details.availableSize)
									.filter(elem => elem[1] !== 0)
									.filter(elem => elem[0] !== 'id')
									.sort((a, b) => Number(a[0].includes(',') ? a[0].replace(',', '.') : a[0]) - Number(b[0].includes(',') ? b[0].replace(',', '.') : b[0]))
									.map(elem => (
										<button className={`${s.size_btn}`} value={elem[0]} onClick={onClickHandler} className={`${s.btn_size}`}>
											{elem[0].includes(',') ? elem[0].replace(',', '.') : elem[0]}
										</button>
									))}
						</div>
					</div>
					<div className={`${s.container}`}>
						{details && details.brand && <h2 className={`${s.brand}`}>Brand: {details.brand && details.brand.name}</h2>}
						<h2 className={`${s.color}`}>Color: {details && details.colorway}</h2>
						<h2 className={`${s.price}`}>Price: ${details && details.price.retailPrice}</h2>

						<div className={`${s.palette}`}>
							<h2 className={`${s.colors}`}>Colors</h2>
							{allColors &&
								allColors.colorNameThumbnailAnd_id.slice(0, 100).map((item, i) => {
									return (
										<Link to={`/shoe/${item.id}`} className={`${s.colorLink}`}>
											{item.threeColorGrid
												.map((items, ind) => {
													return (
														<div
															key={ind + 400}
															className={s.gridOfColors}
															style={{
																backgroundColor: items,
															}}
															onMouseEnter={() => {
																setShoeOnHover(item.id);
																setShoeOnHoverColor(allColors.colorNameThumbnailAnd_id);
															}}
															onMouseLeave={() => {
																setShoeOnHover('');
																setShoeOnHoverColor('');
															}}
														/>
													);
												})
												.slice(0, 4)}
										</Link>
									);
								})}
						</div>
						<div className={s.divvy_two}>
							<h2 className={`${s.description_label}`}>Product Description</h2>
							<p className={`${s.description}`}>{details && details.description}</p>

							<Reviews shoeId={id} />
						</div>
						
					</div>

					{/* <img src={found && found.thumbnail} alt='lol' className={shoeOnHover ? s.displayImgTrue : s.displayImgFalse} /> */}
				</div>
			</div>
		</div>
	);
}

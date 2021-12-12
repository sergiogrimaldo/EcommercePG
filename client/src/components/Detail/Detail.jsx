import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../redux/actions/index.js';
import { getReviews } from '../../redux/actions/index.js';
import s from './Detail.module.css';
import Review from '../Review/Review.jsx';
import Reviews from '../Review/Reviews.jsx';
import { addToCart, update } from '../../redux/actions';
import { onlyThreeColorGrid } from '../FilterColor/colors.js';
import { Link, useHistory } from 'react-router-dom';

//import { openModal } from '../../redux/actions/index.js';
//import { openBuyDetailsModal } from '../../redux/actions/index.js';

export default function Detail({ id }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const details = useSelector(state => state.shoeDetails);
	const reviews = useSelector(state => state.reviews);
	const [shoeOnHover, setShoeOnHover] = useState('');
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState('');
	const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState('');
	const [plusOrMinus, setPlusOrMinus] = useState('+');
	const shoes = useSelector(state => state.shoes);
	const reviewsFromUser = useSelector(state => state.reviewsFromUser);
	if (details && shoes) {
		var found,
			foundFromAll,
			allColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
			restOfColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id, true); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
	}
	if (shoeOnHover) {
		found = shoeOnHoverImg.find(el => el.id === shoeOnHover);
		foundFromAll = shoes.find(el => el.id === shoeOnHover);
	}

	reviews && console.log(reviews);
	let rating = Math.floor(Math.random() * 5) + 0;

	useEffect(async () => {
		await dispatch(getShoeDetails(id));
		await dispatch(getReviews());
	}, [dispatch, JSON.stringify(reviews), JSON.stringify(reviewsFromUser), id]);

	function onClickHandler(e) {
		console.log(e.target.value);
	}

	return (
		<div style={{ padding: 10, waigth: '100%' }}>
			<div className={`${s.macro}`}>
				<br />
				<img className={`${s.img_detail}`} src={details && details.thumbnail} alt='Not found' />
				<Review rating={rating} shoe={details} currentComponent='Detail' />
				<div className={`${s.container}`}>
					<h1>{details && details.shoeName}</h1>
					<h2 className={`${details && details.stock ? s.instock : s.outstock}`}>{details && details.stock ? 'In Stock' : 'Out Of Stock'} </h2>
					<h2 className={`${s.brand}`}>Brand: {details.brand && details.brand.name}</h2>
					<h2 className={`${s.color}`}>Color: {details && details.colorway}</h2>
					<h2 className={`${s.price}`}>Price: ${details && details.price.retailPrice}</h2>
					<h2 className={`${s.size}`}>
						Available Sizes:{' '}
						{details &&
							Object.entries(details.availableSize)
								.filter(elem => elem[1] !== 0)
								.filter(elem => elem[0] !== 'id')
								.map(elem => (
									<button value={elem[0]} onClick={onClickHandler} className={`${s.btn_size}`}>
										{elem[0].includes(',') ? elem[0].replace(',', '.') : elem[0]}
									</button>
								))}
					</h2>
				</div>
				<div className={`${s.description}`}>Product Description: {details && details.description}</div>
			</div>
			<div className={s.info__description}>
				{' '}
				Colors
				{allColors &&
					allColors.colorNameThumbnailAnd_id.slice(0, 100).map((item, i) => {
						return (
							<Link to={`/shoe/${item.id}`}>
								<div
									onMouseEnter={() => {
										setShoeOnHover(item.id);
										setShoeOnHoverColor(allColors.colorNameThumbnailAnd_id);
									}}
									onMouseLeave={() => {
										setShoeOnHover('');
										setShoeOnHoverColor('');
									}}
									key={i}
									className={s.gridOfFirstThreeColors}>
									{item.threeColorGrid
										.map((items, ind) => {
											return (
												<div
													key={ind + 400}
													className={s.gridOfColors}
													style={{
														backgroundColor: items,
													}}
												/>
											);
										})
										.slice(0, 4)}{' '}
								</div>
							</Link>
						);
					})}{' '}
			</div>{' '}
			<input
				type='button'
				onClick={() => {
					dispatch(addToCart({ id: details.id, image: details.thumbnail, name: details.shoeName, price: details.price.retailPrice, cuantity: 1 }));
					dispatch(update());
				}}
				value='Add to Cart'
				className={s.addTo}
			/>
			<div className={s.CatalogeButton}>
				<button className={s.back} onClick={() => history.push('/catalogue')}>
					Back
				</button>
			</div>
			<img src={found && found.thumbnail} alt='lol' className={shoeOnHover ? s.displayImgTrue : s.displayImgFalse} />
			<Reviews shoeId={id} />
		</div>
	);
}

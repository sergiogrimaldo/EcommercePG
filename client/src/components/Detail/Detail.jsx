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

export default function Detail({ id }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const details = useSelector(state => state.shoeDetails);
	const reviews = useSelector(state => state.reviews);
	const [shoeOnHover, setShoeOnHover] = useState('');
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState('');
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
	useEffect(async () => {
		await dispatch(getShoeDetails(id));
		await dispatch(getReviews());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, JSON.stringify(reviews), JSON.stringify(reviewsFromUser), id]);
	function onClickHandler(e) {
		console.log(e.target.value);
	}
	//details && console.log(details)
	return (
		<div>
			<div className={s.backdiv}>
				<button className={s.back} onClick={() => history.push('/catalogue')}>
					Back
				</button>
			</div>

			<div className={`${s.macro}`}>
				<h1 className={`${s.title}`}>{details && details.shoeName}</h1>
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
									.map(elem => (
										<button value={elem[0]} onClick={onClickHandler} className={`${s.btn_size}`}>
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
							<div className={`${s.description}`}>{details && details.description}</div>

							<Reviews shoeId={id} />
						</div>
					</div>

					{/* <img src={found && found.thumbnail} alt='lol' className={shoeOnHover ? s.displayImgTrue : s.displayImgFalse} /> */}
				</div>
			</div>
		</div>
	);
}

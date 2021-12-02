import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../redux/actions/index.js';
import s from './Detail.module.css';
import { addToCart, update } from '../../redux/actions';
import { onlyThreeColorGrid } from '../FilterColor/colors.js';
import { openModal } from '../../redux/actions/index.js';
import { openBuyDetailsModal } from '../../redux/actions/index.js';

export default function Detail({ id }) {
	const dispatch = useDispatch();
	const details = useSelector(state => state.shoeDetails);
	const [shoeOnHover, setShoeOnHover] = useState('');
	const [shoeOnHoverImg, setShoeOnHoverColor] = useState('');
	const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState('');
	const [plusOrMinus, setPlusOrMinus] = useState('+');
	const shoes = useSelector(state => state.shoes);
	if (details) {
		var found,
			foundFromAll,
			allColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
			restOfColors = onlyThreeColorGrid(shoes, details.silhoutte, details.id, false); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
	}
	if (shoeOnHover) {
		found = shoeOnHoverImg.find(el => el.id === shoeOnHover);
		foundFromAll = shoes.find(el => el.id === shoeOnHover);
	}

	useEffect(() => {
		dispatch(getShoeDetails(id));
	}, [dispatch]);

	return (
		<div>
			<div className={`${s.container}`}>
				<br />
				<img className={`${s.img_detail}`} src={details && details.thumbnail} alt='Not found' />
				<div>
					<h1>{details && details.shoeName}</h1>
					<h2 className={`${s.stock}`}>Stock: {details && details.stock} un</h2>
					<h2 className={`${s.color}`}>Color: {details && details.colorway}</h2>
					<h3 className={`${s.price}`}>Price: u$d XX</h3>
					<div className={`${s.description}`}>Product Description: {details && details.description}</div>
				</div>
			</div>
			<img src={found && found.thumbnail} alt='lol' className={shoeOnHover ? s.displayImgTrue : s.displayImgFalse} />
			<div className={s.info__description}>
				{' '}
				{restOfColors &&
					restOfColors.colorNameThumbnailAnd_id.slice(3, 15).map((item, i) => {
						let pos = i * 20;
						return (
							<div
								onMouseEnter={() => {
									setShoeOnHover(item.id);
									setShoeOnHoverColor(restOfColors.colorNameThumbnailAnd_id);
								}}
								onMouseLeave={() => {
									setShoeOnHover('');
									setShoeOnHoverColor('');
								}}
								onClick={() => {
									dispatch(
										openBuyDetailsModal({
											foundFromAll,
											restOfColors,
										})
									);
									dispatch(openModal('BuyDetailsModal'));
								}}
								key={i}
								className={restOfShoeOnHoverImg ? s.displaySecundLineOfColorsTrue : s.displaySecundLineOfColorsFalse}
								style={{
									marginLeft: `${60 + pos}px`,
								}}>
								{item.threeColorGrid.map((items, ind) => {
									return (
										<div
											key={ind + 400}
											className={s.gridOfColors}
											style={{
												backgroundColor: items,
											}}
										/>
									);
								})}{' '}
							</div>
						);
					})}
				{restOfColors && restOfColors.colorNameThumbnailAnd_id.length > 3 && (
					<div>
						<div
							className={s.plusOrMinus}
							style={{
								display: plusOrMinus === '+' ? 'block' : 'none',
							}}
							onClick={() => {
								setRestOfShoeOnHoverImg(restOfColors);
								setPlusOrMinus('-');
							}}>
							+Colors{' '}
						</div>{' '}
						<div
							className={s.plusOrMinus}
							style={{
								display: plusOrMinus === '-' ? 'block' : 'none',
							}}
							onClick={() => {
								setRestOfShoeOnHoverImg('');
								setPlusOrMinus('+');
							}}>
							-Colors{' '}
						</div>{' '}
					</div>
				)}{' '}
				{allColors &&
					allColors.colorNameThumbnailAnd_id.slice(0, 3).map((item, i) => {
						return (
							<div
								onMouseEnter={() => {
									setShoeOnHover(item.id);
									setShoeOnHoverColor(allColors.colorNameThumbnailAnd_id);
								}}
								onMouseLeave={() => {
									setShoeOnHover('');
									setShoeOnHoverColor('');
								}}
								onClick={() => {
									dispatch(
										openBuyDetailsModal({
											foundFromAll,
											restOfColors,
										})
									);
									dispatch(openModal('BuyDetailsModal'));
								}}
								key={i}
								className={s.gridOfFirstThreeColors}>
								{item.threeColorGrid.map((items, ind) => {
									return (
										<div
											key={ind + 400}
											className={s.gridOfColors}
											style={{
												backgroundColor: items,
											}}
										/>
									);
								})}{' '}
							</div>
						);
					})}{' '}
			</div>{' '}
			<div>
				<input
					type='button'
					onClick={() => {
						dispatch(addToCart({ image: details.thumbnail, name: details.shoeName, price: details.retailPrice, cuantity: 1 }));
						dispatch(update());
					}}
					value='Add to Cart'
				/>
				<input type='button' value='Buy Now' />
			</div>
		</div>
	);
}
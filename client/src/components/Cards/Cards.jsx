import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paging from '../Paging/Paging.jsx';
import s from './Cards.module.css';

export default function Cards() {
	const filters = useSelector(state => state.filters); //brands
	const filterBrands = useSelector(state => state.filterBrands);
	const filterSizes = useSelector(state => state.filterSizes);
	const page = useSelector(state => state.currentPage);
	const SHOES_PER_PAGE = 10;
	const data = useSelector(state => state.shoes);
	const [shownCards, setShownCards] = useState('');
	// const [shoes, setShoes] = useState(20);
	// const indexLastShoes = currentPage * shoes;
	// const indexFirstShoes = indexLastShoes - shoes;
	// console.log('Soy data', data);
	// const currentShoes = data?.slice(indexFirstShoes, indexLastShoes);

	// console.log('soy data', currentShoes);

	useEffect(() => {
		if (filters && filters.length > 0) {
			if (filters.includes('brands')) {
				setShownCards(
					data.filter(elem => elem['brand'].includes(filterBrands))
				);
			}
			if (filters.includes('sizes')) {
				setShownCards(
					data.filter(elem =>
						elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)
					)
				);
			}
		} else {
			setShownCards(data);
		}
	}, [data, filters, filterBrands, page]);

	return (
		<>
			<Paging shoesPerPage={SHOES_PER_PAGE} shoes={shownCards} />
			<br />
			<br />
			<div className={s.cards}>
				{shownCards &&
					shownCards.length > 0 &&
					shownCards
						.slice(page * SHOES_PER_PAGE, SHOES_PER_PAGE * (1 + page))
						.map(shoe => (
							<Link className={s.links}>
								<Card
									shoeName={shoe.shoeName}
									brand={shoe.brand}
									retailPrice={shoe.retailPrice}
									thumbnail={shoe.thumbnail}
									releaseDate={shoe.releaseDate}
								/>
							</Link>
						))}
			</div>
		</>
	);
}

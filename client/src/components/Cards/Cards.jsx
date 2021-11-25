import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paging from '../Paging/Paging.jsx';
import s from './Cards.module.css';

export default function Cards() {
	const filters = useSelector(state => state.filters); //brands
	const filterBrands = useSelector(state => state.filterBrands);
	const data = useSelector(state => state.shoes);
	const [shownCards, setShownCards] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [shoes, setShoes] = useState(20);
	const indexLastShoes = currentPage * shoes;
	const indexFirstShoes = indexLastShoes - shoes;
	console.log('Soy data', data);
	const currentShoes = data?.slice(indexFirstShoes, indexLastShoes);

	console.log('soy data', currentShoes);

	useEffect(() => {
		if (filters && filters.length > 0) {
			setShownCards(data.filter(elem => elem['brand'].includes(filterBrands)));
		} else {
			setShownCards(data);
		}
	}, [data, filters, filterBrands]);

	function page(pageNumber) {
		setCurrentPage(pageNumber);
	}
	return (
		<>
			<Paging allShoes={data?.length} shoesForPage={shoes} page={page} />
			<br />
			<br />
			<div className={s.cards}>
				{shownCards &&
					shownCards.length > 0 &&
					shownCards.map(shoe => (
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

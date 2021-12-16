import React from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import FilterBrand from '../FilterBrand/FilterBrand.jsx';
import FilterSize from '../FilterSize/FilterSize.jsx';
import FilterPrice from '../FilterPrice/FilterPrice.jsx';
//import FilterColor from '../FilterColor/FilterColor.jsx';
import styles from './Header.module.css';

export default function Header({ data }) {
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.btns}`}>
			<FilterBrand data={data} />
			<FilterSize data={data} />
			</div>
		
			<div className={`styles.card`}>
			<Searchbar />
			</div>
			<FilterPrice data={data} />
			
			
			{/* <FilterColor data={data} /> */}
			
		</div>
	);
}
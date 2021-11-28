import React from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import FilterBrand from '../FilterBrand/FilterBrand.jsx';
import FilterSize from '../FilterSize/FilterSize.jsx';
import FilterPrice from '../FilterPrice/FilterPrice.jsx';
import FilterColor from '../FilterColor/FilterColor.jsx';
<<<<<<< HEAD
import Navbar from '../Navbar/Navbar.jsx';
=======
import styles from './Header.module.css';
>>>>>>> 03dd0f498a5710aebd717a258219a698962eded4

export default function Header({ data }) {
	return (
<<<<<<< HEAD
		<>
			<header
				style={{
					zIndex: 0,
					borderBottom: '1px solid rgba(0,0,0,0.05)',
					padding: '20px',
					paddingTop: 0,
					paddingBottom: 0,
					display: 'flex',
					backgroundColor: 'white',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<div>
					<ul
						style={{
							cursor: 'pointer',
							listStyle: 'none',
							display: 'flex',
						}}>
						<Searchbar />
						<FilterBrand data={data} />
						<FilterSize data={data} />
						<FilterColor colors={data} />
						<FilterPrice data={data} />
					</ul>
				</div>
			</header>
		</>
=======
		<div className={`${styles.container}`}>
			<FilterBrand data={data} />
			<FilterSize data={data} />
			<Searchbar />
			{/* <FilterColor data={data} /> */}
			<FilterPrice data={data} />
		</div>
>>>>>>> 03dd0f498a5710aebd717a258219a698962eded4
	);
}

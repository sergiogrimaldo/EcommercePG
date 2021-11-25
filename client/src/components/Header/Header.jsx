import React from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import FilterBrand from '../FilterBrand/FilterBrand.jsx';
import FilterSize from '../FilterSize/FilterSize.jsx';
import FilterPrice from '../FilterPrice/FilterPrice.jsx';
import FilterColor from '../FilterColor/FilterColor.jsx';

export default function Header({ data, onFilter, onSize }) {
	return (
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
						<FilterBrand data={data} onFilter={onFilter} />
						<FilterSize data={data} onSize={onSize} />
						{/* <FilterColor data={data} /> */}
						<FilterPrice data={data} />
					</ul>
				</div>
			</header>
		</>
	);
}

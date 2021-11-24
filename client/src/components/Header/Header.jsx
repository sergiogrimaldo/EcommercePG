import Searchbar from '../Searchbar/Searchbar.jsx';
import FilterBrand from '../FilterBrand/FilterBrand.jsx';
import FilterColor from '../FilterColor/FilterColor.jsx';

export default function Header({ data }) {
	return (
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
			<h1>ZapAPP</h1>
			<div>
				<ul
					style={{
						cursor: 'pointer',
						listStyle: 'none',
						display: 'flex',
					}}>
					<Searchbar />
					<FilterBrand data={data} />
          <FilterColor colors={data} />
					<li className='selected' style={{ margin: 10 }}>
						Home
					</li>
					<li style={{ margin: 10 }}> Login </li>
					<li style={{ margin: 10 }}> Carrito </li>
				</ul>
			</div>
		</header>
	);
}

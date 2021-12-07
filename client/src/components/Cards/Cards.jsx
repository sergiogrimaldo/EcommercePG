import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'react-router-dom';
import { setPage } from '../../redux/actions';
import Card from '../Card/Card';
import Paging from '../Paging/Paging.jsx';
import s from './Cards.module.css';

export default function Cards({ data }) {
	const dispach = useDispatch();
	const filters = useSelector(state => state.filters); //brands
	const filterBrands = useSelector(state => state.filterBrands);
	const filterSizes = useSelector(state => state.filterSizes);
	const filterPrice = useSelector(state => state.filterPrice);
	const page = useSelector(state => state.currentPage);
	const shoes = useSelector(state => state.shoes);
	const textToSearch = useSelector(state => state.textToSearch)
	const [shownCards, setShownCards] = useState([]);
	const SHOES_PER_PAGE = 9;
	const [loading,setLoading] = useState(false);
	const [auxShow,setAuxShow] = useState([]);


    // console.log(data);
    // if (page === 0) {
    //     dispach(setPage(1));
    // }
    

	const countriesToShow = shoes && shoes.length > 1 ? shoes : data;
	const total = countriesToShow.length;
	const maxPage = Math.floor(total / 9) + 1;

	function nextPage() {
		dispach(setPage(page < maxPage ? page + 1 : page));
	}
	function previousPage() {
		dispach(setPage(page > 0 ? page - 1 : page));
	}
	function buttonLeft() {
		return page === 1 || page === 0 ? (
			' '
		) : (
			<button className='pageButton' onClick={previousPage}>
				{'<<'}
			</button>
		);
	}
	function buttonRight() {
		return page === maxPage ? (
			' '
		) : (
			<button className='pageButton' onClick={nextPage}>
				{'>>'}
			</button>
		);
	}

	const currentCards = shownCards.slice(page === 1 ? 0 : page * 10 - 11, page * 10 - 1);


	useEffect(() => {
		if (filters && filters.length > 0) {
			let aux = data

			setShownCards(aux)
			if (filters.includes('brands') && !filters.includes('sizes') && !filters.includes('price')) {
				
				textToSearch ?
				setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands)).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
				: setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands)));
			}
			if (filters.includes('brands') && filters.includes('sizes') && !filters.includes('price')) {

				textToSearch ?
				setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands) && elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes))).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase()))
				:
				setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands) && elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)));
			}
			if (filters.includes('brands') && !filters.includes('sizes') && filters.includes('price')) {
				
				textToSearch ?
				setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands) && elem.retailPrice <= filterPrice).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
				: setShownCards(data.filter(elem => elem.brand.name.includes(filterBrands) && elem.retailPrice <= filterPrice));


			}
			if (filters.includes('brands') && filters.includes('sizes') && filters.includes('price')) {
				
				textToSearch ?
				setShownCards(data.filter(elem => elem.brand.includes(filterBrands) && elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) && elem.retailPrice <= filterPrice)).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase()))
				: setShownCards(data.filter(elem => elem.brand.includes(filterBrands) && elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) && elem.retailPrice <= filterPrice))
				
			}
			if (!filters.includes('brands') && filters.includes('sizes') && !filters.includes('price')) {
				
				textToSearch ?
				setShownCards(data.filter(elem => elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
				: setShownCards(data.filter(elem => elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)));
			}
			if (!filters.includes('brands') && filters.includes('sizes') && filters.includes('price')) {

				textToSearch ? 
				setShownCards(data.filter(elem => elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) && elem.retailPrice <= filterPrice).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
				: setShownCards(data.filter(elem => elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) && elem.retailPrice <= filterPrice));  

//				setShownCards(data.filter(elem => elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) && elem.retailPrice <= filterPrice));
			}
			if (!filters.includes('brands') && !filters.includes('sizes') && filters.includes('price')) {
				textToSearch ? 
				setShownCards(data.filter(elem => elem.retailPrice <= filterPrice).filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
				: setShownCards(data.filter(elem => elem.retailPrice <= filterPrice))  
			}
		} else {
			if (textToSearch){
				setShownCards(data.filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
			} else {
				setShownCards(data)
			}
		}
	}, [data,JSON.stringify(shoes), filters, filterBrands, filterSizes, filterPrice, page,textToSearch]);

	// useEffect( () => {
	// 	setShownCards(shownCards.filter(elem => elem.shoeName.toLowerCase().includes(textToSearch.toLowerCase())))
	// },[textToSearch])

	if (window.screen.width > 1300) {
		return (
			<>
				<Paging shoesPerPage={SHOES_PER_PAGE} shoes={shownCards && shownCards} />
				<br />
				<br />
				<div className={s.cards}>{shownCards && shownCards.length > 0 && shownCards.slice(page * SHOES_PER_PAGE, SHOES_PER_PAGE * (1 + page)).map((shoe, i) => <Card key={i} shoe={shoe} />)}</div>
			</>
		);
	} else {
		return (
			<div>
				<div className='buttons'>
					{buttonLeft()} <strong className='page'> {page} </strong> {buttonRight()}
				</div>

				{currentCards.map((c, i) => {
					return (
						<div key={i}>
							<Card key={i} shoe={c} />
						</div>
					);
				})}
			</div>
		);
	}
}

import React,{useState} from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Paging from '../Paging/Paging.jsx';
import s from './Cards.module.css';

export default function Cards ({data}) {
    const [currentPage,setCurrentPage] = useState(1);
	const [shoes,setShoes] = useState(20);
	const indexLastShoes = currentPage * shoes;
	const indexFirstShoes = indexLastShoes - shoes;
    console.log('Soy data',data)
	const currentShoes = data?.slice(indexFirstShoes,indexLastShoes);

    console.log('soy data',currentShoes)

	function page(pageNumber){
		setCurrentPage(pageNumber)
	}
    return (
        <> 
            <Paging 
                allShoes={data?.length}
                shoesForPage={shoes}
                page={page}
			/>
            <br/>
            <br/>
            <div className={s.cards}>
                { currentShoes && currentShoes.length > 0 && currentShoes.map((shoe) => ( 
                    <Link className={s.links}>
                    <Card 
                    shoeName = {shoe.shoeName} 
                    brand = {shoe.brand}
                    retailPrice = {shoe.retailPrice} 
                    thumbnail = {shoe.thumbnail} 
                    releaseDate = {shoe.releaseDate}    
                    />
                    </Link>
                    )) 
                }
            </div>
        </>
    )
}
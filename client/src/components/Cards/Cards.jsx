import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import s from './Cards.module.css';

export default function Cards ({data}) {
    return (
        <div className={s.cards}>
        { data && data.length > 0 && data.map((shoe) => ( 
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
    )
}

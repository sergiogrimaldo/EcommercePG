import React from "react";
//import { Link } from "react-router-dom";
import Card from "../Card/Card";
import s from './Cards.module.css';

export default function Cards ({data}) {
   // console.log(data)
    return (
        <div className={s.container__card}>
        { data && data.length > 0 && data.map((shoe, i) => ( 
            <Card 
            key={i}
            shoeName = {shoe.shoeName} 
            brand = {shoe.brand}
            description = {shoe.description}
            retailPrice = {shoe.retailPrice} 
            thumbnail = {shoe.thumbnail} 
            releaseDate = {shoe.releaseDate}
            silhoutte = {shoe.silhoutte}
            _id = {shoe._id}
            />
            )) 
        }
        </div>
    )
}

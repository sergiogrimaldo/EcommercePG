import React from "react";
import s from './Card.module.css'

export default function Card ({shoeName, brand, retailPrice, thumbnail, releaseDate}) {
    return (
        <div className={s.card}>
            <img src={thumbnail} className={s.img}/>
            <h1>{shoeName}</h1>
            <h4>{brand}</h4>
            <h6>{releaseDate}</h6>
            <h6>{retailPrice}</h6>
        </div>
    )
}
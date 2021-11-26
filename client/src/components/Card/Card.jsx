import React from "react";
import s from './Card.module.css'
import { addToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function Card ({shoeName, brand, retailPrice, thumbnail, releaseDate}) {
    const dispatch = useDispatch()
    return (
        <div className={s.card}>
            <img src={thumbnail} className={s.img}/>
            <h1>{shoeName}</h1>
            <h4>{brand}</h4>
            <h6>{releaseDate}</h6>
            <h6>{retailPrice}</h6>
            <button onClick={() => dispatch(addToCart({image: thumbnail, name:shoeName, price:retailPrice, cuantity:1 }))}>Add to Cart!</button>
        </div>
    )
}
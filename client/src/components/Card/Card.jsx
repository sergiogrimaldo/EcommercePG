import React from "react";


export default function Card ({shoeName, brand, retailPrice, thumbnail, releaseDate}) {
    
    return (
        <div>
            <img src={thumbnail}/>
            <h1>{shoeName}</h1>
            <h4>{brand}</h4>
            <h6>{releaseDate}</h6>
            <h6>{retailPrice}</h6>
        </div>
    )
}
import React from "react";
//import { Link } from "react-router-dom";
import Card from "../Card/Card";
//import { useSelector } from "react-redux";

import s from './Cards.module.css';
/* import { splitColorsAllNamesToGeter, findGrid } from "../FilterColor/colors.js"; */

export default function Cards ({data}) {
   
    /* if (data) {
        let threeColorGrid = splitColorsAllNamesToGeter(data);
        console.log(threeColorGrid);
    } */
    
    //console.log(data)
    return (
        <div className={s.container__card}>
        
        { data && data.length > 0 && data.map((shoe, i) => ( 
            <Card 
            key={i}
            shoe={shoe}
            />
            )) 
        }
        </div>
    )
    
}

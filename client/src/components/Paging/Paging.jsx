import React from 'react';
import style from './Paging.module.css';

function Paging(props) {
    const pageNumber = [];

    for(let i=1; i<= Math.ceil(props.allShoes/props.shoesForPage);i++){
        pageNumber.push(i)
    }

    return (
        <nav>
            <div className={style.containerPage}>
                {
                    pageNumber && pageNumber.map(e => {
                        return (
                            <div key={e}>
                                <button className={style.containerBTN} onClick={()=> props.page(e)}>{e}</button>
                            </div>
                            
                        )
                    }) 
                }
                
            </div>
        </nav>
    )
}

export default Paging

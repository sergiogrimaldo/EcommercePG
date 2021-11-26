import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../redux/actions';
import style from './Paging.module.css';

function Paging({shoes, shoesPerPage}) {

    shoes = shoes || [];

    const page = useSelector(state => state.currentPage);
    
    const dispach = useDispatch();

    const pageNumber = [];

    for(let i=1; i<= Math.ceil(shoes.length/shoesPerPage);i++){
        pageNumber.push(i)
    }
    
    return (
        <nav>
            <div className={style.containerPage}>
                {
                    pageNumber && pageNumber.map(e => {
                        return (
                            <div key={e}>
                                <button className={style.containerBTN} onClick={()=> dispach(setPage(e-1))}>{e}</button>
                            </div>
                            
                        )
                    }) 
                }
                
            </div>
        </nav>
    )
}

export default Paging

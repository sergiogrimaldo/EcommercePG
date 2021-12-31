import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import style from "./Paging.module.css";

function Paging({ shoes, shoesPerPage }) {
    shoes = shoes || [];

    const page = useSelector((state) => state.currentPage);

    const dispach = useDispatch();

    //const pageNumber = ["<<"];
    const pageNumber  = []

    for (let i = 1; i <= Math.ceil(shoes.length / shoesPerPage); i++) {
        pageNumber.push(i);
    }
    //pageNumber.push([">>"]);

    const handleButton = function changePage(e) {
        //console.log(e);
        if (e == "<<") {
            if (page > 0) {
                dispach(setPage(page - 1));
            }
        } else if (e == ">>") {
            if (page < Math.ceil(shoes.length / shoesPerPage) - 1) {
                dispach(setPage(page + 1));
            }
        } else {
            dispach(setPage(e - 1));
        }
    };
//console.log(window.screen.width)
return (
    <nav className={style.nav}>
        <div className={style.containerPage}>
       {pageNumber.length > 1 && <button key={"button" + '<<'} value={'<<'} className={`${style.containerBTN }`} onClick={() => handleButton('<<')}>
                                {`<<`}
                            </button>}
            {pageNumber &&
               pageNumber.slice((5*Math.floor(page/5)),(5*Math.floor(page/5))+5).map((e) => {
                    return (
                        <div key={e}>
                            <button key={"button" + e} className={`${style.containerBTN }`} style={e-1== page? {backgroundColor:'white', color: 'black'} : null} onClick={() => handleButton(e)}>
                                {e}
                            </button>
                        </div>
                    );
                })}
        {pageNumber.length > 1 && <button key={"button" + '>>'} value={'>>'} className={`${style.containerBTN }`} onClick={() => handleButton('>>')}>
                                {`>>`}
                            </button>}
        </div>
    </nav>
);
}


export default Paging;

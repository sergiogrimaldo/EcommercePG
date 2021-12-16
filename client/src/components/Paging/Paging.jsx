import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../redux/actions";
import style from "./Paging.module.css";

function Paging({ shoes, shoesPerPage }) {
    shoes = shoes || [];

    const page = useSelector((state) => state.currentPage);
    const [pageNumberLimit, setPageNumberLimit] = useState(5);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(1);


    const dispach = useDispatch();

    //const pageNumber = ["<<"];
    let pageNumber = [];

    
    
    for (let i = 1; i <= Math.ceil(shoes.length / shoesPerPage); i++) {
        pageNumber.push(i);
    }
    //pageNumber.push([">>"]);
    let pageN = pageNumber.pop();


    const handleClick = function(e){
        dispach(setPage(e));
    }

    const handleButtonNext = function(){
        dispach(setPage(page + 1));
        if(page + 1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }

    }

    const handleButtonPrev = function (){
        dispach(setPage(page - 1));
        if((page - 1) % pageNumberLimit == 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
    }
//console.log(window.screen.width)
    const renderPage = pageNumber &&
    pageNumber.map((e) => {
        if(e < maxPageLimit + 1 && e > minPageLimit - 1){
            return (
                <div key={e}>
                    <button key={"button" + e} className={page == e ? style.active:style.containerBTN} onClick={() => handleClick(e)}>
                        { e }
                    </button>
                </div>
            );

        }
    })


    return (
        <nav className={style.nav}>
            <div className={style.containerPage}>
                <button
                className={style.containerBTN}
                onClick={handleButtonPrev}
                disabled={page == pageNumber[0]?true:false}
                >Prev</button>
                {renderPage}
                <button
                className={style.containerBTN}
                onClick={handleButtonNext}
                disabled={page == pageNumber[pageNumber.length - 1]?true:false}
                >Next</button>           
            </div>
        </nav>
    );
}

export default Paging;

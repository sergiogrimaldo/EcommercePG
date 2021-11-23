import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Paging from '../../components/Paging/Paging.jsx'
 
function Home() {
    let stateShoes = useSelector( state => state.shoes)

    const [currentPage, setCurrentPage] = useState(1);
    const [shoes, setShoes] = useState(10);
    const indexLastShoes = currentPage * shoes;
    const indexFirstShoes = indexLastShoes - shoes;
    const currentShoes = stateShoes.slice(indexFirstShoes,indexLastShoes)

    function page (pageNumber){
        setCurrentPage(pageNumber)
    }

    return (
        <div>
            <div>
                Hola soy el componente Home
                <Paging
                 shoesForPage={shoes}
                 allShoes={stateShoes.length}
                 page={page}
                />
                <div>
               
                </div>
                
            </div>
        </div>
    )
}

export default Home
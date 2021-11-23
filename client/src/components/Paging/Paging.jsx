import React from 'react'

function Paging(props) {
    const pageNumber = [];
    for (let i = 1; i<= Math.ceil(props.allShoes/props.shoesForPage); i++){
        pageNumber.push(i)
    }
    return (
        <div>
            {
                pageNumber && pageNumber.map(e => {
                    return (
                        <div key={e}>
                            <button onClick={() => props.page(e)}>{e}</button>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Paging

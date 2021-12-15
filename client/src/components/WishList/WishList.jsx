import axios from 'axios';
import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {getWishList, deleteFromWishList} from '../../redux/actions'
import './WhisList.css';
export default function WishList(){

    const user = useSelector(state => state.user)
    const wishList = useSelector(state => state.wishlist)
	//const [wishList,setWishList] = useState([])
    const dispatch = useDispatch()

	async function handleDeleteClick(id){
		// console.log(user,id)
		//await axios.post(`/users/deleteWishlist`, {email:user.email, shoeId:id})
		//let lista = await axios.post(`/users/getWishlist`, {email:'admin@admin.com'})
		await dispatch(deleteFromWishList({email:user.email, shoeId:id}))
        await dispatch(getWishList({email:user.email}))
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		//let lista = await axios.post(`/users/getWishlist`, {email:'admin@admin.com'})
		// console.log(lista)
        await dispatch(getWishList({email:user.email}))
	}, [])

    return(
        <div style={{height:'87vh'}}>
            
        <h1 className='div1'>WishList</h1>
        {/*  { console.log(wishList)} */} 
        { wishList && JSON.stringify(wishList).length > 2 && wishList.shoes.map((shoe) => <div style={{display:'flex', alignItems:'center'}}>
            <img className='divImg' src={shoe.thumbnail} width='250px'/>
            <div className='divShoe'>{shoe.shoeName}</div>
            <div className='divButton'>
                <button id={shoe.id} onClick={() => handleDeleteClick(shoe.id)}>❌</button> 
            </div>
            </div> )}

</div>
    )
}
import axios from 'axios';
import { useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {getWishList, deleteFromWishList} from '../../redux/actions'
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

	useEffect(async () => {
		//let lista = await axios.post(`/users/getWishlist`, {email:'admin@admin.com'})
		// console.log(lista)
        await dispatch(getWishList({email:user.email}))
	}, [])

    return(
        <div style={{height:'87vh'}}>
            
        <h1>WishList</h1>
         { console.log(wishList)} 
        { wishList && JSON.stringify(wishList).length > 2 && wishList.shoes.map((shoe) => <div style={{display:'flex', alignItems:'center'}}>
            <img src={shoe.thumbnail} width='250px'/>
            <div>{shoe.shoeName}</div>
            <div>
                <button id={shoe.id} onClick={() => handleDeleteClick(shoe.id)}>❌</button> 
            </div>
            </div> )}

</div>
    )
}
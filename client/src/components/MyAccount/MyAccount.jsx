import { useDispatch, useSelector } from 'react-redux';
import {getOrderDetails, getOrders, logIn} from '../../redux/actions'
import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function MyAccount(){
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    const user = useSelector(state => state.user)
    const [stateFilter,setStateFilter] = useState('All')
    const [localOrders, setLocalOrders] = useState('')

    // useEffect( async () => {
    //    const response = await dispatch(getOrders({email:user?.email}))
       
    //    if (typeof response.payload == 'object' && response.payload.length > 0){
    //     response.payload = 
    //         stateFilter != 'All' ? 
    //             response.payload.filter(order => order.status == stateFilter) 
    //             : response.payload
        
    //     }
    //     setLocalOrders(response.payload)
        
    // },[user,stateFilter])

    useEffect( () =>{ dispatch(getOrders({email:user?.email}))},[])


    function toDate(string){
        const date = new Date(string)
        const stringa = ''+date
        return stringa.split(' ').slice(0,5).join(' ')
    }

    return (
        <div style={{height: '100%',}}>
        <div style={{marginTop:15,height:'60vh',display:'grid', justifyContent:'center', alignItems:'center', justifyItems:'center'}}>
            <h1>My account</h1>
            <br/>
            <h2>{user?.name}</h2>
            <div style={{display:'flex'}}><h3>Email: <input defaultValue={user?.email} placeholder={'Your email adress'}/></h3> <h3>Adress: <input defaultValue={user?.adress} placeholder={'Your shipping adress'}/></h3></div>
            <br/>

            <div style={{display:'flex', width:'100vw', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> <h2>My Orders</h2> 
            <div style={{display:'flex'}}><label for='stateFilter'> View by order status: </label> 
            <select id='stateFilter' onChange={(e) => setStateFilter(e.target.value)}>
            {/* ('Pending', 'In Progress', 'Cancelled', 'Completed') */}
                <option select value='All'> All</option>
                <option select value='Pending'>Pending</option>
                <option select value='In Progress'> In Progress</option>
                <option select value='Cancelled'> Cancelled</option>
                <option select value='Completed'> Completed</option>
            </select>
            </div>
            </div>

            <ul style={{marginTop:25, listStyle:'none'}}>
            <li>
                        <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr', width:'100%'}}> 
                        <div style={{display:'flex',justifyContent:'center'}}> Order </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Product </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Status </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Created </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Last Update </div>
                        </div>
                   </li>

                

                { orders && orders.length ? orders.map((order,i) => 
               <li style={{marginTop:10}}>
                   
                   <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr', columnGap:5}}>

                    <p><Link to={`./orders/${order.id}`} 
                       style={{textDecoration: 'none'}}>
                       #{order.id.split('-')[0]}</Link></p>
                       <p style={{display:'flex',justifyContent:'center'}}>{order.shoes.length == 1 ? order.shoes[0].shoeName : order.shoes[0].shoeName+'...' }</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{order.status}</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{toDate(order.createdAt)}</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{toDate(order.updatedAt)}</p>
                   </div>
                </li>) 
                : <div style={{marginTop:10, display:'flex',justifyContent:'center'}}>You dont have any  { stateFilter != 'All' ? `${stateFilter.toLowerCase()}` : null} orders</div>
            }
            </ul>

        </div>
        </div>
    )
}
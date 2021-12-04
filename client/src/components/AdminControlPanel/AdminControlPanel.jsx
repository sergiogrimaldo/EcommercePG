import { useDispatch, useSelector } from 'react-redux';
import {getOrderDetails, getOrders, setOrderStatus, deleteUser, changeRol, getUsers} from '../../redux/actions'
import {useEffect, useState} from 'react'
import jwt from 'jsonwebtoken';
import { Link } from 'react-router-dom';

export default function AdminControlPanel(){
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.allUsers)
    const [stateFilter,setStateFilter] = useState('All')
    const [localOrders, setLocalOrders] = useState('')
    const [allUsers, setAllUsers] = useState('')
    const [allUsersFilter,setAllUsersFilter] = useState('All')
    const [button, setButton] = useState(false)
    

    useEffect( () =>{ dispatch(getOrders({email:user?.email}))},[])

    useEffect( async () => {
       let response = [...([].concat(orders))]
       
       if (typeof response == 'object' && response.length > 0){
        response = 
            stateFilter != 'All' ? 
                response.filter(order => order.status == stateFilter) 
                : response
        
        }
        setLocalOrders(response)
        
    },[user,orders])

    useEffect( async () => {
        //const response = await dispatch(getOrders({email:user?.email}))
         setAllUsers(users)
        
         
     },[users, button])


    function toDate(string){
        const date = new Date(string)
        const parseDate = ''+date
        const formattedDate = parseDate.split(' ').slice(0,5).join(' ')
        return formattedDate
    }


    const handleOrderStatusChange = function(e){
        dispatch(setOrderStatus({email:user?.email ,id:e.target.id,status:e.target.value}))
        console.log({email:user?.email ,id:e.target.id,status:e.target.value},'a')
        console.log('accion cambiada')
    }

    const handleClick = function(e){
        dispatch(changeRol({id: e.target.id, email: user.email}));
        
        dispatch(getUsers());
        setButton(!button);

    }



    return (
        <div style={{height: '100%',}}>
        <div style={{marginTop:15,height:'60vh',display:'grid', justifyContent:'center', alignItems:'center', justifyItems:'center'}}>
            <h1>Admin Control Panel</h1>
            <br/>
            <h2>My account</h2>
            <h3>{user?.name}</h3>
            <div style={{display:'flex'}}><h3>Email: <input defaultValue={user?.email} placeholder={'Your email adress'}/></h3> <h3>Adress: <input defaultValue={user?.adress} placeholder={'Your shipping adress'}/></h3></div>
            <br/>

            <div style={{display:'flex', width:'100vw', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> <h2>User List</h2> 
            <div style={{display:'flex'}}><label for='stateFilter'> order By: </label> 
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
                        <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr', width:'100%'}}> 
                        <div style={{display:'flex',justifyContent:'center'}}> # </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Rol </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Name </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Email </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Activated? </div>
                        
                        <div style={{display:'flex',justifyContent:'center'}}> Created </div>
                
                        </div>
                   </li>
            { 
                console.log(localOrders)}
                {/* function (a, b) {
                if (a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0; */}
                { allUsers && allUsers.length && allUsers.sort((a,b) => b.createdAt > a.createdAt? -1 : 1).map((users,i) => 
               <li id={users.id} style={{marginTop:10}}>
                   <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr 1fr 1fr', columnGap:5}}>
                       <p style={{display:'flex',justifyContent:'center'}}>{i+1}</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{users.roleId === 2 ? 'admin' : 'user'}</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{users.name}</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{users.email}</p>
                       <p style={{display:'flex',justifyContent:'center', minWidth:'3ch'}}>{users.activated ? 'yes' : 'no '}</p>
                       <p style={{display:'flex',justifyContent:'center', minWidth:'3ch'}}>{toDate(users.createdAt)}</p>
                       {user.email === users.email ? null : 
                       <div style={{display:'flex', justifyContent:'center', gap:10}}>
                        <button 
                        id={(users.id)} 
                        style={{cursor:'pointer',border:'1px solid black', borderRadius:5,backgroundColor:'white', width:'40%'}} 
                        onClick={(e) => dispatch(deleteUser(e.target.id))}>Delete</button>
                        <button
                        style={{cursor:'pointer',border:'1px solid black', borderRadius:5,backgroundColor:'white', width:'40%'}}
                        id={(users.id)}
                        onClick={(e) => handleClick(e)}
                        >Change role</button>
                        </div>}
                   </div>
                </li>
                ) 
            }
            </ul>


{/* --------------------- ALL ORDERS ---------------------------- */}
            <div style={{display:'flex', width:'100vw', justifyContent:'center', flexDirection:'column', alignItems:'center'}}> <h2>All orders</h2> 
            <div style={{display:'flex'}}>
                <label for='stateFilter'> View by order status: </label> 
            <select id='stateFilter' onChange={(e) => setStateFilter(e.target.value)}>
            {/* ('Pending', 'In Progress', 'Cancelled', 'Completed') */}
                <option select  value='All'> All</option>
                <option select value='Pending'>Pending</option>
                <option select value='In Progress'> In Progress</option>
                <option select value='Cancelled'> Cancelled</option>
                <option select value='Completed'> Completed</option>
                
            </select>
            </div>
            </div>

            <ul style={{marginTop:25, listStyle:'none'}}>
            <li>
                        <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr ', width:'100%'}}> 
                        <div style={{display:'flex',justifyContent:'center'}}> Order </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Product </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Status </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Created </div>
                        <div style={{display:'flex',justifyContent:'center'}}> Last Update </div>
                        </div>
                   </li>
            { 
                console.log(localOrders)}
{/* AGREGAR QUE LAS ORDENES MOSTRADAS SEA SEGUN LA FECHA DE CREACION DE LAS ORDENES */}

                {typeof localOrders == 'object' && JSON.stringify(localOrders.length) > 2 ? localOrders.map((order,i) => 
               <li style={{marginTop:10}} key={order.id}>
                   
                   <div style={{display:'grid', gridTemplateColumns:'0.5fr 1.5fr 1fr 1fr 1fr ', columnGap:5}}>
                       <p style={{display:'flex',justifyContent:'center'}}>
                       <Link to={`./orders/${order.id}`} 
                       style={{textDecoration: 'none'}}>
                       #{order.id.split('-')[0]}</Link></p>
                       <p style={{display:'flex',justifyContent:'center'}}>{order.shoes.length == 1 ? order.shoes[0].shoeName : order.shoes[0].shoeName+'...' }</p>
                       <p style={{display:'flex',justifyContent:'center'}}>{
                            <select id={order.id} onChange={(e) => handleOrderStatusChange(e)}>
                            {/* ('Pending', 'In Progress', 'Cancelled', 'Completed') */}
                                <option selected={order.status === 'In Progress'} value='In Progress'> In Progress</option>
                                <option selected={order.status === 'Pending'}  value='Pending'>Pending</option>
                                <option selected={order.status === 'Cancelled'} value='Cancelled'> Cancelled</option>
                                <option selected={order.status === 'Completed'} value='Completed'> Completed</option>
                            </select>


                       }</p>
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
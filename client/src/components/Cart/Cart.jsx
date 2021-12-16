import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart,update, openModal, changeItemCuantity } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import style from "./cart.module.css";

export default function Cart() {
    const dispatch = useDispatch();
    const history = useHistory()
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);

    //useEffect(() => setcart(cart), JSON.stringify(cart))

    function handleChange(e, item){
    e.preventDefault()
    dispatch(changeItemCuantity({name:item.name,cuantity:Number(e.target.value)}))
    //setcart(cart)
    dispatch(update())
    }

    let nombreItems = [];
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez

    cart?.forEach((item) => {
        if (!nombreItems.includes(item.name)) {
            nombreItems.push(item.name);
        }
    });
    let total = 0;
    cart?.forEach((item) => {
        total = total + (item.price*item.cuantity);
    });

    function handleOpenCheckOut() {
        if (user && user.email?.length > 0) {
            history.push('/checkout')
            //dispatch(openModal("checkout"));
        } else {
            dispatch(openModal("login"));
        }
    }
    const deleteShoeFromCart = (e) => {
    
        let result = window.confirm('Are you sure you want to delete the shoe?')
        if(result){
            dispatch(deleteFromCart(e))
        }
    }
    return (
        <>
            <div className={style.card} style={{ height: "75vh", overflowX: "hidden", position: "relative" }}>
                <div
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        justifyItems: "center",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
                        height: "100%",
                        width: "100%",
                        overflowY: "auto",
                        overflowX: "hidden",
                    }}
                >
                    <div
                        style={{
                            gridColumn: 2,
                            display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h2>Name</h2>
                    </div>
                    <div
                        style={{
                            gridColumn: 3,
                            display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h2>Cuantity</h2>
                    </div>
                    <div
                        style={{
                            gridColumn: 4,
                            display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h2>Size</h2>
                    </div>
                    <div
                        style={{
                            gridColumn: 5,
                            display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h2>Price per Unit</h2>
                    </div>
                    <div
                        style={{
                            gridColumn: 6,
                            display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <h2>Subtotal</h2>
                    </div>

                    {cart && JSON.stringify(cart).length > 2 ? (
                        cart.map((item) =>
                            nombreItems.includes(item.name) ? (
                                <>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <img className={style.img} style={{ height: 150 }} alt="" src={item.image} />
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        {/* TEMPORARY DENSE-LOGIC FIX TO CART */}
                                        {/* <h1>{nombreItems.splice(nombreItems.indexOf(item.name), 1)}</h1> */}
                                        <h1>{item.name}</h1>
                                        {/* FIX ABOVE */}
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <h2><input type="number" name="cuantity" step="1" min='1' max={item.stock} defaultValue={item.cuantity} onChange={(e) => handleChange(e,item)}/></h2>
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <h2>{item.size}</h2>
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <h2>{item.price}</h2>
                                    </div>
                                    <div
                                        style={{
                                            position: "relative",
                                            display: "flex",
                                            alignContent: "center",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <h3>{item.cuantity * item.price}</h3>
                                        <button
                                            value={item}
                                            
                                            className={`${style.btn}`}
                                            onClick={(e) =>deleteShoeFromCart({name:item.name,size:item.size})}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            ) : null
                        )
                    ) : (
                        <div style={{ gridRow: "1/7", gridColumn: "1/7" }}>
                            <h1 style={{ margin: 0 }}>No items in cart!</h1>{" "}
                            <Link className={style.Link} to="/catalogue">
                                <h3 style={{ margin: 0, textAlign: "center", color: "grey" }}>Go check our store!</h3>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className={style.card}
                style={{
                    display: JSON.stringify(cart).length > 2 ? "flex" : "none",
                    position: "absolute",
                    bottom: 0,
                    height: "10%",
                    width: "100%",
                    alignItems: "center",
                    borderTop: "1px solid black",
                    justifyContent: "space-around",
                }}
            >
                <h1>Total: US$ {total} </h1>
                {/* <Link to='/checkout'> */}
                    <button
                        style={{ padding: 15, border: "none", backgroundColor: "black", color: "white", borderRadius: 5,cursor:"pointer" }}

                        onClick={() => handleOpenCheckOut()}
                    >
                        <h1>Checkout</h1>
                    </button>
                {/* </Link> */}
            </div>
        </>
    );
}

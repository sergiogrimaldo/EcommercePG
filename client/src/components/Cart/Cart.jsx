import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, openModal } from "../../redux/actions";
import { Link } from "react-router-dom";
import style from "./cart.module.css";




export default function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    let nombreItems = [];
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez

    cart?.forEach((item) => {
        if (!nombreItems.includes(item.name)) {
            nombreItems.push(item.name);
        }
    });
    let total = 0;
    cart?.forEach((item) => {
        total = total + item.price;
    });

    function handleOpenCheckOut() {
        if (user && JSON.stringify(user).length > 2) {
            dispatch(openModal("checkout"));
        } else {
            dispatch(openModal("login"));
        }
    }
    return (
        <>
            <div style={{ height: "75vh", overflowX: "hidden", position: "relative" }}>
                <div
                    style={{
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        justifyItems: "center",
                        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
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
                        <h2>Price per Unit</h2>
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
                        <h2>Subtotal</h2>
                    </div>

                    {cart && JSON.stringify(cart).length > 2 ? (
                        cart.map((item) =>
                            nombreItems.includes(item.name) ? (
                                <>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <img style={{ height: 150 }} alt="" src={item.image} />
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        {/* TEMPORARY DENSE-LOGIC FIX TO CART */}
                                        <h1>{nombreItems.splice(nombreItems.indexOf(item.name), 1)}</h1>
                                        {/* FIX ABOVE */}
                                    </div>
                                    <div style={{ display: "flex", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                        <h2>{item.cuantity}</h2>
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
                                            value={item.name}
                                            style={{ position: "absolute", left: "50px" }}
                                            onClick={(e) => dispatch(deleteFromCart(e.target.value))}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            ) : null
                        )
                    ) : (
                        <div style={{ gridRow: "1/6", gridColumn: "1/6" }}>
                            <h1 style={{ margin: 0 }}>No items in cart!</h1>{" "}
                            <Link className={style.Link} to="/catalogue">
                                <h3 style={{ margin: 0, textAlign: "center", color: "grey" }}>Go check our store!</h3>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div
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
                <Link to='/checkout'>
                    <button
                        style={{ padding: 15, border: "none", backgroundColor: "black", color: "white", borderRadius: 5,cursor:"pointer" }}
                        disabled={!total}
                        onClick={() => handleOpenCheckOut()}
                    >
                        <h1>Checkout</h1>
                    </button>
                </Link>
            </div>
        </>
    );
}

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { closeModal, googleLogIn } from "../../redux/actions";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { logIn, setCurrentUser, getUsers, postUser, getOrders, getWishList } from "../../redux/actions";

const PORT = "712548091909-h0gqr6u8q1mj7s3ac3p5s0hkn6snkptf.apps.googleusercontent.com";
    // process.env.NODE_ENV === "production"
    //     ? "712548091909-h0gqr6u8q1mj7s3ac3p5s0hkn6snkptf.apps.googleusercontent.com"
    //     : "535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com";

export default function Login() {
    const dispatch = useDispatch();

    const allUsers = useSelector((state) => state.allUsers);
    const user = useSelector((state) => state.user);

    const history = useHistory();

    const responseGoogle = async (response) => {
        const user = await dispatch(googleLogIn({ token: response.tokenId }));
        //console.log(user);
        await dispatch(setCurrentUser(user));
        
        dispatch(closeModal());
        await dispatch(getOrders({ email: user?.email }));

        // setTimeout(() => {
        //     history.go(0)
        // }, 500);
    };

    useEffect(() => dispatch(getUsers()), []);

    const [input, setInput] = useState({
        // profileObj:{
        // givenName:"",
        email: "",
        password: "",
        // }
    });

    function handleChange(e) {
        // console.log(input)
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // dispatch(setCurrentUser(input));
        let email = input.email;
        let res = await dispatch(logIn({ email: email, password: input.password }));

        dispatch(closeModal());

        if (typeof res.email != "undefined") {
            //await dispatch(setCurrentUser(user))
            await dispatch(getOrders({ email: email }));
            //alert('Welcome');
        } else {
            alert("Invalid user please try again");
        }

        setInput({
            email: "",
            password: "",
        });
        dispatch(closeModal());
    }

    return (
        <div
            style={{
                position: "fixed",
                backgroundColor: "rgba(0,0,0,0.65)",
                zIndex: 10000,
                height: "100%",
                display: "grid",
                alignItems: "center",
                width: "100%",
                overflow: "hidden",
                justifyItems: "center",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    display: "grid",
                    flexDirection: "row",
                    borderRadius: 15,
                    alignItems: "center",
                    border: "1px solid black",
                    justifyItems: "center",
                    padding: 40,
                }}
            >
                <h1 style={{ marginTop: 0 }}>LOGIN</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        <label style={{ textAlign: "center" }} for="username">
                            Email:
                        </label>
                        <input
                            id="email"
                            // value={input.profileObj.email}
                            placeholder="type your email"
                            onChange={(e) => handleChange(e)}
                        ></input>
                        {/* <label style={{textAlign:"center"}} for='username'>Username:</label>
                <input 
                id='givenName'
                // value={input.profileObj.givenName}   
                placeholder='type your username or email'
                // error={errors.identifier}
                onChange={e => handleChange(e)}
                ></input> */}
                        <label style={{ textAlign: "center" }} for="password">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            // value={input.profileObj.password}
                            placeholder="type your password"
                            // error={errors.password}
                            onChange={(e) => handleChange(e)}
                        ></input>
                    </div>

                    <div style={{ marginTop: 25, display: "flex", width: "100%", justifyContent: "space-around" }}>
                        <GoogleLogin
                            clientId={PORT}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={"single_host_origin"}
                        />

                        <button
                            style={{ padding: 10, backgroundColor: "black", color: "white", borderRadius: 5, border: "1px solid black" }}
                            className="primaryButton"
                            type="submit"
                        >
                            Login
                        </button>

                        <button
                            style={{ padding: 10, backgroundColor: "white", color: "black", borderRadius: 5, border: "1px solid black" }}
                            className="secondaryButton"
                            onClick={() => dispatch(closeModal())}
                        >
                            Close
                        </button>
                    </div>

                    <Link to="/users/resetPassword" style={{ color: "black", fontSize: 12 }} onClick={() => dispatch(closeModal())}>
                        Forgot your password?
                    </Link>
                </form>
            </div>
        </div>
    );
}

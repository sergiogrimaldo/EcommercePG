import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
//import { useHistory } from "react-router";
/* import { getReviews } from "../../redux/actions/index.js";
import { getReviewsFromUser } from "../../redux/actions/index.js"; */
import { postReview } from "../../redux/actions/index.js";
import style from "./review.module.css";
import { useDispatch, useSelector } from "react-redux";

const Review = ({ shoe, currentComponent }) => {
    const dispatch = useDispatch();
    //const history = useHistory();
    const [stars, setStars] = useState("");
    const [showMassage, setShowMassage] = useState(false);
    const [isAUser, setIsAUser] = useState(false);
    const [textArea, setTextArea] = useState(false);
    const user = useSelector((state) => state.user);
    const reviews = useSelector((state) => state.reviews);
    const myReviews = useSelector((state) => state.reviewsFromUser);

    myReviews && console.log(myReviews);
    reviews && console.log(reviews);
    //console.log(user);
    //console.log(shoe)
    const reviewStar = (number) => {
        setStars(number);
        setTextArea(true);
    };

    useEffect(() => {
        if (isAUser && currentComponent === "Detail") {
            setStars("");
        }
    }, [currentComponent, isAUser]);

    useEffect(() => {
        if (!isAUser) {
            setStars(Math.floor(Math.random() * 5) + 0);
        }
    }, []);

    useEffect(() => {
        if (user.email !== undefined) {
            setIsAUser(true);
        } else {
            setIsAUser(false);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (stars !== "") {
            setShowMassage(true);
            dispatch(
                postReview({
                    userId: user.id,
                    shoeId: shoe.id,
                    rating: stars,
                    comment: e.target[0].value || "",
                })
            );
        }
        setStars("");
        e.target.reset();
    };
    console.log(showMassage);
    return (
        <div>
            <div
                className={style.container}
                style={{
                    display: isAUser === true ? "none" : "",
                }}
            >
                <div className="container">
                    <span
                        style={{
                            display: (currentComponent === "Card" || currentComponent === "Detail") && "none",
                        }}
                    >
                        Create a Review
                    </span>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                    >
                        <AiFillStar className={stars >= 1 ? style.gold : style.dark} />
                        <AiFillStar className={stars >= 2 ? style.gold : style.dark} />
                        <AiFillStar className={stars >= 3 ? style.gold : style.dark} />
                        <AiFillStar className={stars >= 4 ? style.gold : style.dark} />
                        <AiFillStar className={stars >= 5 ? style.gold : style.dark} />
                        <div>
                            <button
                                variant="dark"
                                type="submit"
                                style={{
                                    display: (currentComponent === "Card" || currentComponent === "Detail") && "none",
                                }}
                            >
                                Send
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div
                className={style.container}
                style={{
                    display: isAUser === true ? "" : "none",
                }}
            >
                <div className="container">
                    <level
                        style={{
                            display: currentComponent === "Card" && currentComponent !== "Detail" ? "none" : "",
                        }}
                    >
                        Create a Review
                    </level>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                    >
                        <AiFillStar className={stars >= 1 ? style.gold : style.dark} onClick={() => reviewStar(1)} />
                        <AiFillStar className={stars >= 2 ? style.gold : style.dark} onClick={() => reviewStar(2)} />
                        <AiFillStar className={stars >= 3 ? style.gold : style.dark} onClick={() => reviewStar(3)} />
                        <AiFillStar className={stars >= 4 ? style.gold : style.dark} onClick={() => reviewStar(4)} />
                        <AiFillStar className={stars >= 5 ? style.gold : style.dark} onClick={() => reviewStar(5)} />
                        <textarea
                            name="text"
                            style={{
                                display: textArea === true ? "" : "none",
                            }}
                        ></textarea>

                        <div>
                            <button
                                variant="dark"
                                type="submit"
                                style={{
                                    display: currentComponent === "Card" && currentComponent !== "Detail" ? "none" : "",
                                }}
                            >
                                Send
                            </button>
                            <span
                                style={{
                                    display: showMassage === true ? "" : "none",
                                }}
                            >
                                your review was sended, thanks!{" "}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Review;

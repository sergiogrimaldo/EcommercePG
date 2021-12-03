import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { useHistory } from "react-router";
import { getReviewsFromUser } from "../../redux/actions/index.js";
import { useParams } from "react-router-dom";
import style from "./review.module.css";
import { useSelector } from "react-redux";
const Review = ({ shoe, currentComponent }) => {
    const history = useHistory();
    const [stars, setStars] = useState("");
    const [isAUser, setIsAUser] = useState(false);
    const [text, setText] = useState("");
    const [textArea, setTextArea] = useState(false);
    const [opinion, setOpinion] = useState("");
    const [error, setError] = useState("");
    const user = useSelector((state) => state.user);
    const userReview = useSelector((state) => state.reviewsFromUser);

    //console.log(isAUser);
    console.log(user);
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
        getReviewsFromUser(user.id);
    }, []);

    useEffect(() => {
        if (user.email !== undefined) {
            setIsAUser(true);
        } else {
            setIsAUser(false);
        }
    }, [user]);

    const handleOpinionChange = (e) => {
        setOpinion(e.target.value);
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };
    /* const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReviews(user.username, productid, stars, text, opinion);
      history.push(`/product/${productid}`);
    } catch (err) {
      setError("Usted no tiene permisos para crear la reseña");
    }
  }; */
    console.log(textArea);
    return (
        <div>
            <div
                className={style.container}
                style={{
                    display: isAUser === true ? "none" : "",
                }}
            >
                <div className="container">
                    <level
                        style={{
                            display: (currentComponent === "Card" || currentComponent === "Detail") && "none",
                        }}
                    >
                        Create a Review
                    </level>
                    <form
                        onSubmit={(e) => {
                            //handleSubmit(e);
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
                        <div className={style.errors}>{error ? error : ""}</div>
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
                            //handleSubmit(e);
                        }}
                    >
                        <AiFillStar className={stars >= 1 ? style.gold : style.dark} onClick={() => reviewStar(1)} />
                        <AiFillStar className={stars >= 2 ? style.gold : style.dark} onClick={() => reviewStar(2)} />
                        <AiFillStar className={stars >= 3 ? style.gold : style.dark} onClick={() => reviewStar(3)} />
                        <AiFillStar className={stars >= 4 ? style.gold : style.dark} onClick={() => reviewStar(4)} />
                        <AiFillStar className={stars >= 5 ? style.gold : style.dark} onClick={() => reviewStar(5)} />
                        <textarea
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
                        </div>
                        <div className={style.errors}>{error ? error : ""}</div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Review;

import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import style from "./review.module.css";

const Reviews = ({ shoeId, reviews }) => {
    const [starsAndComments, setStarsAndComments] = useState([]);

    useEffect(() => {
        if (reviews) {
            let found = reviews.filter((review) => review.shoeId === parseInt(shoeId, 10));
            // console.log(found);
            if (found && found.length > 0) {
                setStarsAndComments(found);
            }
        }
    }, [shoeId, reviews]);

    starsAndComments && console.log(starsAndComments);

    return (
        <div
            style={{
                display: starsAndComments && starsAndComments.length > 0 ? "block" : "none",
            }}
        >
            <h3>Reviews</h3>
            {starsAndComments &&
                starsAndComments.slice(0, 3).map((review, i) => (
                    <div key={i}>
                        <div className="container">
                            <AiFillStar className={review.rating >= 1 ? style.gold : style.dark} />
                            <AiFillStar className={review.rating >= 2 ? style.gold : style.dark} />
                            <AiFillStar className={review.rating >= 3 ? style.gold : style.dark} />
                            <AiFillStar className={review.rating >= 4 ? style.gold : style.dark} />
                            <AiFillStar className={review.rating >= 5 ? style.gold : style.dark} />
                        </div>
                        <span>{review.comment}</span>
                    </div>
                ))}
        </div>
    );
};

export default Reviews;

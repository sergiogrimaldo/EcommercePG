import React from "react";
import s from "./Card.module.css";
import { useSelector } from "react-redux";
import { onlyThreeColorGrid } from "../FilterColor/colors.js";

export default function Card({
    shoeName,
    brand,
    retailPrice,
    thumbnail,
    releaseDate,
    description,
    silhoutte,
    _id,
}) {
    var shoes = useSelector((state) => state.shoes);
    let threeColorGrid = onlyThreeColorGrid(shoes, silhoutte, _id);

    return (
        <div className={s.card__father}>
            <div class={s.card}>
                <div class={s.icon}>
                    <img src={thumbnail} alt="lol" className={s.img} />
                    <h2>{shoeName}</h2>
                </div>
                <div class={s.info__description}>
                    {threeColorGrid.map((item, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    float: "left",
                                    display: "inline-block",
                                    verticalAlign: "top",
                                }}
                            >
                                <hr
                                    style={{
                                        width: "25px",
                                        marginLeft: "0px",
                                    }}
                                />
                                {item.map((items, ind) => {
                                    return (
                                        <div
                                            key={ind + 400}
                                            style={{
                                                backgroundColor: items,
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                    <div
                        style={{
                            width: "70%",
                            marginLeft: "30%",
                            height: "110px",
                            overflowY: "scroll",
                        }}
                    >
                        {description}
                    </div>
                    <h6>{releaseDate}</h6>
                    <h6>{retailPrice}</h6>
                    <input type="button" value="Add to Cart"/>
                    <input type="button" value="Buy Now"/>
                </div>
            </div>
        </div>
    );
}

{
    /* <div className={s.card}>
                <div className={s.inDiv}>
                    {threeColorGrid.map((item, i) => {
                        return (
                            <div
                                key={i}
                                style={{
                                    float: "left",
                                    display: "inline-block",
                                    verticalAlign: "left",
                                }}
                            >
                                <hr
                                    style={{
                                        width: "25px",
                                        marginLeft: "0px",
                                    }}
                                />
                                {item.map((items, ind) => {
                                    return (
                                        <div
                                            key={ind + 400}
                                            style={{
                                                verticalAlign: "left",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "left",
                                                backgroundColor: items,
                                                width: "20px",
                                                height: "20px",
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                    <h2>{shoeName}</h2>
                    <img src={thumbnail} alt="lol" />
                    <div
                        style={{
                            width: "90%",
                            marginLeft: "10%",
                            height: "60px",
                            overflowY: "scroll",
                        }}
                    >
                        {description}
                    </div>
                    <h6>{releaseDate}</h6>
                    <h6>{retailPrice}</h6>
                    <button>Add to Cart</button>
                    <button>Buy Now</button>
                </div>

                <img src={thumbnail} alt="lol" className={s.img} />
                <h1>{shoeName}</h1>
                <h4>{brand}</h4>
            </div> */
}

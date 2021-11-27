import { useEffect, useState } from "react";
import s from "./Card.module.css";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/actions/index.js";
import { openBuyDetailsModal } from "../../redux/actions/index.js";
import {
    /* splitColorsNamesToGether, */
    onlyThreeColorGrid,
} from "../FilterColor/colors.js";

export default function Card({ shoe }) {
    const dispatch = useDispatch();
    const [shoeOnHover, setShoeOnHover] = useState("");
    const [shoeOnHoverImg, setShoeOnHoverColor] = useState("");
    const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState("");
    var shoes = useSelector((state) => state.shoes);

    let found,
        foundFromAll,
        allColors = onlyThreeColorGrid(shoes, shoe.silhoutte, shoe._id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
        restOfColors = onlyThreeColorGrid(
            shoes,
            shoe.silhoutte,
            shoe._id,
            false
        ); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
    //console.log(allColors)
    if (shoeOnHover) {
        found = shoeOnHoverImg.find((el) => el._id === shoeOnHover);
        foundFromAll = shoes.find((el) => el._id === shoeOnHover);
    }
    useEffect(() => {
        //restOfColors && setRestOfShoeOnHoverImg(restOfColors);
    }, []);
    console.log(restOfShoeOnHoverImg);
    //allColors && console.log(allColors.colorNameThumbnailAnd_id.length);
    return (
        <div className={s.card__father}>
            <div
                className={s.card}
                onMouseLeave={() => {
                    setRestOfShoeOnHoverImg("");
                }}
            >
                <div className={s.icon}>
                    <img src={shoe.thumbnail} alt="lol" className={s.img} />
                    <h2>{shoe.shoeName}</h2>
                </div>
                <img
                    src={found && found.thumbnail}
                    alt="lol"
                    style={{
                        display: shoeOnHover ? "block" : "none",
                        width: "300px",
                        height: "250px",
                        position: "absolute",
                        right: "0px",
                        top: "0px",
                        zIndex: "1",
                        border: "1px solid black",
                    }}
                />
                <div className={s.info__description}>
                    {restOfColors &&
                        restOfColors.colorNameThumbnailAnd_id.slice(3).map((item, i) => {
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setShoeOnHover(item._id);
                                        setShoeOnHoverColor(
                                            restOfColors.colorNameThumbnailAnd_id
                                        );
                                    }}
                                    onMouseLeave={() => {
                                        setShoeOnHover("");
                                        setShoeOnHoverColor("");
                                    }}
                                    onClick={() => {
                                        dispatch(
                                            openBuyDetailsModal({
                                                foundFromAll,
                                                restOfColors,
                                            })
                                        );
                                        dispatch(openModal("BuyDetailsModal"));
                                    }}
                                    key={i}
                                    style={{
                                        display: restOfShoeOnHoverImg
                                            ? "inline-block"
                                            : "none",
                                        float: "left",
                                        verticalAlign: "top",
                                    }}
                                >
                                    {item.threeColorGrid.map((items, ind) => {
                                        return (
                                            <div
                                                key={ind + 400}
                                                style={{
                                                    backgroundColor: items,
                                                    width: "20px",
                                                    height: "20px",
                                                    cursor: "pointer",
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                            );
                        })}

                    {restOfColors &&
                        restOfColors.colorNameThumbnailAnd_id.length > 3 && (
                            <div
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    cursor: "pointer",
                                    marginLeft: "0px",
                                }}
                                onMouseEnter={() => {
                                    setRestOfShoeOnHoverImg(restOfColors);
                                }}
                            >
                                +
                            </div>
                        )}
                    {allColors &&
                        allColors.colorNameThumbnailAnd_id.map((item, i) => {
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setShoeOnHover(item._id);
                                        setShoeOnHoverColor(
                                            allColors.colorNameThumbnailAnd_id
                                        );
                                    }}
                                    onMouseLeave={() => {
                                        setShoeOnHover("");
                                        setShoeOnHoverColor("");
                                    }}
                                    onClick={() => {
                                        dispatch(
                                            openBuyDetailsModal({
                                                foundFromAll,
                                                restOfColors,
                                            })
                                        );
                                        dispatch(openModal("BuyDetailsModal"));
                                    }}
                                    key={i}
                                    style={{
                                        float: "left",
                                        display: "inline-block",
                                        verticalAlign: "top",
                                    }}
                                >
                                    {item.threeColorGrid.map((items, ind) => {
                                        return (
                                            <div
                                                key={ind + 400}
                                                style={{
                                                    backgroundColor: items,
                                                    width: "20px",
                                                    height: "20px",
                                                    cursor: "pointer",
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
                        {shoe.description}
                    </div>

                    <h6>
                        Release Date {shoe.releaseDate} Price=$
                        {shoe.retailPrice},00 USD
                    </h6>
                    <input type="button" value="Add to Cart" />
                    <input type="button" value="Buy Now" />
                </div>
            </div>
        </div>
    );
}

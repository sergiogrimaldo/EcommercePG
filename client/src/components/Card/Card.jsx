import { useState } from "react";
import s from "./Card.module.css";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/actions/index.js";
import { openBuyDetailsModal } from "../../redux/actions/index.js";
import { onlyThreeColorGrid } from "../FilterColor/colors.js";

export default function Card({ shoe }) {
    const dispatch = useDispatch();
    const [shoeOnHover, setShoeOnHover] = useState("");
    const [shoeOnHoverImg, setShoeOnHoverColor] = useState("");
    const [restOfShoeOnHoverImg, setRestOfShoeOnHoverImg] = useState("");
    const [plusOrMinus, setPlusOrMinus] = useState("+");
    var shoes = useSelector((state) => state.shoes);

    let found,
        foundFromAll,
        allColors = onlyThreeColorGrid(shoes, shoe.silhoutte, shoe._id), //cuarto parametro = false ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
        restOfColors = onlyThreeColorGrid(shoes, shoe.silhoutte, shoe._id, false); //cuarto parametro = true ? trae todos los demas shoes del mismo tipo pero distinto color : trae solo tres pares
    if (shoeOnHover) {
        found = shoeOnHoverImg.find((el) => el._id === shoeOnHover);
        foundFromAll = shoes.find((el) => el._id === shoeOnHover);
    }
    return (
        <div className={s.card__father}>
            <div
                className={s.card}
                onMouseLeave={() => {
                    setRestOfShoeOnHoverImg("");
                    setPlusOrMinus("+");
                }}
            >
                <div className={s.icon}>
                    <img src={shoe.thumbnail} alt="lol" className={s.img} /> <h2> {shoe.shoeName} </h2>{" "}
                </div>{" "}
                <img src={found && found.thumbnail} alt="lol" className={shoeOnHover ? s.displayImgTrue : s.displayImgFalse} />{" "}
                <div className={s.info__description}>
                    {" "}
                    {restOfColors &&
                        restOfColors.colorNameThumbnailAnd_id.slice(3, 15).map((item, i) => {
                            let pos = i * 20;
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setShoeOnHover(item._id);
                                        setShoeOnHoverColor(restOfColors.colorNameThumbnailAnd_id);
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
                                    className={restOfShoeOnHoverImg ? s.displaySecundLineOfColorsTrue : s.displaySecundLineOfColorsFalse}
                                    style={{
                                        marginLeft: `${60 + pos}px`,
                                    }}
                                >
                                    {item.threeColorGrid.map((items, ind) => {
                                        return (
                                            <div
                                                key={ind + 400}
                                                className={s.gridOfColors}
                                                style={{
                                                    backgroundColor: items,
                                                }}
                                            />
                                        );
                                    })}{" "}
                                </div>
                            );
                        })}
                    {restOfColors && restOfColors.colorNameThumbnailAnd_id.length > 3 && (
                        <div>
                            <div
                                className={s.plusOrMinus}
                                style={{
                                    display: plusOrMinus === "+" ? "block" : "none",
                                }}
                                onClick={() => {
                                    setRestOfShoeOnHoverImg(restOfColors);
                                    setPlusOrMinus("-");
                                }}
                            >
                                +Colors{" "}
                            </div>{" "}
                            <div
                                className={s.plusOrMinus}
                                style={{
                                    display: plusOrMinus === "-" ? "block" : "none",
                                }}
                                onClick={() => {
                                    setRestOfShoeOnHoverImg("");
                                    setPlusOrMinus("+");
                                }}
                            >
                                -Colors{" "}
                            </div>{" "}
                        </div>
                    )}{" "}
                    {allColors &&
                        allColors.colorNameThumbnailAnd_id.slice(0, 3).map((item, i) => {
                            return (
                                <div
                                    onMouseEnter={() => {
                                        setShoeOnHover(item._id);
                                        setShoeOnHoverColor(allColors.colorNameThumbnailAnd_id);
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
                                    className={s.gridOfFirstThreeColors}
                                >
                                    {item.threeColorGrid.map((items, ind) => {
                                        return (
                                            <div
                                                key={ind + 400}
                                                className={s.gridOfColors}
                                                style={{
                                                    backgroundColor: items,
                                                }}
                                            />
                                        );
                                    })}{" "}
                                </div>
                            );
                        })}{" "}
                    <div className={s.shoesDescription}> {shoe.description} </div>{" "}
                    <h6>
                        Release Date {shoe.releaseDate}
                        Price = $ {shoe.retailPrice}, 00 USD{" "}
                    </h6>{" "}
                    <input
                        type="button"
                        onClick={() => dispatch(addToCart({ image: shoe.thumbnail, name: shoe.shoeName, price: shoe.retailPrice, cuantity: 1 }))}
                        value="Add to Cart"
                    />
                    <input type="button" value="Buy Now" />
                </div>{" "}
            </div>{" "}
        </div>
    );
}

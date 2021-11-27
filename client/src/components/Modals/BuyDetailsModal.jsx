import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions";
import s from "./BuyDetailsModal.module.css";

export default function BuyDetailsModal({ data }) {
    const dispatch = useDispatch();
    console.log(data);
    return data.foundFromAll ? (
        <div
            style={{
                backgroundColor: "rgba(0,0,0,0.65)",
                zIndex: 10,
                height: "90vh",
                display: "grid",
                alignItems: "center",
                width: "100%",
                justifyItems: "center",
                //position: "-webkit-sticky",
                position: "sticky",
                top: "100px",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    display: "flex",
                    height: "auto",
                    width: "80%",
                    flexDirection: "column",
                    borderRadius: 15,
                    alignItems: "center",
                    border: "1px solid black",
                    justifyItems: "center",
                    padding: "10px",
                }}
            >
                <div className={s.card}>
                    <img
                        src={data.foundFromAll.thumbnail}
                        alt="lol"
                        className={s.img}
                    />
                    <h2>{data.foundFromAll.shoeName}</h2>
                    <div className={s.info__description}>
                        <div
                            style={{
                                width: "100%",
                                height: "110px",
                                overflowY: "scroll",
                            }}
                        >
                            {data.foundFromAll.description}
                        </div>
                        <h6>
                            Release Date {data.foundFromAll.releaseDate} Price=$
                            {data.foundFromAll.retailPrice},00 USD
                        </h6>
                        <input
                            type="button"
                            value="Add to Cart"
                            onClick={() => {
                                dispatch(closeModal());
                            }}
                        />
                        <input
                            type="button"
                            value="Buy Now"
                            onClick={() => {
                                dispatch(closeModal());
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}

/* 
{data.restOfColors &&
                        data.restOfColors.colorNameThumbnailAnd_id.map((item, i) => {
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
*/

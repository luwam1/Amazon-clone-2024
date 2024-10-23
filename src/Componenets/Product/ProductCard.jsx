import { Link } from "react-router-dom";
import classes from "./Product.module.css";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "react-currency-format";
import { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../../Utility/action.types"; // Correct the name

function ProductCard({ product, flex, renderDes, renderAdd }) {
  // Destructure product prop correctly
  const { image, title, id, rating, price, description } = product;

  const [state, dispatch] = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET, // Use Type from action types
      item: {
        image,
        title,
        id,
        rating,
        price,
        description,
      },
    });
  };

  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product_flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>

      <div className={classes.info}>
        <h3 className={classes.title}>{title}</h3>
        {renderDes && <div>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} readOnly />
          <small>({rating?.count})</small>
        </div>
        <div className={classes.price}>
          <CurrencyFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={(value) => <p>{value}</p>}
          />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

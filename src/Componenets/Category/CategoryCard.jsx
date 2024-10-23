import classes from "./Category.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ data }) {
  // console.log(data);
  return (
    <div className={`${classes.category}`}>
      <Link to={`/category/${data.name}`}>
        <h2>{data?.title}</h2>
        <img src={data?.imageLink} alt={data?.title} />
        <p>Shop now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;

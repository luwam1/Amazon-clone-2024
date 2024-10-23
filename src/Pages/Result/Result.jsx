import LayOut from "../../Componenets/Layout/LayOut";
import classes from "./Result.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endponts";
import { useEffect, useState } from "react";
import Loader from "../../Componenets/Loader/Loader";
import ProductCard from "../../Componenets/Product/ProductCard"; // Make sure ProductCard is correctly imported

function Result() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added state for isLoading
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); 
      });
  }, [categoryName]);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Result</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products_container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
               renderDes={false}
                renderAdd={true}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;

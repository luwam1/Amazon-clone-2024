import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import Loader from "../Loader/Loader"; // Ensure the path is correct

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start loading as true

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false); // Set loading state to false after data is received
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
        setIsLoading(false); // Set loading state to false even if there's an error
      });
  }, []); // Dependency array ensures it runs only once on component mount

  return (
    <>
      {isLoading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
        <section className={classes.Product_container}>
          {products?.map((singleProduct) => (
            <ProductCard
              renderAdd={true}
              product={singleProduct}
              key={singleProduct.id}
            />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;

import { useParams } from "react-router-dom";
import LayOut from "../../Componenets/Layout/LayOut";
// import classes from "./ProductDetail.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/endponts";
import ProductCard from "../../Componenets/Product/ProductCard";
import Loader from "../../Componenets/Loader/Loader";

function ProductDetail() {
  const { productID } = useParams();
  const [isLoading, setIsLoading] = useState(false); 
  const [product, setProduct] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productID}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [productID]); 

  return (
    <LayOut>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductCard
         product={product}
          flex={true} 
          renderDes={true}
          renderAdd={true}
          />
      )}
    </LayOut>
  );
}

export default ProductDetail;

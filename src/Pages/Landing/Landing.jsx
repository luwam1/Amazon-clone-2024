import Carousel from "../../Componenets/Carousel/Carousel";
import Category from "../../Componenets/Category/Category";

import LayOut from "../../Componenets/Layout/LayOut";
import Product from "../../Componenets/Product/product";

function Landing() {
  return (
    <LayOut>
     
      <Carousel />
      <Category />
      <Product/>
  

    </LayOut>
  );
}

export default Landing

import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "../Header/Header";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showArrows={true}
      >
        {img.map((imageItemLink, index) => (
          <div key={index}>
            {" "}
            {/* Added key and div wrapper */}
            <img src={imageItemLink} />
          </div>
        ))}
      </Carousel>
      <div className={`${classes.hero_img}`}>

      </div>
    </div>
  );
}

export default CarouselEffect;

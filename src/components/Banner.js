import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src="https://ebuy.lk/wp-content/uploads/2021/carousel1.jpg"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://ebuy.lk/wp-content/uploads/2021/carousel2.png"
          />
        </div>
        <div>
          <img
            loading="lazy"
            src="https://ebuy.lk/wp-content/uploads/2021/carousel3.png"
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;

import BrandItem from "./BrandItem";
import "./Brands.css";

const Brands = () => {
  const brandImages = [
    "/img/brands/brand1.png",
    "/img/brands/brand2.png",
    "/img/brands/brand3.png",
    "/img/brands/brand4.png",
    "/img/brands/brand5.png"
  ];

  return (
    <section className="brands">
      <div className="container">
        <ul className="brand-list">
          {brandImages.map((img, index) => (
            <BrandItem key={index} image={img} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Brands;

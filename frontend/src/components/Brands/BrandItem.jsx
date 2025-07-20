const BrandItem = ({ image }) => {
  return (
    <li className="brand-item">
      <a href="#">
        <img src={image} alt="Brand" />
      </a>
    </li>
  );
};

export default BrandItem;

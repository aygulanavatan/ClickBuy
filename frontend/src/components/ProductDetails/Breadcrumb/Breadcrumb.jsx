import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <a href="#">Giyim</a>
          </li>
          <li>
            <a href="#">Kadın</a>
          </li>
          <li>
            <a href="#">Ceket</a>
          </li>
          <li>Elastik Paçalı Renkli Ceket</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;

import "./CampaignItem.css";

const CampaignItem = () => {
  return (
    <div className="campaign-item">
      <h3 className="campaign-title">
        Click & Buy'da <br />
        Yaz Sezonu <br />
        Başladı
      </h3>
      <p className="campaign-desc">
        Yeni sezon ürünlerde %70'e varan indirim
      </p>
      <a href="#" className="btn btn-primary">
        Tümünü Gör
        <i className="bi bi-arrow-right"></i>
      </a>
    </div>
  );
};

export default CampaignItem;

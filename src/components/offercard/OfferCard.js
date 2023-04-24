import { Link } from "react-router-dom";

const OfferCard = ({ elem, id }) => {
  console.log(elem);
  return (
    <div className="offer">
      <div className="profile">
        <div className="profile-picture">
          {elem.owner.account.avatar && (
            <img src={elem.owner.account.avatar.secure_url} alt="" />
          )}
        </div>
        <span className="offer-info">{elem.owner.account.username}</span>
      </div>
      <Link id={elem._id} to={`/offer/${id}`}>
        <img
          className="product-image"
          src={elem.product_image.secure_url}
          alt=""
        />
      </Link>
      <span className="price">{elem.product_price} €</span>
      {elem.product_details.map((info, index) => {
        // console.log(info["TAILLE"]);
        return (
          <div key={index} className="info-container">
            <div className="offer-info">{info["TAILLE"]}</div>
            <div className="offer-info">{info["MARQUE"]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OfferCard;

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// AXIOS IMPORT
import axios from "axios";

// REACT ELEMENTS IMPORT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//COOKIES PACKAGE IMPORT
import Cookies from "js-cookie";

const OfferCard = ({ elem, id }) => {
  // console.log(elem);

  // USER MANAGEMENT & USESTATE
  const [userId, setUserId] = useState();
  const token = Cookies.get("token");

  // FAVOURITES USESTATE
  const [savedFav, setSavedFav] = useState(false);

  // NAVIGATE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user`);
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        // console.log(foundUser._id);
        setUserId(foundUser._id);
        const favourite = foundUser.favourites.find(
          (fav) => fav.id === elem._id
        );
        // console.log(favourite);
        if (favourite) {
          setSavedFav(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUser();
  }, [token, savedFav, elem._id]);

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
      <div className="info-container">
        <div className="price-favourite">
          <span className="price">{elem.product_price} €</span>
          {savedFav ? (
            <div
              className="fav-btn-red"
              onClick={async () => {
                try {
                  const response = await axios.put(
                    `http://localhost:3000/user/deletefav/${userId}`,

                    {
                      id: elem._id,
                      owner: elem.owner.account.username,
                      profile: elem.owner.account.avatar.secure_url,
                      name: elem.product_name,
                      image: elem.product_image.secure_url,
                      price: elem.product_price,
                      details: elem.product_details,
                    }
                  );
                  console.log(response);
                  setSavedFav(false);
                } catch (error) {
                  console.log(error.message);
                  if ((error.response.data.message = "Missing parameters")) {
                    navigate("/login");
                  }
                }
              }}
            >
              <FontAwesomeIcon icon="heart" />
            </div>
          ) : (
            <div
              className="fav-btn"
              onClick={async () => {
                try {
                  const response = await axios.put(
                    `http://localhost:3000/user/update/${userId}`,

                    {
                      id: elem._id,
                      owner: elem.owner.account.username,
                      profile: elem.owner.account.avatar.secure_url,
                      name: elem.product_name,
                      image: elem.product_image.secure_url,
                      price: elem.product_price,
                      details: elem.product_details,
                    }
                  );
                  console.log(response);
                  setSavedFav(true);
                } catch (error) {
                  console.log(error.message);
                  if ((error.response.data.message = "Missing parameters")) {
                    navigate("/login");
                  }
                }
              }}
            >
              <FontAwesomeIcon icon="heart" />
            </div>
          )}
        </div>

        {elem.product_details.map((info, index) => {
          // console.log(info["TAILLE"]);
          return (
            <div key={index}>
              <div className="offer-info">{info["TAILLE"]}</div>
              <div className="offer-info">{info["MARQUE"]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OfferCard;

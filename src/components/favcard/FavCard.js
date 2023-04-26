import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// AXIOS IMPORT
import axios from "axios";

// REACT ELEMENTS IMPORT
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//COOKIES PACKAGE IMPORT
import Cookies from "js-cookie";

const FavCard = ({ elem, id }) => {
  console.log(elem);

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
          (fav) => fav.id === elem.id
        );
        console.log(favourite);
        if (favourite) {
          setSavedFav(true);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUser();
  }, [token, savedFav, elem.id]);

  console.log(elem);

  return (
    <div className="offer">
      <div className="profile">
        <div className="profile-picture">
          {elem.owner && <img src={elem.profile} alt="" />}
        </div>
        <span className="offer-info">{elem.owner}</span>
      </div>
      <Link id={elem.id} to={`/offer/${id}`}>
        <img className="product-image" src={elem.image} alt="" />
      </Link>
      <div className="info-container">
        <div className="price-favourite">
          <span className="price">{elem.price} €</span>
          {savedFav ? (
            <div
              className="fav-btn-red"
              onClick={async () => {
                try {
                  const response = await axios.put(
                    `http://localhost:3000/user/deletefav/${userId}`,

                    {
                      id: elem.id,
                      owner: elem.owner,
                      profile: elem.profile,
                      name: elem.name,
                      image: elem.image,
                      price: elem.price,
                      details: elem.details,
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
                      id: elem.id,
                      owner: elem.owner,
                      profile: elem.profile,
                      name: elem.name,
                      image: elem.image,
                      price: elem.price,
                      details: elem.details,
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

        {elem.details.map((info, index) => {
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

export default FavCard;

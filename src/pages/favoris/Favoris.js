// AXIOS IMPORT
import axios from "axios";

// REACT ELEMENTS IMPORT
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// ACTIVITY INDICATOR LIBRARY IMPORT
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

//COOKIES PACKAGE IMPORT
import Cookies from "js-cookie";

import FavCard from "../../components/favcard/FavCard";

const Favoris = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // USER DATA STATES
  const [userId, setUserId] = useState();
  console.log(userId);

  // USER TOKEN
  const token = Cookies.get("token");
  // console.log(token);

  // NAVIGATE
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend--phfc9s47kbj5.code.run/user`
          // `http://localhost:3000/user`
        );
        // console.log(response.data);
        const foundUser = response.data.user.find(
          (user) => user.token === token
        );
        setData(foundUser);
        setUserId(foundUser._id);

        console.log(foundUser.favourites);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchFavourites();
  }, [data, token]);

  return (
    <main className="fav-page">
      <h1>Articles favoris</h1>
      <section className="fav-container">
        {isLoading ? (
          <Dots className="dots-activity"></Dots>
        ) : data.favourites.length === 0 ? (
          <p className="no-fav-msg">
            Vous n'avez pas encore ajouté d'articles à vos favoris.
          </p>
        ) : (
          data.favourites.map((elem) => {
            const id = elem.id;
            return <FavCard elem={elem} key={elem._id} id={id} />;
          })
        )}
      </section>
    </main>
  );
};

export default Favoris;

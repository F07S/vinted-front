import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//Component
import OfferCard from "../../components/offercard/OfferCard";

const Home = ({ search, priceMin, priceMax, priceAsc, priceDesc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${priceAsc}${priceDesc}`
        );
        console.log(priceAsc);
        console.log(response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, priceAsc, priceDesc]);

  return (
    <div className="page">
      <div className="center-page">
        <div className="center-container">
          <div className="center-box">
            <h3>Prêts à faire du tri dans vos placards ?</h3>
            {token ? (
              <button
                className="center-button"
                onClick={() => {
                  navigate("/publish");
                }}
              >
                Commencez à vendre !
              </button>
            ) : (
              <button
                className="center-button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Commencer à vendre
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {isLoading === true ? (
          <p>Loading...</p>
        ) : (
          data.offers.map((elem) => {
            const id = elem._id;
            console.log(search);
            return <OfferCard elem={elem} key={elem._id} id={id} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;

import axios from "axios";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import OfferCard from "../../components/offercard/OfferCard";

const Home = ({ search, priceMin, priceMax, priceAsc, priceDesc }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${priceAsc}${priceDesc}`
          // add the other queries after ${search} within the url AND in the tab below
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
        <img
          src="https://static.vinted.com/assets/seller-promotion/gender_test/c/banner-wide-96cebf41372b8de2d64b7e609f0fb2d3c3084f8df0f861fa8b3782231e5c31f8.jpg"
          alt=""
        />
      </div>
      <div className="container">
        {isLoading === true ? (
          <p>Loading...</p>
        ) : (
          data.offers.map((elem) => {
            const id = elem._id;
            // console.log(elem);
            // console.log(elem.owner.account.avatar.url);
            console.log(search);
            return <OfferCard elem={elem} key={elem._id} id={id} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;

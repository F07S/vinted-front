import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };
    fetchData();
  }, []);
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
            // console.log(elem);
            // console.log(elem.owner.account.avatar.url);
            return (
              <div className="offer" key={elem.product_image.asset_id}>
                {/* <div>
                  {elem.owner.account.avatar.url && (
                    <img src={elem.owner.account.avatar.url} alt="" />
                  )}
                </div> */}

                <span className="offer-info">
                  {elem.owner.account.username}
                </span>
                <img
                  onClick={(elem) => {
                    console.log("Click");
                    const id = elem._id;
                    <Link to={"offer/:id"}></Link>;
                    // <Link to={`offer/${id}`}></Link>;
                  }}
                  className="product-image"
                  src={elem.product_image.url}
                  alt=""
                />
                <span className="price">{elem.product_price} €</span>
                {elem.product_details.map((info) => {
                  // console.log(info["TAILLE"]);
                  return (
                    <div>
                      <div className="offer-info">{info["TAILLE"]}</div>
                      <div className="offer-info">{info["MARQUE"]}</div>
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;

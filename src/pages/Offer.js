import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  // console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
  }, [id]);

  return (
    <div>
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        <div className="product-container">
          <div className="product-box">
            <img
              className="product-img"
              src={data.product_image.secure_url}
              alt=""
            />
            <div className="product-info">
              <p className="prod-price">{data.product_price} €</p>
              <div className="tag-section">
                {data.product_details.map((detail, index) => {
                  const key = Object.keys(detail)[0];
                  // console.log(key);
                  // console.log(detail[key]);
                  return (
                    <div key={index}>
                      <div className="tags">{key} : </div>
                      <div className="tag-info">{detail[key]}</div>
                    </div>
                  );
                })}
              </div>
              <p className="prod-name">{data.product_name}</p>
              <p className="prod-desc">{data.product_description}</p>
              <div className="profile-container">
                {data.owner.account.avatar && (
                  <img
                    className="profile-pic"
                    src={data.owner.account.avatar.secure_url}
                    alt=""
                  />
                )}
                <p className="user-name">{data.owner.account.username}</p>
              </div>
              <div className="buy-button">
                <button>Acheter</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offer;

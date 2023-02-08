import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  // console.log(id);

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
    <div>
      {isLoading === true ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>OFFER PAGE</h2>
          <p>The id i'm linked to is : {id}</p>
          {/* {data.offer.map((elem, id) => {
            return (
              <span className="offer-info">{elem.owner.account.username}</span>
            );
          })} */}
        </div>
      )}
    </div>
  );
};

export default Offer;

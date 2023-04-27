import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// ACTIVITY INDICATOR LIBRARY IMPORT
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

//Component
import OfferCard from "../../components/offercard/OfferCard";

const Home = ({ data, isLoading }) => {
  const token = Cookies.get("token");
  // Navigate
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="center-page">
        <div className="center-container">
          <div className="center-box">
            <h3>Prêts à faire du tri dans vos placards ?</h3>
            <div>
              <button
                className="center-button"
                onClick={() => {
                  token ? navigate("/publish") : navigate("/signup");
                }}
              >
                Commencez à vendre !
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {isLoading === true ? (
          <Dots className="dots-activity"></Dots>
        ) : (
          data.offers.map((elem) => {
            const id = elem._id;

            return <OfferCard elem={elem} key={elem._id} id={id} />;
          })
        )}
      </div>
    </div>
  );
};

export default Home;

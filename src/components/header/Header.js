import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PriceRange from "../pricerange/PriceRange";

const Header = ({
  handleToken,
  search,
  setSearch,
  setPriceAsc,
  setPriceDesc,
  setFetchRangeValues,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
  const [showMenu, setShowMenu] = useState(false);
  // const loop = <FontAwesomeIcon icon="magnifying-glass" />;

  // Navigate
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user`);
        // console.log(response.data.user);
        setData(response.data.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchUsers();
  }, []);

  // onChange Input Handlers
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="header">
      <Link to="/">
        <img
          className="logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1024px-Vinted_logo.png"
          alt=""
        />
      </Link>
      <form
        className="header-form"
        onSubmit={(event) => {
          navigate("/");
          event.preventDefault();
        }}
      >
        <input
          className="head-input"
          type="text"
          placeholder="Rechercher des articles"
          onChange={handleSearchChange}
          value={search}
        />
        <PriceRange setFetchRangeValues={setFetchRangeValues} />
        <div className="header-dropdown">
          <button
            className="dd-btn"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            Trier par
          </button>
          <div className={showMenu ? "dropdown-menu" : "hide"}>
            <div
              className="dd-item"
              onClick={() => {
                setShowMenu(false);
                setPriceDesc("price-desc");
                setPriceAsc("");
              }}
            >
              Prix décroissant
            </div>
            <div
              className="dd-item"
              onClick={() => {
                setShowMenu(false);
                setPriceAsc("price-asc");
                setPriceDesc("");
              }}
            >
              Prix croissant
            </div>
          </div>
        </div>
      </form>

      {token && isLoading ? (
        <p>Loading...</p>
      ) : (
        data &&
        data.map((user) => {
          return (
            token === user.token && (
              <img
                key={user.id}
                className="header-avatar"
                src={user.account.avatar.secure_url}
                alt=""
              />
            )
          );
        })
      )}
      {token ? (
        <>
          <button
            onClick={() => {
              navigate("/favoris");
            }}
            className="favouris-btn"
          >
            <FontAwesomeIcon icon="heart" />
          </button>
          <button
            className="deconnect"
            onClick={() => {
              // Cookies.remove("token");
              handleToken(null);
            }}
          >
            Se Déconnecter
          </button>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button className="blue">S'inscrire | Se connecter</button>
          </Link>
        </>
      )}

      {token ? (
        <button
          className="vendre"
          onClick={() => {
            navigate("/publish");
          }}
        >
          Vends tes articles
        </button>
      ) : (
        <button
          className="vendre"
          onClick={() => {
            navigate("/login");
          }}
        >
          Vends tes articles
        </button>
      )}
    </div>
  );
};

export default Header;

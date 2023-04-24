import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Header = ({
  handleToken,
  search,
  setSearch,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  priceAsc,
  setPriceAsc,
  priceDesc,
  setPriceDesc,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const token = Cookies.get("token");
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

  const handlePriceMinChange = (event) => {
    setPriceMin(event.target.value);
  };
  const handlePriceMaxChange = (event) => {
    setPriceMax(event.target.value);
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

        <input
          className="price-input"
          type="text"
          placeholder="Prix min"
          onChange={handlePriceMinChange}
          value={priceMin}
        />
        <input
          className="price-input"
          type="text"
          placeholder="Prix max"
          onChange={handlePriceMaxChange}
          value={priceMax}
        />

        <button
          className={priceAsc ? "price-order-active" : "price-order-desactive"}
          onClick={() => {
            setPriceAsc("price-asc");
            setPriceDesc("");
          }}
        >
          <FontAwesomeIcon icon="arrow-down" />
          <FontAwesomeIcon className="euro" icon="euro-sign" />
        </button>
        <button
          className={priceDesc ? "price-order-active" : "price-order-desactive"}
          onClick={() => {
            setPriceDesc("price-desc");
            setPriceAsc("");
          }}
        >
          <FontAwesomeIcon icon="arrow-up" />
          <FontAwesomeIcon className="euro" icon="euro-sign" />
        </button>
      </form>

      {token ? (
        <button
          className="deconnect"
          onClick={() => {
            // Cookies.remove("token");
            handleToken(null);
          }}
        >
          Se Déconnecter
        </button>
      ) : (
        <>
          <Link to="/signup">
            <button className="blue">S'inscrire</button>
          </Link>
          <Link to="/login">
            <button className="blue">Se connecter</button>
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

      {token && isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map((user) => {
          return (
            token === user.token && (
              <img
                className="header-avatar"
                src={user.account.avatar.secure_url}
                alt=""
              />
            )
          );
        })
      )}
    </div>
  );
};

export default Header;

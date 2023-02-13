import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
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
  const token = Cookies.get("token");
  // const loop = <FontAwesomeIcon icon="magnifying-glass" />;

  // Navigate
  const navigate = useNavigate();

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
            navigate("/signup");
          }}
        >
          Vends tes articles
        </button>
      )}
    </div>
  );
};

export default Header;

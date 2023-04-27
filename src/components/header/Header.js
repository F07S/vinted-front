import "./header.css";

// ACTIVITY INDICATOR LIBRARY IMPORT
import Dots from "react-activity/dist/Dots";
import "react-activity/dist/library.css";

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
    <div className="header-container">
      <div className="header">
        <form
          className="header-form"
          onSubmit={(event) => {
            navigate("/");
            event.preventDefault();
          }}
        >
          <Link to="/">
            <img
              className="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1024px-Vinted_logo.png"
              alt=""
            />
          </Link>
          <div className="search-filter">
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
          </div>
        </form>
        <div className="header-btn-container">
          <div className="logo-v">
            <Link to="/">
              <img
                src="https://static.vinted.com/assets/web-logo/default/symbol.svg"
                alt=""
              />
            </Link>
          </div>
          <Link to="/">
            <img
              className="logo-resp"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1024px-Vinted_logo.png"
              alt=""
            />
          </Link>

          <div className="btns">
            {token && isLoading ? (
              <Dots className="dots-activity"></Dots>
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
                <div>
                  <button
                    onClick={() => {
                      navigate("/favoris");
                    }}
                    className="favouris-btn"
                  >
                    <FontAwesomeIcon icon="heart" />
                  </button>
                </div>
                <div className="disc-btn-resp">
                  <button
                    className="deconnect"
                    onClick={() => {
                      // Cookies.remove("token");
                      handleToken(null);
                      navigate("/");
                    }}
                  >
                    <FontAwesomeIcon icon="right-from-bracket" />
                  </button>
                </div>
                <div className="disc-btn">
                  <button
                    className="deconnect"
                    onClick={() => {
                      // Cookies.remove("token");
                      handleToken(null);
                      navigate("/");
                    }}
                  >
                    Se Déconnecter
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className="sign-up-btn-resp">
                    <Link to="/signup">
                      <button className="blue">
                        <FontAwesomeIcon icon="user" />
                      </button>
                    </Link>
                  </div>
                  <div className="sign-up-btn">
                    <Link to="/signup">
                      <button className="blue">
                        S'inscrire | Se connecter
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}

            {token ? (
              <div>
                <button
                  className="vendre-resp"
                  onClick={() => {
                    navigate("/publish");
                  }}
                >
                  Vendre
                </button>
                <button
                  className="vendre"
                  onClick={() => {
                    navigate("/publish");
                  }}
                >
                  Vends tes articles
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="vendre"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Vends tes articles
                </button>
              </div>
            )}
          </div>
        </div>
        <form
          className="header-form-responsive"
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
      </div>
    </div>
  );
};

export default Header;

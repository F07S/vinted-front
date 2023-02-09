import "./header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = () => {
  // const loop = <FontAwesomeIcon icon="magnifying-glass" />;
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1024px-Vinted_logo.png"
          alt=""
        />
      </Link>
      <input
        className="head-input"
        type="text"
        placeholder="Recherche des articles"
      />
      <Link to="/signup">
        <button className="blue">S'inscrire</button>
      </Link>
      <Link to="/login">
        <button className="blue">Se connecter</button>
      </Link>

      <button className="vendre">Vends tes articles</button>
    </div>
  );
};

export default Header;

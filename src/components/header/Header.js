import "./header.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  // const loop = <FontAwesomeIcon icon="magnifying-glass" />;
  return (
    <div className="header">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Vinted_logo.png/1024px-Vinted_logo.png"
        alt=""
      />
      <input type="text" placeholder="Recherche des articles" />
      <button className="blue">S'inscrire</button>
      <button className="blue">Se connecter</button>
      <button className="vendre">Vends tes articles</button>
    </div>
  );
};

export default Header;

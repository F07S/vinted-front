//COOKIES
// import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ handleToken }) => {
  //Signup input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);
  const [picture, setPicture] = useState({});
  const [displayPic, setDisplayPic] = useState();

  const [errorMessage, setErrorMessage] = useState("");

  // onChange Input Handlers
  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage("");
    try {
      const formData = new FormData();
      formData.append("username", userName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("newsletter", newsletter);
      formData.append("picture", picture);
      const response = await axios.post(
        "http://localhost:3000/signup",

        formData
      );
      console.log(response.data.token);
      const token = response.data.token;

      if (token) {
        handleToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage(
          "Cet email est déjà utilisé, veuillez créer un compte avec un mail valide."
        );
      }
      if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Veuillez remplir tous les champs s'il vous plaît.");
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <div className="signup-container">
        <div className="signup-box">
          <h1>S'inscire</h1>
          <input
            className="input-box"
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={handleUserNameChange}
            value={userName}
          />
          <input
            className="input-box"
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            className="input-box"
            type="password"
            placeholder="Mot de passe"
            onChange={handlePasswordChange}
            value={password}
          />
          <div className="upload-container-signup">
            {!displayPic && <label htmlFor="file">Add a profile picture</label>}
            <input
              id="file"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                // const profile = event.target.files[0];
                setDisplayPic(event.target.files[0]);
                setPicture(event.target.files[0]);
                console.log(picture);
              }}
            />
            {displayPic && (
              <img
                className="upload-img-signup"
                src={URL.createObjectURL(displayPic)}
                alt=""
              />
            )}
          </div>
          <div className="check-container">
            <input
              className="check"
              checked={newsletter}
              type="checkbox"
              onClick={() => {
                setNewsLetter(!newsletter);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button>S'inscrire</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <span
            className="connect-here"
            onClick={() => {
              navigate("/login");
            }}
          >
            Tu as déja un compte ? Connecte-toi !
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;

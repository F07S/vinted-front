//COOKIES
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  //Signup input states
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsLetter] = useState(false);

  //   const [data, setData] = useState();

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

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: userName,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 10 });
      if (token) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response);
      // add error.message above ^
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        fetchData();
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
            type="text"
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
          <div className="check-container">
            <input
              className="check"
              type="checkbox"
              onClick={() => {
                setNewsLetter(true);
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
          <span className="connect-here">
            Tu as déja un compte ? Connecte-toi !
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signup;

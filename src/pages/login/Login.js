import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  //Login input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // onChange Input Handlers
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
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      const token = response.data.token;
      Cookies.set("token", token, { expires: 10 });
      if (token) {
        navigate("/");
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
      <div className="login-container">
        <div className="login-box">
          <h1>Se connecter</h1>
          <input
            type="text"
            placeholder="Adresse email"
            className="input-tab"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            type="text"
            placeholder="Mot de passe"
            className="input-tab"
            onChange={handlePasswordChange}
            value={password}
          />
          <button>Se connecter</button>
          <span className="signup-here">
            Pas encore de compte ? Inscris-toi!
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;

// import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ handleToken }) => {
  //Login input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  // onChange Input Handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Navigate
  const navigate = useNavigate();

  const handleLogin = async () => {
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

      if (token) {
        // Cookies.set("token", token, { expires: 10 });
        handleToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error.response.status);

      if (error.response.data.message === "Unauthorized") {
        setErrorMessage(
          "L'email et/ou le mot de passe sont erronés. Veuillez réessayer"
        );
      }
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleLogin();
      }}
    >
      <div className="login-container">
        <div className="login-box">
          <h1>Se connecter</h1>
          <input
            type="email"
            placeholder="Adresse email"
            className="input-tab"
            onChange={handleEmailChange}
            value={email}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="input-tab"
            onChange={handlePasswordChange}
            value={password}
          />
          <button>Se connecter</button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <span
            className="signup-here"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Pas encore de compte ? Inscris-toi!
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;

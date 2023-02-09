const Login = () => {
  return (
    <div>
      <div className="login-container">
        <div className="login-box">
          <h1>Se connecter</h1>
          <input type="text" placeholder="Adresse email" />
          <input type="text" placeholder="Mot de passe" />
          <button>Se connecter</button>
          <span>Pas encore de compte ? Inscris-toi!</span>
        </div>
      </div>
    </div>
  );
};

export default Login;

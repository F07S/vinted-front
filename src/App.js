// CSS
import "./App.css";
import "./pages/home/Home.css";
import "./pages/offer/Offer.css";
import "./pages/signup/Signup.css";
import "./pages/login/Login.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGES
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";

// COMPONENTS
import Header from "./components/header/Header";

// FONTS
import "../src/assets/css/fonts.css";

// FONT-AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

//COOKIES
// import Cookies from "js-cookie";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/offer/:id" element={<Offer />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

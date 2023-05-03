// CSS
import "./App.css";
import "./pages/home/Home.css";
import "./pages/offer/Offer.css";
import "./pages/signup/Signup.css";
import "./pages/login/Login.css";
import "./pages/publish/Publish.css";
import "./pages/payment/Payment.css";
import "./pages/favoris/Favoris.css";
import "./components/checkoutform/CheckoutForm.css";

// ROUTER
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// USESTATE
import { useState, useEffect } from "react";

// AXIOS
import axios from "axios";

//COOKIES
import Cookies from "js-cookie";

// PAGES
import Home from "./pages/home/Home";
import Offer from "./pages/offer/Offer";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Publish from "./pages/publish/Publish";
import Payment from "./pages/payment/Payment";
import Favoris from "./pages/favoris/Favoris";

// COMPONENTS
import Header from "./components/header/Header";

// FONTS
import "../src/assets/css/fonts.css";

// FONT-AWESOME
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faArrowUp,
  faArrowDown,
  faEuroSign,
  faPlus,
  faHeart,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faMagnifyingGlass,
  faArrowUp,
  faArrowDown,
  faEuroSign,
  faPlus,
  faHeart,
  faUser,
  faRightFromBracket
);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("token", token, { expires: 10 });
    } else {
      setToken(null);
      Cookies.remove("token");
    }
  };

  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [priceAsc, setPriceAsc] = useState("");
  const [priceDesc, setPriceDesc] = useState("");
  const [fetchRangeValues, setFetchRangeValues] = useState([0, 10000]);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--vinted-backend--phfc9s47kbj5.code.run/offers?title=${search}&priceMin=${fetchRangeValues[0]}&priceMax=${fetchRangeValues[1]}&sort=${priceAsc}${priceDesc}`
          // `http://localhost:3000/offers?title=${search}&priceMin=${fetchRangeValues[0]}&priceMax=${fetchRangeValues[1]}&sort=${priceAsc}${priceDesc}`
        );
        console.log(priceAsc);
        console.log(response.data);
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        // add error.message above ^
      }
    };
    fetchData();
  }, [search, priceMin, priceMax, priceAsc, priceDesc, fetchRangeValues]);

  return (
    <Router>
      <Header
        token={token}
        search={search}
        priceMin={priceMin}
        priceMax={priceMax}
        priceAsc={priceAsc}
        priceDesc={priceDesc}
        handleToken={handleToken}
        setSearch={setSearch}
        setPriceMin={setPriceMin}
        setPriceMax={setPriceMax}
        setPriceAsc={setPriceAsc}
        setPriceDesc={setPriceDesc}
        setFetchRangeValues={setFetchRangeValues}
        fetchRangeValues={fetchRangeValues}
      />
      <Routes>
        <Route
          path="/"
          element={<Home data={data} isLoading={isLoading} />}
        ></Route>
        <Route path="/offer/:id" element={<Offer token={token} />}></Route>
        <Route
          path="/signup"
          element={<Signup handleToken={handleToken} />}
        ></Route>
        <Route
          path="/login"
          element={<Login handleToken={handleToken} />}
        ></Route>
        <Route
          path="/favoris"
          element={<Favoris token={token}></Favoris>}
        ></Route>
        <Route path="/publish" element={<Publish token={token} />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

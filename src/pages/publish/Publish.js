import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Dots } from "react-activity";
import "react-activity/dist/library.css";

const Publish = ({ token }) => {
  // USESTATES
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);

  const [uploaded, setUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // NAVIGATE
  const navigate = useNavigate();

  return token ? (
    <div className="publish-page">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitted(true);
          try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("condition", condition);
            formData.append("city", location);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", picture);

            const response = await axios.post(
              "http://localhost:3000/offer/publish",

              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form/data",
                },
              }
            );
            console.log(response.status);
            if (response.status === 200) {
              navigate("/");
              setUploaded(true);
            }
          } catch (error) {
            console.log(error.response.data);
          }
        }}
        className="form-container"
      >
        <h1>Vends ton article</h1>
        <div className="upload-container">
          <div className="upload-dotted-container">
            {!picture && (
              <label htmlFor="file">
                {" "}
                <FontAwesomeIcon icon="plus" /> Ajoute une image
              </label>
            )}

            <input
              id="file"
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                setPicture(event.target.files[0]);
              }}
            />

            {picture && (
              <img
                className="upload-img"
                src={URL.createObjectURL(picture)}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="info-container">
          <div className="titles">
            <div>Titre</div>
            <div>Décris ton article</div>
          </div>
          <div className="input">
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              placeholder="ex: Pull Ralph Lauren"
            />

            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              placeholder="ex: porté quelques fois"
            />
          </div>
        </div>
        <div className="info-container">
          <div className="titles">
            <div>Marque</div>
            <div>Taille</div>
            <div>Couleur</div>
            <div>Etat</div>
            <div>Lieu</div>
          </div>
          <div className="input">
            <input
              value={brand}
              onChange={(event) => {
                setBrand(event.target.value);
              }}
              type="text"
              placeholder="ex: Ralph Lauren"
            />

            <input
              value={size}
              onChange={(event) => {
                setSize(event.target.value);
              }}
              type="text"
              placeholder="ex: L / 40 / 12"
            />

            <input
              value={color}
              onChange={(event) => {
                setColor(event.target.value);
              }}
              type="text"
              placeholder="ex: Bleu"
            />

            <input
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              type="text"
              placeholder="ex: Neuf sans étiquettes"
            />

            <input
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
              type="text"
              placeholder="ex: Paris"
            />
          </div>
        </div>
        <div className="price-container">
          <div className="titles">
            <div>Prix</div>
          </div>
          <div className="input">
            <input
              value={price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              type="text"
              placeholder="0,00€"
            />{" "}
            <div className="check-box-container">
              <input
                type="checkbox"
                checked={exchange}
                onClick={() => {
                  setExchange(!exchange);
                }}
              />
              <span className="exchange">
                Je suis intéressé(e) par les échanges
              </span>
            </div>
          </div>
        </div>
        <div className="button-container">
          {!submitted ? (
            <button type="submit"> Ajouter</button>
          ) : (
            !uploaded && (
              <button>
                <Dots></Dots>
              </button>
            )
          )}
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};
export default Publish;

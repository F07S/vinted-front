import { useState } from "react";
import axios from "axios";

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
  // const [exchange, setExchange] = useState(false);

  return (
    <div className="publish-page">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
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
              "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
              formData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                  "Content-Type": "multipart/form/data",
                },
              }
            );
            console.log(response);
          } catch (error) {
            console.log(error.response.data);
          }
        }}
        className="form-container"
      >
        <h1>Vends ton article</h1>
        <div className="upload-container">
          <input
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
              placeholder="ex: Chemise Ralph Lauren"
            />

            <input
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              type="text"
              placeholder="ex: Très peu portée"
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
              placeholder="ex: Bleue"
            />

            <input
              value={condition}
              onChange={(event) => {
                setCondition(event.target.value);
              }}
              type="text"
              placeholder="ex: Neuve sans étiquettes"
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
            {/* <div className="check-box-container">
              <input
                type="checkbox"
                checked={exchange}
                onClick={() => {
                  setExchange(!exchange);
                }}
              />
              <span>Je suis intéressé(e) par les échanges</span>
            </div> */}
          </div>
        </div>
      </form>
      <div className="button-container">
        <button type="submit">Ajouter</button>
      </div>
    </div>
  );
};
export default Publish;

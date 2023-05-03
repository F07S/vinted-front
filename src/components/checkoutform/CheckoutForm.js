import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({
  title,
  price,
  protectionFees,
  shippingFees,
  fees,
  total,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  // Navigate
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const cardElement = elements.getElement(CardElement);
      console.log(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "Buyer ID",
      });
      //   console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;
      //   console.log(stripeToken);

      const response = await axios.post(
        "https://site--vinted-backend--phfc9s47kbj5.code.run/payment",
        // "http://localhost:3000/payment"
        {
          token: stripeToken,
          title: title,
          amount: total,
        }
      );

      console.log(response.data);

      if ((response.data = "succeeded")) {
        setIsLoading(false);
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="payment-page">
      <form onSubmit={handleSubmit}>
        <p className="title">Résumé de la commande</p>
        <div className="order-details">
          <div>Commande</div>
          <div> {price.price} €</div>
        </div>
        <div className="order-details">
          <div>Frais protection acheteurs</div>
          <div>{protectionFees} €</div>
        </div>
        <div className="order-details">
          <div>Frais de port</div>
          <div> {shippingFees} €</div>
        </div>
        <div className="total-details">
          <div>Total</div>
          <div> {total} €</div>
        </div>
        <div>
          <p className="base-text">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <strong className="bold">{title.name}</strong>. Vous allez payer{" "}
            <strong className="bold">{total}</strong> € (frais de protection et
            frais de port inclus).
          </p>
          <div className="cb">
            <CardElement />
          </div>
          {completed ? (
            <div className="order-confirmation">
              <p>Paiement validé.</p>
              <p>Merci pour votre achat.</p>
              <button
                onClick={() => {
                  navigate("/");
                }}
                className="return"
              >
                Retour vers la boutique
              </button>
            </div>
          ) : (
            <button className="pay-button" disabled={isLoading} type="submit">
              Payer
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

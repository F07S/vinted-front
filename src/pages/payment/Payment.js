import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;
  //   console.log(title);
  //   console.log(price);
  let protectionFees = ((10 / 100) * price.price).toFixed(2);
  let shippingFees = ((20 / 100) * price.price).toFixed(2);
  let total = price.price + protectionFees + shippingFees;
  let fees = protectionFees + shippingFees;

  return (
    <div className="payment-page">
      <h1>Payment Page</h1>
      <p>Résumé de la commande</p>
      <div>
        <span>Commande :</span>
        <span> {price.price} €</span>
      </div>
      <div>
        <span>Frais protection acheteurs :</span>
        <span>{protectionFees}€</span>
      </div>
      <div>
        <span>Frais de port :</span>
        <span> {shippingFees}€</span>
      </div>

      <div>
        <span>Total :</span>
        <span> {total} €</span>
      </div>

      <div>
        <p>
          Il ne vous reste plus qu'un étape pour vous offrir {title.name}. Vous
          allez payer {fees} (frais de protection et frais de port inclus).
        </p>
      </div>
    </div>
  );
};

export default Payment;

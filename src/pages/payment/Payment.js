import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkoutform/CheckoutForm";

const stripePromise = loadStripe(
  // My public key below
  "pk_test_51MbPVDAugUgA9WrPZgmolBDBxKkRwKl0rEDQ2VAguwpjI3AUrxg9p3laoW5dLcAujaKooG3rrDzgjGwB1IMozxiP00LQhQNoAX"
);

const Payment = () => {
  const location = useLocation();
  const { title, price } = location.state;

  // TOTAL & FEE CALCULATION VARIABLES
  let protectionFees = ((10 / 100) * price.price).toFixed(2);
  //   console.log(typeof protectionFees);
  let shippingFees = ((20 / 100) * price.price).toFixed(2);
  //   console.log(typeof shippingFees);
  let total = (
    price.price +
    Number(protectionFees) +
    Number(shippingFees)
  ).toFixed(2);
  let fees = (Number(protectionFees) + Number(shippingFees)).toFixed(2);

  // add token condition below
  return (
    <div className="payment-page">
      <Elements stripe={stripePromise}>
        <CheckoutForm
          title={title}
          price={price}
          protectionFees={protectionFees}
          shippingFees={shippingFees}
          fees={fees}
          total={total}
        />
      </Elements>
    </div>
  );
};

export default Payment;

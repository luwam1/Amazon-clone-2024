// import React, { useContext, useReducer, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../Componenets/Layout/LayOut";
// import { DataContext } from "../../Componenets/DataProvider/DataProvider";
// import ProductCard from "../../Componenets/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { axiosInstance } from "../../Api/axios";
// import { db } from "../../Utility/Firebase";
// import { useNavigate } from "react-router-dom";
// import { Type } from "../../Utility/action.types";

// function Payment() {
//   // Get user and basket from context
//   const [{ user, basket }, dispatch] = useContext(DataContext);
//   // console.log(user);

//   // Calculate total number of items in the basket
//   const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

//   // Calculate total price of items in the basket (in dollars)
//   const total = basket.reduce(
//     (amount, item) => item.price * item.amount + amount,
//     0
//   );

//   // Stripe setup and state for handling card errors
//   const [cardError, setCardError] = useState(null);
//   const [processing, setProcessing] = useState(null);
//   const [clientSecret, setClientSecret] = useState(null); // Save client secret
//   const stripe = useStripe();
//   const elements = useElements();
//   const navigate = useNavigate();

//   // Handle changes in the CardElement and set card error if any
//   const handleChange = (e) => {
//     e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     // Convert total from dollars to cents (Stripe expects integer)
//     const totalInCents = Math.round(total * 100);

//     try {
//       setProcessing(true);

//       // step1. Backend functions -> Contact to get the client secret
//       const response = await axiosInstance({
//         method: "POST",
//         url: `/payment/create?total=${totalInCents}`, // Send amount in cents
//       });

//       // console.log(response.data);

//       const clientSecret = response.data?.clientSecret;

//       // 2. Client-side (React-side confirmation)
//       const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       // console.log(paymentIntent);

//       // 3. After the confirmation --> Order Firestore database save and clear basket
//       await db
//         .collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .doc(paymentIntent.id)
//         .set({
//           basket: basket,
//           amount: paymentIntent.amount,
//           created: paymentIntent.created,
//         });
//       //! make the basket empty after payment completed
//       dispatch({
//         type: Type.EMPTY_BASKET,
//       });

//       setProcessing(false);
//       // after payment navigate to order page
//       navigate("/Order", { state: { message: "You have placed new order" } });
//     } catch (error) {
//       console.log(error.me);
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       <div className={classes.payment_header}>Checkout ({totalItem})</div>
//       <section className={classes.container_wrapper}>
//         {/* User's delivery address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>{user ? user.email : "Guest User"}</div>
//           <div>123 React Lane</div>
//           <div>Chicago, IL</div>
//         </div>
//         <hr />

//         {/* List of products in the basket */}
//         <div className={classes.flex}>
//           <h3>Review Items and Delivery Address</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item} product={item} flex={true} />
//             ))}
//           </div>
//         </div>
//         <hr />

//         {/* Payment methods section */}
//         <div className={classes.flex}>
//           <h3>Payment Methods</h3>
//           <div className={classes.payment_card_container}>
//             <div className={classes.payment_details}>
//               <form onSubmit={handlePayment}>
//                 {cardError && (
//                   <small style={{ color: "red" }}>{cardError}</small>
//                 )}
//                 <CardElement onChange={handleChange} />
//                 <div>
//                   <div>Total Order: ${total.toFixed(2)}</div>
//                   <button type="submit">
//                     {processing ? "Processing..." : "Pay Now"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

import React, { useContext, useReducer, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Componenets/Layout/LayOut";
import { DataContext } from "../../Componenets/DataProvider/DataProvider";
import ProductCard from "../../Componenets/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utility/Firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.types";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState(null); // Track card errors
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null); // General error state
  const navigate = useNavigate();

  // Calculate total number of items in the basket
  const totalItem =
    basket?.reduce((amount, item) => amount + item.amount, 0) || 0;

  // Calculate the total price of items in the basket
  const total = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  // Handle changes in the CardElement
  const handleChange = (e) => {
    if (e.error) {
      setCardError(e.error.message);
    } else {
      setCardError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Ensure Stripe.js has loaded before proceeding
    }

    try {
      setProcessing(true); // Disable the pay button during processing

      // Create payment intent on the backend
      const response = await axiosInstance({
        method: "post",
        url: `/payment/create?total=${total * 100}`, // Total in cents
      });

      const clientSecret = response.data.clientSecret;
      if (!clientSecret) {
        throw new Error("Failed to get clientSecret");
      }

      // Confirm the card payment using Stripe
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        console.error("Payment error:", stripeError);
        setCardError(`Payment failed: ${stripeError.message}`);
      } else {
        console.log("Payment successful", paymentIntent);
        setCardError(null);

        // Save order to Firestore
        if (user && paymentIntent) {
          await db
            .collection("users")
            .doc(user.uid)
            .collection("orders")
            .doc(paymentIntent.id)
            .set({
              basket: basket,
              amount: paymentIntent.amount,
              created: paymentIntent.created,
            });

          // Empty the basket after successful payment
          dispatch({ type: Type.EMPTY_BASKET });

          // Navigate to orders page after payment
          navigate("/Order", { state: { msg: "You have placed a new order" } });
        }
      }
    } catch (error) {
      console.error("Payment failed:", error);
      setError("Something went wrong with the payment. Please try again.");
    } finally {
      setProcessing(false); // Re-enable the pay button
    }
  };

  return (
    <LayOut>
      <div className={classes.payment_header}>Checkout ({totalItem} items)</div>
      <section className={classes.container_wrapper}>
        {/* User's delivery address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>{user ? user.email : "Guest User"}</div>
          <div>123 React Lane</div>
          <div>Chicago, IL</div>
        </div>
        <hr />

        {/* List of products in the basket */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery Address</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* Payment methods section */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment_card_container}>
            <form onSubmit={handlePayment}>
              {cardError && <small style={{ color: "red" }}>{cardError}</small>}
              {error && <small style={{ color: "red" }}>{error}</small>}
              <CardElement onChange={handleChange} />
              <div>
                <div>Total Order: ${total.toFixed(2)}</div>
                <button type="submit" disabled={processing}>
                  {processing ? "Processing..." : "Pay Now"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;

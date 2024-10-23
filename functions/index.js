const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Initialize Stripe with the secret key from the environment
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

// Enable CORS and JSON parsing for incoming requests
app.use(cors({ origin: true }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success!",
  });
});

// Payment route
app.post("/payment/create", async (req, res) => {
  const total = parseInt(req.query.total);

  // Validate the total amount
  if (total > 0) {
    try {
      // Create a PaymentIntent with the amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // Amount in cents
        currency: "usd",
      });

      // Log and return the clientSecret to the frontend
      console.log({ clientSecret: paymentIntent.client_secret });
      res.status(201).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Payment intent creation failed" });
    }
  } else {
    res.status(400).json({ message: "Total must be greater than 0" });
  }
});

// Export the function for Firebase
exports.api = onRequest(app);

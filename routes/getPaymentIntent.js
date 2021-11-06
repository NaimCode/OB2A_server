const router = require("express").Router();

const stripe = require("stripe")(process.env.STRIPE_KEY);
// Create a PaymentIntent with the order amount and currency

router.post("/", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.prix, // Specify amount here
      currency: "eur", // Specify currency here
    });
    // Return client secret
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
// Create a PaymentIntent with the order amount and currency

router.post("/", async (req, res) => {
  try {
    const client = req.body.client;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(req.body.prix.toFixed(2) * 100), // Specify amount here
      currency: "eur",
      //customer: client.email,
      description: `Client: ${client.email}, Produits: ${client.panier.map(
        (p) => `${p.titre} `
      )}`,
      // Specify currency here
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

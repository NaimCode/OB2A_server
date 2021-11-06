const router = require("express").Router();

const stripe = require("stripe")(
  "sk_test_51JoXgfFxlWbadRCPjDvc1ljK1AkKUlTmn4K40zfeVGryIBP4rXhT1Rsa6w6lRPKfqzW49XPPxfvGR5NGOj2W2Agp004NCvyaA1"
);
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

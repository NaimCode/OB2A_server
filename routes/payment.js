const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const frontend = process.env.FRONTEND || "http://localhost:3000";

router.post("/payment", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_item: [
      {
        price: req.body.produit.prix,
        quantity: 1,
      },
    ],
    payment_methode_types: ["card"],
    mode: "payment",
    succes_url: `${frontend}/payment-succes`,
    cancel_url: `${frontend}/payment-canceled`,
  });
  res.redirect(303, session.url);
  // 9  const session = await stripe.checkout.sessions.create({
  // 10    line_items: [
  // 11      {
  // 12        // TODO: replace this with the `price` of the product you want to sell
  // 13        price: '{{PRICE_ID}}',
  // 14        quantity: 1,
  // 15      },
  // 16    ],
  // 17    payment_method_types: [
  // 18      'card',
  // 19    ],
  // 20    mode: 'payment',
  // 21    success_url: `${YOUR_DOMAIN}/success.html`,
  // 22    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  // 23  });
  // 24
  // 25  res.redirect(303, session.url)
  // 26
});

module.exports = router;

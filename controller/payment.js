const { default: axios } = require("axios");

const stripe = require("stripe")(process.env.STRIPE_KEY);

//Variabl
const frontend = process.env.FRONTEND || "http://localhost:3000";
const backend = process.env.BACKEND || "http://localhost:1337";

const makePayment = async (req, res) => {
  stripe.charge.create(
    {
      source: req.body.card.id,
      amount: req.body.prix * 100,
      currency: "eur",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        makeOrder(req);
        res.status(500).json(stripeErr);
      } else res.status(200).json(stripeRes);
    }
  );
};

const makeOrder = async (req) => {
  const data = {
    etat: "Traitement",
    clients: req.body.client,
    produits: req.body.client.panier,
    adresse: req.body.card.address_line1,
    paiement: req.body.card.prix,
  };
  await axios.post(`${backend}/commandes`, data);
};

const sendOrder = () => {};

module.exports = { makePayment };

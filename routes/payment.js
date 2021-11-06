const { makePayment } = require("../controller/payment");
const axios = require("axios");
const router = require("express").Router();
const frontend = process.env.FRONTEND || "http://localhost:3000";
const backend = process.env.BACKEND || "http://localhost:1337";
router.post("/", (req, res) => {
  const name = req.body.name;
  const tel = req.body.tel;
  const adresse = req.body.adresse;
  const ville = req.body.ville;
  const codePostal = req.body.codePostal;
  const stripeId = req.body.payload.paymentIntent.id;
  const status = req.body.payload.paymentIntent.status; //succeeded
  const client = req.body.client;
  const prix = req.body.prix;
  makeOrder(client, tel, ville, adresse, codePostal, name, prix);
});
const makeOrder = async (
  client,
  tel,
  ville,
  adresse,
  codePostal,
  name,
  prix
) => {
  const data = {
    etat: "Traitement",
    client: client,
    produits: client.panier,
    adresse: `Nom: ${name}, Tel: ${tel}, Ville: ${ville}, Code Postal: ${codePostal}, adresse: ${adresse}`,
    paiement: prix,
  };

  axios
    .post(`${backend}/commandes`, data)
    .then((response) => res.redirect(`${frontend}/payment-succes`))
    .catch((error) => console.log(error));
};

const sendOrder = () => {};
module.exports = router;

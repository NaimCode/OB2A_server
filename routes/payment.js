const { makePayment } = require("../controller/payment");
const axios = require("axios");
const nodemailer = require("nodemailer");
const router = require("express").Router();
const dotenv = require("dotenv");
dotenv.config();
const frontend = process.env.FRONTEND || "http://localhost:3000";
const backend = process.env.BACKEND || "http://localhost:1337";

const transporter = nodemailer.createTransport({
  port: 587, // true for 465, false for other ports
  host: "smtp-relay.sendinblue.com",
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: false,
});

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
  console.log(status);
  makeOrder(client, tel, ville, adresse, codePostal, name, prix, res, stripeId);
});
const makeOrder = async (
  client,
  tel,
  ville,
  adresse,
  codePostal,
  name,
  prix,
  res,
  stripeId
) => {
  const produits = client.panier.map((p) => {
    return { quantite: 1, produit: p };
  });
  const adresseLivraison = {
    adresse,
    ville,
    codePostal,
    tel,
  };
  axios
    .post(`${backend}/commandes`, {
      stripeID: stripeId,
      clientNom: name,
      clientID: client.id.toString(),
      adresseLivraison,
      produitsCommandes: produits,
      //adresse: `Nom: ${name}, Tel: ${tel}, Ville: ${ville}, Code Postal: ${codePostal}, adresse: ${adresse}`,
      montant: prix,
    })
    .then((response) => sendOrder(client, res))
    .catch((error) => console.log(error.message));
};

const sendOrder = (client, res) => {
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  const mailData = {
    from: client.email, // sender address
    to: process.env.RECEIVER_ORDER, // list of receivers
    subject: "Commande d'achat",
    // text: `Depuis naimdev.com \n\n Je suis ${name}, \n ${text}`,
    html: "<div style='backgroundColor: yellow'>Coucou</div>",
  };
  transporter.sendMail(mailData, function (err, info) {
    console.log(info);
    if (err) {
      console.log("Error sending");
      res.status(500).json(err);
    } else {
      console.log("Sended");
      res.status(200).json("Succeeded");
    }
  });
};
module.exports = router;

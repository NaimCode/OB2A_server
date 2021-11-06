const { default: axios } = require("axios");

const stripe = require("stripe")(process.env.STRIPE_KEY);

//Variabl

const makePayment = (req, res) => {
  console.log(req.body);
};

module.exports = { makePayment };

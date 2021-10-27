const { makePayment } = require("../controller/payment");

const router = require("express").Router();

router.post("/", makePayment);

module.exports = router;

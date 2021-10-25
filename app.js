const express = require("express");
const dotenv = require("dotenv");
const app = express();
const paymentRouter = require("./routes/payment");
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.static("public"));
app.listen(port, () => console.log("Server running"));

///
app.use("/payment", paymentRouter);
///
app.get("/", (req, res) => res.sendFile(__dirname + "/view/home.html"));

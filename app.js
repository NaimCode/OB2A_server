const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const paymentRouter = require("./routes/payment");
dotenv.config();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
//Listening
app.listen(port, () => console.log("Server running"));

///
app.use("/payment", paymentRouter);
///
app.get("/", (req, res) => res.sendFile(__dirname + "/view/home.html"));

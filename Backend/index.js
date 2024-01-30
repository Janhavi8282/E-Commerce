const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const productRouter = require("./routes/products");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const cartRouter = require("./routes/cart");
const port = 3000;

dotenv.config();
mongoose
  .connect(process.env.REACT_APP_MONGO_URL)
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

//express.json() is a built-in middleware in Express that parses incoming JSON payloads.
//It extracts the JSON data from the request body and populates the req.body object with the parsed data.
app.use(express.json({ limit: "10mb" }));
//app.use(cors());

//express.urlencoded is another built-in middleware in Express that parses incoming URL-encoded payloads.
//It extracts data from the form submission in the request body and populates the req.body object with the parsed data.
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/products", productRouter);
app.use("/api/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);

app.listen(process.env.PORT || port, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`)
);



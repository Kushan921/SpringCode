const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8013;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL)
    .then(() => console.log("mongoDB connection success !!"))
    .catch((err) => console.error("mongoDB connection error:", err));

const orderRouter = require("./Routes/orderRoutes");
app.use("/orders", orderRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port no: ${PORT}`);
});

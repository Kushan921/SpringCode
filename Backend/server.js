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

const server = app.listen(PORT, () => {
    console.log(`Server is up and running on port no: ${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received.');
    server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received.');
    server.close(() => {
        console.log('HTTP server closed.');
        mongoose.connection.close(false, () => {
            console.log('MongoDB connection closed.');
            process.exit(0);
        });
    });
});

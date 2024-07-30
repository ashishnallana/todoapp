const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// connecting to db
require("./db/connection");

// cors
const allowedOrigins = [process.env.CLIENT_ORIGIN]; // we can add more client domains if needed

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.listen(port, () => {
  console.log(`server is up and running at the port ${port}.`);
});

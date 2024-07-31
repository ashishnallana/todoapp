const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRouter = require("./routers/userRouter");
const todoRouter = require("./routers/todoRouter");

const app = express();
const port = process.env.PORT || 3001;

// connecting to db
require("./db/connection");

// cors
app.use(
  cors({
    origin: "https://todoapp-gold-mu.vercel.app",
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// routers
app.use("/user", userRouter);
app.use("/", todoRouter);

app.listen(port, () => {
  console.log(`server is up and running at the port ${port}.`);
});

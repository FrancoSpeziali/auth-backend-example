const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routes/user");

dotenv.config();

const { jwtStrategy } = require("./config/passportStrategies");

const app = express();

// specify your middleware here
passport.use(jwtStrategy);
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// specify your routes here
app.use("/user", userRoutes);

console.log("Connecting to database. Put the kettle on while you wait... 🫖");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected! 😍☕"))
  .catch((error) => console.log(error, "Database did not connect! ☹️❌"));

app.listen(3002, () => console.log("The server is listening... 🐒"));

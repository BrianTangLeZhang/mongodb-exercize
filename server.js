//import two library
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//create express app
const app = express();

//middleware to handle JSON request
app.use(express.json());

//middleware to set up a crop golicy
const corsHandler = cors({
  origin: "*",
  methods: "GET,PUT,POST,DELETE",
  allowedHeaders: ("Content-Type", "Authorization", "x-auth-token"),
  preflightContinue: true,
  optionsSuccessStatus: 200,
});

app.use(corsHandler);

//connect to mongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/netflix")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((e) => console.log(e));

//Routes
app.use("/movies", require("./routes/movie"));
app.use("/movies/:id", require("./routes/movie"));
app.use("/shows", require("./routes/show"));
app.use("/shows/:id", require("./routes/show"));
app.use("/genre", require("./routes/genreData"));

//start server
app.listen(5000, () => {
  console.log("Server is running on: http://localhost:5000");
});

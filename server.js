//import two library
const express = require("express");
const mongoose = require("mongoose");

//create express app
const app = express();

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

//start server
app.listen(1226, () => {
  console.log("Server is running on: http://localhost:1226");
});

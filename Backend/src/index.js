const express = require("express");
const route = require("./Routes/routes.js");
const mongoose = require("mongoose");
const app = express();
const multer = require('multer');

const port = process.env.PORT || 3001;

app.use(multer().any());
app.use(express.json());

const url = "mongodb+srv://ravisingh007ravi:Ravi1234@cluster0.w9hbwbb.mongodb.net/group8Database?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true })

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
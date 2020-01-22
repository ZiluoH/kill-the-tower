const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
// const tweets = require("./routes/api/tweets");
const cards = require("./routes/api/cards");



const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path');


mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));
  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/cards", cards);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
// Body-praser middleware
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// create empty users array to store new users
let users = [];

// id generating function
idGenerator = (username) => {
  let result = "";
  for (let i = 0; i < username.length; i++) {
    let charCode = username.charCodeAt(i) + i;
    result += charCode.toString(16);
  }
  return result.substr(0, 15);
};

// users section
app.post("/api/users", (req, res) => {
  let { username } = req.body;
  // input validation
  if (!username || typeof username !== "string" || username.length < 3) {
    return res.status(400).send("Invalid username");
  }
  let _id = idGenerator(username);
  let newUser = {
    username: username,
    "_id": _id,
  };
  users.push(newUser);
  res.json(newUser);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

const express=require("express");
const app=express();
const customers = require("./app/controllers/index.js");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
  })
);

const db = require("./app/models");
db.sequelize.sync();


app.post("/update", customers.create);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/login.html");
});

app.get("/home", function (req, res) {
  res.sendFile(__dirname + "/public/home.html");
});

app.post("/", customers.create);

app.listen(3000,() => {
    console.log("Server is running.");
})



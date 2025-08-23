let express = require("express");
let bodyParser = require("body-parser");
require("dotenv").config();

let router = require("./routes/router.js"); // ✅ Make sure path is correct
let db = require("../db.js"); // ✅ Path seems correct

let app = express();

// ✅ Load cartRoutes BEFORE using it
const cartRoutes = require("./routes/cartRoutes.js"); // ✅ Fixed path

app.use(express.static("public"));
app.use(express.static("src"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/cart", cartRoutes); // ✅ This now works

// Clean up weird line break characters in URLs
app.use((req, res, next) => {
  req.url = req.url.replace(/\n/g, "").replace(/%0A/g, "").trim();
  next();
});

app.use("/", router);

module.exports = app;


























// let express = require("express");
// let bodyParser = require("body-parser");
// require("dotenv").config();
// let router = require("./routes/router.js");
// let db = require("../db.js");

// let app = express();

// app.use(express.static("public"));
// app.use(express.static("src"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.use(express.json());
// app.use("/api/cart", cartRoutes.js);
// const cartRoutes = require("./src/routes/cartRoutes.js"); 
// app.use((req, res, next) => {
//   req.url = req.url.replace(/\n/g, "").replace(/%0A/g, "").trim();
//   next();
// });

// app.use("/", router);

// module.exports = app;

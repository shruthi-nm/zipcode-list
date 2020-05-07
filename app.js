const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const app = express();
const port = 3001;
const routes = require("./routes/index");
const exphbs = require("express-handlebars");


app.set("views", path.join(__dirname, "views"));
app.engine(
  "html",
  exphbs({
    defaultLayout: "layout",
    extname: ".html"
  })
);
app.set("view engine", ".html");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/", routes);

app.set("port", process.env.PORT || port);
// set port, listen for requests
app.listen(app.get("port"), () => {
  console.log("Server started on port " + app.get("port"));
});
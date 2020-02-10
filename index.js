const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const logger = require("./middleware/logger");
const members = require("./Members");

const app = express();

// Init middleware
// app.use(logger);

// Handlebars middleware

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Add Body Parser middleware - to accept JSON objects in post requests
app.use(express.json());

// Middleware to handle form data
app.use(express.urlencoded({ extended: false }));

//Homepage Route
app.get("/", (req, res) =>
  res.render("index", {
    title: "Members Page",
    members
  })
);

// Set a static folder -- these won't work at the moment because of the above
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

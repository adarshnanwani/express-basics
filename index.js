const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const app = express();

// Init middleware
// app.use(logger);

// Add Body Parser middleware - to accept JSON objects in post requests
app.use(express.json());

// Middleware to handle form data
app.use(express.urlencoded({ extended: false }));

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

// Members API Routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

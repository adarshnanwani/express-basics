const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");
const app = express();

// Init middleware
// app.use(logger);

// Gets all members
app.get("/api/members", (req, res) => res.json(members));

// Get a single member
app.get("/api/members/:id", (req, res) => {
  const found = members.some(m => m.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(m => m.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Set a static folder
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
